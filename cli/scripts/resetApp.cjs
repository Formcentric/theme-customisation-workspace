const path = require('path')
const { fs, logger } = require('../modules/index.cjs')
const config = require('../../config/cli.config.json')

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
    const emptyPaths = [config.paths.basePath, config.paths.targetPath]
    emptyPaths.forEach(path => {
        if (fs.cleanDirectory(path, ['.gitkeep'])) {
            logger.success(`Cleaned: ${path} (kept .gitkeep)`)
        } else {
            logger.warn(`Not found: ${path}`)
        }
    })

    logger.success('Reset completed')
}

resetApp()
