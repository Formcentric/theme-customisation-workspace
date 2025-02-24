import path from 'path'
import { fs, interfaces, logger, ps } from '../modules'
import config from '../../config/workspace.config'

function reset() {
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

interfaces.confirm({
    question: 'Are you sure you want to reset the workspace?',
    onYes: () => {
        reset()
        ps.spawn('pnpm', ['i'])
    },
})
