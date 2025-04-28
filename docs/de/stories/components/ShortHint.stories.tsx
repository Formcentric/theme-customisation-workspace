import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const ShortHint = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.shortHint}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ShortHint> = {
    title: 'DE/Template Attribute/Komponenten/Kurzhinweis',
    component: ShortHint,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `shortHint` Templates, der sich im Verzeichnis `templates/components/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        properties: {
            shortHint: 'Ein kurzer Hinweistext',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
