import { fs, logger, ps } from '../modules'
import config from '../../config/workspace.config.ts'
import path from 'path'
const themesDir = config.paths.targetPath
const baseDir = config.paths.basePath
const outputDir = config.paths.output
const themeConfig = config.internal.config

// get all themes
const themes = fs.listDirectory(themesDir, true)

const getVariant = (theme: string) => {
    const configPath = path.join(themesDir, theme, themeConfig)
    if (!fs.exists(configPath)) {
        return null
    }

    const config = fs.read<{ variant: string }>(configPath)
    return config?.variant
}

const getBaseTheme = (theme: string) => {
    const variant = getVariant(theme)
    if (!variant) {
        return ''
    }
    const baseThemePath = path.join(baseDir, variant)
    return baseThemePath
}

// TODO: Merge files
const merge = async (theme: string) => {
    try {
        const mergeFiles = config.variants.files
        const outputPath = path.join(outputDir, theme)
        const baseThemePath = getBaseTheme(theme)

        mergeFiles.forEach(async file => {
            const files = fs.findFilesByName(outputPath, file.name)

            // Skip if no matching files found
            if (!files || files.length === 0) {
                return
            }

            // Process each found file
            files.forEach(async filePath => {
                const baseFilePath = filePath.replace(outputPath, baseThemePath)
                const { fileContent, baseFileContent } = file.read(filePath, baseFilePath)

                // Merge files if base content exists and merge function is defined
                if (fileContent && baseFileContent) {
                    const mergedContent = file.merge(fileContent, baseFileContent)
                    file.write(filePath, mergedContent)
                }
            })
        })
    } catch (error) {
        if (error instanceof Error) {
            logger.error('prebuild.merge.known', { theme, error: error.message })
        } else {
            logger.error('prebuild.merge.unknown', { theme })
        }
        process.exit(1)
    }
}

const prebuild = async () => {
    const specificTheme = process.argv[2]

    try {
        // create dist directory if it doesn't exist
        const checkOutputPath = specificTheme ? path.join(outputDir, specificTheme) : outputDir
        if (fs.exists(checkOutputPath)) {
            fs.deleteFolderRecursive(checkOutputPath)
        }

        if (!themes || themes.length === 0) {
            logger.info('prebuild.theme.start.info', { dir: themesDir })
            process.exit(0)
        }

        themes
            .filter(theme => (specificTheme ? theme === specificTheme : true))
            .forEach(async theme => {
                try {
                    const themePath = path.join(themesDir, theme)
                    const outputPath = path.join(outputDir, theme)

                    if (!fs.exists(themePath)) {
                        logger.error('prebuild.theme.exists.theme.error', { theme })
                        return
                    }

                    const baseThemePath = getBaseTheme(theme)
                    const noMerge = !baseThemePath

                    if (baseThemePath) {
                        if (!fs.exists(baseThemePath)) {
                            logger.error('prebuild.theme.exists.base.error', { base: baseThemePath })
                            return
                        }
                        await fs.copyDirectoryRecursive(baseThemePath, outputPath)
                    }

                    await fs.copyDirectoryRecursive(themePath, outputPath, {
                        filter: (file: string) => {
                            const name = path.basename(file)
                            return !name.includes('.gitkeep') && !name.includes(themeConfig)
                        },
                        overwrite: true,
                    })

                    if (!noMerge) await merge(theme)
                    ps.spawn('pnpm', ['css', outputPath])

                    logger.success('prebuild.theme.finish.success', { theme })
                } catch (themeError) {
                    if (themeError instanceof Error) {
                        logger.error('prebuild.theme.error.known', { theme, error: themeError.message })
                    } else {
                        logger.error('prebuild.theme.error.unknown', { theme })
                    }
                    // Continue with next theme instead of stopping the entire build
                }
            })
        logger.success('prebuild.success')
    } catch (error) {
        if (error instanceof Error) {
            logger.error('prebuild.error.known', { error: error.message })
        } else {
            logger.error('prebuild.error.unknown')
        }
        process.exit(1) // Exit with error code
    }
}

prebuild()
