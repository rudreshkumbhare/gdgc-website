import { useEffect, useRef } from 'react'
import './Hero.css'
import TextType from './ui/TextType'
import { useCountUp } from './ui/useCountUp'
import ArrowFillButton from './ui/arrow-fill-button'

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

  // Animated stat counters — fire when stats section enters view
  const { count: memberCount,  ref: memberRef  } = useCountUp(500, 2000, 0)
  const { count: eventCount,   ref: eventRef   } = useCountUp(40,  1800, 150)
  const { count: projectCount, ref: projectRef } = useCountUp(20,  1600, 300)

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

      {/* Main content — no ScrollReveal here; hero is in viewport on load */}
      <div className="hero__content container">
        {/* Badge */}
        <div className="hero__badge animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <div className="google-dots">
            <span></span><span></span><span></span><span></span>
          </div>
          <span>Google Developer Groups on Campus</span>
        </div>

        {/* Headline */}
        <h1 className="hero__headline animate-fadeUp" style={{ animationDelay: '0.25s' }}>
          Build the Future
          <br />
          <span className="hero__headline-highlight">
            <TextType
              as="span"
              text={[
                "Learn. Grow. Impact.",
                "Google Cloud Study Jams.",
                "Flutter & Mobile Dev.",
                "GenAI & Gemini API."
              ]}
              typingSpeed={60}
              deletingSpeed={35}
              pauseDuration={1700}
              showCursor={true}
              cursorCharacter="|"
              textColors={['#4285F4', '#EA4335', '#FBBC04', '#34A853']}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero__sub animate-fadeUp" style={{ animationDelay: '0.4s' }}>
          GDGC PCCOE is Pimpri Chinchwad's student-led community powered
          by Google. We host workshops, hackathons, and study jams to help
          you level up with cutting-edge technology.
        </p>

        {/* CTA Row */}
        <div className="hero__cta-row animate-fadeUp" style={{ animationDelay: '0.55s' }}>
          <ArrowFillButton
            id="hero-join-btn"
            btnText="Join the Community"
            href="#join"
            bgColor="#4285F4"
            textColor="#ffffff"
            fillBgColor="#ffffff"
            fillTextColor="#4285F4"
          />
          <ArrowFillButton
            id="hero-events-btn"
            btnText="Explore Events"
            href="#events"
            transparent
            bgColor="transparent"
            textColor="var(--text-primary)"
            fillBgColor="#EA4335"
            fillTextColor="#ffffff"
            borderColor="#EA4335"
          />
        </div>

        {/* Stats row */}
        <div className="hero__stats animate-fadeUp" style={{ animationDelay: '0.7s' }}>
          <div className="hero__stat">
            <span ref={memberRef} className="hero__stat-num" style={{ color: 'var(--google-blue)' }}>
              {memberCount}<span className="hero__stat-plus">+</span>
            </span>
            <span className="hero__stat-label">Members</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true"></div>
          <div className="hero__stat">
            <span ref={eventRef} className="hero__stat-num" style={{ color: 'var(--google-red)' }}>
              {eventCount}<span className="hero__stat-plus">+</span>
            </span>
            <span className="hero__stat-label">Events Hosted</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true"></div>
          <div className="hero__stat">
            <span ref={projectRef} className="hero__stat-num" style={{ color: 'var(--google-green)' }}>
              {projectCount}<span className="hero__stat-plus">+</span>
            </span>
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
