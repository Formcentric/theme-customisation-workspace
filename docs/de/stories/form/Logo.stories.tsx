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
    title: 'DE/Template Attribute/Formular/Logo',
    component: Logo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `logo` Templates, das sich im Verzeichnis `templates/form/` befindet. An dieses Template werden keine Eigenschaften weitergereicht.',
            },
        },
    },
}

export default meta

export const Default = {
    name: 'Default',
}
