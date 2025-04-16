import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const GlobalErrorTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.globalError}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof GlobalErrorTemplate> = {
    title: 'EN/Template Properties/Components/Global Error',
    component: GlobalErrorTemplate,
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
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
