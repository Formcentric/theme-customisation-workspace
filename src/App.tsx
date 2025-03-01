import { useEffect, useLayoutEffect } from 'react'
import { FormPreview } from './components/FormPreview'
import './App.css'
import styled from 'styled-components'
import { ThemeData, useThemeStore } from './themeStore'
import Sidebar from './components/Sidebar'
import fcThemes from './util/fcThemesList.json'
import themes from './util/themesList.json'
import cloudConfig from '../config/cloud.config.json'
import localConfig from '../config/local.config.json'
import { ThemesPreview } from './components/ThemesPreview'
import config from '../config/formcentric.config.js'
import { generateUid, removeUid } from './helpers/uid'

declare global {
    interface Window {
        formcentric: {
            initFormcentric: () => void
            formapp: {
                instances: Record<
                    string,
                    {
                        initElement: HTMLElement
                        options: Record<string, unknown>
                        stop: VoidFunction
                        unmount: VoidFunction
                    }
                >
                templates: Record<string, unknown>
            }
        }
    }
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 350px 1fr minmax(30rem, 60rem) 2fr;
    gap: 1rem;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: #f0f2fc;
`

function App() {
    const formDefinition = useThemeStore(s => s.formDefinition)
    const setThemeData = useThemeStore(s => s.setThemeData)
    const modulePath = useThemeStore(s => s.modulePath)

    useEffect(() => {
        // Fetch definition.json for each theme dynamically
        const fetchThemes = async () => {
            const loadedThemes: (ThemeData | null)[] = await Promise.all(
                fcThemes.map(async themeName => {
                    try {
                        // Using proper Vite dynamic import syntax
                        const definition = await import(
                            /* @vite-ignore */
                            `${modulePath}/themes/${themeName}/definition.json`
                        )

                        const image = await import(
                            /* @vite-ignore */
                            `${modulePath}/themes/${themeName}/img/preview-image.png`
                        )

                        return {
                            id: generateUid(definition.theme),
                            name: definition.labels.en,
                            description: definition.descriptions.en,
                            previewImageSrc: image.default,
                        }
                    } catch (error) {
                        console.error(`Error loading definition.json for theme ${themeName}`, error)
                        return null
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

            scripts.forEach(script => {
                if (script.getAttribute('src')?.includes('script.js')) script?.parentNode?.removeChild(script)
            })

            const fcScript = document.querySelector('.script_formcentric_js')
            if (fcScript) fcScript?.parentNode?.removeChild(fcScript)

            // Remove stylesheets with the attribute 'formcentric-source'
            const stylesheets = document.querySelectorAll('link[formcentric-source], style[formcentric-source]')

            stylesheets.forEach(stylesheet => {
                stylesheet?.parentNode?.removeChild(stylesheet)
            })
        } catch {
            console.error('Formapp could not be unmounted')
        }
    }

    const addFormcentricScript = () => {
        const fcScript = document.querySelector('.script_formcentric_js')
        if (fcScript) fcScript?.parentNode?.removeChild(fcScript)

        // Dynamically load the Formcentric script
        const script = document.createElement('script')
        script.className = 'script_formcentric_js'
        script.src = modulePath + '/formcentric.js'
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

        if (!isFcTheme && !isCustomTheme && selectedTheme) setSelectedTheme('')

        if (FC_ENV === 'cloud' && !selectedCloudForm) setSelectedCloudForm(cloudConfig.fcForms[0].id)
    }, [])

    const reloadFormapp = async () => {
        await unmountFormappInstances()
        addFormcentricScript()
    }

    const handleThemeChange = (themeName: string, custom?: boolean) => {
        if (themeName === selectedTheme) return
        Object.values(window?.formcentric?.formapp?.instances || {}).forEach(instance => instance?.stop())
        const themeFolder = custom ? config.paths.output : config.paths.moduelPath

        setSelectedTheme(themeName)
        setThemeDir(themeFolder)
        reloadFormapp()
    }

    const handleFormChange = (form: string) => {
        Object.values(window?.formcentric?.formapp?.instances || {}).forEach(instance => instance?.stop())

        if (FC_ENV === 'cloud') {
            setSelectedCloudForm(form)
        } else {
            setFormDefinition(form)
        }

        setTimeout(() => location.reload(), 400)
    }

    const localFormDefinition = formDefinition ? formDefinition : localConfig.fcFormDefinition

    const commonProps = {
        'data-fc-formapp-url': modulePath + '/formapp.js',
        'data-fc-theme-dir': themeDir,
        'data-fc-theme': removeUid(selectedTheme),
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
                formOptions={cloudConfig.fcForms}
                handleThemeChange={handleThemeChange}
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
