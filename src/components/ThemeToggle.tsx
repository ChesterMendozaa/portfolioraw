// src/components/ThemeToggle.tsx
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg border"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--bg-card)',
        color: 'var(--text-primary)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  )
}