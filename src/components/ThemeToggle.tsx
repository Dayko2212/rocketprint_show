'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Star } from 'lucide-react'
import { playSound } from '@/lib/sounds'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-foreground/10 animate-pulse" />
    )
  }

  const toggleTheme = () => {
    playSound('click')
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => playSound('hover')}
      className="relative flex items-center w-16 h-8 rounded-full border border-card-border bg-card-bg shadow-inner transition-all duration-500 overflow-hidden group p-1"
      aria-label="Changer de mode d'affichage"
    >
      {/* Sliding Cursor */}
      <div 
        className={`absolute w-6 h-6 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          resolvedTheme === 'dark' 
            ? 'left-1 bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/20' 
            : 'left-9 bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/20'
        }`}
      />

      {/* Icons Container */}
      <div className="flex justify-between items-center w-full px-1 z-10 pointer-events-none">
        <Moon 
          size={14} 
          className={`transition-all duration-500 ${
            resolvedTheme === 'dark' ? 'text-white' : 'text-foreground/20'
          }`} 
        />
        <Star 
          size={14} 
          className={`transition-all duration-500 ${
            resolvedTheme === 'light' ? 'text-white' : 'text-foreground/20'
          }`} 
        />
      </div>

      {/* Subtle Glow Overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 dark:bg-blue-400 light:bg-orange-400 transition-opacity duration-300`} />
    </button>
  )
}
