import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const DateFieldTemplate = () => {
    return null
}

const meta: Meta<typeof DateFieldTemplate> = {
    title: 'DE/Template Attribute/Elemente/Datumsfeld',
    component: DateFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a date field template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
