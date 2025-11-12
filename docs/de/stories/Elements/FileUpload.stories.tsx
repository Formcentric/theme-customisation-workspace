import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const FileUploadTemplate = () => {
    return null
}

const meta: Meta<typeof FileUploadTemplate> = {
    title: 'DE/Template Attribute/Elemente/Datei-Upload',
    component: FileUploadTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    "Diese Komponente nutzt erweiterte Funktionalitäten durch eine dynamische React-Komponente, die der Client übergibt. Um diese zu testen, starten Sie den Workspace. Die `fileUpload` Komponente ist eine dynamische Komponente und befindet sich im Verzeichnis `templates/elements/`. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template-Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.\n\n## Uppy\n\nIntern verwendet die Komponente [Uppy React](https://uppy.io/docs/react/) um ein Upload-Dashboard zu rendern und die Upload-Logik zu handhaben.\n\n## Verwendung\n\nFormcentric bietet zwei separate Integrationsmodi dieser Bibliothek:\n\n1. Inline Upload-Dashboard\n2. Upload-Modal\n\nDer verwendete Modus hängt von der Template-Konfiguration ab. Lassen Sie die trigger-Eigenschaft beim Aufruf von `props.components.fileUploader()` weg, um das Upload-Dashboard inline im Formular zu rendern. Fügen Sie die `trigger`-Eigenschaft hinzu, um einen Button zu erstellen, der das Dashboard in einem Modal öffnet.\n\n### Beispiel: Inline Upload-Dashboard\n\n```js\nprops.components.fileUploader({\n  id: props.id,\n  onblur: props.onblur,\n  onfocus: props.onfocus,\n  // Keine Trigger-Eigenschaft = Inline-Dashboard\n  dashboardProps: {\n      disabled: props?.disabled,\n  },\n  buttonProps: {\n      type: 'button',\n      name: props.name,\n      'aria-disabled': props.disabled,\n      'aria-errormessage': `fc-error-${props.id}`,\n      'aria-invalid': !!props.fieldError?.defaultMessage,\n      'aria-describedby': `fc-hint-${props.id}`,\n  },\n})\n```\n\n### Beispiel: Upload-Modal\n```js\nprops.components.fileUploader({\n  id: props.id,\n  onblur: props.onblur,\n  onfocus: props.onfocus,\n  // Modal-Konfiguration mit Trigger und Target\n  dashboardProps: {\n    trigger: `#${props.id}`,\n    target: document.querySelector(`[data-fc-form=\"${props.formId}\"]`),\n  },\n})\n```",
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
