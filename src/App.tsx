import { useLayoutEffect } from 'react';
import Navigation from './components/Navigation';
import { FormPreview } from './components/FormPreview';
import './App.css';
import styled from 'styled-components';
import { useThemeStore } from './themeStore';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  const addFormcentricScript = () => {
    // Dynamically load the Formcentric script
    const script = document.createElement('script');
    script.className = 'script_formcentric';
    script.src = '/src/assets/formcentric.js'; // Public path for the script
    script.defer = true;
    document.body.appendChild(script);
  };

  useLayoutEffect(() => addFormcentricScript(), []);

  const { selectedTheme, themeDir, setSelectedTheme, setThemeDir } =
    useThemeStore((s) => s);

  const handleThemeChange = (themeName: string, custom?: boolean) => {
    const themeFolder = custom ? '/dist/themes' : '/src/fc-themes';
    setSelectedTheme(themeName);
    setThemeDir(themeFolder);
    unmountFormappInstances();
    addFormcentricScript();
  };

  const unmountFormappInstances = () => {
    // @ts-ignore
    const instances = window.formcentric?.formapp?.instances;
    if (instances) {
      Object.values(instances).forEach((i) => i.stop());
    }

    const scripts = document.querySelectorAll('.script_formcentric');
    scripts.forEach((script) =>
      script?.parentNode?.removeChild(script)
    );

    // Remove stylesheets with the attribute 'formcentric-source'
    const stylesheets = document.querySelectorAll(
      'link[formcentric-source], style[formcentric-source]'
    );
    stylesheets.forEach((stylesheet) => {
      stylesheet?.parentNode?.removeChild(stylesheet);
    });
  };

  return (
    <Wrapper>
      <Navigation
        handleThemeChange={handleThemeChange}
        selectedTheme={selectedTheme}
      />
      <FormPreview
        selectedTheme={selectedTheme}
        themeFolder={themeDir}
      />
    </Wrapper>
  );
}

export default App;
