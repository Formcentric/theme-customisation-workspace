import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const NumberTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.numberField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof NumberTemplate> = {
    title: 'DE/Template Attribute/Elemente/Nummern-Feld',
    component: NumberTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `numberField` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Zahl',
        properties: {
            placeholder: 'Geben Sie eine Zahl ein',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
