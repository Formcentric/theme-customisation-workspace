import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const ParagraphTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.paragraph}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ParagraphTemplate> = {
    title: 'EN/Template Properties/Elements/Paragraph',
    component: ParagraphTemplate,
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
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Paragraph field',
}
