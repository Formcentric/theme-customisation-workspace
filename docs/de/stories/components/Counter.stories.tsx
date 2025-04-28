import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const CounterComponentTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.inputField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof CounterComponentTemplate> = {
    title: 'DE/Template Attribute/Komponenten/Counter',
    component: CounterComponentTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `counter` Templates, der sich im Verzeichnis `templates/components/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        value: 'Lorem ipsum',
        label: 'Feld mit maximaler Zeichananzahl',
        properties: {
            maxlength: 100,
            readonly: true,
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
