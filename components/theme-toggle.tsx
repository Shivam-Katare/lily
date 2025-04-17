"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return (
    <Sun className="h-5 w-5 text-primary opacity-50 animate-pulse" />
  )

  return (
    <button
      className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-primary transition-all" />
      )}
    </button>
  )
} 