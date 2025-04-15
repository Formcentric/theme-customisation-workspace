import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const ShortHint = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.shortHint}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ShortHint> = {
    title: 'EN/Template Properties/Components/Short Hint',
    component: ShortHint,
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
            shortHint: 'A very short hin',
        },
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Short Hint Component',
}
