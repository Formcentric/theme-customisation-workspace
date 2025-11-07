import React from 'react'
import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'
import { TemplateProps } from '../../../types/Templates'
import variables from '../../../helpers/theme'
import Template from '../../../helpers/Template'

const FileUploadTemplate = (props: TemplateProps) => {
    return (
        <Template
            template={window.formcentric.formapp.templates.hiddenField}
            props={props}
            variables={variables}
        />
    )
}
const meta: Meta<typeof FileUploadTemplate> = {
    title: 'En/Template Properties/Elements/File Upload',
    component: FileUploadTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    "This component has extended functionality which is based on an internal react component the client passes to the template. To view it you will have to start the workspace. The `fileUpload` component is a dynamic component located in `templates/elements/`. Formcentric client passes the listed properties as the second argument to the template function, enabling dynamic rendering of form elements in various states.\n\n## Uppy\n\nInternally the component uses [Uppy React](https://uppy.io/docs/react/) to render an upload dashboard and handle the upload logic. All Dashboard and Button properties can be overriden. For more information on specific props please refer to the aforementioned documentation.\n\n## Usage\n\nFormcentric offers two separate integration modes of this library:\n\n1. Inline upload dashboard\n2. Upload modal\n\nWhich type is being used depends on how the template has been customized. You can either omit a trigger button and the trigger prop when calling `props.component.fileUploader(<your-props>)` to render the upload dashboard inline within the form, or you can add them and thus create a button trigger that opens a modal.\n\n### Example: Inline upload dashboard\n\n```js\nprops.components.fileUploader({\n  id: props.id,\n  onblur: props.onblur,\n  onfocus: props.onfocus,\n  // No trigger prop = inline dashboard\n  dashboardProps: {\n      disabled: props?.disabled,\n  },\n  buttonProps: {\n      type: 'button',\n      name: props.name,\n      'aria-disabled': props.disabled,\n      'aria-errormessage': `fc-error-${props.id}`,\n      'aria-invalid': !!props.fieldError?.defaultMessage,\n      'aria-describedby': `fc-hint-${props.id}`,\n  },\n})\n```\n\n### Example: Upload modal\n```js\nprops.components.fileUploader({\n  id: props.id,\n  onblur: props.onblur,\n  onfocus: props.onfocus,\n  // Modal configuration with trigger and target\n  dashboardProps: {\n    trigger: `#${props.id}`,\n    target: document.querySelector(`[data-fc-form=\"${props.formId}\"]`),\n  },\n})\n```",
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
