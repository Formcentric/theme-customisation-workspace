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
    title: 'EN/Template Properties/Components/Radio Option',
    component: RadioOption,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a `radioOption` template located in `templates/components/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
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
