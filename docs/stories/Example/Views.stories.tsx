import React from 'react'
import { Meta } from '@storybook/react'
import Template from '../helpers/Template'
import variables from './theme'
import { View, ViewStory } from './Views'

const ViewTemplate = (props: ViewStory) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.redirect}
            props={props}
            variables={variables}
        />
    )
}

const meta: Meta<typeof View> = {
    title: 'Properties/Views',
    component: ViewTemplate,
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

export const Default: ViewStory = {
    ...View,
    name: 'Redirect',
}
