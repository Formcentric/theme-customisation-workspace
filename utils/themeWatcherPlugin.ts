import { build, Plugin } from 'vite'
import { exec, execSync } from 'child_process'
import chokidar from 'chokidar'
import fs from 'fs-extra'
import path from 'path'
import transformToIIFE from './transformToIIFE'
import themeList from '../src/util/themesList.json'

/**
 * A custom Vite plugin that watches files in `src/themes`
 * and triggers the Vite build process when changes are detected.
 */
export default function themeWatcherPlugin(): Plugin {
    return {
        name: 'theme-watcher-plugin', // Name of the plugin
        apply: 'serve', // Apply only during the development server
        configureServer(server) {
            // Path to watch: all .js files in the `src` directory
            const themesDir = path.resolve('src/themes') // Path to themes directory
            const distDir = path.resolve('dist/themes') // Path to themes directory

            const buildJs = async (changedPath: string) => {
                const relativePath = path.relative(themesDir, changedPath)
                const themeName = relativePath.split('/')[0]

                const themeDir = path.join(themesDir, themeName) // Theme directory
                const inputFile = path.join(themeDir, 'script.js') // Input file
                const outputFile = path.join(themeDir, 'script.min.js') // Output file

                try {
                    console.log(`Building script for theme: ${themeName}`)

                    // Build the script.js file to script.min.js
                    await build({
                        configFile: false, // Inline configuration
                        build: {
                            outDir: themeDir,
                            target: 'es2015',
                            emptyOutDir: false,
                            rollupOptions: {
                                input: inputFile,
                                output: {
                                    format: 'cjs' as never,
                                    entryFileNames: '[name].min.js',
                                    plugins: [transformToIIFE()],
                                },
                            },
                        },
                    })

                    // Copy the output file to dist/themes/<themeName>
                    const distThemeDir = path.join(distDir, '/', themeName)

                    await fs.ensureDir(distThemeDir) // Ensure the destination directory exists
                    await fs.copyFile(outputFile, path.join(distThemeDir, 'script.js'))

                    console.log(`script.min.js for theme ${themeName} built successfully.`)
                } catch (err) {
                    console.error(`Error building script for theme ${themeName}:`, err)
                }
            }

            const buildStyles = async (changedPath: string) => {
                const relativePath = path.relative(themesDir, changedPath)
                const themeName = relativePath.split('/')[0]
                const themeDir = path.join(themesDir, themeName) // Theme directory
                const outputFile = path.join(themeDir, 'styles.css')

                try {
                    execSync(`pnpm css src/themes/${themeName}`)

                    // Ensure the destination directory exists
                    const distThemeDir = path.join(distDir, themeName)
                    await fs.ensureDir(distThemeDir)

                    // Copy the styles.css file
                    await fs.copyFile(outputFile, path.join(distThemeDir, 'styles.css'))
                    console.log(`styles.css for theme ${themeName} copied successfully.`)
                } catch (error) {
                    console.error(`Failed to build and copy styles for theme ${themeName}:`, error)
                }
            }

            const copyVariablesFile = async (changedPath: string) => {
                const relativePath = path.relative(themesDir, changedPath)
                const themeName = relativePath.split('/')[0]
                const themeDir = path.join(themesDir, themeName) // Theme directory
                const outputFile = path.join(themeDir, '_variables.json')
                const distThemeDir = path.join(distDir, themeName)

                await fs.copyFile(outputFile, path.join(distThemeDir, '_variables.json'))
            }

            // Create a watcher using chokidar
            const watcher = chokidar.watch(themesDir, {
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 200,
                    pollInterval: 100,
                },
            })

            // Watch for changes and trigger actions
            watcher.on('change', async filePath => {
                try {
                    // Changes to scss files
                    if (filePath.includes('.scss')) {
                        console.log(`File changed: ${filePath}`)
                        console.log('Building styles.css...')

                        buildStyles(filePath)
                    }

                    // Changes to template files
                    if (filePath.includes('.js') && !filePath.includes('.min.js') && !filePath.includes('.json')) {
                        console.log(`File changed: ${filePath}`)
                        console.log('Building script.js...')

                        buildJs(filePath)
                    }

                    // Changes to variables
                    if (filePath.includes('_variables.json')) {
                        console.log(`File changed: ${filePath}`)
                        console.log('Copying variables.json...')
                        copyVariablesFile(filePath)

                        // Forces a reload of the page by building the script.js again
                        buildJs(filePath)
                    }
                } catch (err) {
                    console.error('Error when recompiling', err)
                }
            })

            watcher.on('unlinkDir', async filePath => {
                const baseName = path.basename(filePath) // Get the name of the deleted directory

                if ((themeList as string[]).includes(baseName)) exec('node ./generateThemeList.cjs')
            })

            // Clean up the watcher when the server is stopped
            server.watcher.on('close', () => {
                watcher.close()
            })
        },
    }
}
