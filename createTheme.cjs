const { execSync } = require('child_process')
const path = require('path')

function createTheme(themeName, targetDir) {
    const finalTargetDir = targetDir || `${themeName}-custom`

    try {
        console.log(`Creating theme: ${themeName} at ${finalTargetDir}`)
        // Create custom theme
        execSync(`pnpm exec fc-create-theme "${themeName}" "themes/${finalTargetDir}"`, { stdio: 'inherit' })

        console.log('Generating theme list...')
        // Generate new theme list to update sidebar
        execSync('node ./generateThemeList.cjs', { stdio: 'inherit' })

        console.log('Building themes...')
        // Compile theme scripts with vite build
        execSync('vite build', { stdio: 'inherit' })

        console.log('Theme creation complete!')
    } catch (error) {
        console.error(`Error during theme creation: ${error.message}`)
        process.exit(1)
    }
}

// Extract arguments
const args = process.argv.slice(2)
const themeName = args[0]
const targetDir = args[1] // Optional second argument defines custom theme name

if (!themeName) {
    console.error('Error: Theme name is required!')
    process.exit(1)
}

createTheme(themeName, targetDir)
