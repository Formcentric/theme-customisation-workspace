import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const HintTemplate = () => {
    return null
}

const meta: Meta<typeof HintTemplate> = {
    title: 'DE/Template Attribute/Komponenten/Hinweis',
    component: HintTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Dieses Template nutzt erweiterte Funktionalitäten durch eine dynamische Komponente, die der Client übergibt. Um diese zu testen, starten Sie den Workspace. Die `hint`-Komponente befindet sich im Verzeichnis `templates/components/`. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template-Funktion. Dies ermöglicht die dynamische Darstellung von Formularelementen in verschiedenen Zuständen.',
            },
        },
    },
}

export default meta

export const Default = {
    args: {
        ...DefaultFieldStoryArgs.args,
        properties: {
            hint: 'A simple hint',
        },
    },
    argTypes: {
        ...DefaultFieldStoryArgs.argTypes,
    },
    name: 'Default',
}
