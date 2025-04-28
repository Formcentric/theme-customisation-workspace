import React from 'react'
import { Meta } from '@storybook/react'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'

const Logo = () => {
    return (
        <Template
            template={window.formcentric.formapp.templates.formLogo}
            props={{}}
            variables={variables}
        />
    )
}

const meta: Meta<typeof Logo> = {
    title: 'En/Template Properties/Form/Logo',
    component: Logo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a `logo` template located in `templates/forms/`. Formcentric client passes the listed properties as the second argument to the template function.',
            },
        },
    },
}

export default meta

export const Default = {
    name: 'Default',
}
