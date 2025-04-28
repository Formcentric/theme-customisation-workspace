import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const ErrorTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.error}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ErrorTemplate> = {
    title: 'DE/Template Attribute/Komponenten/Fehler',
    component: ErrorTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `error` Templates, der sich im Verzeichnis `templates/components/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        fieldError: {
            defaultMessage: 'Bitte geben Sie eine gültige E-Mail Adresse an',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
