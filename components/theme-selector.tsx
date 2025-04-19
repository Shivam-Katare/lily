"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { DarkTheme, LightTheme, useThemeStore } from "@/store/theme-store"

export function ThemeSelector() {
  const { theme } = useTheme()
  const { lightTheme, darkTheme, setLightTheme, setDarkTheme } = useThemeStore()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!mounted) return (
    <Palette className="h-5 w-5 text-primary opacity-50 animate-pulse" />
  )

  const isLightTheme = theme === "light"
  
  const lightThemeOptions: { value: LightTheme; label: string }[] = [
    { value: "summer", label: "Summer" },
    { value: "winter", label: "Winter" },
    { value: "rainy", label: "Rainy" },
    { value: "autumn", label: "Autumn" },
  ]
  
  const darkThemeOptions: { value: DarkTheme; label: string }[] = [
    { value: "summerNight", label: "Summer Night" },
    { value: "winterNight", label: "Winter Night" },
    { value: "rainyNight", label: "Rainy Night" },
    { value: "autumnNight", label: "Autumn Night" },
    { value: "windyNight", label: "Windy Night" },
    { value: "sunset", label: "The Sunset" }
  ]

  const currentThemeOptions = isLightTheme ? lightThemeOptions : darkThemeOptions
  const currentTheme = isLightTheme ? lightTheme : darkTheme
  const setCurrentTheme = isLightTheme ? setLightTheme : setDarkTheme

  const handleThemeChange = (themeValue: LightTheme | DarkTheme) => {
    setCurrentTheme(themeValue as never)
    setIsOpen(false)
  }

  const getCurrentThemeLabel = () => {
    const option = currentThemeOptions.find(option => option.value === currentTheme)
    return option?.label || currentThemeOptions[0].label
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="rounded-md p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme"
      >
        <Palette className="h-5 w-5 text-primary transition-all" />
        <span className="text-xs hidden sm:inline">{getCurrentThemeLabel()}</span>
      </button>
      
      {isOpen && (
        <div
        className="absolute right-0 mt-2 w-48 rounded-md z-50 animate-in -mr-[3rem]"
        style={{
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
        }}
      >
      
          <div className="py-1">
            {currentThemeOptions.map((option) => (
              <button
                key={option.value}
                className={`${
                  currentTheme === option.value
                    ? "bg-muted text-foreground"
                    : "text-foreground hover:bg-muted"
                } w-full px-4 py-2 text-left text-sm flex items-center gap-2`}
                onClick={() => handleThemeChange(option.value)}
              >
                <div className={`w-4 h-4 rounded-full ${getThemePreviewClass(option.value)}`} />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function getThemePreviewClass(theme: string): string {
  const classMap: Record<string, string> = {
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
  
  return classMap[theme] || ""
} 