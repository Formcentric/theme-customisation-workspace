import styled from 'styled-components'
import { ThemeData, useThemeStore } from '../themeStore'

const Themes = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1rem;
    width: calc(100vw - 350px);
    padding: 3rem 3rem 3rem 2rem;
    overflow: auto;

    @media (max-width: 1024px) {
        width: 100%;
        grid-column: 2/3;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    @media (max-width: 768px) {
        grid-column: 1/2;
        grid-template-columns: 1fr;
    }
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

const StatusBadge = styled.div<{ color?: string }>`
    font-family: 'ArchivoExpanded';
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 8px 12px;
    margin-top: 0.5rem;
    border-radius: 8px;
    font-weight: 400;
    font-size: 0.875rem;
    background-color: ${({ color }) => {
        switch (color) {
            case 'red':
                return '#ffe6e6'
            case 'yellow':
                return '#fff8e1'
            case 'green':
                return '#e6ffed'
            default:
                return '#f0f0f0'
        }
    }};
    color: ${({ color }) => {
        switch (color) {
            case 'red':
                return '#d32f2f'
            case 'yellow':
                return '#f9a825'
            case 'green':
                return '#2e7d32'
            default:
                return '#000'
        }
    }};
    cursor: default;
`

const getThemeStatus = (theme: ThemeData) => {
    const isDeprecated = theme?.deprecated

    if (isDeprecated) {
        return {
            color: 'red',
            label: 'Deprecated',
        }
    }

    // Add other statuses if needed
    return null
}

interface ThemesPreviewP {
    handleThemeChange: (themeName: string, custom?: boolean) => void
}

export const ThemesPreview = ({ handleThemeChange }: ThemesPreviewP) => {
    const themeData = useThemeStore(s => s.themeData)

    const handleThemeClick = (themeId: string, custom?: boolean) => {
        handleThemeChange(themeId, custom)
    }

    return (
        <Themes>
            {themeData.map(theme => {
                const status = getThemeStatus(theme)

                return (
                    <ThemeCard
                        key={theme.id}
                        onClick={() => handleThemeClick(theme.id, false)}
                    >
                        <ThemeInfo>
                            <h2>{theme.name}</h2>
                            <p>{theme.description}</p>
                            {status && <StatusBadge color={status.color}>{status.label}</StatusBadge>}
                        </ThemeInfo>
                        <PreviewImg
                            src={theme.previewImageSrc}
                            alt=''
                        />
                    </ThemeCard>
                )
            })}
        </Themes>
    )
}
