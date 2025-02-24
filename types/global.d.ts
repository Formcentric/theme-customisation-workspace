declare namespace WorkspaceConfig {
    interface FileHandler<T, U = T> {
        name: string
        read: (
            filePath: string,
            baseFilePath: string,
        ) => {
            fileContent: T | null
            baseFileContent: U | null
        }
        merge: (file: T, baseFile: U) => T
        write: (filePath: string, content: T) => void
    }

    interface CustomFileHandler<T, U = T> {
        name: string
        create: (filePath: string) => void
    }

    interface Config {
        paths: {
            rootPath: string
            configPath: string
            moduelPath: string
            basePath: string
            targetPath: string
            utilsPath: string
            prettierConfigPath: string
            output: string
        }
        output: {
            fcThemesList: string
            themesList: string
        }
        internal: {
            config: string
        }
        variants: {
            files: FileHandler<unknown>[]
        }
        custom: {
            files: CustomFileHandler<unknown>[]
        }
        reset: {
            paths: string[]
        }
    }
}

declare namespace Theme {
    interface Definition {
        schemaVersion: number
        theme: string
        labels: LocalizedStrings
        descriptions: LocalizedStrings
        groups: Group[]
        sources: Source[]
    }

    interface LocalizedStrings {
        de: string
        en: string
    }

    interface Group {
        name: string
        labels: LocalizedStrings
        parameters: Parameter[]
    }

    interface BaseParameter {
        type: 'COLOR' | 'IMAGE' | 'TEXT'
        required?: boolean
        name: string
        labels: LocalizedStrings
        descriptions?: LocalizedStrings
        value: string
    }

    type Parameter = BaseParameter

    interface Source {
        type: 'IMAGE' | 'FONT'
        src: string
    }
}
