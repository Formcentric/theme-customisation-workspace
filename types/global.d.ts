declare namespace WorkspaceConfig {
    interface JsonFileHandler {
        name: 'definition.json' | '_variables.json'
        read: (
            filePath: string,
            baseFilePath: string,
        ) => {
            fileContent: Record<string, unknown> | null
            baseFileContent: Record<string, unknown> | null
        }
        merge: (
            file: Record<string, unknown> | null,
            baseFile: Record<string, unknown> | null,
        ) => Record<string, unknown> | null
        write: (filePath: string, content: Record<string, unknown> | null) => void
    }

    interface TextFileHandler {
        name: '_fc-variables.scss' | '_variables.scss' | 'styles.scss' | 'index.js'
        read: (
            filePath: string,
            baseFilePath: string,
        ) => {
            fileContent: string | null
            baseFileContent: string | null
        }
        merge: (file: string | null, baseFile: string | null) => string | null
        write: (filePath: string, content: string | null) => void
    }

    type FileHandler = JsonFileHandler | TextFileHandler

    interface Config {
        assets: {
            src: string
            dest: string
        }[]
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
        variants: {
            config: string
            files: FileHandler[]
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
