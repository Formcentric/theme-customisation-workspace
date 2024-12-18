import styled from 'styled-components'
import { useThemeStore } from '../themeStore'

const Themes = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1rem;
    width: calc(100vw - 350px);
    padding: 3rem 3rem 3rem 2rem;
    overflow: auto;
`

const ThemeCard = styled.div`
    box-shadow: 0 4px 20px rgba(10, 0, 82, 0.1);
    background: #f7f8fd;
    border-radius: 16px;
    padding: 1.4rem 1rem 1rem 1rem;
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
        line-height: 1.4rem;
        color: #473f7d;
    }
`

const ThemeInfo = styled.div`
    padding: 1rem;
`

const PreviewImg = styled.img`
    width: 100%;
    border-radius: 9px;
    margin-top: 1rem;
`

interface ThemesPreviewP {
    handleThemeChange: (themeName: string, custom?: boolean) => void
}

export const ThemesPreview = ({ handleThemeChange }: ThemesPreviewP) => {
    const themeData = useThemeStore(s => s.themeData)

    return (
        <Themes>
            {themeData.map(theme => (
                <ThemeCard
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id, false)}
                >
                    <ThemeInfo>
                        <h2>{theme.name}</h2>
                        <p>{theme.description}</p>
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
