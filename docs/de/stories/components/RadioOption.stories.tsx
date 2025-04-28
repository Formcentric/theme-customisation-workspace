import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const RadioOption = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.radioOption}
            props={props}
            child={props.child}
            variables={variables}
        />
    )
}

const meta: Meta<typeof RadioOption> = {
    title: 'DE/Template Attribute/Komponenten/Einfachauswahl-Option',
    component: RadioOption,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `radioOption` Templates, der sich im Verzeichnis `templates/components/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        child: {
            id: '1',
            name: 'option-a',
            value: 'A',
            label: 'Option A',
            checked: false,
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}

export const Checked = {
    args: {
        ...DefaultFieldStoryArgs.args,
        child: {
            id: '1',
            name: 'option-a',
            value: 'A',
            label: 'Option A',
            checked: true,
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Selected',
}
