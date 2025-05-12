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
    title: 'En/Template Properties/Form/PageTitle',
    component: PageTitle,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a `pageTitle` template located in `templates/forms/`. Formcentric client passes the listed properties as the second argument to the template function.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        pageTitle: 'Page title',
    },
    argTypes: {
        pageTitle: {
            control: 'text',
            description: 'Title of the current page',
        },
    },
    name: 'Default',
}
