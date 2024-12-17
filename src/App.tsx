import { useEffect, useLayoutEffect } from 'react'
import { FormPreview } from './components/FormPreview'
import './App.css'
import styled from 'styled-components'
import { ThemeData, useThemeStore } from './themeStore'
import Sidebar from './components/Sidebar'
import fcThemes from './util/fcThemesList.json'
import themes from './util/themesList.json'
import cloudConfig from '../config/cloudConfig.json'
import localConfig from '../config/localConfig.json'
import { ThemesPreview } from './components/ThemesPreview'

declare global {
    interface Window {
        formcentric: Record<string, unknown>
    }
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 350px 1fr 60rem 2fr;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: #f0f2fc;
`

function App() {
    const formDefinition = useThemeStore(s => s.formDefinition)
    const setThemeData = useThemeStore(s => s.setThemeData)

    useEffect(() => {
        // Fetch definition.json for each theme dynamically
        const fetchThemes = async () => {
            const loadedThemes: (ThemeData | null)[] = await Promise.all(
                fcThemes.map(async themeName => {
                    try {
                        // Dynamic import for the definition.json of each theme
                        const definition = await import(`./fc-themes/${themeName}/definition.json`)

                        // Dynamic import for the preview image
                        const image = await import(`./fc-themes/${themeName}/img/preview-image.png`)

                        return {
                            id: definition.theme,
                            name: definition.labels.en,
                            description: definition.descriptions.en,
                            previewImageSrc: image.default,
                        }
                    } catch (error) {
                        console.error(`Error loading definition.json for theme ${themeName}`, error)
                        return null // Handle missing or broken definitions
                    }
                }),
            )

            // Filter out any null results (failed imports)
            const filteredThemes = loadedThemes.filter(theme => theme !== null)

            setThemeData(filteredThemes)
        }

        fetchThemes()
    }, [])

    const unmountFormappInstances = async () => {
        try {
            const scripts = document.querySelectorAll('.script_formcentric')

            scripts.forEach(script => script?.parentNode?.removeChild(script))

            const fcScript = document.querySelector('.script_formcentric_js')
            if (fcScript) fcScript?.parentNode?.removeChild(fcScript)

            window.formcentric = {}

            // Remove stylesheets with the attribute 'formcentric-source'
            const stylesheets = document.querySelectorAll('link[formcentric-source], style[formcentric-source]')

            stylesheets.forEach(stylesheet => {
                stylesheet?.parentNode?.removeChild(stylesheet)
            })
        } catch {
            console.log('formapp could not be unmounted')
        }
    }

    const addFormcentricScript = () => {
        const fcScript = document.querySelector('.script_formcentric_js')
        if (fcScript) fcScript?.parentNode?.removeChild(fcScript)

        // Dynamically load the Formcentric script
        const script = document.createElement('script')
        script.className = 'script_formcentric_js'
        script.src = '/src/assets/formcentric.js'
        document.body.appendChild(script)
    }

    const {
        selectedTheme,
        themeDir,
        setSelectedTheme,
        setThemeDir,
        selectedCloudForm,
        setSelectedCloudForm,
        setFormDefinition,
    } = useThemeStore(s => s)

    useLayoutEffect(() => addFormcentricScript(), [])

    useEffect(() => {
        const isCustomTheme = (themes as string[]).includes(selectedTheme)
        const isFcTheme = fcThemes.includes(selectedTheme)

        if (!isFcTheme && !isCustomTheme && selectedTheme) handleThemeChange('')

        if (FC_ENV === 'cloud' && !selectedCloudForm) setSelectedCloudForm(cloudConfig.fcForms[0].id)
    }, [])

    const reloadFormapp = async () => {
        await unmountFormappInstances()
        addFormcentricScript()
    }

    const handleThemeChange = (themeName: string, custom?: boolean) => {
        if (themeName === selectedTheme) return
        const themeFolder = custom ? '/dist/themes' : '/src/fc-themes'
        setSelectedTheme(themeName)
        setThemeDir(themeFolder)
        reloadFormapp()
    }

    const handleFormChange = (form: string) => {
        if (FC_ENV === 'cloud') {
            setSelectedCloudForm(form)
        } else {
            setFormDefinition(form)
        }

        setTimeout(() => location.reload(), 400)
    }

    const localFormDefinition = formDefinition ? formDefinition : localConfig.fcFormDefinition

    const commonProps = {
        'data-fc-formapp-url': '/src/assets/formapp.js',
        'data-fc-theme-dir': themeDir,
        'data-fc-theme': selectedTheme,
    }

    const environmentProps = {
        cloud: {
            'data-fc-id': selectedCloudForm,
        },
        local: {
            'data-fc-id': 'FKDJDFSKJDFIOFDOI',
            'data-fc-data-url': localConfig.fcDataUrl,
            'data-fc-form-definition': localFormDefinition,
        },
    }

    return (
        <Wrapper>
            <Sidebar
                selectedTheme={selectedTheme}
                handleThemeChange={handleThemeChange}
                formOptions={cloudConfig.fcForms}
                handleFormChange={handleFormChange}
            />
            {selectedTheme ? (
                <FormPreview
                    selectedTheme={selectedTheme}
                    selectedForm={selectedCloudForm}
                    clientAttributes={{ ...commonProps, ...environmentProps[FC_ENV] }}
                />
            ) : (
                <ThemesPreview handleThemeChange={handleThemeChange} />
            )}
        </Wrapper>
    )
}

export default App
