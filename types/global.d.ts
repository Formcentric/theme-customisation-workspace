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
