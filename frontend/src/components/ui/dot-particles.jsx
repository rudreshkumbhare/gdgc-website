import { useEffect, useRef, useCallback } from "react"

const DotParticleCanvas = ({
  backgroundColor = "transparent",
  animationSpeed = 0.006,
}) => {
  const canvasRef = useRef(null)
  const requestIdRef = useRef(null)
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const dprRef = useRef(1)
  const particles = useRef([])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    dprRef.current = dpr

    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr

    canvas.style.width = displayWidth + "px"
    canvas.style.height = displayHeight + "px"

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    mouseRef.current.x = e.clientX
    mouseRef.current.y = e.clientY
  }, [])

  // Helper to check if background directly under click is dark
  const isDarkBackgroundAt = (x, y) => {
    // If global theme is dark / AMOLED, return true
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      return true
    }

    try {
      let el = document.elementFromPoint(x, y)
      while (el && el !== document.documentElement) {
        if (el.classList && (el.classList.contains('footer') || el.closest('.footer'))) {
          return true
        }
        const bg = window.getComputedStyle(el).backgroundColor
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const rgb = bg.match(/\d+/g)
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10)
            const g = parseInt(rgb[1], 10)
            const b = parseInt(rgb[2], 10)
            const luminance = (r * 299 + g * 587 + b * 114) / 1000
            return luminance < 160
          }
        }
        el = el.parentElement
      }
    } catch {
      // Fallback
    }
    return false
  }

  const handleMouseDown = useCallback((e) => {
    mouseRef.current.isDown = true
    const x = e.clientX
    const y = e.clientY

    // Determine particle color based on background tone under cursor
    const isDarkBg = isDarkBackgroundAt(x, y)
    // Pure vibrant white for dark/AMOLED backgrounds, dark gray for light backgrounds
    const colorRgb = isDarkBg ? "255, 255, 255" : "50, 50, 55"
    const maxAlpha = isDarkBg ? 0.85 : 0.45

    // Particle burst (4 to 6 subtle particles)
    const numParticles = 4 + Math.floor(Math.random() * 3)

    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.4
      const speed = 1.2 + Math.random() * 2.2
      const size = 1.4 + Math.random() * 1.8

      particles.current.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 1000 + Math.random() * 1200,
        size: size,
        angle: angle,
        speed: speed,
        colorRgb: colorRgb,
        maxAlpha: maxAlpha,
      })
    }

    // 1 gentle floater particle
    const angle = Math.random() * Math.PI * 2
    const speed = 0.4 + Math.random() * 0.8
    particles.current.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 1500 + Math.random() * 1000,
      size: 1.8 + Math.random() * 1.2,
      angle: angle,
      speed: speed,
      colorRgb: colorRgb,
      maxAlpha: maxAlpha,
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    timeRef.current += animationSpeed

    const width = canvas.clientWidth
    const height = canvas.clientHeight

    if (backgroundColor === "transparent" || backgroundColor === "rgba(0,0,0,0)") {
      ctx.clearRect(0, 0, width, height)
    } else {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)
    }

    // Update and render soft, translucent particles
    particles.current = particles.current.filter((particle) => {
      particle.life += 16
      particle.x += particle.vx
      particle.y += particle.vy

      particle.vy += 0.02
      particle.vx *= 0.985
      particle.vy *= 0.985

      const organicX = Math.sin(timeRef.current + particle.angle) * 0.2
      const organicY = Math.cos(timeRef.current + particle.angle * 0.7) * 0.15
      particle.x += organicX
      particle.y += organicY

      const lifeProgress = particle.life / particle.maxLife
      const peakAlpha = particle.maxAlpha || 0.45
      const alpha = Math.max(0, (1 - lifeProgress) * peakAlpha)
      const currentSize = particle.size * (1 - lifeProgress * 0.25)

      if (alpha > 0) {
        ctx.fillStyle = `rgba(${particle.colorRgb}, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, 2 * Math.PI)
        ctx.fill()
      }

      return (
        particle.life < particle.maxLife &&
        particle.x > -50 &&
        particle.x < width + 50 &&
        particle.y > -50 &&
        particle.y < height + 50
      )
    })

    requestIdRef.current = requestAnimationFrame(animate)
  }, [backgroundColor, animationSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const handleResize = () => resizeCanvas()

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }
      timeRef.current = 0
      particles.current = []
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div
      className="dot-particle-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
        backgroundColor: backgroundColor,
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}

export default DotParticleCanvas
