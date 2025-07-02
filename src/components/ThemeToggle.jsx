import React from 'react'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = ({ theme, setTheme }) => {
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="p-2 rounded-full bg-glass-card hover:bg-pastel-mint/30 transition-colors shadow"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export default ThemeToggle 