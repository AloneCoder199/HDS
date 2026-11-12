"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ✅ Safe check — keyboard events can have undefined key
      const key = event?.key
      if (typeof key !== "string") return

      // Toggle theme on "D" key press (only when not typing in input)
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable

      if (isTyping) return

      if (key.toLowerCase() !== "d") return

      // Toggle dark/light
      const isDark = document.documentElement.classList.contains("dark")
      document.documentElement.classList.toggle("dark", !isDark)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}