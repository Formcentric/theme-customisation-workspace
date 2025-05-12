import React from 'react'
import { Meta } from '@storybook/react'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { View, ViewProps, ViewStory } from '../Views'

const Error = (props: ViewProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.error}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof Error> = {
    title: 'DE/Template Attribute/Views/Fehler',
    component: Error,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `error` Templates, das sich im Verzeichnis `templates/views/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default: ViewStory = {
    ...View,
    name: 'Error',
}
