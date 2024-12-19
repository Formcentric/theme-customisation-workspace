const fs = require('fs-extra')
const path = require('path')
const { sync } = require('glob')

const themesDir = path.join(__dirname, 'src/themes')
const distThemesDir = path.join(__dirname, 'dist/themes')

async function preprocess() {
    try {
        // copy themes to dist folder
        await fs.remove(distThemesDir)
        await fs.copy(themesDir, distThemesDir, {
            filter: src => {
                // Exclude .gitkeep
                return !src.endsWith('.gitkeep')
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
