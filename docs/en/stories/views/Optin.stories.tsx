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
    title: 'En/Template Properties/Views/Optin',
    component: Optin,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a form view template defined in `templates/views/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form views.',
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
                    note: 'Please check your mail and confirm',
                },
            },
        ],
    },
    name: 'Optin',
}
