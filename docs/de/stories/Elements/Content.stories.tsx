import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const ContentTemplate = () => {
    return null
}

const meta: Meta<typeof ContentTemplate> = {
    title: 'DE/Template Attribute/Elemente/Content',
    component: ContentTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Dieses Template verfügt über erweiterte Funktionalitäten, die auf einer Komponente basieren, die der Client an das Template übergibt. Um sie anzusehen, musst du den Workspace starten. Die `content` Komponente ist eine dynamische Komponente und befindet sich im Verzeichnis `templates/elements/`. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template-Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
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
