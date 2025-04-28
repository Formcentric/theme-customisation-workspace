import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const CalculatedValueTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.calculatedValue}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof CalculatedValueTemplate> = {
    title: 'DE/Template Attribute/Elemente/Berechneter Wert',
    component: CalculatedValueTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `calculatedValue` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        label: 'Berechneter Wert',
        value: 'Ein berechneter Wert',
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
