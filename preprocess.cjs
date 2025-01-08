const fs = require('fs-extra')
const path = require('path')

const themesDir = path.join(__dirname, 'src/themes')
const distThemesDir = path.join(__dirname, 'dist/themes')

async function preprocess() {
    try {
        // copy themes to dist folder
        await fs.remove(distThemesDir)
        await fs.copy(themesDir, distThemesDir, {
            filter: src => {
                // Exclude .gitkeep and script.min.js
                return !src.endsWith('.gitkeep') || !src.endsWith('script.min.js')
            },
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}

preprocess()
    .then(() => {
        process.exit(0)
    })
    .catch(() => {
        process.exit(1)
    })
