import path from 'path'
import { logger, fs, ps } from '../modules'
import config from '../../config/workspace.config'
import { interfaces } from '../modules'

enum ThemeType {
    EXTENDED = 'Extended FC Theme',
    EXISTING = 'Full FC Theme',
    CUSTOM = 'Custom Theme',
}

interface ThemeOption {
    name: string
    value: string
}

async function copyThemeFiles(
    selectedType: ThemeType,
    baseThemePath: string,
    themePath: string,
    themeConfig: string,
    base: string,
) {
    if (selectedType === ThemeType.EXISTING) {
        await fs.copyDirectoryRecursive(baseThemePath, themePath)
    } else if (selectedType === ThemeType.EXTENDED) {
        await fs.copyDirectoryRecursive(baseThemePath, themePath, {
            filter: file => {
                const fileName = path.basename(file)
                return fs.isDirectory(file) || config.variants.files.map(file => file.name).includes(fileName)
            },
        })
        fs.writeFileSync(themeConfig, JSON.stringify({ variant: base }, null, 2))
    } else {
        const customFiles = config.custom.files
        await fs.copyDirectoryRecursive(baseThemePath, themePath, {
            filter: file => {
                const fileName = path.basename(file)
                return fs.isDirectory(file) || customFiles.map(file => file.name).includes(fileName)
            },
        })
        customFiles.forEach(file => {
            const files = fs.findFilesByName(themePath, file.name)
            files.forEach(filePath => {
                if (file?.create) file.create(filePath)
            })
        })
    }
}

async function createTheme(selectedType: ThemeType, base: string, theme?: string) {
    const finalTargetDir = theme || base
    const moduleThemePath = path.join(config.paths.moduelPath, base)
    const baseThemePath = path.join(config.paths.basePath, base)
    const themePath = path.join(config.paths.targetPath, finalTargetDir)
    const templateEntry = path.join(config.paths.utilsPath, 'templateEntry.js')
    const themeConfig = path.join(themePath, config.internal.config)

    if (fs.exists(themePath)) {
        logger.error(`The theme directory "src/themes/${finalTargetDir}" already exists!`)
        logger.info('If you want to create a different theme, choose a unique name or delete the existing directory.')
        process.exit(0)
    }

    try {
        await createBaseTheme(base, baseThemePath, moduleThemePath)

        logger.info(`Creating theme ${finalTargetDir}...`)
        await copyThemeFiles(selectedType, baseThemePath, themePath, themeConfig, base)

        await finalizeThemeCreation(templateEntry, themePath)
    } catch (error) {
        handleError(error)
    }
}

async function createBaseTheme(base: string, baseThemePath: string, moduleThemePath: string) {
    logger.info(`Creating base theme...`)
    if (!fs.exists(baseThemePath)) {
        await fs.copyDirectoryRecursive(moduleThemePath, baseThemePath)
    } else {
        logger.info(`Skipped. Base theme ${base} already exists in ${config.paths.basePath}`)
    }
}

async function finalizeThemeCreation(templateEntry: string, themePath: string) {
    fs.copyFile(templateEntry, path.join(themePath, 'script.js'))
    logger.info('Generating theme list...')
    await ps.spawn('pnpm', ['tsx', 'cli/scripts/generateThemeList.ts'])
    logger.success('Theme creation complete!')
}

function handleError(error: unknown) {
    if (error instanceof Error) {
        logger.error(error.message)
    } else {
        logger.error('An unknown error occurred')
    }
    process.exit(1)
}

async function getAvailableThemes(): Promise<string[]> {
    let themes = await fs.listDirectory(config.paths.moduelPath)

    if (!themes) {
        logger.warn('No themes found in the module path')
        logger.info('Installing dependencies...')
        await ps.spawn('pnpm', ['i'])
        themes = await fs.listDirectory(config.paths.moduelPath)

        if (!themes) {
            logger.error('Still no themes found in module path')
            logger.info(`Please check package.json for package specified in ${config.paths.moduelPath}`)
            process.exit(1)
        }
    }

    return themes
}

function formatThemeOptions(themes: string[]): ThemeOption[] {
    return themes.map(theme => ({
        name: theme
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        value: theme,
    }))
}

async function selectThemeType() {
    logger.matrix(
        ['Criteria', 'Extended FC Theme', 'Full FC Theme', 'Custom Theme'],
        [
            ['Maintenance', 'Low', 'Medium', 'High'],
            ['Adjustability', 'Moderate', 'Moderate', 'Complete'],
            ['Implementation Time', 'Short', 'Medium', 'Long'],
        ],
        'Decision Matrix for Theme Options',
        'white',
        {
            Low: 'green',
            Medium: 'yellow',
            High: 'red',
            Short: 'green',
            Long: 'red',
            Limited: 'red',
            Moderate: 'yellow',
            Complete: 'green',
        },
    )
    const message = 'Select your theme type based on the matrix above:'
    const choices = Object.values(ThemeType)
    return await interfaces.select(message, choices)
}

// Main execution
async function main() {
    try {
        const availableThemes = await getAvailableThemes()
        const selectedType = (await selectThemeType()) as ThemeType
        const themeOptions = formatThemeOptions(availableThemes)

        switch (selectedType) {
            case ThemeType.EXISTING: {
                const base = await interfaces.select('Select a theme', themeOptions)
                await createTheme(selectedType, base)
                break
            }

            case ThemeType.EXTENDED: {
                const base = await interfaces.select('Select a theme', themeOptions)
                const { theme } = await interfaces.questions([
                    {
                        name: 'theme',
                        message: 'Enter a theme name',
                        default: `${base}-custom`,
                    },
                ])

                await createTheme(selectedType, base, theme)
                break
            }

            case ThemeType.CUSTOM: {
                const themes = await getAvailableThemes()
                const base = themes[0]

                const { theme } = await interfaces.questions([
                    {
                        name: 'theme',
                        message: 'Enter a theme name',
                        default: 'custom-theme',
                    },
                ])

                await createTheme(selectedType, base, theme)
                break
            }
        }
    } catch (error) {
        handleError(error)
    }
}

// Start the program
main()
