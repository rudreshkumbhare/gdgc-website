import { useState, useEffect } from 'react'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gdgc-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('gdgc-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Super AMOLED Dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Super AMOLED Dark'} Mode`}
    >
      <div className="theme-toggle__track">
        <div className="theme-toggle__thumb">
          {isDark ? (
            /* Moon Icon */
            <svg className="theme-toggle__icon icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            /* Sun Icon */
            <svg className="theme-toggle__icon icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </div>
      </div>
      <span className="theme-toggle__text">{isDark ? 'AMOLED' : 'LIGHT'}</span>
    </button>
  )
}
