import { Meta } from '@storybook/react'
import { ElementStory, Element, DateField } from '../../../../.storybook/Elements'

const CaptchaFieldTemplate = () => {
    return null
}

const meta: Meta<typeof CaptchaFieldTemplate> = {
    title: 'En/Template Properties/Elements/CaptchaField',
    component: CaptchaFieldTemplate,
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
    name: 'Captcha field',
}
