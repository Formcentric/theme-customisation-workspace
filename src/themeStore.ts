import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  selectedTheme: string;
  themeDir: string;
  selectedCloudForm: string;
  formDefinition: string;
  setSelectedTheme: (selectedTheme: string) => void;
  setThemeDir: (themeDir: string) => void;
  setSelectedCloudForm: (selectedCloudForm: string) => void;
  setFormDefinition: (formDefinition: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      selectedTheme: 'san-diego',
      themeDir: '/src/fc-themes',
      selectedCloudForm: '',
      formDefinition: '',
      setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
      setThemeDir: (themeDir) => set({ themeDir }),
      setFormDefinition: (formDefinition) => set({ formDefinition }),
      setSelectedCloudForm: (selectedCloudForm) =>
        set({ selectedCloudForm }),
    }),
    { name: 'fc-theme-storage' }
  )
);
