import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const DateFieldTemplate = () => {
    return null
}

const meta: Meta<typeof DateFieldTemplate> = {
    title: 'DE/Template Attribute/Elemente/Datumsfeld',
    component: DateFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Intern verwendet die Komponente [React Datepicker](https://reactdatepicker.com/), um einen Datepicker zu rendern und mehrsprachige Datetimeformate zu generieren. Alle properties des Datepickers und dessen Eingabefeld können über das Template überschrieben werden. Eine vollständige Liste aller verfügbaren Props finden Sie in der verlinkten Dokumentation.\n\n## Verwendung\n\nUm den Datepicker zu verwenden oder dessen Verhalten anzupassen, rufen Sie `props.components.datePicker()` im Template auf.\n\n### Beispiel: Setzen des minimal auswählbaren Datums auf das aktuelle Datum und Hinzufügen eines aria-labels am Inputfeld\n\n```js\nprops.components.datePicker({ ...props, datePickerProps: { minDate: new Date() }, datepickerInputProps: { "aria-label": "Datum auswählen" } })\n```',
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
