import path from 'path'
import { logger, fs, ps } from '../modules'
import config from '../../config/workspace.config'
import { interfaces } from '../modules'
import { enums, input } from '../constants'

interface ThemeOption {
    name: string
    value: string
}

async function copyThemeFiles(
    selectedType: enums.ThemeType,
    baseThemePath: string,
    themePath: string,
    themeConfig: string,
    base: string,
) {
    if (selectedType === enums.ThemeType.EXISTING) {
        await fs.copyDirectoryRecursive(baseThemePath, themePath)
    } else if (selectedType === enums.ThemeType.EXTENDED) {
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

async function createTheme(selectedType: enums.ThemeType, base: string, theme?: string) {
    const finalTargetDir = theme || base
    const moduleThemePath = path.join(config.paths.moduelPath, base)
    const baseThemePath = path.join(config.paths.basePath, base)
    const themePath = path.join(config.paths.targetPath, finalTargetDir)
    const templateEntry = path.join(config.paths.utilsPath, 'templateEntry.js')
    const themeConfig = path.join(themePath, config.internal.config)

    if (fs.exists(themePath)) {
        logger.error('create.createTheme.exists.error', { themePath: `src/themes/${finalTargetDir}` })
        logger.info('create.createTheme.exists.info')
        process.exit(0)
    }

    try {
        await createBaseTheme(base, baseThemePath, moduleThemePath)

        logger.info('create.createTheme.processing.info', { name: finalTargetDir })
        await copyThemeFiles(selectedType, baseThemePath, themePath, themeConfig, base)

        await finalizeThemeCreation(templateEntry, themePath)
    } catch (error) {
        handleError(error)
    }
}

async function createBaseTheme(base: string, baseThemePath: string, moduleThemePath: string) {
    logger.info('create.createBaseTheme.start.info')
    if (!fs.exists(baseThemePath)) {
        await fs.copyDirectoryRecursive(moduleThemePath, baseThemePath)
    } else {
        logger.info('create.createBaseTheme.exists.info', { base, path: config.paths.basePath })
    }
}

async function finalizeThemeCreation(templateEntry: string, themePath: string) {
    fs.copyFile(templateEntry, path.join(themePath, 'script.js'))
    logger.info('create.finalizeThemeCreation.start.info')
    await ps.spawn('pnpm', ['tsx', 'cli/scripts/generateThemeList.ts'])
    logger.success('create.finalizeThemeCreation.finish.success')
}

function handleError(error: unknown) {
    if (error instanceof Error) {
        logger.error(error.message)
    } else {
        logger.error('create.error.unknown')
    }
    process.exit(1)
}

async function getAvailableThemes(): Promise<string[]> {
    let themes = await fs.listDirectory(config.paths.moduelPath)

    if (!themes) {
        logger.warn('create.getAvailableThemes.exists.warn')
        logger.info('create.getAvailableThemes.exists.info')
        await ps.spawn('pnpm', ['i'])
        themes = await fs.listDirectory(config.paths.moduelPath)

        if (!themes) {
            logger.error('create.getAvailableThemes.exists.exists.error')
            logger.info('create.getAvailableThemes.exists.exists.info', { path: config.paths.moduelPath })
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
    logger.matrix(...input.create.selectThemeType.matrix)
    const message = 'Select your theme type based on the matrix above:'
    const choices = Object.values(enums.ThemeType)
    return await interfaces.select(message, choices)
}

// Main execution
async function main() {
    try {
        const availableThemes = await getAvailableThemes()
        const selectedType = (await selectThemeType()) as enums.ThemeType
        const themeOptions = formatThemeOptions(availableThemes)

        switch (selectedType) {
            case enums.ThemeType.EXISTING: {
                const base = await interfaces.select('Select a theme', themeOptions)
                await createTheme(selectedType, base)
                break
            }

            case enums.ThemeType.EXTENDED: {
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

            case enums.ThemeType.CUSTOM: {
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
