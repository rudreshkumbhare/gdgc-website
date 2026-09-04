import { useEffect, useRef } from 'react'
import './Hero.css'
import TextType from './ui/TextType'

const FLOATING_TECH = [
  { label: 'Flutter',      color: 'blue',   top: '18%', left: '8%',  delay: '0s'   },
  { label: 'Cloud',        color: 'red',    top: '38%', left: '5%',  delay: '0.4s' },
  { label: 'Machine Learning', color: 'yellow', top: '62%', left: '10%', delay: '0.8s' },
  { label: 'Android',      color: 'green',  top: '78%', left: '7%',  delay: '1.2s' },
  { label: 'Firebase',     color: 'blue',   top: '15%', right: '8%', delay: '0.2s' },
  { label: 'Web Dev',      color: 'red',    top: '35%', right: '5%', delay: '0.6s' },
  { label: 'TensorFlow',   color: 'yellow', top: '58%', right: '9%', delay: '1.0s' },
  { label: 'Kotlin',       color: 'green',  top: '76%', right: '6%', delay: '1.4s' },
]

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const handleMouse = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect()
      const x = ((e.clientX - left) / width  - 0.5) * 16
      const y = ((e.clientY - top)  / height - 0.5) * 10
      hero.style.setProperty('--tilt-x', `${y}deg`)
      hero.style.setProperty('--tilt-y', `${x}deg`)
    }
    const reset = () => {
      hero.style.setProperty('--tilt-x', '0deg')
      hero.style.setProperty('--tilt-y', '0deg')
    }
    hero.addEventListener('mousemove', handleMouse)
    hero.addEventListener('mouseleave', reset)
    return () => {
      hero.removeEventListener('mousemove', handleMouse)
      hero.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <section
      className="hero"
      id="hero"
      ref={heroRef}
      aria-label="Hero section"
    >
      {/* Animated background blobs */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__blob hero__blob--blue"></div>
        <div className="hero__blob hero__blob--red"></div>
        <div className="hero__blob hero__blob--yellow"></div>
        <div className="hero__blob hero__blob--green"></div>
        <div className="hero__grid"></div>
      </div>

      {/* Floating tech pills */}
      <div className="hero__floats" aria-hidden="true">
        {FLOATING_TECH.map((t) => (
          <span
            key={t.label}
            className={`hero__float-pill tag tag-${t.color}`}
            style={{
              top: t.top,
              left: t.left,
              right: t.right,
              animationDelay: t.delay,
            }}
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="hero__content container">
        {/* Badge */}
        <div className="hero__badge animate-fadeUp">
          <div className="google-dots">
            <span></span><span></span><span></span><span></span>
          </div>
          <span>Google Developer Groups on Campus</span>
        </div>

        {/* Headline with React Bits TextType integration */}
        <h1 className="hero__headline animate-fadeUp">
          Build the Future
          <br />
          <span className="hero__headline-highlight">
            <TextType
              text={[
                "Learn. Grow. Impact.",
                "Google Cloud Study Jams.",
                "Flutter & Mobile Dev.",
                "GenAI & Gemini API."
              ]}
              typingSpeed={60}
              deletingSpeed={35}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              textColors={['#4285F4', '#EA4335', '#FBBC04', '#34A853']}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero__sub animate-fadeUp">
          GDGC PCCOE is Pimpri Chinchwad's student-led community powered
          by Google. We host workshops, hackathons, and study jams to help
          you level up with cutting-edge technology.
        </p>

        {/* CTA Row */}
        <div className="hero__cta-row animate-fadeUp stagger">
          <a
            href="#join"
            className="btn btn-primary hero__cta-primary"
            id="hero-join-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Join the Community
          </a>
          <a
            href="#events"
            className="btn btn-outline hero__cta-secondary"
            id="hero-events-btn"
          >
            Explore Events
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </a>
        </div>

        {/* Stats row */}
        <div className="hero__stats animate-fadeUp stagger">
          <div className="hero__stat">
            <span className="hero__stat-num" style={{ color: 'var(--google-blue)' }}>500+</span>
            <span className="hero__stat-label">Members</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true"></div>
          <div className="hero__stat">
            <span className="hero__stat-num" style={{ color: 'var(--google-red)' }}>40+</span>
            <span className="hero__stat-label">Events Hosted</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true"></div>
          <div className="hero__stat">
            <span className="hero__stat-num" style={{ color: 'var(--google-green)' }}>20+</span>
            <span className="hero__stat-label">Projects Built</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span></span>
      </div>
    </section>
  )
}
