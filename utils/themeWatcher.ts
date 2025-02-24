import { build, Plugin } from 'vite'
import { exec, execSync } from 'child_process'
import chokidar from 'chokidar'
import path from 'path'
import transformToIIFE from './transformToIIFE'
import themeList from '../src/util/themesList.json'
import config from '../config/workspace.config'

export default function themeWatcherPlugin(): Plugin {
    return {
        name: 'theme-watcher-plugin',
        apply: 'serve',
        configureServer(server) {
            const themesDir = path.resolve(config.paths.targetPath)
            const distDir = path.resolve(config.paths.output)

            let buildTimeout: NodeJS.Timeout | null = null
            let isProcessing = false

            const buildJs = async (themeName: string) => {
                const distThemeDir = path.join(distDir, themeName)
                const inputFile = path.join(distThemeDir, 'script.js')

                try {
                    console.log(`Building script for theme: ${themeName}`)
                    await build({
                        configFile: false,
                        build: {
                            outDir: distThemeDir,
                            target: 'es2015',
                            emptyOutDir: false,
                            rollupOptions: {
                                input: inputFile,
                                output: {
                                    format: 'cjs' as never,
                                    entryFileNames: '[name].js',
                                    plugins: [transformToIIFE()],
                                },
                            },
                        },
                    })
                } catch (err) {
                    console.error(`Error building script for theme ${themeName}:`, err)
                }
            }

            const watcher = chokidar.watch(themesDir, {
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 2000,
                    pollInterval: 100,
                },
            })

            const buildTheme = async (filePath: string) => {
                // Clear any pending timeout
                if (buildTimeout) {
                    clearTimeout(buildTimeout)
                }

                // If already processing, don't queue another build
                if (isProcessing) {
                    return
                }

                console.log('change', filePath)

                buildTimeout = setTimeout(async () => {
                    try {
                        isProcessing = true
                        const relativePath = path.relative(config.paths.targetPath, filePath)
                        const pathParts = relativePath.split(path.sep)
                        const themeName = pathParts[0]

                        if (!themeName) {
                            console.error(`Could not extract theme name from path ${filePath}`)
                            return
                        }

                        // Run prebuild first
                        execSync(`pnpm tsx cli/scripts/prebuild.ts ${themeName}`, {
                            stdio: 'inherit',
                        })

                        // Then build the JS
                        await buildJs(themeName)
                    } catch (err) {
                        console.error('Error when recompiling', err)
                    } finally {
                        isProcessing = false
                        buildTimeout = null
                    }
                }, 500) // 500ms debounce
            }

            watcher.on('add', buildTheme)

            watcher.on('change', buildTheme)

            watcher.on('unlinkDir', async filePath => {
                const baseName = path.basename(filePath) // Get the name of the deleted directory

                if ((themeList as string[]).includes(baseName)) {
                    console.log(`Theme "${baseName}" was deleted, regenerating theme list...`)
                    // First stop the server
                    await server.close()
                    // Regenerate the theme list
                    exec('pnpm tsx cli/scripts/generateThemeList.ts')
                    // Rebuild the server
                    await server.restart()
                }
            })

            // Clean up the watcher when the server is stopped
            server.watcher.on('close', () => {
                watcher.close()
            })
        },
    }
}
