import React from 'react'
import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import variables from '../helpers/theme'

const NumberTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.numberField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof NumberTemplate> = {
    title: 'EN/Template Properties/Elements/Number Input',
    component: NumberTemplate,
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
    name: 'Number input field',
}
