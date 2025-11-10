import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const ComboboxTemplate = () => {
    return null
}

const meta: Meta<typeof ComboboxTemplate> = {
    title: 'DE/Template Attribute/Elemente/Combobox',
    component: ComboboxTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Dieses Template nutzt erweiterte Funktionalitäten durch eine dynamische Komponente, die der Client übergibt. Um diese zu testen, starten Sie den Workspace. Die `comboBox`-Komponente befindet sich im Verzeichnis `templates/elements/`. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template-Funktion. Dies ermöglicht die dynamische Darstellung von Formularelementen in verschiedenen Zuständen.',
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
