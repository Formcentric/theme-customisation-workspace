import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const SummaryTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.summary}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof SummaryTemplate> = {
    title: 'EN/Template Properties/Elements/Summary',
    component: SummaryTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a summary element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
