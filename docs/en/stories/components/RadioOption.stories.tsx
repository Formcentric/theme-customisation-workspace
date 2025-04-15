import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const RadioOption = (props: ElementProps) => {
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
                    'Implementation of a form element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default: ElementStory = {
    args: {
        ...Element.args,
        child: {
            id: '1',
            name: 'option-a',
            value: 'A',
            label: 'Option A',
            checked: false,
        },
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Radio option',
}

export const Checked: ElementStory = {
    args: {
        ...Element.args,
        child: {
            id: '1',
            name: 'option-a',
            value: 'A',
            label: 'Option A',
            checked: true,
        },
    },
    argTypes: {
        ...Element.argTypes,
    },
    name: 'Radio option checked',
}
