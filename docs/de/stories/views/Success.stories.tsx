import React from 'react'
import { Meta } from '@storybook/react'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { View, ViewProps, ViewStory } from '../Views'

const Success = (props: ViewProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.success}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof Success> = {
    title: 'DE/Template Attribute/Views/Erfolg',
    component: Success,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `success` Templates, das sich im Verzeichnis `templates/views/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default: ViewStory = {
    ...View,
    args: {
        ...View.args,
        actions: [
            {
                view: 'success',
                action: 'datastoreAction',
                data: {
                    note: null,
                },
            },
        ],
    },
    name: 'Success',
}
