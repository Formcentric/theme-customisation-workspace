const fs = require('fs')
const path = require('path')

const exists = path => fs.existsSync(path)

const isDirectory = path => fs.lstatSync(path).isDirectory()

const listDirectory = dirPath => fs.readdirSync(dirPath)

const createDirectory = dirPath => {
    if (!exists(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }
}

const deleteFile = filePath => {
    if (exists(filePath)) {
        fs.unlinkSync(filePath)
    }
}

const deleteFolderRecursive = folderPath => {
    if (exists(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true })
    }
}

const copyDirectoryRecursive = (srcDir, destDir) => {
    createDirectory(destDir)

    listDirectory(srcDir).forEach(entry => {
        const srcEntry = path.join(srcDir, entry)
        const destEntry = path.join(destDir, entry)

        if (isDirectory(srcEntry)) {
            copyDirectoryRecursive(srcEntry, destEntry)
        } else {
            copyFile(srcEntry, destEntry)
        }
    })
}

const copyFile = (src, dest) => {
    const destDir = path.dirname(dest)
    createDirectory(destDir)
    fs.copyFileSync(src, dest)
}

const writeFileSync = (filePath, data) => {
    const destDir = path.dirname(filePath)
    if (!exists(destDir)) {
        createDirectory(destDir)
    }
    fs.writeFileSync(filePath, data)
}

module.exports = {
    exists,
    isDirectory,
    listDirectory,
    createDirectory,
    deleteFile,
    deleteFolderRecursive,
    copyDirectoryRecursive,
    copyFile,
    writeFileSync,
}
