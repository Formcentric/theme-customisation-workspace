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
                    'Implementierung eines `pageTitle` Templates, das sich im Verzeichnis `templates/form/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        pageTitle: 'Seitentitel',
    },
    argTypes: {
        pageTitle: {
            control: 'text',
            description: 'Name der Forumlarseite',
        },
    },
    name: 'Default',
}
