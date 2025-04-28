import React from 'react'
import { Meta } from '@storybook/react'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { View, ViewProps, ViewStory } from '../Views'

const Optin = (props: ViewProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.optin}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof Optin> = {
    title: 'DE/Template Attribute/Views/Opt-in',
    component: Optin,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `optin` Templates, das sich im Verzeichnis `templates/views/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
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
                view: 'optin',
                action: 'datastoreAction',
                data: {
                    note: 'Prüfen Sie ihre Mails und bestätigen Sie ihre Anmeldung',
                },
            },
        ],
    },
    name: 'Optin',
}
