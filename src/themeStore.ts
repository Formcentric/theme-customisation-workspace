import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      selectedTheme: 'san-diego',
      themeDir: '/src/fc-themes',
      setSelectedTheme: (selectedTheme: string) =>
        set({ selectedTheme }),
      setThemeDir: (themeDir: string) => set({ themeDir }),
    }),
    {
      name: 'fc-theme-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
