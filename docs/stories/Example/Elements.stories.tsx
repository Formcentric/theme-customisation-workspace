import React from 'react'
import { Meta } from '@storybook/react'
import { ElementStory, Element } from './Elements'
import Template from '../helpers/Template'
import variables from './theme'

const ElementTemplate = (props: ElementStory) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.inputField}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof ElementTemplate> = {
    title: 'Properties/Form Elements',
    component: ElementTemplate,
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

export const Default: ElementStory = {
    ...Element,
    name: 'Input Field',
}
