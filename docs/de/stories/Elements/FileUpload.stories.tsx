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
    title: 'DE/Template Attribute/Elemente/Datei-Upload',
    component: FileUploadTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    "Diese Komponente verfügt über erweiterte Funktionalitäten, die auf einer internen React-Komponente basieren, die der Client an das Template übergibt. Um sie anzusehen, musst du den Workspace starten. Die `fileUpload` Komponente ist eine dynamische Komponente und befindet sich im Verzeichnis `templates/elements/`. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template-Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.\n\n## Uppy\n\nIntern verwendet die Komponente [Uppy React](https://uppy.io/docs/react/) um ein Upload-Dashboard zu rendern und die Upload-Logik zu handhaben.\n\n## Verwendung\n\nFormcentric bietet zwei separate Integrationsmodi dieser Bibliothek:\n\n1. Inline Upload-Dashboard\n2. Upload-Modal\n\nWelcher Typ verwendet wird, hängt davon ab, wie das Template angepasst wurde. Du kannst entweder einen Trigger-Button und die Trigger-Eigenschaft weglassen, wenn du `props.component.fileUploader(<deine-props>)` aufrufst, um das Upload-Dashboard inline im Formular zu rendern, oder du kannst sie hinzufügen und somit einen Button-Trigger erstellen, der ein Modal öffnet.\n\n### Beispiel: Inline Upload-Dashboard\n\n```js\nprops.components.fileUploader({\n  id: props.id,\n  onblur: props.onblur,\n  onfocus: props.onfocus,\n  // Keine Trigger-Eigenschaft = Inline-Dashboard\n  dashboardProps: {\n      disabled: props?.disabled,\n  },\n  buttonProps: {\n      type: 'button',\n      name: props.name,\n      'aria-disabled': props.disabled,\n      'aria-errormessage': `fc-error-${props.id}`,\n      'aria-invalid': !!props.fieldError?.defaultMessage,\n      'aria-describedby': `fc-hint-${props.id}`,\n  },\n})\n```\n\n### Beispiel: Upload-Modal\n```js\nprops.components.fileUploader({\n  id: props.id,\n  onblur: props.onblur,\n  onfocus: props.onfocus,\n  // Modal-Konfiguration mit Trigger und Target\n  dashboardProps: {\n    trigger: `#${props.id}`,\n    target: document.querySelector(`[data-fc-form=\"${props.formId}\"]`),\n  },\n})\n```",
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
