import { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import fsex from 'fs-extra'
import config from '../config/cli.config.json'
import { execSync } from 'child_process'
export default function buildPlugin(): Plugin {
    return {
        name: 'build-plugin',
        apply: 'build',
        async buildStart() {
            const themesDir = path.resolve(config.paths.targetPath)
            const outputDir = path.resolve(config.paths.output)

            // Check if themes directory exists
            if (!fs.existsSync(themesDir)) {
                console.log('Themes directory does not exist. Skipping Vite build...')
                process.exit(0) // Exit successfully
            }

            // Get subdirectories
            const subfolders = fs
                .readdirSync(themesDir, { withFileTypes: true })
                .filter(entry => entry.isDirectory())
                .map(entry => path.join(themesDir, entry.name)) // Get full paths
            const themes = subfolders.map(folder => path.basename(folder))

            // Check each subfolder for required files
            const requiredFiles = ['script.js', 'styles.css']
            const invalidFolders = subfolders.filter(folder => {
                return !requiredFiles.every(file => fs.existsSync(path.join(folder, file)))
            })

            if (subfolders.length === 0) {
                console.log('No custom themes found. Skipping Vite build...')
                process.exit()
            }

            if (invalidFolders.length > 0) {
                if (invalidFolders.length > 0) {
                    console.log(
                        'Your themes folder contains invalid themes. The following folders are missing required files:',
                    )
                    invalidFolders.forEach(folder => console.log(`- ${folder}`))
                }
            }

            // copy themes to dist folder
            await fsex.remove(outputDir)
            await fsex.copy(themesDir, outputDir, {
                filter: src => {
                    // Exclude .gitkeep and script.min.js
                    return !src.endsWith('.gitkeep') || !src.endsWith('script.min.js')
                },
            })
            themes.forEach(theme => {
                execSync(`pnpm css ${path.resolve(config.paths.output, theme)}`)
            })
        },
    }
}
