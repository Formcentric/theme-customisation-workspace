import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element } from '../../../../.storybook/Elements'
import Template from '../helpers/Template'
import React from 'react'
import variables from '../helpers/theme'

const CheckBoxOptionComponentTemplate = (props: ElementProps) => {
    return (
        <Template
            template={window.formcentric.formapp.components.checkBoxOption}
            props={props}
            child={props.child}
            variables={variables}
        />
    )
}

const meta: Meta<typeof CheckBoxOptionComponentTemplate> = {
    title: 'EN/Template Properties/Components/Checkbox Option',
    component: CheckBoxOptionComponentTemplate,
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
    name: 'Checkbox option',
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
    name: 'Checkbox option checked',
}
