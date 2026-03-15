'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    if (!mounted) return;
    
    const currentTheme = resolvedTheme || theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('🎨 Theme toggle:', currentTheme, '→', newTheme);
    setTheme(newTheme);
  }, [theme, resolvedTheme, setTheme, mounted]);

  return {
    theme,
    resolvedTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    mounted,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  };
}