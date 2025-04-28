import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const ImageEmbed = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.imageEmbed}
            props={props}
            size={'md'}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ImageEmbed> = {
    title: 'DE/Template Attribute/Komponenten/Bild',
    component: ImageEmbed,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `imageEmbed` Templates, der sich im Verzeichnis `templates/components/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        properties: {
            pictureUrl: {
                md: '../../../../src/assets/img/favicon.ico',
            },
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
