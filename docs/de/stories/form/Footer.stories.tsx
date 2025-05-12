import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import Template from '../../../helpers/Template'
import variables from '../../../helpers/theme'
import { FooterStory, FooterProps, Footer } from '../Footer'

const FooterTemplate = (props: FooterProps) => {
    const { currentPage, pageCount } = props
    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage)

    const handlePageChange = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const buttonName = evt.currentTarget.name
        let newPage = localCurrentPage

        switch (buttonName) {
            case '_next':
                newPage = Math.min(localCurrentPage + 1, pageCount)
                break
            case '_back':
                newPage = Math.max(localCurrentPage - 1, 1)
                break
        }

        // Update button states
        const isFirstPage = newPage === 1
        const isLastPage = newPage === pageCount

        props._back.properties = {
            ...props._back.properties,
            hidden: isFirstPage,
            visible: !isFirstPage,
            enabled: !isFirstPage,
        }

        props._next.properties = {
            ...props._next.properties,
            hidden: isLastPage,
            visible: !isLastPage,
            enabled: !isLastPage,
        }

        props._finish.properties = {
            ...props._finish.properties,
            hidden: !isLastPage,
            visible: isLastPage,
            enabled: isLastPage,
        }

        setLocalCurrentPage(newPage)
    }

    props._back.onclick = handlePageChange
    props._next.onclick = handlePageChange

    return (
        <Template
            template={window.formcentric.formapp.templates.formFooter}
            props={{ ...props, currentPage: localCurrentPage }}
            variables={variables}
        />
    )
}

const meta: Meta<typeof FooterTemplate> = {
    title: 'DE/Template Attribute/Formular/Footer',
    component: FooterTemplate,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Implementierung eines `footer` Templates, das sich im Verzeichnis `templates/form/` befindet. Der Formcentric-Client übergibt die aufgelisteten Eigenschaften als zweites Argument an die Template Funktion, wodurch eine dynamische Darstellung von Formularelementen in verschiedenen Zuständen ermöglicht wird.',
            },
        },
    },
}

export default meta

export const Default: FooterStory = {
    ...Footer,
    name: 'Default',
}
