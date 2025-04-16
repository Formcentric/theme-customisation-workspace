import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const HintTemplate = (props: TemplateProps) => {
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

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        properties: {
            hint: 'A simple hint',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
