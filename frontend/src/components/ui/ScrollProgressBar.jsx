import { useEffect, useState } from 'react'

/**
 * ScrollProgressBar — Google 4-color gradient progress bar
 * Scales smoothly at top:0 as the user scrolls down the page.
 */
export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="scroll-progress-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3.5px',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div
        className="scroll-progress-bar"
        style={{
          height: '100%',
          width: '100%',
          transformOrigin: '0% 50%',
          transform: `scaleX(${scrollProgress / 100})`,
          willChange: 'transform',
          background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)',
          boxShadow: '0 0 12px rgba(66, 133, 244, 0.8), 0 0 6px rgba(234, 67, 53, 0.6)',
        }}
      />
    </div>
  )
}
