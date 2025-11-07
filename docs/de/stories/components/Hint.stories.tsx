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
                    'Dieses Template verfügt über erweiterte Funktionalitäten, die auf einer Komponente basieren, die der Client an das Template übergibt. Um sie anzusehen, müssen Sie den Workspace starten. Die `hint` Komponente ist eine dynamische Komponente und befindet sich im Verzeichnis `templates/components/`. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template-Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
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
