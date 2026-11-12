"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border bg-card" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
    >
      {/* Sun icon (visible in light mode) */}
      <Sun
        className={`h-4 w-4 absolute transition-all duration-500 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        }`}
      />

      {/* Moon icon (visible in dark mode) */}
      <Moon
        className={`h-4 w-4 absolute transition-all duration-500 ${
          isDark
            ? "rotate-0 scale-100 opacity-100 text-blue-400"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  )
}