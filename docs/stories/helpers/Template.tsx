import React, { useEffect, useRef } from 'react'
import { render } from 'preact'
import { html } from 'htm/preact'
import { convertVariables } from './convertColors'

const Template = ({
    template,
    variables,
    props,
}: {
    template: (html: unknown, props: object) => preact.VNode
    variables: Record<string, string>
    props: object
}) => {
    const element = useRef<HTMLDivElement>(null)
    const preactElement = template(html, props)

    const cssVariables = Object.entries(convertVariables(variables)).reduce((acc, [key, value]) => {
        return {
            ...acc,
            [`--${key}`]: value,
        }
    }, {})

    useEffect(() => {
        if (element.current) {
            render(preactElement, element.current)
        }
    }, [element?.current, props])

    return (
        <div
            data-fc-id='Storybook'
            style={cssVariables}
        >
            <div className='fc-form'>
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
