import React from 'react'
import { StoryObj } from '@storybook/react'
import { ElementProps } from './Elements'

export type ViewProps = {
    clientSession: string
    formHash: string
    page: number
    calculatedPage: number
    optInId: string | null
    vars: Record<string, string> | null
    values: Record<string, string | string[] | null>
    view: 'success' | 'redirect' | 'error' | 'optin'
    actions: Array<{
        view: string
        action: string
        data: {
            note: string | null
            delay?: number
        }
    }>
    components: ElementProps['components']
}

export const ViewProps: ViewProps = {
    clientSession: '',
    formHash: '',
    page: 0,
    calculatedPage: 0,
    optInId: null,
    vars: null,
    values: {},
    view: 'redirect',
    actions: [
        {
            view: 'success',
            action: 'datastoreAction',
            data: {
                note: null,
            },
        },
        {
            view: 'redirect',
            action: 'redirectAction',
            data: {
                delay: 0,
                note: 'Thank you! We have received your form submission and will attend to it as soon as possible.',
            },
        },
    ],
    components: {
        ...ElementProps.components,
    },
}

export type ViewStory = StoryObj<
    ViewProps & {
        template: (html: unknown, props: object) => React.ReactNode
    }
>

export const View: ViewStory = {
    args: {
        ...ViewProps,
    },
    argTypes: {
        clientSession: {
            description: 'Client session token',
            control: false,
            table: {
                type: { summary: 'string' },
            },
        },
        formHash: {
            description: 'Form hash identifier',
            control: false,
            table: {
                type: { summary: 'string' },
            },
        },
        optInId: {
            description: 'Opt-in ID',
            control: false,
            table: {
                type: { summary: 'string | null' },
            },
        },
        vars: {
            description: 'Variables',
            control: false,
            table: {
                type: { summary: 'Record<string, string> | null' },
            },
        },
        page: {
            description: 'Current page number',
            control: 'number',
            table: {
                type: { summary: 'number' },
            },
        },
        calculatedPage: {
            description: 'Calculated page number based on form logic',
            control: 'number',
            table: {
                type: { summary: 'number' },
            },
        },
        values: {
            description: 'Form field values',
            control: false,
            table: {
                type: { summary: 'Record<string, string | string[] | null>' },
            },
        },
        view: {
            description: 'Current view state',
            control: 'text',
            table: {
                type: { summary: 'success | redirect | error | optin' },
            },
        },
        actions: {
            description: 'Array of performed actions',
            control: false,
            table: {
                type: {
                    summary: 'Array<Action>',
                    detail: `Array<{
    view: string
    action: string
    data: {
        note?: string
        delay?: number
        url?: string
    }
}>`,
                },
            },
        },
        components: {
            description: 'Formcentric helper components for rendering more sophisticated elements.',
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
