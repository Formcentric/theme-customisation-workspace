import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const CalculatedValueTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.calculatedValue}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof CalculatedValueTemplate> = {
    title: 'EN/Template Properties/Elements/Calculated Value',
    component: CalculatedValueTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a calculated value field template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Calculated Value',
        value: 'A calculated value',
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
