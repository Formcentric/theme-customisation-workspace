import styled, { css } from 'styled-components';
import fcThemes from '../util/fcThemesList.json';
import themes from '../util/themesList.json';
import logo from '../assets/img/favicon.ico';

const NavWrapper = styled.div`
  width: 350px;
  background: #f0f2fc;
  height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: rgb(71 63 125);
  box-shadow: 0 4px 
  z-index: 2;
  grid-column: 1/2;
`;

const Logo = styled.a`
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;

  > p {
    color: rgb(71 63 125);
    font-family: ArchivoExpanded;
    font-weigth: 500;
    font-size: 20px;
  }
`;

const Title = styled.p`
  color: rgb(71 63 125);
  font-family: ArchivoExpanded;
  margin: 2rem 2rem 1.4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ThemeDir = styled.div`
  padding: 0 0 0 0;
`;

const Themes = styled.div`
  max-height: 50vh;
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
    border: 0.5em solid rgba(0, 0, 0, 0) !important;
    background-clip: padding-box !important;
    -webkit-border-radius: 1em !important;
    background-color: rgba(181, 178, 203, 0.7) !important;
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
`;

const ThemeItem = styled.div<{ $selected?: boolean }>`
  color: rgb(71 63 125);
  font-family: Archivo;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1em;
  color: ${(props) => (props.$selected ? '#0a0052' : 'inherit')};
  font-weight: ${(props) => (props.$selected ? '500' : '400')};
  transition: 300ms ease;
  margin: 0.2rem 0;
  padding: 0.8rem 1rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    height: 40px;
    width: 4px;
    background: ${(props) =>
      props.$selected ? '#46b079' : 'transparent'};
    border-radius: 0px 6px 6px 0px;
    transition: 300ms ease;
  }

  &:hover {
    font-weight: 500;
    color: #0a0052;
  }

  ${(props) =>
    props.$selected &&
    css`
      font-weight: 500;
      color: #0a0052;
    `}
`;

const Divider = styled.div`
  border: 0.5px solid #dadae5;
  margin: 0 1rem;
`;

const Menu = styled.div`
  margin-top: auto;
  margin-bottom: 2rem;
  a:visited {
    color: inherit;
  }

  > div {
  }
`;

const MenuItem = styled.a`
  padding: 1rem;
  font-size: 14px;
  display: block;
  font-family: ArchivoExpanded;
  cursor: pointer;
  transition: 200ms ease;

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
    }

    &:hover::after {
      content: '';
      position: absolute;
      width: 100%;
      top: 100%;
      left: 0;
      border-bottom: solid 2px #ffffff;
    }
  }
`;

interface NavigationP {
  selectedTheme: string;
  handleThemeChange: (themeName: string, custom?: boolean) => void;
}

const Sidebar = ({
  selectedTheme,
  handleThemeChange,
}: NavigationP) => {
  return (
    <NavWrapper>
      <Logo href="https://formcentric.com/" target="_blank">
        <img src={logo} width={22} />
        <p>FORMCENTRIC</p>
      </Logo>
      {themes.length > 0 && (
        <ThemeDir>
          <Title>Custom Themes</Title>
          <Divider />
          <Themes>
            {themes.map((item) => (
              <ThemeItem
                key={item}
                onClick={() => handleThemeChange(item, true)}
                $selected={selectedTheme === item}
              >
                {item}
              </ThemeItem>
            ))}
          </Themes>
        </ThemeDir>
      )}
      <ThemeDir>
        <Title>Official Themes</Title>
        <Divider />
        <Themes>
          {fcThemes.map((item) => (
            <ThemeItem
              key={item}
              onClick={() => handleThemeChange(item)}
              $selected={selectedTheme === item}
            >
              {item}
            </ThemeItem>
          ))}
        </Themes>
        <Divider />
      </ThemeDir>

      <Menu>
        <Title>Ressources</Title>
        <Divider />
        <MenuItem
          href="https://help.formcentric.com/de/cloud/erste-schritte/"
          target="_blank"
        >
          <span>Formapp Docs</span>
        </MenuItem>
        <MenuItem
          href="https://help.formcentric.com/de/cloud/erste-schritte/"
          target="_blank"
        >
          <span>Cloud Docs</span>
        </MenuItem>
      </Menu>
    </NavWrapper>
  );
};

export default Sidebar;
