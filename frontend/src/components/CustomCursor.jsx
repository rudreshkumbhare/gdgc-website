import { useEffect, useState, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hoverColor, setHoverColor] = useState('blue')

  const pos = useRef({ x: -100, y: -100 })
  const mouse = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, select, textarea, .btn, .tag, .events__card, .about__pillar, .wwd__card, .team__card')
      if (target) {
        setIsHovered(true)
        if (target.classList.contains('tag-red') || target.classList.contains('btn-red') || target.classList.contains('link--red')) {
          setHoverColor('red')
        } else if (target.classList.contains('tag-yellow') || target.classList.contains('link--yellow')) {
          setHoverColor('yellow')
        } else if (target.classList.contains('tag-green') || target.classList.contains('link--green')) {
          setHoverColor('green')
        } else {
          setHoverColor('blue')
        }
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    // Smooth trailing ring animation loop
    let animFrameId
    const render = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      animFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animFrameId)
    }
  }, [])

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovered ? 'cursor-dot--active' : ''}`}
      />
      {/* Trailing Fluid Magnetic Glow Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ring--${hoverColor} ${isHovered ? 'cursor-ring--active' : ''}`}
      />
    </div>
  )
}
