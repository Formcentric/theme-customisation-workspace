const path = require('path')
const { logger, fs, ps } = require('../modules/index.cjs')
const config = require('../../config/cli.config.json')

async function createTheme(themeName, targetDir) {
    const finalTargetDir = targetDir || `${themeName}-custom`
    const baseThemePath = path.join(config.paths.basePath, themeName)
    const themePath = path.join(config.paths.targetPath, finalTargetDir)

    if (fs.exists(themePath)) {
        logger.error(`The theme directory "src/themes/${finalTargetDir}" already exists!`)
        logger.info('If you want to create a different theme, choose a unique name or delete the existing directory.')
        process.exit(0)
    }

    try {
        logger.info(`Creating theme: ${themeName} at ${finalTargetDir}`)
        fs.copyDirectoryRecursive(baseThemePath, themePath)

        logger.info('Generating theme list...')
        await ps.spawn('node', ['cli/scripts/generateThemeList.cjs'])

        await ps.spawn('vite', ['build'])
        logger.success('Theme creation complete!')
    } catch (error) {
        logger.error(`Error during theme creation: ${error.message}`)
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
