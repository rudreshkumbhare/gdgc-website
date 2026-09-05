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
        });

        const animateIn = () => {
          gsap.to(targets, {
            ease: 'power3.out',
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration,
            stagger: targets.length > 1 ? staggerDelay : 0,
            overwrite: true,
            // Only promote to a GPU layer for the brief duration of the
            // animation itself, instead of leaving will-change on for
            // every revealed element for the rest of the page's life.
            onStart: () => gsap.set(targets, { willChange: 'opacity, filter, transform' }),
            onComplete: () => gsap.set(targets, { willChange: 'auto' }),
          });
        };

        // Animate to visible when element enters viewport — NO scrub
        // so it plays instantly and doesn't stay blurred while reading
        const trigger = ScrollTrigger.create({
          trigger: el,
          scroller,
          start: 'top 90%',   // fires when top of element hits 90% of viewport
          onEnter: animateIn,
          onEnterBack: animateIn,
          onLeaveBack: () => {
            // Reset to hidden state when scrolling back up past the trigger,
            // so the reveal plays again on the next scroll down
            gsap.set(targets, {
              opacity: baseOpacity,
              filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
              y: 12,
              willChange: 'auto',
            });
          },
        });

        // If the page loads/reloads already scrolled past this element
        // (e.g. browser scroll restoration), it will already be "active".
        // Snap straight to the visible state instead of animating —
        // otherwise every ScrollReveal above the fold fires its blur
        // animation at once on reload, which is what causes the big
        // freeze/lag right after a reload further down the page.
        if (trigger.isActive) {
          gsap.set(targets, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            willChange: 'auto',
          });
        }
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
