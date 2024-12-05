import styled from 'styled-components';

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
  return (
    <FormWrapper>
      <div
        data-fc-id="6e78c3d0-9bb2-4584-b820-d2f46923346c"
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
