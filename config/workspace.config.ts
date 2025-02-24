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
                    return _.mergeWith({}, baseFile, file, (objValue, srcValue) => {
                        if (Array.isArray(objValue)) {
                            if (objValue[0]?.name) {
                                return _.unionBy(objValue, srcValue, 'name')
                            } else if (objValue[0]?.src) {
                                return _.unionBy(objValue, srcValue, 'src')
                            }
                            return srcValue
                        }
                    })
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
                merge: (file, baseFile) => {
                    // TODO: Implement merge logic
                    return file
                },
            },
            {
                name: 'styles.scss',
                merge: (file, baseFile) => {
                    // TODO: Implement merge logic
                    return file
                },
            },
            {
                name: 'index.js',
                merge: (file, baseFile) => {
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
