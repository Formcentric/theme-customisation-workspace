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
            logger.success('reset.delete.success', { target })
        } else {
            logger.warn('reset.delete.warn', { target })
        }
    })

    // Clean themes directory but keep .gitkeep
    const emptyPaths = [config.paths.basePath, config.paths.targetPath]
    emptyPaths.forEach(path => {
        if (fs.cleanDirectory(path, ['.gitkeep'])) {
            logger.success('reset.clean.success', { path })
        } else {
            logger.warn('reset.clean.warn', { path })
        }
    })

    logger.success('reset.success')
}

interfaces.confirm('reset.confirm').then(confirmed => {
    if (confirmed) {
        reset()
        ps.spawn('pnpm', ['i'])
    }
})
