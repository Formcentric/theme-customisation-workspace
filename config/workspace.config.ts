import _ from 'lodash'
import { fs } from '../cli/modules'

const WorkspaceConfig: WorkspaceConfig.Config = {
    assets: [
        {
            src: 'node_modules/@formcentric/client',
            dest: 'src/assets',
        },
    ],
    paths: {
        rootPath: '.',
        configPath: 'config/cli.config.tson',
        moduelPath: 'node_modules/@formcentric/client/dist/themes',
        basePath: 'src/themes-base',
        targetPath: 'src/themes',
        utilsPath: 'node_modules/@formcentric/client/dist/themes/utils',
        prettierConfigPath: '.prettierrc',
        output: 'dist',
    },
    variants: {
        config: 'config.json',
        files: [
            {
                name: 'definition.json',
                read: (filePath, baseFilePath) => {
                    const fileContent = fs.read<Record<string, unknown>>(filePath)
                    const baseFileContent = fs.read<Record<string, unknown>>(baseFilePath)

                    return { fileContent, baseFileContent }
                },
                merge: (file, baseFile) => {
                    if (typeof file !== 'object' || typeof baseFile !== 'object') {
                        return file
                    }

                    const customizer = <T extends { name: string }>(objValue: T[], srcValue: T[]) => {
                        if (_.isArray(objValue) && _.isArray(srcValue)) {
                            return srcValue.reduce((acc: T[], srcItem: T) => {
                                const matchIndex = acc.findIndex(accItem => accItem.name === srcItem.name)
                                if (matchIndex > -1) {
                                    acc[matchIndex] = _.mergeWith(acc[matchIndex], srcItem, customizer)
                                } else {
                                    acc.push(srcItem)
                                }
                                return acc
                            }, _.cloneDeep(objValue))
                        }
                    }

                    return _.mergeWith({}, baseFile, file, customizer)
                },
                write: (filePath, content) => {
                    fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
                },
            },
            {
                name: '_variables.json',
                read: (filePath, baseFilePath) => {
                    const fileContent = fs.read<Record<string, string>>(filePath)
                    const baseFileContent = fs.read<Record<string, string>>(baseFilePath)

                    return { fileContent, baseFileContent }
                },
                merge: (file, baseFile) => {
                    return {
                        ...baseFile,
                        ...file,
                    }
                },
                write: (filePath, content) => {
                    fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
                },
            },
            {
                name: '_fc-variables.scss',
                read: (filePath, baseFilePath) => {
                    const fileContent = fs.read<string>(filePath)
                    const baseFileContent = fs.read<string>(baseFilePath)

                    return { fileContent, baseFileContent }
                },
                merge: (file, baseFile) => {
                    if (!file || !baseFile) return file || baseFile

                    const targetLines = file.split('\n')
                    const sourceLines = baseFile.split('\n').filter(line => !file.includes(line.trim().split(':')[0]))

                    const mergedContent = targetLines.concat(sourceLines).join('\n')

                    return mergedContent
                },
                write: (filePath, content) => {
                    fs.writeFileSync(filePath, content)
                },
            },
            {
                name: '_variables.scss',
                read: (filePath: string, baseFilePath: string) => {
                    const fileContent = fs.read<string>(filePath)
                    const baseFileContent = fs.read<string>(baseFilePath)

                    return { fileContent, baseFileContent }
                },
                merge: (file, baseFile) => {
                    if (!file || !baseFile) return file || baseFile

                    const targetLines = file.split('\n')
                    const sourceLines = baseFile.split('\n').filter(line => !file.includes(line.trim().split(':')[0]))

                    const mergedContent = targetLines.concat(sourceLines).join('\n')

                    return mergedContent
                },
                write: (filePath, content) => {
                    fs.writeFileSync(filePath, content)
                },
            },
            {
                name: 'styles.scss',
                read: (filePath, baseFilePath) => {
                    const fileContent = fs.read<string>(filePath)
                    const baseFileContent = fs.read<string>(baseFilePath)

                    return { fileContent, baseFileContent }
                },
                merge: (file, baseFile) => {
                    if (!file || !baseFile) return file || baseFile

                    const targetLines = file.split('\n')
                    const sourceLines = baseFile.split('\n').filter(line => !file.includes(line.trim().split(':')[0]))

                    const mergedContent = targetLines.concat(sourceLines).join('\n')

                    return mergedContent
                },
                write: (filePath, content) => {
                    fs.writeFileSync(filePath, content)
                },
            },
            {
                name: 'index.js',
                read: (filePath, baseFilePath) => {
                    const fileContent = fs.read<string>(filePath)
                    const baseFileContent = fs.read<string>(baseFilePath)

                    return { fileContent, baseFileContent }
                },
                merge: (file, baseFile) => {
                    if (!file || !baseFile) return file || baseFile

                    const parseContent = (content: string) => {
                        const imports = new Set()
                        const exports = new Set()

                        // Get all imports
                        const importMatches = content.matchAll(/import { (\w+) } from '(\.\/\w+)'/g)
                        for (const match of importMatches) {
                            imports.add(match[0])
                        }

                        // Get exports
                        const exportMatch = content.match(/export default {([\s\S]*?)}/)
                        if (exportMatch) {
                            const exportItems = exportMatch[1]
                                .split(',')
                                .map(exp => exp.trim())
                                .filter(Boolean)
                            exportItems.forEach(exp => exports.add(exp))
                        }

                        return { imports, exports }
                    }

                    const { imports: sourceImports, exports: sourceExports } = parseContent(baseFile)
                    const { imports: targetImports, exports: targetExports } = parseContent(file)

                    // Combine imports and exports
                    const allImports = new Set([...targetImports, ...sourceImports])
                    const allExports = new Set([...targetExports, ...sourceExports])

                    // Reconstruct the file
                    const mergedImports = [...allImports].join('\n')
                    const mergedExports = `export default {\n    ${[...allExports].join(',\n    ')}\n}`

                    return `${mergedImports}\n\n${mergedExports}`
                },
                write: (filePath, content) => {
                    fs.writeFileSync(filePath, content)
                },
            },
        ],
    },
    output: {
        fcThemesList: 'src/util/fcThemesList.json',
        themesList: 'src/util/themesList.json',
    },
    reset: {
        paths: ['node_modules', 'src/util/fcThemesList.json', 'src/util/themesList.json', 'dist'],
    },
}

export default WorkspaceConfig
