import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const ComboboxTemplate = () => {
    return null
}

const meta: Meta<typeof ComboboxTemplate> = {
    title: 'EN/Template Properties/Elements/Combobox',
    component: ComboboxTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a dropdown element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
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
