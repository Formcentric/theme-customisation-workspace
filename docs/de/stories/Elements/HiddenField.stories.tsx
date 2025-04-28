import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import variables from '../../../helpers/theme'
import React from 'react'
import { TemplateProps } from '../../../types/Templates'
import Template from '../../../helpers/Template'

const HiddenFieldTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.hiddenField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof HiddenFieldTemplate> = {
    title: 'DE/Template Attribute/Elemente/Verstecktes Feld',
    component: HiddenFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `hiddenField` Templates, das sich im Verzeichnis `templates/elements/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
