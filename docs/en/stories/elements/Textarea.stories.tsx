import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const TextareaTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.textArea}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof TextareaTemplate> = {
    title: 'EN/Template Properties/Elements/Textarea',
    component: TextareaTemplate,
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
    args: {
        ...Element.args,
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Textarea field',
}
