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
                    'Implementation of a `summary` template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        signatures: {},
        summaryFields: [
            {
                data: {
                    ...DefaultFieldStoryArgs.args,
                    label: 'Name',
                    name: 'inputField1',
                    value: 'John',
                    type: 'inputField',
                },
            },
            {
                data: {
                    ...DefaultFieldStoryArgs.args,
                    label: 'Last name',
                    name: 'inputField2',
                    value: 'Doe',
                    type: 'inputField',
                },
            },
            {
                data: {
                    ...DefaultFieldStoryArgs.args,
                    label: 'Email Address',
                    name: 'inputField3',
                    value: 'john@doe.com',
                    type: 'inputField',
                },
            },
        ],
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
