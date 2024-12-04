import styled, { css } from 'styled-components';
import logo from '../assets/img/favicon.ico';
import fcThemes from '../util/fcThemesList.json';
import themes from '../util/themesList.json';

const NavWrapper = styled.div`
  min-width: 300px;
  background: #f7f8fd;
  height: 100vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Logo = styled.a`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  text-decoration: none;

  > p {
    color: rgb(71 63 125);
    font-family: ArchivoExpanded;
    font-weigth: 500;
    font-size: 20px;
  }
`;

const Title = styled.div`
  color: rgb(71 63 125);
  font-family: ArchivoExpanded;
  margin: 0 2rem 1.4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ThemeDir = styled.div`
  padding: 0 0 0 0;
`;

const Themes = styled.div`
  max-height: 40vh;
  overflow-y: auto;
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

  &:before {
    content: '';
    height: 50px;
    width: ${(props) => (props.$selected ? '6px' : '0')};
    background: #46b079;
    border-radius: 0px 6px 6px 0px;
    transition: 300ms ease;
  }

  &:hover:before {
    width: 6px;
    background: ${(props) =>
      props.$selected ? '#46b079' : '#B5B2CB'};
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
  margin: 2rem 1rem;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  font-family: Archivo;
  padding: 1rem;
  gap: 0.4rem;
  text-decoration: none;
`;

interface NavigationP {
  selectedTheme: string;
  handleThemeChange: (themeName: string, custom?: boolean) => void;
}

const Navigation = ({
  selectedTheme,
  handleThemeChange,
}: NavigationP) => {
  return (
    <NavWrapper>
      <Logo href="https://formcentric.com/" target="_blank">
        <img src={logo} width={22} />
        <p>FORMCENTRIC</p>
      </Logo>
      <Divider />
      <ThemeDir>
        <Title>Custom Themes</Title>
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
      <Divider />
      <ThemeDir>
        <Title>Formcentric Themes</Title>
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
      </ThemeDir>
      <Divider />
      <Link
        href="https://help.formcentric.com/de/cloud/erste-schritte/"
        target="_blank"
      >
        Documentation
      </Link>
    </NavWrapper>
  );
};

export default Navigation;
