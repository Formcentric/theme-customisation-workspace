import React from 'react'
import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import variables from '../helpers/theme'

const InputFieldTemplate = (props: ElementProps) => {
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
                    'Implementation of a form element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default: ElementStory = {
    ...Element,
    name: 'Input field',
}

export const WithSuccess: ElementStory = {
    ...Element,
    name: 'Input field valid',
    args: {
        ...Element.args,
        fieldSuccess: true,
    },
}

export const WithError: ElementStory = {
    ...Element,
    name: 'Input field invalid',
    args: {
        ...Element.args,
        fieldError: {
            defaultMessage: 'This is an error message',
        },
    },
}
