import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const SignatureTemplate = () => {
    return null
}

const meta: Meta<typeof SignatureTemplate> = {
    title: 'DE/Template Attribute/Elemente/Signatur',
    component: SignatureTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Diese Komponente nutzt erweiterte Funktionalitäten durch eine dynamische React-Komponente, die der Client übergibt. Um diese zu testen, starten Sie den Workspace. Die `signature`-Komponente befindet sich im Verzeichnis `templates/elements/`. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template-Funktion. Dies ermöglicht die dynamische Darstellung von Formularelementen in verschiedenen Zuständen.',
            },
        },
    },
}

export default meta

export const Default = {
    ...DefaultFieldStoryArgs,
    name: 'Default',
}
