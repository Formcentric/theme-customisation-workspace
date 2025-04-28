import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const CheckboxGroupTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.checkBoxGroup}
            props={{
                ...props,
                children: [
                    {
                        id: '1',
                        name: 'option-a',
                        value: 'A',
                        label: 'Option A',
                        checked: false,
                    },
                    {
                        id: '2',
                        name: 'option-b',
                        value: 'B',
                        label: 'Option B',
                        checked: true,
                    },
                    {
                        id: '3',
                        name: 'option-c',
                        value: 'C',
                        label: 'Option C',
                        checked: false,
                    },
                ],
            }}
            variables={variables}
        />
    )
}

const meta: Meta<typeof CheckboxGroupTemplate> = {
    title: 'EN/Template Properties/Elements/Checkbox Group',
    component: CheckboxGroupTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a checkbox group element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
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
        children: {
            description: 'Checkbox Options',
            control: 'object',
            table: {
                type: {
                    summary: 'Object',
                    detail: `{
                    id: string
                    label: string
                    value: string
                    checked: boolean
                    properties: {
                        pictureUrl: ''
                    }
}`,
                },
            },
        },
    },
    name: 'Default',
}
