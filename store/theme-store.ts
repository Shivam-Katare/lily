import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeVariant = 'light' | 'dark'
export type LightTheme = 'summer' | 'winter' | 'rainy' | 'autumn' | 'night'
export type DarkTheme = 'summerNight' | 'winterNight' | 'rainyNight' | 'autumnNight' | 'windyNight' | 'sunset'

interface ThemeState {
  themeVariant: ThemeVariant
  lightTheme: LightTheme
  darkTheme: DarkTheme
  setThemeVariant: (themeVariant: ThemeVariant) => void
  setLightTheme: (theme: LightTheme) => void
  setDarkTheme: (theme: DarkTheme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeVariant: 'dark',
      lightTheme: 'summer',
      darkTheme: 'summerNight',
      setThemeVariant: (themeVariant) => set({ themeVariant }),
      setLightTheme: (lightTheme) => set({ lightTheme }),
      setDarkTheme: (darkTheme) => set({ darkTheme }),
    }),
    {
      name: 'lily-theme',
    }
  )
) 