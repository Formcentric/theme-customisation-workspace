const fs = require('fs')
const path = require('path')

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const currentPath = path.join(folderPath, file)
            if (fs.lstatSync(currentPath).isDirectory()) {
                deleteFolderRecursive(currentPath)
            } else {
                fs.unlinkSync(currentPath)
            }
        })
        fs.rmdirSync(folderPath)
    }
}

function resetApp() {
    // List of files and folders to delete
    const pathsToDelete = [
        'node_modules',
        'src/fc-themes',
        'src/assets/formcentric.js',
        'src/assets/formapp.js',
        'src/util/fcThemesList.json',
        'src/util/themesList.json',
        'dist',
    ]

    // Delete specified files and folders
    pathsToDelete.forEach(target => {
        const targetPath = path.resolve(__dirname, target)
        if (fs.existsSync(targetPath)) {
            if (fs.lstatSync(targetPath).isDirectory()) {
                deleteFolderRecursive(targetPath)
            } else {
                fs.unlinkSync(targetPath)
            }
            console.log(`Deleted: ${target}`)
        } else {
            console.log(`Not found: ${target}`)
        }
    })

    // Clean subfolders in src/themes but keep src/themes and .gitkeep
    const themesPath = path.resolve(__dirname, 'src/themes')
    if (fs.existsSync(themesPath)) {
        fs.readdirSync(themesPath).forEach(file => {
            const currentPath = path.join(themesPath, file)
            if (fs.lstatSync(currentPath).isDirectory()) {
                deleteFolderRecursive(currentPath)
            } else if (file !== '.gitkeep') {
                fs.unlinkSync(currentPath)
            }
        })
        console.log(`Cleaned: src/themes (kept .gitkeep)`)
    } else {
        console.log(`Not found: src/themes`)
    }

    console.log('Reset script completed.')
}

resetApp()
