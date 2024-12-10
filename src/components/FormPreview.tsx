import styled from 'styled-components';
import config from '../../config/formcentricConfig.json';

interface FormPreviewP {
  selectedTheme: string;
  themeFolder: string;
}

const FormWrapper = styled.div`
  background: #fff;
  margin: 2rem;
  grid-column: 2/3;
  border-radius: 6px;
`;

export const FormPreview = ({
  selectedTheme,
  themeFolder,
}: FormPreviewP) => {
  const { fcEmbedId } = config;
  return (
    <FormWrapper>
      <div
        data-fc-id={fcEmbedId}
        data-fc-formapp-url="/src/assets/formapp.js"
        data-fc-theme-dir={themeFolder}
        data-fc-theme={selectedTheme}
        style={{
          height: 'calc(100vh -4rem)',
          boxShadow: '0 20px 60px rgba(10, 0, 82, 0.2)',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      ></div>
    </FormWrapper>
  );
};
