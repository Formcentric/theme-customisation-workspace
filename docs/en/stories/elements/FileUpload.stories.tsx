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
                    'This component has extended functionality which is based on a component the client passes to the template. To view it you will have to start the workspace. The `fileUpload` component is a dynamic component located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
