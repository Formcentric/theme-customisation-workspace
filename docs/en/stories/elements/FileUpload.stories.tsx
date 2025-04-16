import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const FileUploadTemplate = () => {
    return null
}

const meta: Meta<typeof FileUploadTemplate> = {
    title: 'En/Template Properties/Elements/File Upload',
    component: FileUploadTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementation of a file upload fieldset element template located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
