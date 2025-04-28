import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const NumberTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.numberField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof NumberTemplate> = {
    title: 'DE/Template Attribute/Elemente/Nummern-Feld',
    component: NumberTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a number input field template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
