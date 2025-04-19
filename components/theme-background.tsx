"use client"

import { useTheme } from "next-themes"
import { useThemeStore } from "@/store/theme-store"
import { useEffect, useState } from "react"

export function ThemeBackground({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const { lightTheme, darkTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  const isLightTheme = theme === "light"
  const currentTheme = isLightTheme ? lightTheme : darkTheme
  
  const getThemeClass = () => {
    const themeMap: Record<string, string> = {
      // Light themes
      summer: "bg-theme-summer",
      winter: "bg-theme-winter",
      rainy: "bg-theme-rainy",
      autumn: "bg-theme-autumn",
      night: "bg-theme-night",
      // Dark themes
      summerNight: "bg-theme-summer-night",
      winterNight: "bg-theme-winter-night",
      rainyNight: "bg-theme-rainy-night",
      autumnNight: "bg-theme-autumn-night",
      windyNight: "bg-theme-windy-night",
      sunset: "bg-theme-sunset",
    }
    
    return themeMap[currentTheme] || ""
  }

  return (
    <div className={`min-h-screen theme-transition ${getThemeClass()}`}>
      {children}
    </div>
  )
} 