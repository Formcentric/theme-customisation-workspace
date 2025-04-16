import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const PhoneFieldTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.phoneField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof PhoneFieldTemplate> = {
    title: 'EN/Template Properties/Elements/Phone Field',
    component: PhoneFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a phone field template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
