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
    title: 'DE/Template Attribute/Elemente/Mehrfachauswahl',
    component: CheckboxGroupTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `checkBoxGroup` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Mehrfachauswahl',
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
