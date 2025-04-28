import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const PasswordTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.passwordField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof PasswordTemplate> = {
    title: 'DE/Template Attribute/Elemente/Password-Feld',
    component: PasswordTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `passwordField` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Passwort',
        properties: {
            placeholder: 'Geben Sie das Passwort ein',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
