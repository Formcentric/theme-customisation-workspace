import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const CaptchaFieldTemplate = () => {
    return null
}

const meta: Meta<typeof CaptchaFieldTemplate> = {
    title: 'En/Template Properties/Elements/Captcha',
    component: CaptchaFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a captcha element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
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
