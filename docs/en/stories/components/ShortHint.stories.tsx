import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const ShortHint = (props: TemplateProps) => {
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
                    'Implementation of a form element template located in `templates/components/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        properties: {
            shortHint: 'A very short hin',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
