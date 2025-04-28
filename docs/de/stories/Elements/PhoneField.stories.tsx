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
    title: 'DE/Template Attribute/Elemente/Telefonnummer',
    component: PhoneFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `phoneField` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Telefonnummer',
        properties: {
            placeholder: 'Geben Sie eine gültige Telefonnummer ein',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
