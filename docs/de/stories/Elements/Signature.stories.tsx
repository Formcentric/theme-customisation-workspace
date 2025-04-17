import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const SignatureTemplate = () => {
    return null
}

const meta: Meta<typeof SignatureTemplate> = {
    title: 'En/Template Properties/Elements/Signature',
    component: SignatureTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a signature field template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
