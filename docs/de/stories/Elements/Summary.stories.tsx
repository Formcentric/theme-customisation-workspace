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
    title: 'DE/Template Attribute/Elemente/Zusammenfassung',
    component: SummaryTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `summary` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
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
                    label: 'Vorname',
                    name: 'inputField1',
                    value: 'Max',
                    type: 'inputField',
                },
            },
            {
                data: {
                    ...DefaultFieldStoryArgs.args,
                    label: 'Nachname',
                    name: 'inputField2',
                    value: 'Mustermann',
                    type: 'inputField',
                },
            },
            {
                data: {
                    ...DefaultFieldStoryArgs.args,
                    label: 'E-Mail',
                    name: 'inputField3',
                    value: 'max@mustermann.de',
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
