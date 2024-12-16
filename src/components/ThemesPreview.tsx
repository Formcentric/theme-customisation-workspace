import { useEffect, useState } from 'react'
import themes from '../util/fcThemesList.json'
import styled from 'styled-components'

const Themes = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1rem;
    width: calc(100vw - 350px);
    padding: 2rem;
    overflow: auto;
`

const ThemeCard = styled.div`
    box-shadow: 0 4px 20px rgba(10, 0, 82, 0.1);
    background: #f7f8fd;
    border-radius: 9px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: 300ms ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 40px rgba(10, 0, 82, 0.2);
    }

    & h2 {
        font-family: 'ArchivoExpanded';
        font-size: 1.4rem;
        color: #0a0052;
        margin-bottom: 0.6rem;
    }

    & p {
        font-family: 'Archivo';
        color: #473f7d;
    }
`

const ThemeInfo = styled.div`
    padding: 1rem;
`

const PreviewImg = styled.img`
    width: 100%;
    border-radius: 12px;
    margin-top: 1rem;
`

interface ThemesPreviewP {
    handleThemeChange: (themeName: string, custom?: boolean) => void
}

export const ThemesPreview = ({ handleThemeChange }: ThemesPreviewP) => {
    const [themeData, setThemeData] = useState<unknown[]>([])

    useEffect(() => {
        // Fetch definition.json for each theme dynamically
        const fetchThemes = async () => {
            const loadedThemes: unknown[] = await Promise.all(
                themes.map(async themeName => {
                    try {
                        // Dynamic import for the definition.json of each theme
                        const definition = await import(`../fc-themes/${themeName}/definition.json`)

                        // Dynamic import for the preview image
                        const image = await import(`../fc-themes/${themeName}/img/preview-image.png`)

                        return { ...definition, id: themeName, previewImageSrc: image.default }
                    } catch (error) {
                        console.error(`Error loading definition.json for theme ${themeName}`, error)
                        return null // Handle missing or broken definitions
                    }
                }),
            )

            // Filter out any null results (failed imports)
            setThemeData(loadedThemes.filter(theme => theme !== null))
        }

        fetchThemes()
    }, [])

    return (
        <Themes>
            {themeData.map(theme => (
                <ThemeCard
                    key={theme.theme}
                    onClick={() => handleThemeChange(theme.theme, false)}
                >
                    <ThemeInfo>
                        <h2>{theme.labels.en}</h2>
                        <p>{theme.descriptions.en}</p>
                    </ThemeInfo>
                    <PreviewImg
                        src={theme.previewImageSrc}
                        alt=''
                    />
                </ThemeCard>
            ))}
        </Themes>
    )
}
