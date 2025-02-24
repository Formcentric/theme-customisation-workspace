import { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import config from '../config/workspace.config'
import { execSync } from 'child_process'
export default function buildPlugin(): Plugin {
    return {
        name: 'build-plugin',
        apply: 'build',
        async buildStart() {
            const themesDir = path.resolve(config.paths.targetPath)

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

            // Check each subfolder for required files
            const requiredFiles = ['script.js']
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
            try {
                execSync('npx tsx cli/scripts/prebuild.ts', { stdio: 'inherit' })
            } catch (error) {
                console.error('Error during build:', error)
                process.exit(1)
            }
        },
    }
}
