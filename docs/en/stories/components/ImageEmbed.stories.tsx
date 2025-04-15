import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const ImageEmbed = (props: ElementProps) => {
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
    title: 'EN/Template Properties/Components/Image Embed',
    component: ImageEmbed,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a form element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default: ElementStory = {
    args: {
        ...Element.args,
        properties: {
            pictureUrl: {
                md: 'https://formcentric.com/assets/images/bereitgestellte-bilder/usp-location_usp_card_standard.png',
            },
        },
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Image Embed Component',
}
