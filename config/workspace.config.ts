import _ from 'lodash'

export default {
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
                merge: (file: Record<string, unknown>, baseFile: Record<string, unknown>) => {
                    const customizer = (objValue: unknown, srcValue: unknown, key: string) => {
                        if (_.isArray(objValue) && key === 'parameters') {
                            return srcValue.reduce((acc: unknown[], srcItem: unknown) => {
                                const matchIndex = acc.findIndex(accItem => accItem.name === srcItem.name)
                                if (matchIndex > -1) {
                                    // If there's a matching item, deeply merge them
                                    acc[matchIndex] = _.mergeWith(acc[matchIndex], srcItem, customizer)
                                } else {
                                    // Otherwise, add the new item from the source array
                                    acc.push(srcItem)
                                }
                                return acc
                            }, _.cloneDeep(objValue))
                        }
                    }

                    return _.mergeWith({}, baseFile, file, customizer)
                },
            },
            {
                name: '_variables.json',
                merge: (file: Record<string, string>, baseFile: Record<string, string>) => {
                    return {
                        ...baseFile,
                        ...file,
                    }
                },
            },
            {
                name: '_fc-variables.scss',
                merge: (file: string, baseFile: string) => {
                    // TODO: Implement merge logic
                    return file
                },
            },
            {
                name: '_variables.scss',
                merge: (file: string, baseFile: string) => {
                    // TODO: Implement merge logic
                    return file
                },
            },
            {
                name: 'styles.scss',
                merge: (file: string, baseFile: string) => {
                    // TODO: Implement merge logic
                    return file
                },
            },
            {
                name: 'index.js',
                merge: (file: string, baseFile: string) => {
                    // TODO: Implement merge logic
                    return file
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
