import type { Preview } from '@storybook/react'

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        options: {
            storySort: {
                order: [
                    'Start here',
                    'EN',
                    [
                        'Introduction',
                        'Getting started',
                        ['Installation', 'Usage', 'Configuration'],
                        'Themes',
                        ['Creating Themes', 'Structure', 'Customisation'],
                    ],
                    'DE',
                    [
                        'Einleitung',
                        'Einstieg',
                        ['Installation', 'Nutzung', 'Configuration'],
                        'Themes',
                        ['Themes erstellen', 'Struktur', 'Anpassung'],
                        'Wartung',
                        'Template Attribute', ['Komponenten', 'Elemente', 'Views', 'Formular']
                    ],
                ],
            },
        },
    },
    tags: ['autodocs'],
}

export default preview
