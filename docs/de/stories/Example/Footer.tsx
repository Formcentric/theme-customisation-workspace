import React from 'react'
import { StoryObj } from '@storybook/react'

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
    currentPage: number
    pageCount: number
    translation: (key: string, _params?: Record<string, string>) => string
    _back: FooterButtonProps
    _cancel: FooterButtonProps
    _next: FooterButtonProps
    _finish: FooterButtonProps
}

export const FooterProps: FooterProps = {
    currentPage: 1,
    pageCount: 2,
    translation: (key, params = {}) => {
        return key
    },
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
        currentPage: {
            control: 'number',
            description: 'Current page number',
        },
        pageCount: {
            control: 'number',
            description: 'Total number of pages',
            table: {
                type: { summary: 'number' },
            },
        },
        translation: {
            control: false,
            description: 'Translation function',
            table: {
                type: { summary: 'function' },
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
            table: argTypeButton
        },
        _finish: {
            control: 'object',
            description: 'Submit button configuration',
            table: {
                type: { summary: 'FooterButtonProps' },
            },
        },
    },
}
