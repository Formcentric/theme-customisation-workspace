import { build, Plugin } from 'vite'
import { exec, execSync } from 'child_process'
import path from 'path'
import transformToIIFE from './transformToIIFE'
import config from '../config/formcentric.config'

export default function themeWatcherPlugin(): Plugin {
    return {
        name: 'theme-watcher-plugin',
        apply: 'serve',
        configureServer(server) {
            const themesDir = path.resolve(config.paths.targetPath)
            const distDir = path.resolve(config.paths.output)

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

            const buildTheme = async (filePath: string) => {
                try {
                    if (filePath.includes(config.paths.basePath)) return
                    const relativePath = path.relative(config.paths.targetPath, filePath)

                    const pathParts = relativePath.split(path.sep)
                    const themeName = pathParts[0]

                    if (!themeName) {
                        console.error(`Could not extract theme name from path ${filePath}`)
                        return
                    }

                    // Run prebuild first
                    execSync(`pnpm fc-utils-themes prebuild ${themeName}`, {
                        stdio: 'inherit',
                    })

                    // Then build the JS
                    await buildJs(themeName)
                } catch (err) {
                    console.error('Error when recompiling', err)
                }
            }

            let processingFolder = false
            server.watcher.on('add', async filePath => {
                if (processingFolder) return
                processingFolder = true

                if (filePath.startsWith(themesDir)) {
                    await buildTheme(filePath)
                }

                processingFolder = false
            })

            server.watcher.on('change', filePath => {
                if (filePath.startsWith(themesDir)) {
                    buildTheme(filePath)
                }
            })

            server.watcher.on('unlinkDir', async filePath => {
                const baseName = path.basename(filePath)

                try {
                    const themeList = await import('../src/util/themesList.json')
                    if ((themeList as string[]).includes(baseName)) {
                        console.log(`Theme "${baseName}" was deleted, regenerating theme list...`)
                        // First stop the server
                        await server.close()
                        // Regenerate the theme list
                        exec('pnpm fc-utils-themes list')
                        // Rebuild the server
                        await server.restart()
                    }
                } catch (error) {
                    console.error(error)
                }
            })
        },
    }
}
