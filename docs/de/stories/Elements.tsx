import { type TemplateProps } from '../../types/Templates'

export const defaultProps: TemplateProps = {
    formId: 'Form',
    id: 'fc12345',
    name: 'inputField_1',
    label: 'Beschriftung',
    fieldFocused: false,
    fieldSuccess: false,
    fieldError: undefined,
    value: '',
    properties: {
        style_class: '',
        placeholder: 'Platzhalter-Text',
        hint: '',
        shortHint: '',
        type: 'text',
        autocomplete: 'off',
        mandatory: false,
        disabled: false,
        readonly: false,
        hidden: false,
        visible: true,
        field_width: undefined,
    },
    components: {
        captcha: () => null,
        fileUploader: () => null,
        comboBox: () => null,
        suggestions: () => null,
        hint: () => null,
        datePicker: () => null,
        markdown: props => props.markdown,
        siganture: () => null,
    },
    translation: key => {
        return key
    },
    oninput: () => console.log('Input changed'),
    onfocus: () => console.log('Input focused'),
    onblur: () => console.log('Input blurred'),
}

export const DefaultFieldStoryArgs = {
    args: {
        ...defaultProps,
    },
    argTypes: {
        formId: {
            description: 'Formular ID',
        },
        id: {
            description: 'Feld ID',
        },
        name: {
            description: 'Feld Name',
        },
        label: {
            description: 'Feld Beschriftung',
        },
        value: {
            description: 'Feldeingabe',
        },
        properties: {
            description: 'Feld Attribute',
            control: 'object',
            table: {
                type: {
                    summary: 'Object',
                    detail: `{
    style_class?: string,
    placeholder?: string,
    hint?: string,
    shortHint?: string,
    mandatory?: boolean,
    type?: string, 
    autocomplete?: string,
    maxlength?: number,
    disabled?: boolean,
    readonly?: boolean,
    hidden?: boolean,
    visible?: boolean,
    field_width?: "mwf-s" | "mwf-m" | "mwf-l" | undefined
}`,
                },
            },
        },
        fieldError: {
            description: 'Fehler State des Felds',
            control: 'object',
            table: {
                type: { summary: 'Object', detail: '{ defaultMessage?: string }' },
                defaultValue: { summary: 'undefined' },
            },
        },
        fieldSuccess: {
            description: 'Fehler State des Felds',
            control: 'boolean',
        },
        fieldFocused: {
            description: 'Fehler State des Felds',
            control: 'boolean',
        },
        components: {
            description: 'Formcentric Helper-Komponenten',
            control: false,
            table: {
                type: {
                    summary: 'Object',
                    detail: `{
    captcha: () => React.ReactNode,
    fileUploader: (props: TemplateProps) => React.ReactNode,
    comboBox: (props: TemplateProps) => React.ReactNode,
    suggestions: (props: TemplateProps) => React.ReactNode,
    hint: (props: TemplateProps & { additionalClosureButton: boolean }) => React.ReactNode,
    markdown: (props: { markdown: string; data?: Record<string, string> }) => React.ReactNode,
    datePicker: (props: TemplateProps) => React.ReactNode,
    siganture: (props: TemplateProps & { colors: { applyFromTheme: boolean } }) => React.ReactNode
}`,
                },
            },
        },
        translation: {
            control: false,
            description: 'Übersetzungs-Funktion',
            table: {
                type: {
                    summary: 'function',
                    detail: `translation(key: string, params?: Record<string, string>) => string`,
                },
            },
        },
    },
}
