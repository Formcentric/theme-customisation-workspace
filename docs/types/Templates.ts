export type TemplateProps = {
    formId: string
    id: string
    name: string
    label: string
    value: string
    properties: {
        style_class?: string
        placeholder?: string
        hint?: string
        shortHint?: string
        mandatory?: boolean
        type?: string
        autocomplete?: string
        maxlength?: number
        disabled?: boolean
        readonly?: boolean
        hidden?: boolean
        visible?: boolean
        field_width?: 'mwf-s' | 'mwf-m' | 'mwf-l' | undefined
    }
    components: {
        captcha: () => React.ReactNode
        fileUploader: (props: TemplateProps) => React.ReactNode
        comboBox: (props: TemplateProps) => React.ReactNode
        suggestions: (props: TemplateProps) => React.ReactNode
        hint: (props: TemplateProps & { additionalClosureButton: boolean }) => React.ReactNode
        markdown: (props: { markdown: string; data?: Record<string, string> }) => React.ReactNode
        datePicker: (props: TemplateProps) => React.ReactNode
        siganture: (props: TemplateProps & { colors: { applyFromTheme: boolean } }) => React.ReactNode
    }
    fieldFocused?: boolean
    fieldError?: { defaultMessage?: string }
    fieldSuccess?: boolean
    translation: (key: string, _params?: Record<string, string>) => string
    oninput: () => void
    onfocus: () => void
    onblur: () => void
}
