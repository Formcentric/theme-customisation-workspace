import React from 'react'
import { Meta } from '@storybook/react'
import Template from '../helpers/Template'
import variables from '../helpers/theme'
import { View, ViewProps, ViewStory } from './Views'

const ViewTemplate = (props: ViewProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.redirect}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ViewTemplate> = {
    title: 'En/Template Properties/Views/Redirect',
    component: ViewTemplate,
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
    name: 'Redirect',
}
