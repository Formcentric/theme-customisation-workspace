import styled from 'styled-components';

interface FormPreviewP {
  selectedTheme: string;
  themeFolder: string;
}

const FormWrapper = styled.div``;

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
        style={{ height: '300px' }}
      ></div>
    </FormWrapper>
  );
};
