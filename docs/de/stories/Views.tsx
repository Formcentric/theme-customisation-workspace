import React from 'react'
import { StoryObj } from '@storybook/react'
import { defaultProps } from './Elements'
import { TemplateProps } from '../../types/Templates'

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
    components: TemplateProps['components']
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
                note: 'Danke, ihre Daten sind erfolgreich eingesendet worden!',
            },
        },
    ],
    components: {
        ...defaultProps.components,
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
            description: 'Token der Client-Session',
            control: false,
            table: {
                type: { summary: 'string' },
            },
        },
        formHash: {
            description: 'Form-Hash Identifikator',
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
            description: 'Variablen',
            control: false,
            table: {
                type: { summary: 'Record<string, string> | null' },
            },
        },
        page: {
            description: 'Index der aktuellen Seite',
            control: 'number',
            table: {
                type: { summary: 'number' },
            },
        },
        calculatedPage: {
            description: 'Berechnete Seitennumer basierend auf Client Logik',
            control: 'number',
            table: {
                type: { summary: 'number' },
            },
        },
        values: {
            description: 'Eingaben der Formularfelder',
            control: false,
            table: {
                type: { summary: 'Record<string, string | string[] | null>' },
            },
        },
        view: {
            description: 'View Typ',
            control: 'text',
            table: {
                type: { summary: 'success | redirect | error | optin' },
            },
        },
        actions: {
            description: 'Array der durchgeführten Aktionen',
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
            description: 'Formcentric Helper-Komponenten, welche für komplexeren Elemente benötigt werden',
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
    },
}
