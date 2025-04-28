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
    title: 'DE/Template Attribute/Komponenten/Image Embed',
    component: ImageEmbed,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a form element template located in `templates/components/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
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
