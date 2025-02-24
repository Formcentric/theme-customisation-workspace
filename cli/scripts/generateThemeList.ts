import path from 'path'
import { fs, logger } from '../modules'
import config from '../../config/workspace.config'

// Function to generate a list of folder names and write to a JSON file
const generateThemesList = (dirPath: string, outputFile: string) => {
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
const themeList = async () => {
    try {
        generateThemesList(config.paths.moduelPath, config.output.fcThemesList)
        generateThemesList(config.paths.targetPath, config.output.themesList)
        logger.success('Theme list generated successfully')
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message)
        } else {
            logger.error('An unknown error occurred')
        }
    }
}

themeList()
