export default {
    exists: () => false,
    isDirectory: () => false,
    listDirectory: () => [],
    createDirectory: () => {},
    deleteFile: () => {},
    cleanDirectory: () => false,
    deleteFolderRecursive: () => {},
    copyDirectoryRecursive: () => Promise.resolve(),
    copyFile: () => {},
    writeFileSync: () => {},
    read: () => null,
    findFilesByName: () => [],
}
