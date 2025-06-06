import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const ButtonFieldTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.button}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ButtonFieldTemplate> = {
    title: 'DE/Template Attribute/Elemente/Button',
    component: ButtonFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `button` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Button Beschriftung',
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
