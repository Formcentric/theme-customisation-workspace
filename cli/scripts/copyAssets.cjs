const path = require('path')
const { fs, logger } = require('../modules/index.cjs')
const config = require('../../config/cli.config.cjs')

function copyAssets() {
    logger.info('Starting asset copy process...')

    config.assets.forEach(({ src, dest }) => {
        const srcPath = path.resolve(src)
        const destPath = path.resolve(dest)

        if (!fs.exists(srcPath)) {
            logger.error(`Source path does not exist: ${srcPath}`)
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
