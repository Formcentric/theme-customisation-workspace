import { Plugin } from 'vite'
import { exec, execSync } from 'child_process'
import path from 'path'
import themeList from '../src/util/themesList.json'
import config from '../config/workspace.config'

export default function themeWatcherPlugin(): Plugin {
    return {
        name: 'theme-watcher-plugin',
        apply: 'serve',
        configureServer(server) {
            server.watcher.add([config.paths.targetPath])
            server.watcher.on('change', async filePath => {
                if (filePath.includes(config.paths.targetPath)) {
                    try {
                        execSync('pnpm build')
                    } catch (err) {
                        console.error('Error during theme recompilation', err)
                    }
                }
            })

            server.watcher.on('unlinkDir', async filePath => {
                const baseName = path.basename(filePath)

                if ((themeList as string[]).includes(baseName)) {
                    exec('pnpm tsx ./cli/scripts/generateThemeList.cjs')
                }
            })
        },
    }
}
