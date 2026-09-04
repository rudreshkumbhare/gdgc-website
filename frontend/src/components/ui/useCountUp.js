import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp - animates a number from 0 to target when element is in view.
 * @param {number} target - the final number to count to
 * @param {number} duration - animation duration in ms (default 2000)
 * @param {number} startDelay - delay before counting starts in ms (default 0)
 */
export function useCountUp(target, duration = 2000, startDelay = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const startValue = 0;

    const delayTimeout = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * (target - startValue) + startValue));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasStarted, target, duration, startDelay]);

  return { count, ref };
}
