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
                    'Implementation of a fieldset element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        fieldSetFields: [
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
                    field_width: 'mwf-s',
                },
                type: 'numberField',
            },
            {
                ...DefaultFieldStoryArgs.args,
                properties: {
                    field_width: 'mwf-m',
                },
                type: 'textArea',
            },
        ],
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
