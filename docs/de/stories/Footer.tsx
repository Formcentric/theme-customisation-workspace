import React from 'react'
import { StoryObj } from '@storybook/react'
import { Dispatch, StateUpdater } from 'preact/hooks'
import { TemplateProps } from '../../types/Templates'

export type FooterButtonProps = {
    id: string
    label: string
    type: 'button' | 'submit'
    name: string
    onclick: (event: React.PointerEvent<HTMLButtonElement>) => void
    properties: {
        enabled?: boolean
        disabled?: boolean
        hidden?: boolean
        visible?: boolean
    }
}

export const argTypeButton = {
    table: {
        type: {
            summary: 'FooterButtonProps',
            detail: `{
                id: string
                label: string
                type: 'button' | 'submit'
                name: string
                onclick: (event: React.PointerEvent<HTMLButtonElement>) => void
                properties: {
                enabled?: boolean
                disabled?: boolean
                hidden?: boolean
                visible?: boolean
                }
            `,
        },
    },
}

export type FooterProps = {
    formId: string
    formName: string
    customStates: [Record<string, unknown>, Dispatch<StateUpdater<Record<string, unknown>>>]
    pageTitle: string
    pageTitles: string[]
    currentPageIndex: number
    currentPageFull: number
    currentPage: number
    pageCount: number
    pageCountFull: number
    hiddenPages: number[]
    resetForm: () => void
    translation: (key: string, _params?: Record<string, string>) => string
    pageButtonProps: {
        onclick: () => void
        label: string | number
        disabled: boolean
        'aria-current': string
    }[]
    _back: FooterButtonProps
    _cancel: FooterButtonProps
    _next: FooterButtonProps
    _finish: FooterButtonProps
    components: TemplateProps['components']
}

export const FooterProps: FooterProps = {
    formId: '1234',
    formName: 'test',
    customStates: [{}, () => {}],
    pageTitle: 'Seite 1',
    pageTitles: ['Seite 1', 'Seite 2'],
    currentPageIndex: 0,
    currentPageFull: 1,
    pageCountFull: 3,
    currentPage: 1,
    pageCount: 2,
    hiddenPages: [2],
    resetForm: () => {},
    translation: (key, params = {}) => {
        return key
    },
    pageButtonProps: [
        {
            onclick: () => {},
            label: '1',
            disabled: false,
            'aria-current': 'page',
        },
    ],
    _back: {
        id: '_back',
        type: 'button',
        name: '_back',
        label: 'Zurück',
        onclick: () => {},
        properties: {
            enabled: true,
            visible: true,
            hidden: true,
        },
    },
    _cancel: {
        id: '_cancel',
        type: 'button',
        name: '_cancel',
        label: 'Abbrechen',
        onclick: () => {},
        properties: {
            enabled: true,
            visible: true,
            hidden: false,
        },
    },
    _next: {
        id: '_next',
        type: 'button',
        name: '_next',
        label: 'Weiter',
        onclick: () => {},
        properties: {
            enabled: true,
            visible: true,
            hidden: false,
        },
    },
    _finish: {
        id: '_finish',
        type: 'button',
        name: '_finish',
        label: 'Absenden',
        onclick: () => {},
        properties: {
            enabled: true,
            visible: true,
            hidden: true,
        },
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
}

export type FooterStory = StoryObj<
    FooterProps & {
        template: (html: unknown, props: object) => React.ReactNode
    }
>

export const Footer: FooterStory = {
    args: {
        ...FooterProps,
    },
    argTypes: {
        formId: {
            control: 'text',
            description: 'ID des Formulars',
        },
        formName: {
            control: 'text',
            description: 'Name des Formulars',
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
        _back: {
            control: 'object',
            description: 'Konfiguration des Zurück-Buttons',
            table: {
                type: { summary: 'FooterButtonProps' },
            },
        },
        _cancel: {
            control: 'object',
            description: 'Konfiguration des Abbrechen-Buttons',
            table: {
                type: { summary: 'FooterButtonProps' },
            },
        },
        _next: {
            control: 'object',
            description: 'Konfiguration des Weiter-Buttons',
            table: argTypeButton,
        },
        _finish: {
            control: 'object',
            description: 'Konfiguration des Absenden-Buttons',
            table: {
                type: { summary: 'FooterButtonProps' },
            },
        },
        customStates: {
            control: false,
            description: 'Benutzerdefinierte Zustände zum Persistieren von Template-Daten zwischen Renderings',
            table: {
                type: { summary: '[Record<string, unknown>, Dispatch<StateUpdater<Record<string, unknown>>>]' },
            },
        },
        pageTitle: {
            control: 'text',
            description: 'Titel der aktuellen Seite',
        },
        pageTitles: {
            control: 'object',
            description: 'Array aller Seitentitel',
            table: {
                type: { summary: 'string[]' },
            },
        },
        currentPageIndex: {
            control: 'number',
            description: 'Index der aktuellen Seite (0-basiert)',
        },
        currentPageFull: {
            control: 'number',
            description: 'Aktuelle Seite (1-basiert, inklusive versteckter Seiten)',
        },
        currentPage: {
            control: 'number',
            description: 'Tatsächliche aktuelle Seite (1-basiert, ohne versteckte Seiten)',
        },
        pageCount: {
            control: 'number',
            description: 'Anzahl der sichtbaren Seiten (1-basiert, bedingt versteckte Seiten werden nicht gezählt)',
        },
        pageCountFull: {
            control: 'number',
            description: 'Gesamtanzahl aller Seiten (inklusive versteckter Seiten)',
        },
        hiddenPages: {
            control: 'object',
            description: 'Array der Indizes versteckter Seiten',
            table: {
                type: { summary: 'number[]' },
            },
        },
        resetForm: {
            control: false,
            description: 'Funktion zum Zurücksetzen des Formulars',
            table: {
                type: { summary: '() => void' },
            },
        },
        pageButtonProps: {
            control: 'object',
            description:
                'Button-Eigenschaften für die vollständige Formular-Navigationsleiste (siehe Seattle formHeader.js)',
            table: {
                type: {
                    summary:
                        'Array<{ onclick: () => void, label: string | number, disabled: boolean, "aria-current": string }>',
                },
            },
        },
        components: {
            description: 'Formcentric Helper-Komponenten',
            control: false,
            table: {
                type: {
                    summary: 'Object',
                    detail: `{
    captcha: () => React.ReactNode,
    fileUploader: (props: TemplateProps & { dashboardProps: UppyDashboardProps, buttonProps: UppyDashboardButtonProps }) => React.ReactNode,
    comboBox: (props: TemplateProps & { inlineSelected: boolean }) => React.ReactNode,
    suggestions: (props: TemplateProps) => React.ReactNode,
    hint: (props: TemplateProps & { additionalClosureButton: boolean }) => React.ReactNode,
    markdown: (props: { markdown: string; data?: Record<string, string> }) => React.ReactNode,
    datePicker: (props: TemplateProps & { datePickerProps: ReactDatePickerProps, datePickerInputProps: ReactDatePickerInputProps }) => React.ReactNode,
    siganture: (props: TemplateProps & { colors: { applyFromTheme: boolean } }) => React.ReactNode
}`,
                },
            },
        },
    },
}
