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
    pageTitle: 'Page 1',
    pageTitles: ['Page 1', 'Page 2'],
    currentPageIndex: 0,
    currentPageFull: 1,
    pageCountFull: 3,
    currentPage: 1,
    pageCount: 2,
    hiddenPages: [2],
    resetForm: () => {},
    translation: key => {
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
        label: 'Back',
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
        label: 'Cancel',
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
        label: 'Next',
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
        label: 'Submit',
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
            description: 'Form ID',
        },
        formName: {
            control: 'text',
            description: 'Form name',
        },
        customStates: {
            control: false,
            description: 'Custom states for persisting template data between renders',
            table: {
                type: { summary: '[Record<string, unknown>, Dispatch<StateUpdater<Record<string, unknown>>>]' },
            },
        },
        pageTitle: {
            control: 'text',
            description: 'Current page title',
        },
        pageTitles: {
            control: 'object',
            description: 'Array of all page titles',
            table: {
                type: { summary: 'string[]' },
            },
        },
        currentPageIndex: {
            control: 'number',
            description: 'Current page index (0-based)',
        },
        currentPageFull: {
            control: 'number',
            description: 'Current page (1-based, including hidden pages)',
        },
        currentPage: {
            control: 'number',
            description: 'Actual current page (1-based, excluding hidden pages)',
        },
        pageCount: {
            control: 'number',
            description: 'Number of visible pages (1-based, conditionally hidden pages are not counted)',
        },
        pageCountFull: {
            control: 'number',
            description: 'Total number of all pages (including hidden pages)',
        },
        hiddenPages: {
            control: 'object',
            description: 'Array of hidden page indices',
            table: {
                type: { summary: 'number[]' },
            },
        },
        resetForm: {
            control: false,
            description: 'Function to reset the form',
            table: {
                type: { summary: '() => void' },
            },
        },
        pageButtonProps: {
            control: 'object',
            description: 'Button properties for full form navigation bar (see Seattle formHeader.js)',
            table: {
                type: {
                    summary:
                        'Array<{ onclick: () => void, label: string | number, disabled: boolean, "aria-current": string }>',
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
        _back: {
            control: 'object',
            description: 'Back button configuration',
            table: {
                type: { summary: 'FooterButtonProps' },
            },
        },
        _cancel: {
            control: 'object',
            description: 'Cancel button configuration',
            table: {
                type: { summary: 'FooterButtonProps' },
            },
        },
        _next: {
            control: 'object',
            description: 'Next button configuration',
            table: argTypeButton,
        },
        _finish: {
            control: 'object',
            description: 'Submit button configuration',
            table: {
                type: { summary: 'FooterButtonProps' },
            },
        },
        components: {
            control: false,
            description: 'Formcentric helper components',
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
