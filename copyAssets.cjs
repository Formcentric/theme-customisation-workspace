const fs = require('fs')
const path = require('path')

const assetsToCopy = [
    {
        src: 'node_modules/@formcentric/client/dist/formapp.js',
        dest: 'src/assets/formapp.js',
    },
    {
        src: 'node_modules/@formcentric/client/dist/formcentric.js',
        dest: 'src/assets/formcentric.js',
    },
    {
        src: 'node_modules/@formcentric/client/dist/themes',
        dest: 'src/fc-themes',
    },
]

function copyAssets() {
    console.log('Starting asset copy process...')

    assetsToCopy.forEach(({ src, dest }) => {
        const srcPath = path.resolve(src)
        const destPath = path.resolve(dest)

        if (!fs.existsSync(srcPath)) {
            console.error(`Source path does not exist: ${srcPath}`)
            process.exit(1)
        }

        if (fs.lstatSync(srcPath).isDirectory()) {
            // Copy directories recursively
            copyDirectoryRecursive(srcPath, destPath)
        } else {
            // Ensure parent directory exists
            const destDir = path.dirname(destPath)
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true })
            }

            // Copy file
            fs.copyFileSync(srcPath, destPath)
        }
    })

    console.log('Asset copy process completed.')
}

function copyDirectoryRecursive(srcDir, destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
    }

    fs.readdirSync(srcDir).forEach(entry => {
        const srcEntry = path.join(srcDir, entry)
        const destEntry = path.join(destDir, entry)

        if (fs.lstatSync(srcEntry).isDirectory()) {
            // Recurse for subdirectories
            copyDirectoryRecursive(srcEntry, destEntry)
        } else {
            // Copy files
            fs.copyFileSync(srcEntry, destEntry)
        }
    })
}

copyAssets()
