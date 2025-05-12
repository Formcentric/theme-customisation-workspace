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
    title: 'En/Template Properties/Elements/Input Field',
    component: InputFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of an `inputField` template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Input label',
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}

export const WithSuccess = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Input label',
        fieldSuccess: true,
    },
    name: 'Valid input',
}

export const WithError = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Input label',
        fieldError: {
            defaultMessage: 'This is an error message',
        },
    },
    name: 'Invalid input',
}
