import styled from 'styled-components'
import themes from '../util/themesList.json'
import logo from '../assets/img/favicon.ico'
import FormDropdown, { Option } from './FormDropdown'
import { useThemeStore } from '../themeStore'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'
import { removeUid } from '../helpers/uid'

const Wrapper = styled.div`
    width: 350px;
    background: #f0f2fc;
    height: 100vh;
    padding: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: #473f7d;
    grid-column: 1/2;
    border-right: 1px solid rgba(71, 63, 125, 0.1);
`

const Logo = styled.a`
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;

    > p {
        color: #473f7d;
        font-family: ArchivoExpanded;
        font-weigth: 500;
        font-size: 20px;
    }
`

const Title = styled.p`
    color: #473f7d;
    font-family: ArchivoExpanded;
    margin: 3rem 1rem 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
`

const ThemeDir = styled.div`
    padding: 0 0 0 0;
`

const Themes = styled.div`
    background:
        linear-gradient(#f0f2fc 30%, rgba(240, 242, 252, 0)) center top,
        linear-gradient(rgba(240, 242, 252, 0), #f0f2fc 70%) center bottom,
        radial-gradient(farthest-side at 50% 0, rgba(10, 0, 82, 0.05), rgba(10, 0, 82, 0)) center top,
        radial-gradient(farthest-side at 50% 100%, rgba(10, 0, 82, 0.05), rgba(10, 0, 82, 0)) center bottom;

    background-repeat: no-repeat;
    background-size:
        100% 40px,
        100% 40px,
        100% 14px,
        100% 14px;
    background-attachment: local, local, scroll, scroll;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 1.5em !important;
        height: 1.5em !important;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent !important;
    }

    &::-webkit-scrollbar-thumb {
        height: 1em !important;
        border: 0.55em solid rgba(0, 0, 0, 0) !important;
        background-clip: padding-box !important;
        -webkit-border-radius: 1em !important;
        background-color: rgba(71, 63, 125, 0.2) !important;
        -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025) !important;
    }
    &::-webkit-scrollbar-button {
        width: 0 !important;
        height: 0 !important;
        display: none !important;
    }
    &::-webkit-scrollbar-corner {
        background-color: transparent !important;
    }
`

const ThemeItem = styled.div<{ $selected?: boolean }>`
    color: #473f7d;
    font-family: Archivo;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1em;
    color: ${props => (props.$selected ? '#0a0052' : 'inherit')};
    font-weight: ${props => (props.$selected ? '500' : '400')};
    transition: 300ms ease;
    margin: 0.2rem 0;
    padding: 0.8rem 1rem;
    position: relative;
    user-select: none;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        height: 40px;
        width: 6px;
        background: ${props => (props.$selected ? '#B5B2CB' : 'transparent')};
        border-radius: 0px 90px 90px 0px;
        transition: 300ms ease;
    }

    &:hover {
        color: #0a0052;
    }
`

const Divider = styled.div`
    border-bottom: 1px solid rgba(71, 63, 125, 0.1);
    margin: 0;
`

const Menu = styled.div`
    margin-top: auto;
    margin-bottom: 2rem;

    a:visited {
        color: inherit;
    }

    > div {
    }
`

const MenuItem = styled.a`
    padding: 1rem;
    font-size: 14px;
    display: block;
    font-family: ArchivoExpanded;
    cursor: pointer;
    transition: 200ms ease;
    text-decoration: none;

    > span {
        padding-bottom: 0.2rem;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            width: 100%;
            top: 100%;
            left: 0;
            border-bottom: solid 2px transparent;
            transition: 200ms ease;
        }

        &:hover::after {
            content: '';
            position: absolute;
            width: 100%;
            top: 100%;
            left: 0;
            border-bottom: solid 2px #0a0052;
        }
    }
`

const FormChooser = styled.div`
    padding: 0 1rem;
`

const FormDefInput = styled.textarea`
    font-family: 'Archivo';
    width: 100%;
    padding: 1rem;
    border: 1px solid #dadae5;
    border-radius: 6px;

    &:focus {
        border-color: #b5b2cb;
        outline: none;
    }

    &::placeholder {
        color: #b5b2cb;
    }
`

interface SidebarP {
    selectedTheme: string
    formOptions: Option[]
    handleThemeChange: (themeName: string, custom?: boolean) => void
    handleFormChange: (id: string) => void
}

const Sidebar = ({ selectedTheme, formOptions, handleThemeChange, handleFormChange }: SidebarP) => {
    const isCloud = FC_ENV === 'cloud'
    const formDefinition = useThemeStore(s => s.formDefinition)
    const [definition, setDefinition] = useState(formDefinition)

    const themeData = useThemeStore(s => s.themeData)

    const debouncedFormChange = useCallback(debounce(handleFormChange, 500), [])

    const handleFormDefinitionChange = (value: string) => {
        setDefinition(value)
        debouncedFormChange(value)
    }

    return (
        <Wrapper>
            <Logo
                href='https://formcentric.com/'
                target='_blank'
            >
                <img
                    src={logo}
                    width={22}
                />
                <p>FORMCENTRIC</p>
            </Logo>
            <div>
                <Title>Preview Form</Title>
                <FormChooser>
                    {isCloud ? (
                        <FormDropdown
                            options={formOptions}
                            handleChange={handleFormChange}
                        />
                    ) : (
                        <FormDefInput
                            value={definition}
                            rows={6}
                            onChange={e => handleFormDefinitionChange(e.target.value)}
                            placeholder='Enter a form definition'
                        ></FormDefInput>
                    )}
                </FormChooser>
            </div>

            {themes.length > 0 && (
                <>
                    <ThemeDir>
                        <Title>Custom Themes</Title>
                    </ThemeDir>
                    <Divider />
                </>
            )}
            <Themes style={{ maxHeight: '30vh' }}>
                {themes.length > 0 &&
                    themes.map(item => (
                        <ThemeItem
                            key={item}
                            onClick={() => handleThemeChange(item, true)}
                            $selected={selectedTheme === removeUid(item)}
                        >
                            {item}
                        </ThemeItem>
                    ))}
            </Themes>
            {themes.length > 0 && <Divider />}
            <ThemeDir>
                <Title>
                    Official Themes
                    <svg
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleThemeChange('')}
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-layout-grid'
                    >
                        <rect
                            width='7'
                            height='7'
                            x='3'
                            y='3'
                            rx='1'
                        />
                        <rect
                            width='7'
                            height='7'
                            x='14'
                            y='3'
                            rx='1'
                        />
                        <rect
                            width='7'
                            height='7'
                            x='14'
                            y='14'
                            rx='1'
                        />
                        <rect
                            width='7'
                            height='7'
                            x='3'
                            y='14'
                            rx='1'
                        />
                    </svg>
                </Title>
            </ThemeDir>
            <Divider />
            <Themes style={{ flex: 1 }}>
                {themeData.map(item => (
                    <ThemeItem
                        key={item.id}
                        onClick={() => handleThemeChange(item.id)}
                        $selected={selectedTheme === item.id}
                    >
                        {item.name}
                    </ThemeItem>
                ))}
            </Themes>
            <Divider />
            <Menu>
                <Title>Ressources</Title>
                <MenuItem
                    href='https://help.formcentric.com/en/cloud/quick-start/'
                    target='_blank'
                >
                    <span>Cloud Docs</span>
                </MenuItem>
            </Menu>
        </Wrapper>
    )
}

export default Sidebar
