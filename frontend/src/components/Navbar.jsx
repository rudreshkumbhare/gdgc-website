import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'About',   href: '#about' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Events',  href: '#events' },
  { label: 'Team',    href: '#team' },
  { label: 'Gallery', href: '#gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="GDGC PCCOE home">
          <div className="navbar__logo-icon" aria-hidden="true">
            <span className="dot dot--blue"></span>
            <span className="dot dot--red"></span>
            <span className="dot dot--yellow"></span>
            <span className="dot dot--green"></span>
          </div>
          <span className="navbar__logo-text">
            <span className="logo-gdgc">GDGC</span>
            <span className="logo-sep"> · </span>
            <span className="logo-pccoe">PCCOE</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeLink === link.href ? 'navbar__link--active' : ''}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#join"
          className="btn btn-primary navbar__cta"
          id="navbar-join-btn"
          onClick={() => handleNavClick('#join')}
        >
          Join Us
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          id="hamburger-btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#join"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => handleNavClick('#join')}
            >
              Join Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
