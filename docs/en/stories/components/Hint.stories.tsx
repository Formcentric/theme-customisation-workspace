import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const HintTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.hint}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof HintTemplate> = {
    title: 'EN/Template Properties/Components/Hint',
    component: HintTemplate,
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
        properties: {
            hint: 'A simple hint',
        },
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Hint Component',
}
