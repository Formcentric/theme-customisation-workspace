import React from 'react'
import { StoryObj } from '@storybook/react'

export type ElementProps = {
    formId: string
    id: string
    name: string
    label: string
    value: string
    properties: {
        style_class?: string
        placeholder?: string
        hint?: string
        shortHint?: string
        mandatory?: boolean
        type?: string
        autocomplete?: string
        maxlength?: number
        disabled?: boolean
        readonly?: boolean
        hidden?: boolean
        visible?: boolean
        field_width?: 'mwf-s' | 'mwf-m' | 'mwf-l' | undefined
    }
    components: {
        captcha: () => React.ReactNode
        fileUploader: (props: ElementProps) => React.ReactNode
        comboBox: (props: ElementProps) => React.ReactNode
        suggestions: (props: ElementProps) => React.ReactNode
        hint: (props: ElementProps & { additionalClosureButton: boolean }) => React.ReactNode
        markdown: (props: { markdown: string; data?: Record<string, string> }) => React.ReactNode
        datePicker: (props: ElementProps) => React.ReactNode
        siganture: (props: ElementProps & { colors: { applyFromTheme: boolean } }) => React.ReactNode
    }
    fieldFocused?: boolean
    fieldError?: { defaultMessage?: string }
    fieldSuccess?: boolean
    translation: (key: string, _params?: Record<string, string>) => string
    oninput: () => void
    onfocus: () => void
    onblur: () => void
}

export const ElementProps: ElementProps = {
    formId: 'Form',
    id: 'fc12345',
    name: 'inputField_1',
    label: 'First name',
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
        fileUploader: props => null,
        comboBox: props => null,
        suggestions: props => null,
        hint: props => null,
        datePicker: props => null,
        markdown: props => props.markdown,
        siganture: props => null,
    },
    translation: (key, params = {}) => {
        return key
    },
    oninput: () => console.log('Input changed'),
    onfocus: () => console.log('Input focused'),
    onblur: () => console.log('Input blurred'),
}

export type ElementStory = StoryObj<
    ElementProps & {
        template: (html: unknown, props: object) => React.ReactNode
    }
>

export const Element: ElementStory = {
    args: {
        ...ElementProps,
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
    fileUploader: (props: ElementProps) => React.ReactNode,
    comboBox: (props: ElementProps) => React.ReactNode,
    suggestions: (props: ElementProps) => React.ReactNode,
    hint: (props: ElementProps & { additionalClosureButton: boolean }) => React.ReactNode,
    markdown: (props: { markdown: string; data?: Record<string, string> }) => React.ReactNode,
    datePicker: (props: ElementProps) => React.ReactNode,
    siganture: (props: ElementProps & { colors: { applyFromTheme: boolean } }) => React.ReactNode
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
