import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const InputFieldTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.inputField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof InputFieldTemplate> = {
    title: 'DE/Template Attribute/Elemente/Eingabefeld',
    component: InputFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of an input field template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}

export const WithSuccess = {
    ...DefaultFieldStoryArgs,
    args: {
        ...DefaultFieldStoryArgs.args,
        fieldSuccess: true,
    },
    name: 'Valid input',
}

export const WithError = {
    ...DefaultFieldStoryArgs,
    args: {
        ...DefaultFieldStoryArgs.args,
        fieldError: {
            defaultMessage: 'This is an error message',
        },
    },
    name: 'Invalid input',
}
