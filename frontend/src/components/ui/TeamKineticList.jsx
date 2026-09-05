import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Minus, Plus } from 'lucide-react'
import './TeamKineticList.css'

function SocialIcons({ member, className = '', iconSize = 16 }) {
  return (
    <div className={`tkl__socials ${className}`.trim()}>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} LinkedIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
        </svg>
      </a>
      <a
        href={member.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} GitHub`}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
        </svg>
      </a>
    </div>
  )
}

function KineticRow({ member, index, isActive, isDimmed, isTouch, onEnter, onLeave, onToggle }) {
  return (
    <div
      className={[
        'tkl__row',
        isActive ? 'tkl__row--active' : '',
        isDimmed ? 'tkl__row--dimmed' : '',
      ].filter(Boolean).join(' ')}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
    >
      <div className="tkl__row-main">
        <div className="tkl__row-left">
          <span className="tkl__index">0{index + 1}</span>
          <h3 className="tkl__name">{member.name}</h3>
        </div>

        <div className="tkl__row-right">
          <span className="tkl__role">{member.role}</span>

          {!isTouch && <SocialIcons member={member} className="tkl__socials--inline" iconSize={18} />}

          {isTouch && (
            <span className="tkl__toggle-icon">
              {isActive ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          )}
        </div>
      </div>

      {/* Mobile / touch only: inline accordion image, since there's no cursor to float a preview off */}
      {isTouch && (
        <div className={`tkl__accordion ${isActive ? 'tkl__accordion--open' : ''}`}>
          <div className="tkl__accordion-inner">
            <div className="tkl__accordion-media">
              <img src={member.avatar} alt={member.name} loading="lazy" />
              <div className="tkl__accordion-overlay" />
            </div>
            <SocialIcons member={member} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function TeamKineticList({ members }) {
  const [activeName, setActiveName] = useState(null)
  const [isTouch, setIsTouch] = useState(false)
  const cardRef = useRef(null)
  const mouse = useRef({ x: -300, y: -300 })
  const pos = useRef({ x: -300, y: -300 })

  const active = members.find((m) => m.name === activeName) || null

  // Detect real pointer capability rather than just screen width,
  // same approach CustomCursor.jsx already uses in this project.
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)')
    const sync = () => setIsTouch(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Floating preview card follows the cursor with a soft lerp,
  // mirroring the trailing-ring technique from CustomCursor.jsx.
  useEffect(() => {
    if (isTouch) return

    const handleMove = (e) => {
      mouse.current.x = e.clientX + 24
      mouse.current.y = e.clientY + 24
    }
    window.addEventListener('mousemove', handleMove)

    let rafId
    const render = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.3
      pos.current.y += (mouse.current.y - pos.current.y) * 0.3
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      rafId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId)
    }
  }, [isTouch])

  // Snap the card straight to the cursor the instant a new person becomes
  // active, instead of lerping in from wherever it last was (that trailing
  // catch-up is what showed the photo appearing far from the cursor, e.g.
  // still near a row you hovered a while ago).
  useEffect(() => {
    if (active) {
      pos.current.x = mouse.current.x
      pos.current.y = mouse.current.y
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
    }
  }, [active])

  return (
    <div className="tkl">
      <div className="tkl__list">
        {members.map((member, index) => (
          <KineticRow
            key={member.name}
            member={member}
            index={index}
            isActive={activeName === member.name}
            isDimmed={activeName !== null && activeName !== member.name}
            isTouch={isTouch}
            onEnter={() => !isTouch && setActiveName(member.name)}
            onLeave={() => !isTouch && setActiveName(null)}
            onToggle={() => isTouch && setActiveName(activeName === member.name ? null : member.name)}
          />
        ))}
      </div>

      {/* Desktop only: floating cursor-following preview.
          Rendered through a portal straight into document.body — this
          card uses position:fixed to track the cursor, but ScrollReveal
          (the wrapper this whole list sits inside) applies a CSS
          `transform` for its slide-up animation, and ANY transformed
          ancestor turns into the positioning anchor for fixed children
          instead of the real viewport. That's exactly why the card only
          "appeared" after scrolling — it was fixed to the wrapper's
          position on the page, not to the screen. A portal sidesteps the
          whole ancestor chain so this is always fixed to the viewport. */}
      {!isTouch && createPortal(
        <div ref={cardRef} className="tkl__floating" aria-hidden="true">
          <div className={`tkl__floating-inner ${active ? 'tkl__floating-inner--visible' : ''}`}>
            {active && (
              <img src={active.avatar} alt={active.name} className="tkl__floating-img" />
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
