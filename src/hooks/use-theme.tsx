import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('buzzlemax-theme') as ThemeMode) || 'system'
  })
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement

    const updateTheme = () => {
      const isDark =
        theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : theme === 'dark'

      setResolvedTheme(isDark ? 'dark' : 'light')
      root.classList.remove('light', 'dark')
      root.classList.add(isDark ? 'dark' : 'light')
    }

    updateTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') updateTheme()
    }
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('buzzlemax-theme', theme)
    toast.success(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme activated`, {
      duration: 1500,
      position: 'bottom-center',
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme } as ThemeContextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
