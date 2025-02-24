const path = require('path')
const { fs, logger } = require('../modules/index.cjs')
const config = require('../../config/cli.config.json')

// Function to generate a list of folder names and write to a JSON file
const generateThemesList = (dirPath, outputFile) => {
    if (!fs.exists(dirPath)) {
        logger.warn(`Directory not found: ${dirPath}`)
        return
    }

    const folders = fs
        .listDirectory(dirPath)
        .filter(file => {
            const fullPath = path.join(dirPath, file)
            return fs.isDirectory(fullPath)
        })
        .filter(item => item !== 'utils')

    fs.writeFileSync(outputFile, JSON.stringify(folders, null, 2))
}

// Generate JSON files for both directories
generateThemesList(config.paths.basePath, config.output.fcThemesList)
generateThemesList(config.paths.targetPath, config.output.themesList)

logger.success('Theme lists generated successfully')
