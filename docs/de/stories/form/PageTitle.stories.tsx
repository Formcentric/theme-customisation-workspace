import React from 'react'
import { Meta } from '@storybook/react'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'

const PageTitle = props => {
    return (
        <Template
            template={window.formcentric.formapp.templates.formPageTitle}
            props={{ ...props }}
            variables={variables}
        />
    )
}

const meta: Meta<typeof PageTitle> = {
    title: 'DE/Template Attribute/Formular/Seitentitel',
    component: PageTitle,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of the form footer template defined in `templates/forms/formFooter.js`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of navigation controls for multi-page forms.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        pageTitle: 'A title for a page',
    },
    name: 'Default',
}
