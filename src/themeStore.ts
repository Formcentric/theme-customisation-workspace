import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  selectedTheme: string;
  themeDir: string;
  setSelectedTheme: (selectedTheme: string) => void;
  setThemeDir: (themeDir: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      selectedTheme: 'san-diego',
      themeDir: '/src/fc-themes',
      setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
      setThemeDir: (themeDir) => set({ themeDir }),
    }),
    { name: 'fc-theme-storage' }
  )
);
