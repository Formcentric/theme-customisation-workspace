import { fs, logger, ps } from '../modules'
import config from '../../config/workspace.config.ts'
import path from 'path'
const themesDir = config.paths.targetPath
const baseDir = config.paths.basePath
const outputDir = config.paths.output

const themeConfig = 'config.json'
// get all themes
const themes = fs.listDirectory(themesDir, true)

const getVariant = (theme: string) => {
    const configPath = path.join(themesDir, theme, themeConfig)
    if (!fs.exists(configPath)) {
        logger.info(`Config file not found for theme ${theme}: ${configPath}`)
    }

    const config = fs.read<{ variant: string }>(configPath)
    return config?.variant || null
}

const getBaseTheme = (theme: string) => {
    const variant = getVariant(theme)
    if (!variant) {
        logger.error(`Variant not found for theme ${theme}`)
        return ''
    }
    const baseThemePath = path.join(baseDir, variant)
    return baseThemePath || ''
}

// TODO: Merge files
// const merge = async theme => {
//     try {
//         const mergeFiles = config.variants.files
//         const outputPath = path.join(outputDir, theme)
//         const baseThemePath = getBaseTheme(theme)

//         mergeFiles.forEach(async file => {
//             const files = fs.findFilesByName(outputPath, file.name)

//             // Skip if no matching files found
//             if (!files || files.length === 0) {
//                 logger.info(`No ${file.name} files found for theme ${theme}`)
//                 return
//             }

//             // Get the base file content if it exists
//             const baseFilePath = path.join(baseThemePath, file.name)
//             let baseFileContent = null
//             if (fs.exists(baseFilePath)) {
//                 baseFileContent = fs.readFile(baseFilePath)
//                 // Parse JSON files
//                 if (file.name.endsWith('.json')) {
//                     baseFileContent = JSON.parse(baseFileContent)
//                 }
//             }

//             // Process each found file
//             files.forEach(async filePath => {
//                 const baseFilePath = filePath.replace(outputPath, baseThemePath)
//                 let baseFileContent = fs.readFile(baseFilePath)
//                 let content = fs.readFile(filePath)
//                 // Parse JSON files
//                 if (file.name.endsWith('.json')) {
//                     baseFileContent = JSON.parse(baseFileContent)
//                     content = JSON.parse(content)
//                 }

//                 // Merge files if base content exists and merge function is defined
//                 if (baseFileContent && file.merge) {
//                     content = file.merge(content, baseFileContent)

//                     // Write back merged content
//                     if (typeof content === 'object') {
//                         content = JSON.stringify(content, null, 2)
//                     }
//                     fs.writeFile(filePath, content)
//                     logger.success(`Merged ${file.name} for theme ${theme}`)
//                 }
//             })
//         })
//     } catch (error) {
//         logger.error(`Error merging theme ${theme}:`, error.message)
//         process.exit(1)
//     }
// }

const prebuild = async () => {
    try {
        // create dist directory if it doesn't exist
        if (fs.exists(outputDir)) {
            fs.deleteFolderRecursive(outputDir)
        }

        if (!themes || themes.length === 0) {
            logger.info(`No themes found in directory: ${themesDir}. Skipping build...`)
            process.exit(0)
        }

        themes.forEach(async theme => {
            try {
                const themePath = path.join(themesDir, theme)
                const outputPath = path.join(outputDir, theme)
                const configPath = path.join(themePath, themeConfig)

                if (!fs.exists(themePath)) {
                    logger.error(`Theme directory not found: ${themePath}`)
                    return
                }

                if (!fs.exists(configPath)) {
                    logger.error(`Config file not found for theme ${theme}: ${configPath}`)
                    return
                }

                const baseThemePath = getBaseTheme(theme)

                if (baseThemePath) {
                    if (!fs.exists(baseThemePath)) {
                        logger.error(`Variant theme not found: ${baseThemePath}`)
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

                ps.spawn('pnpm', ['css', outputPath])

                // await merge(theme)
                logger.success(`Successfully built theme: ${theme}`)
            } catch (themeError) {
                if (themeError instanceof Error) {
                    logger.error(`Error processing theme ${theme}:`, themeError.message)
                } else {
                    logger.error(`An unknown error occurred while processing theme ${theme}`)
                }
                // Continue with next theme instead of stopping the entire build
            }
        })
        console.log('Build process completed')
    } catch (error) {
        console.error('Build process failed:', error)
        process.exit(1) // Exit with error code
    }
}

prebuild()
