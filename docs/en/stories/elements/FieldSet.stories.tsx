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
    title: 'EN/Template Properties/Elements/Fieldset',
    component: FieldSetTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a `fieldSet` template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'A group of form fields',
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
