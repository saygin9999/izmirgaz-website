import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('izg-theme')
    const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('izg-theme', next ? 'dark' : 'light')
  }
  return (
    <button
      onClick={toggle}
      aria-label="Tema değiştir"
      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors ${
        dark
          ? 'border-amber-300/60 bg-slate-800 text-amber-300 hover:bg-slate-700'
          : 'border-sky-deep/40 bg-sky-deep text-white hover:bg-sky-deep/90'
      }`}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
