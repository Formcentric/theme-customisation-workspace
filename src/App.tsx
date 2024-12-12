import { useEffect, useLayoutEffect } from 'react';
import { FormPreview } from './components/FormPreview';
import './App.css';
import styled from 'styled-components';
import { useThemeStore } from './themeStore';
import Sidebar from './components/Sidebar';
import fcThemes from './util/fcThemesList.json';
import themes from './util/themesList.json';
import cloudConfig from '../config/cloudConfig.json';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr 60rem 2fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f0f2fc;
`;

function App() {
  const unmountFormappInstances = async () => {
    try {
      const scripts = document.querySelectorAll(
        '.script_formcentric'
      );

      scripts.forEach((script) =>
        script?.parentNode?.removeChild(script)
      );

      const fcScript = document.querySelector(
        '.script_formcentric_js'
      );
      if (fcScript) fcScript?.parentNode?.removeChild(fcScript);

      window.formcentric = {};

      // Remove stylesheets with the attribute 'formcentric-source'
      const stylesheets = document.querySelectorAll(
        'link[formcentric-source], style[formcentric-source]'
      );

      stylesheets.forEach((stylesheet) => {
        stylesheet?.parentNode?.removeChild(stylesheet);
      });
    } catch {
      console.log('formapp could not be unmounted');
    }
  };

  const addFormcentricScript = () => {
    const fcScript = document.querySelector('.script_formcentric_js');
    if (fcScript) fcScript?.parentNode?.removeChild(fcScript);

    // Dynamically load the Formcentric script
    const script = document.createElement('script');
    script.className = 'script_formcentric_js';
    script.src = '/src/assets/formcentric.js';
    document.body.appendChild(script);
  };

  const {
    selectedTheme,
    themeDir,
    setSelectedTheme,
    setThemeDir,
    selectedCloudForm,
    setSelectedCloudForm,
    setFormDefinition,
  } = useThemeStore((s) => s);

  useLayoutEffect(() => addFormcentricScript(), []);

  useEffect(() => {
    const isCustomTheme = themes.includes(selectedTheme);
    const isFcTheme = fcThemes.includes(selectedTheme);

    if (!isFcTheme && !isCustomTheme) handleThemeChange(themes[0]);

    if (FC_ENV === 'cloud' && !selectedCloudForm)
      setSelectedCloudForm(cloudConfig.fcForms[0].id);
  }, []);

  const reloadFormapp = async () => {
    await unmountFormappInstances();
    addFormcentricScript();
  };

  const handleThemeChange = (themeName: string, custom?: boolean) => {
    if (themeName === selectedTheme) return;
    const themeFolder = custom ? '/dist/themes' : '/src/fc-themes';
    setSelectedTheme(themeName);
    setThemeDir(themeFolder);
    reloadFormapp();
  };

  const handleFormChange = (form: string) => {
    if (FC_ENV === 'cloud') {
      setSelectedCloudForm(form);
    } else {
      setFormDefinition(form);
    }

    location.reload();
  };

  return (
    <Wrapper>
      <Sidebar
        selectedTheme={selectedTheme}
        handleThemeChange={handleThemeChange}
        formOptions={cloudConfig.fcForms}
        handleFormChange={handleFormChange}
      />
      <FormPreview
        selectedTheme={selectedTheme}
        selectedForm={selectedCloudForm}
        themeFolder={themeDir}
      />
    </Wrapper>
  );
}

export default App;
