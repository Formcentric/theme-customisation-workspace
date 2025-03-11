import React from 'react'
import { StoryObj } from '@storybook/react'

export type ElementProps = {
    formId: string
    id: string
    name: string
    value: string
    properties: {
        style_class: string
        placeholder: string
        hint: string
        shortHint: string
        mandatory: boolean
        type?: string
        autocomplete?: string
        maxlength?: number
        disabled?: boolean
        readonly?: boolean
        hidden?: boolean
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
    formId: 'example-form',
    id: 'input-field-1',
    name: 'example-input',
    fieldFocused: false,
    fieldSuccess: false,
    fieldError: undefined,
    value: '',
    properties: {
        style_class: '',
        placeholder: 'Enter text here',
        hint: 'This is a hint text',
        shortHint: 'This is a short hint text',
        mandatory: true,
        type: 'text',
        autocomplete: 'off',
        disabled: false,
        readonly: false,
        hidden: false,
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
        fieldError: {
            description:
                'Error state for the field. When set, should be an object with a `defaultMessage` property containing the error text.',
            control: 'object',
            table: {
                type: { summary: 'Object', detail: '{ defaultMessage?: string }' },
                defaultValue: { summary: 'undefined' },
            },
        },
        fieldSuccess: {
            description: 'Success state for the field.',
            control: 'boolean',
        },
        fieldFocused: {
            description: 'Whether the field is currently focused.',
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
    },
}
