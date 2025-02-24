import fs from 'fs'
import fsex from 'fs-extra'
import path from 'path'

const exists = (path: string) => fs.existsSync(path)

const isDirectory = (path: string) => fs.lstatSync(path).isDirectory()

const listDirectory = (dirPath: string, isDir = false) => {
    const files = fs.readdirSync(dirPath)
    if (isDir) {
        return files.filter(file => isDirectory(path.join(dirPath, file)))
    }
    return files
}

const createDirectory = (dirPath: string) => {
    if (!exists(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }
}

const deleteFile = (filePath: string) => {
    if (exists(filePath)) {
        fs.unlinkSync(filePath)
    }
}

const cleanDirectory = (dirPath: string, preserveFiles: string[] = []) => {
    if (exists(dirPath)) {
        listDirectory(dirPath).forEach((file: string) => {
            const currentPath = path.join(dirPath, file)
            if (!preserveFiles.includes(file)) {
                if (isDirectory(currentPath)) {
                    deleteFolderRecursive(currentPath)
                } else {
                    deleteFile(currentPath)
                }
            }
        })
        return true
    }
    return false
}

const deleteFolderRecursive = (folderPath: string) => {
    if (exists(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true })
    }
}

const copyDirectoryRecursive = (srcDir: string, destDir: string, options: fsex.CopyOptions = {}) =>
    fsex.copy(srcDir, destDir, options)

const copyFile = (src: string, dest: string) => {
    const destDir = path.dirname(dest)
    createDirectory(destDir)
    fs.copyFileSync(src, dest)
}

const writeFileSync = (filePath: string, data: string | null) => {
    if (!data) return

    const destDir = path.dirname(filePath)
    if (!exists(destDir)) {
        createDirectory(destDir)
    }

    fs.writeFileSync(filePath, data)
}

const findFilesByName = (dirPath: string, fileName: string) => {
    const results: string[] = []

    const searchRecursively = (currentPath: string) => {
        if (!exists(currentPath)) return

        const files = fs.readdirSync(currentPath)

        files.forEach(file => {
            const fullPath = path.join(currentPath, file)

            if (isDirectory(fullPath)) {
                searchRecursively(fullPath)
            } else if (file === fileName) {
                results.push(fullPath)
            }
        })
    }

    searchRecursively(dirPath)
    return results
}

const read = <T = string | Record<string, unknown>>(filePath: string): T | null => {
    if (!exists(filePath)) {
        return null
    }

    const content = fs.readFileSync(filePath, 'utf8')

    if (filePath.endsWith('.json')) {
        return JSON.parse(content)
    }

    return content as T
}

export default {
    exists,
    isDirectory,
    listDirectory,
    createDirectory,
    deleteFile,
    cleanDirectory,
    deleteFolderRecursive,
    copyDirectoryRecursive,
    copyFile,
    writeFileSync,
    read,
    findFilesByName,
}
