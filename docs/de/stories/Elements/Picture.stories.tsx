import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { TemplateProps } from '../../../types/Templates'

const PictureTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.picture}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof PictureTemplate> = {
    title: 'DE/Template Attribute/Elemente/Bild',
    component: PictureTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a picture element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
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
                original: '../../../../assets/theme-overview.jpg',
            },
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
