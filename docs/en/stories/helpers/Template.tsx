import React, { useEffect, useRef } from 'react'
import { render } from 'preact'
import { html } from 'htm/preact'
import { convertVariables } from './convertColors'

const Template = ({
    template,
    variables,
    props,
    child,
    size,
}: {
    template: (html: unknown, props: object, child?: object) => preact.VNode
    variables: Record<string, string>
    props: object
    child?: object
    size?: string
}) => {
    const element = useRef<HTMLDivElement>(null)

    const cssVariables = Object.entries(convertVariables(variables)).reduce((acc, [key, value]) => {
        return {
            ...acc,
            [`--${key}`]: value,
        }
    }, {})

    useEffect(() => {
        if (!element.current) return
        if (child) render(template(html, props, child), element.current)
        if (size) render(template(html, props, size), element.current)
        if (!size && !child) render(template(html, props), element.current)
    }, [element?.current, props])

    return (
        <div
            data-fc-id='Storybook'
            style={{
                ...cssVariables,
                ['--logoImage']: 'url("../../../../src/assets/img/favicon.ico")',
                ['--logoDisplay']: 'true',
            }}
        >
            <div
                className='fc-form'
                style={{ padding: '2rem' }}
            >
                <div className='fc-pages'>
                    <div
                        id='fc-page-wrapper-0'
                        className='fc-page-wrapper fc-page-wrapper--current'
                    >
                        <div
                            id='fc-page-0'
                            className='fc-page'
                            ref={element}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template
