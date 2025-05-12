import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const LayoutTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.layout}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof LayoutTemplate> = {
    title: 'DE/Template Attribute/Elemente/Layout',
    component: LayoutTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `layout` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        layoutFields: [
            {
                ...DefaultFieldStoryArgs.args,
                properties: {
                    field_width: 'mwf-m',
                },
                type: 'inputField',
            },

            {
                ...DefaultFieldStoryArgs.args,
                properties: {
                    field_width: 'mwf-m',
                },
                type: 'numberField',
            },
            {
                ...DefaultFieldStoryArgs.args,
                properties: {},
                type: 'textArea',
            },
        ],
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
