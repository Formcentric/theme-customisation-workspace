import { Meta } from '@storybook/react'
import { ElementStory, ElementProps, Element, DateField } from '../../../../.storybook/Elements'

const DateFieldTemplate = (props: ElementProps) => {
    return null
}

const meta: Meta<typeof DateFieldTemplate> = {
    title: 'De/Template Attribute/Elements/DateField',
    component: DateFieldTemplate,
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
        ...DateField.args,
    },
    argTypes: {
        ...Element.argTypes,
        ...DateField.argTypes,
    },
    name: 'Date field',
}
