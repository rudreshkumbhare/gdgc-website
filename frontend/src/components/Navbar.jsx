import { useEffect, useState } from 'react'
import gdgcLogo from '../assets/gdgc-logo.svg'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Join Us', href: '#join' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const syncScrollState = () => setIsScrolled(window.scrollY > 12)
    syncScrollState()
    window.addEventListener('scroll', syncScrollState, { passive: true })

    const sections = NAV_ITEMS
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id)
        }
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.1, 0.35, 0.65] },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', syncScrollState)
      observer.disconnect()
    }
  }, [])

  return (
    <header className={`header-bar ${isScrolled ? 'header-bar--scrolled' : ''}`}>
      <div className="header-bar__inner">
        <a className="nav-logo" href="#hero" aria-label="GDGC PCCOE home">
          <img className="nav-logo__image" src={gdgcLogo} alt="GDGC" />
        </a>

        <div className="nav-actions">
          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.slice(1)
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.href}
                  className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
