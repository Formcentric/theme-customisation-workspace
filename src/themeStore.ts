import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import config from '../config/formcentric.config.js'

const modulePath = '/' + config.paths.moduelPath.replace('themes', '')

export interface ThemeData {
    id: string
    name: string
    description: string
    previewImageSrc: string
}

interface ThemeStore {
    themeData: ThemeData[]
    modulePath: string
    themeDir: string
    selectedTheme: string
    selectedCloudForm: string
    formDefinition: string
    sidebarOpen: boolean
    setThemeData: (themeData: ThemeData[]) => void
    setThemeDir: (themeDir: string) => void
    setSelectedTheme: (selectedTheme: string) => void
    setSelectedCloudForm: (selectedCloudForm: string) => void
    setFormDefinition: (formDefinition: string) => void
    setSidebarOpen: (sidebarOpen: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        set => ({
            themeData: [],
            modulePath: modulePath,
            themeDir: modulePath + '/themes',
            selectedTheme: '',
            selectedCloudForm: '',
            formDefinition: '',
            sidebarOpen: false,
            setThemeData: themeData => set({ themeData }),
            setSelectedTheme: selectedTheme => set({ selectedTheme }),
            setThemeDir: themeDir => set({ themeDir }),
            setFormDefinition: formDefinition => set({ formDefinition }),
            setSelectedCloudForm: selectedCloudForm => set({ selectedCloudForm }),
            setSidebarOpen: sidebarOpen => set({ sidebarOpen }),
        }),
        { name: 'fc-theme-storage' },
    ),
)
