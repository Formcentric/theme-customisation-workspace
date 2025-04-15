import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const ButtonComponentTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.button}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ButtonComponentTemplate> = {
    title: 'EN/Template Properties/Components/Button Component',
    component: ButtonComponentTemplate,
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
        label: 'Button',
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Button Component',
}
