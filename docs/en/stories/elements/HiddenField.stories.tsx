import { Meta } from '@storybook/react'
import { ElementStory, Element, DateField, ElementProps } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import variables from '../helpers/theme'
import React from 'react'

const HiddenFieldTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.hiddenField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof HiddenFieldTemplate> = {
    title: 'En/Template Properties/Elements/HiddenField',
    component: HiddenFieldTemplate,
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
        ...DateField.args,
    },
    argTypes: {
        ...Element.argTypes,
        ...DateField.argTypes,
    },
    name: 'Hidden field',
}
