import { Meta } from '@storybook/react'
import { DefaultFieldStoryArgs } from '../Elements'

const DateFieldTemplate = () => {
    return null
}

const meta: Meta<typeof DateFieldTemplate> = {
    title: 'En/Template Properties/Elements/Date Field',
    component: DateFieldTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Internally the component uses [React Datepicker](https://reactdatepicker.com/) to render a datepicker and generate multilingual datetime formats. All properties of the datepicker and its input field can be overridden via the template. A complete list of all available props can be found in the linked documentation.\n\n## Usage\n\nTo use the datepicker or customize its behavior, call `props.components.datePicker()` in the template.\n\n### Example: Setting the minimum selectable date to the current date and adding an aria-label to the input field\n\n```js\nprops.components.datePicker({ ...props, datePickerProps: { minDate: new Date() }, datepickerInputProps: { "aria-label": "Select date" } })\n```',
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
