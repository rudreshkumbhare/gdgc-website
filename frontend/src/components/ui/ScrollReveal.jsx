import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  as: Component = 'div',
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 8,
  className = '',
  duration = 0.7,
  staggerDelay = 0.06,
  ...props
}) => {
  const containerRef = useRef(null);

  // Check if children is a string to split into word elements
  const isString = typeof children === 'string';

  const splitContent = useMemo(() => {
    if (!isString) return children;
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children, isString]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
      let targets = el.querySelectorAll('.word');
      if (!targets || targets.length === 0) {
        targets =
          el.children.length > 0 ? Array.from(el.children) : [el];
      }

      if (targets && targets.length > 0) {
        // Set initial hidden state
        gsap.set(targets, {
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
          y: 12,
          willChange: 'opacity, filter, transform',
        });

        // Animate to visible when element enters viewport — NO scrub
        // so it plays instantly and doesn't stay blurred while reading
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: 'top 90%',   // fires when top of element hits 90% of viewport
          once: true,          // only animate once, no reverse
          onEnter: () => {
            gsap.to(targets, {
              ease: 'power3.out',
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration,
              stagger: targets.length > 1 ? staggerDelay : 0,
            });
          },
        });
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseOpacity, blurStrength, duration, staggerDelay]);

  return (
    <Component
      ref={containerRef}
      className={`scroll-reveal ${className}`.trim()}
      {...props}
    >
      {splitContent}
    </Component>
  );
};

export default ScrollReveal;
