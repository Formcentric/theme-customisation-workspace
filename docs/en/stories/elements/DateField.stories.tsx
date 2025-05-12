import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const DateFieldTemplate = () => {
    return null
}

const meta: Meta<typeof DateFieldTemplate> = {
    title: 'En/Template Properties/Elements/Date Field',
    component: DateFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'This component has extended functionality which is based on a component the client passes to the template. To view it you will have to start the workspace. The `dateField` component is a dynamic component located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
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
