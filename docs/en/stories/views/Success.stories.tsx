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
    title: 'En/Template Properties/Views/Success',
    component: Success,
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
