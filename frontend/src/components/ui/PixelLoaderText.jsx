import { useEffect, useState } from 'react'
import './PixelLoaderText.css'

// Google-brand color per letter, reusing the same dark tinted-shade
// variables already defined in index.css for the pixel "depth" layers.
const LETTER_COLORS = [
  { fill: 'var(--google-blue)', shadow: 'var(--blue-800)' },
  { fill: 'var(--google-red)', shadow: 'var(--red-800)' },
  { fill: 'var(--google-yellow)', shadow: 'var(--yellow-800)' },
  { fill: 'var(--google-green)', shadow: 'var(--green-800)' },
]

const DEPTH = 5

// Waits for the pixel font to actually be ready before we render any
// text in it — with a short fallback so the loader never gets stuck
// if the Font Loading API isn't supported.
function usePixelFontReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const fallback = window.setTimeout(() => {
      if (!cancelled) setReady(true)
    }, 1200)

    if (document.fonts?.load) {
      document.fonts
        .load('400 32px "Press Start 2P"')
        .then(() => document.fonts.ready)
        .then(() => {
          if (!cancelled) setReady(true)
        })
        .catch(() => {
          if (!cancelled) setReady(true)
        })
    } else {
      setReady(true)
    }

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
    }
  }, [])

  return ready
}

export default function PixelLoaderText({ text = 'GDGC' }) {
  const ready = usePixelFontReady()
  const letters = Array.from(text)

  return (
    <p className={`pixel-loader ${ready ? 'pixel-loader--ready' : ''}`} aria-hidden="true">
      {letters.map((char, i) => {
        const colors = LETTER_COLORS[i % LETTER_COLORS.length]
        return (
          <span
            key={`${char}-${i}`}
            className="pixel-loader__letter"
            style={{ animationDelay: `${i * 0.11}s` }}
          >
            <span className="pixel-loader__glyph">
              {Array.from({ length: DEPTH }, (_, layer) => (
                <span
                  key={layer}
                  className="pixel-loader__shadow-layer"
                  style={{
                    transform: `translate(${layer}px, ${layer}px)`,
                    color: colors.shadow,
                  }}
                >
                  {char}
                </span>
              ))}
              <span className="pixel-loader__face" style={{ color: colors.fill }}>
                {char}
              </span>
            </span>
          </span>
        )
      })}
    </p>
  )
}
