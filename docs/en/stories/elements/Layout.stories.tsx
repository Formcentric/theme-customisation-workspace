import React from 'react'
import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import variables from '../helpers/theme'

const LayoutTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.layout}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof LayoutTemplate> = {
    title: 'EN/Template Properties/Elements/Layout',
    component: LayoutTemplate,
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
    ...Element,
    name: 'Layout',
}
