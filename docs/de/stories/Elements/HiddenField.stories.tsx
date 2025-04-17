import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import variables from '../../../helpers/theme'
import React from 'react'
import { TemplateProps } from '../../../types/Templates'
import Template from '../../../helpers/Template'

const HiddenFieldTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.hiddenField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof HiddenFieldTemplate> = {
    title: 'DE/Template Attribute/Elemente/Verstecktes Feld',
    component: HiddenFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a hidden field template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
