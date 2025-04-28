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
    title: 'EN/Template Properties/Elements/Layout',
    component: LayoutTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a `layout` template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'A group of form fields',
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
