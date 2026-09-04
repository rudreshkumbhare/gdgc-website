import { useRef, useCallback, useEffect } from 'react';

/**
 * useMagneticHover - gives a card a magnetic pull + 3D tilt effect on mouse interaction.
 * 
 * @param {Object} options
 * @param {number} options.strength      - magnetic pull strength (default 0.35)
 * @param {number} options.tiltStrength  - tilt rotation degree multiplier (default 12)
 * @param {number} options.resetDuration - spring-back duration in ms (default 500)
 * @param {boolean} options.lift         - whether to lift (translateZ) on hover (default true)
 * 
 * @returns {{ cardRef, glowRef }} — attach cardRef to the card element, glowRef to an inner glow div
 */
export function useMagneticHover({
  strength = 0.35,
  tiltStrength = 12,
  resetDuration = 500,
  lift = true,
} = {}) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ tx: 0, ty: 0, rx: 0, ry: 0, scale: 1 });
  const isHoveringRef = useRef(false);

  const applyTransform = useCallback((el, { tx, ty, rx, ry, scale }) => {
    el.style.transform = `
      perspective(800px)
      translateX(${tx}px)
      translateY(${ty}px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      scale(${scale})
      translateZ(${lift && scale > 1 ? 20 : 0}px)
    `;
  }, [lift]);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Normalized -1 to 1 relative position
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);

    stateRef.current = {
      tx: nx * rect.width * strength,
      ty: ny * rect.height * strength,
      rx: -ny * tiltStrength,
      ry: nx * tiltStrength,
      scale: 1.04,
    };

    applyTransform(card, stateRef.current);

    // Move inner glow to follow cursor
    if (glowRef.current) {
      const glowX = ((nx + 1) / 2) * 100; // 0-100%
      const glowY = ((ny + 1) / 2) * 100;
      glowRef.current.style.background = `radial-gradient(
        circle at ${glowX}% ${glowY}%,
        rgba(255,255,255,0.18) 0%,
        rgba(255,255,255,0.04) 50%,
        transparent 80%
      )`;
      glowRef.current.style.opacity = '1';
    }
  }, [strength, tiltStrength, applyTransform]);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'none'; // instant on enter
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    const card = cardRef.current;
    if (!card) return;

    // Spring back smoothly
    card.style.transition = `transform ${resetDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    card.style.transform = `perspective(800px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)`;

    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  }, [resetDuration]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { cardRef, glowRef };
}
