import path from 'path'
import { logger, fs, ps } from '../modules'
import config from '../../config/workspace.config'

async function createTheme(themeName: string, targetDir: string) {
    const finalTargetDir = targetDir || `${themeName}-custom`
    const moduleThemePath = path.join(config.paths.moduelPath, themeName)
    const baseThemePath = path.join(config.paths.basePath, themeName)
    const themePath = path.join(config.paths.targetPath, finalTargetDir)
    const templateEntry = path.join(config.paths.utilsPath, 'templateEntry.js')
    const variantConfig = path.join(themePath, config.variants.config)

    if (fs.exists(themePath)) {
        logger.error(`The theme directory "src/themes/${finalTargetDir}" already exists!`)
        logger.info('If you want to create a different theme, choose a unique name or delete the existing directory.')
        process.exit(0)
    }

    try {
        logger.info(`Creating theme: ${themeName} at ${finalTargetDir}`)
        await fs.copyDirectoryRecursive(moduleThemePath, baseThemePath)
        await fs.copyDirectoryRecursive(baseThemePath, themePath, {
            filter: file => {
                const fileName = path.basename(file)
                const isDir = fs.isDirectory(file)

                return isDir || config.variants.files.map(file => file.name).includes(fileName)
            },
        })
        fs.writeFileSync(variantConfig, JSON.stringify({ variant: themeName }, null, 2))
        fs.copyFile(templateEntry, path.join(themePath, 'script.js'))

        logger.info('Generating theme list...')
        await ps.spawn('pnpm', ['tsx', 'cli/scripts/generateThemeList.ts'])

        logger.success('Theme creation complete!')
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message)
        } else {
            logger.error('An unknown error occurred')
        }
        process.exit(1)
    }
}

const args = process.argv.slice(2)
const themeName = args[0]
const targetDir = args[1]

if (!themeName) {
    logger.error('Error: Theme name is required!')
    process.exit(1)
}

createTheme(themeName, targetDir)
