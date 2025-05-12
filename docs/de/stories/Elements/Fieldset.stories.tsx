import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const FieldSetTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.fieldSet}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof FieldSetTemplate> = {
    title: 'DE/Template Attribute/Elemente/Fieldset',
    component: FieldSetTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `fieldSet` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Mehrere gruppierte Felder',
        fieldSetFields: [
            {
                ...DefaultFieldStoryArgs.args,
                type: 'inputField',
            },

            {
                ...DefaultFieldStoryArgs.args,
                type: 'numberField',
            },
            {
                ...DefaultFieldStoryArgs.args,
                type: 'textArea',
            },
        ],
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
