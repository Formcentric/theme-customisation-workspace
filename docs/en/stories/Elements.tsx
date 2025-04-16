import { type TemplateProps } from '../../types/Templates'

export const defaultProps: TemplateProps = {
    formId: 'Form',
    id: 'fc12345',
    name: 'inputField_1',
    label: 'Label',
    fieldFocused: false,
    fieldSuccess: false,
    fieldError: undefined,
    value: '',
    properties: {
        style_class: '',
        placeholder: 'Please enter a name',
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
            description: 'Form ID.',
        },
        id: {
            description: 'Field ID.',
        },
        name: {
            description: 'Field name.',
        },
        label: {
            description: 'Field label.',
        },
        value: {
            description: 'Field value.',
        },
        properties: {
            description: 'Field properties.',
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
            description: 'Error state of the field.',
            control: 'object',
            table: {
                type: { summary: 'Object', detail: '{ defaultMessage?: string }' },
                defaultValue: { summary: 'undefined' },
            },
        },
        fieldSuccess: {
            description: 'Success state of the field.',
            control: 'boolean',
        },
        fieldFocused: {
            description: 'Focus state of the field.',
            control: 'boolean',
        },
        components: {
            description: 'Formcentric helper components.',
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
            description: 'Translation function',
            table: {
                type: {
                    summary: 'function',
                    detail: `translation(key: string, params?: Record<string, string>) => string`,
                },
            },
        },
    },
}
