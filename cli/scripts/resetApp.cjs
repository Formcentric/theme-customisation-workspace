const path = require('path')
const { fs, logger } = require('../modules/index.cjs')
const config = require('../../config/cli.config.cjs')

function resetApp() {
    // Delete specified files and folders
    config.reset.paths.forEach(target => {
        const targetPath = path.resolve(target)
        if (fs.exists(targetPath)) {
            if (fs.isDirectory(targetPath)) {
                fs.deleteFolderRecursive(targetPath)
            } else {
                fs.deleteFile(targetPath)
            }
            logger.success(`Deleted: ${target}`)
        } else {
            logger.warn(`Not found: ${target}`)
        }
    })

    // Clean themes directory but keep .gitkeep
    const themesPath = config.paths.targetPath
    if (fs.exists(themesPath)) {
        fs.listDirectory(themesPath).forEach(file => {
            const currentPath = path.join(themesPath, file)
            if (file !== '.gitkeep') {
                if (fs.isDirectory(currentPath)) {
                    fs.deleteFolderRecursive(currentPath)
                } else {
                    fs.deleteFile(currentPath)
                }
            }
        })
        logger.success(`Cleaned: src/themes (kept .gitkeep)`)
    } else {
        logger.warn(`Not found: src/themes`)
    }

    logger.success('Reset completed')
}

resetApp()
