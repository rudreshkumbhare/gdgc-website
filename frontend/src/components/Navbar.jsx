import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'ABOUT',       href: '#about',       color: 'blue' },
  { label: 'WHAT WE DO',  href: '#what-we-do',  color: 'red' },
  { label: 'EVENTS',      href: '#events',      color: 'yellow' },
  { label: 'TEAM',        href: '#team',        color: 'green' },
  { label: 'JOIN US',     href: '#join',        color: 'blue' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setIsOpen(false)
  }

  return (
    <>
      {/* Top Header Bar with Logo & Right-Aligned 3-Stripes Trigger */}
      <header className={`header-bar ${scrolled ? 'header-bar--scrolled' : ''}`}>
        <div className="header-bar__inner">
          {/* Logo */}
          <a href="#" className="nav-logo" aria-label="GDGC PCCOE Home">
            <div className="nav-logo__dots" aria-hidden="true">
              <span className="dot dot--blue"></span>
              <span className="dot dot--red"></span>
              <span className="dot dot--yellow"></span>
              <span className="dot dot--green"></span>
            </div>
            <span className="nav-logo__text">
              <span className="logo-gdgc">GDGC</span>
              <span className="logo-sep"> · </span>
              <span className="logo-pccoe">PCCOE</span>
            </span>
          </a>

          {/* Three Stripes Trigger Button on Exact Top Right */}
          <button
            className={`menu-trigger ${isOpen ? 'menu-trigger--active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={isOpen}
            id="three-stripes-menu-btn"
          >
            <span className="stripe stripe--1"></span>
            <span className="stripe stripe--2"></span>
            <span className="stripe stripe--3"></span>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'drawer-backdrop--open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Right Slide-over Navigation Drawer */}
      <aside
        className={`nav-drawer ${isOpen ? 'nav-drawer--open' : ''}`}
        aria-label="Navigation Sidebar"
        aria-hidden={!isOpen}
      >
        <div className="nav-drawer__header">
          <div className="google-dots">
            <span></span><span></span><span></span><span></span>
          </div>
          <span className="nav-drawer__tagline">MENU</span>
          <button
            className="nav-drawer__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close Navigation Menu"
          >
            &times;
          </button>
        </div>

        {/* Vertical Links List in ALL CAPS (No Numbers) */}
        <nav className="nav-drawer__nav">
          <ul className="nav-drawer__list" role="list">
            {navLinks.map((link, index) => (
              <li key={link.href} className="nav-drawer__item" style={{ animationDelay: `${index * 0.06}s` }}>
                <a
                  href={link.href}
                  className={`nav-drawer__link link--${link.color} ${activeLink === link.href ? 'nav-drawer__link--active' : ''}`}
                  onClick={() => handleNavClick(link.href)}
                >
                  <span className="nav-drawer__label">{link.label}</span>
                  <span className="nav-drawer__arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info in Drawer */}
        <div className="nav-drawer__footer">
          <p className="nav-drawer__chapter">Google Developer Groups on Campus</p>
          <p className="nav-drawer__college">Pimpri Chinchwad College of Engineering</p>
          <a
            href="#join"
            className="btn btn-primary nav-drawer__cta"
            onClick={() => handleNavClick('#join')}
          >
            JOIN CHAPTER
          </a>
        </div>
      </aside>
    </>
  )
}
