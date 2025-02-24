import path from 'path'
import { fs, logger } from '../modules'
import config from '../../config/workspace.config'

function copyAssets() {
    logger.info('Starting asset copy process...')

    config.assets.forEach(({ src, dest }) => {
        const srcPath = path.resolve(src)
        const destPath = path.resolve(dest)

        if (!fs.exists(srcPath)) {
            logger.error(`Path does not exist: ${srcPath}`)
            process.exit(1)
        }

        if (fs.isDirectory(srcPath)) {
            fs.copyDirectoryRecursive(srcPath, destPath)
        } else {
            fs.copyFile(srcPath, destPath)
        }
    })

    logger.success('Asset copy process completed.')
}

copyAssets()
