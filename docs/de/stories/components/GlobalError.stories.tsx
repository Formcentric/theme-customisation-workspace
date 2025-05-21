import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import React from 'react'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const GlobalErrorTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.globalError}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof GlobalErrorTemplate> = {
    title: 'DE/Template Attribute/Komponenten/Globaler Fehler',
    component: GlobalErrorTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `globalError` Templates, der sich im Verzeichnis `templates/components/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        errors: {
            globalErrors: [
                {
                    codes: '',
                    defaultMessage: 'Error 1',
                    field: '',
                },
                {
                    codes: '',
                    defaultMessage: 'Error 2',
                    field: '',
                },
            ],
            pageErrors: [
                {
                    codes: '',
                    defaultMessage: 'Error 3',
                    field: '',
                },
            ],
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
