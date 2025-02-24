import { logger, fs } from '../modules'
import config from '../../config/workspace.config'
import path from 'path'

const update = async () => {
    logger.info('update.start.info')

    const themes = fs.listDirectory(config.paths.basePath, true)

    if (themes.length === 0) {
        logger.info('update.start.exit', { basePath: config.paths.basePath })
        return
    } else {
        logger.info('update.start.continue', { themes: themes.join('\n'), basePath: config.paths.basePath })
    }

    const updateErrors: string[] = []

    await Promise.all(
        themes.map(async theme => {
            logger.info('update.processing.info', { theme })

            try {
                const baseThemePath = path.join(config.paths.basePath, theme)
                const moduleThemePath = path.join(config.paths.moduelPath, theme)

                if (fs.isDirectory(baseThemePath)) {
                    fs.cleanDirectory(baseThemePath)
                    await fs.copyDirectoryRecursive(moduleThemePath, baseThemePath)
                }

                logger.success('update.processing.success', { theme })
            } catch (error) {
                if (error instanceof Error) {
                    logger.error('update.processing.error', { theme, error: error.message })
                    updateErrors.push(theme)
                }
            }
        }),
    )

    if (updateErrors.length > 0) {
        logger.warn('update.finish.error', { errorCount: updateErrors.join('\n') })
    } else {
        logger.success('update.finish.success')
    }

    logger.warn('update.finish.todo')
}

update()
