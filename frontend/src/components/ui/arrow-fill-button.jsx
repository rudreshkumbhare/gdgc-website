// Built using Hyperiux Vault: https://vault.hyperiux.com
// Ported to JSX + Vanilla CSS for GDGC PCCOE project

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./arrow-fill-button.css";

const DEFAULT_HREF = "#";
const COMPACT_LAYOUT_BREAKPOINT = 1280;
const ANIMATION_DURATION_MS = 450;

/**
 * ArrowFillButton — Premium animated CTA button.
 * A circular fill sweeps from right to cover the button on hover,
 * while dual arrows slide through the icon circle.
 *
 * Props:
 *   btnText              — Button label (default: "Get Started")
 *   href                 — Link target   (default: "#")
 *   bgColor              — Base background color
 *   textColor            — Base text color
 *   fillBgColor          — Fill sweep + icon circle background
 *   fillTextColor        — Text color inside the fill area
 *   hoverFillBgColor     — Fill bg on hover (defaults to fillBgColor)
 *   hoverFillTextColor   — Fill text on hover (defaults to fillTextColor)
 *   arrowColor           — Arrow icon color (defaults to fillTextColor)
 *   hoverArrowColor      — Arrow icon color on hover
 *   transparent          — If true, base background is transparent
 *   borderColor          — Border color override (defaults to bgColor)
 *   ...anchorProps       — Any other <a> element props
 */
function ArrowFillButton({
  btnText = "Get Started",
  href = DEFAULT_HREF,
  className = "",
  size = "md",

  bgColor = "#4285F4",
  textColor = "#ffffff",

  fillBgColor = "var(--btn-auto-fill)",
  fillTextColor,

  hoverFillBgColor,
  hoverFillTextColor,

  arrowColor,
  hoverArrowColor,

  transparent = false,
  borderColor,

  ...props
}) {
  // Determine primary normal color of this button (Blue, Red, Yellow, Green, Grey, etc.)
  const normalColor = (transparent || bgColor === "transparent")
    ? (borderColor || "#4285F4")
    : bgColor;

  const resolvedFillTextColor      = fillTextColor     || normalColor;
  const resolvedHoverFillBgColor   = hoverFillBgColor   || fillBgColor;
  const resolvedHoverFillTextColor = hoverFillTextColor|| resolvedFillTextColor;
  const resolvedArrowColor         = arrowColor        || normalColor;
  const resolvedHoverArrowColor    = hoverArrowColor   || resolvedArrowColor;
  const resolvedBorderColor        = borderColor       || bgColor;

  const [isReady,         setIsReady]         = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isPressed,       setIsPressed]       = useState(false);
  const releaseTimeoutRef = useRef(null);

  // Reveal after first paint (avoids flash of un-styled button)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Detect touch / compact layout for pointer handling
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${COMPACT_LAYOUT_BREAKPOINT - 1}px)`);
    const sync = (e) => {
      const matches = "matches" in e ? e.matches : e.currentTarget.matches;
      setIsCompactLayout(matches);
      if (!matches) setIsPressed(false);
    };
    sync(mq);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) window.clearTimeout(releaseTimeoutRef.current);
    };
  }, []);

  const clearPressedState = () => {
    if (releaseTimeoutRef.current) window.clearTimeout(releaseTimeoutRef.current);
    releaseTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      releaseTimeoutRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  const handlePointerDown = (e) => {
    props.onPointerDown?.(e);
    if (!isCompactLayout || e.pointerType === "mouse") return;
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }
    setIsPressed(true);
  };

  const handlePointerUp = (e) => {
    props.onPointerUp?.(e);
    if (!isCompactLayout || e.pointerType === "mouse") return;
    clearPressedState();
  };

  const handlePointerCancel = (e) => {
    props.onPointerCancel?.(e);
    if (!isCompactLayout || e.pointerType === "mouse") return;
    clearPressedState();
  };

  const classes = [
    "arrow-fill-btn",
    size === "sm" ? "arrow-fill-btn--sm" : "",
    isReady      ? "arrow-fill-btn--ready"       : "",
    transparent  ? "arrow-fill-btn--transparent"  : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <a
      href={href}
      {...props}
      data-pressed={isPressed ? "true" : "false"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={classes}
      style={{
        "--btn-bg":               transparent ? "transparent" : bgColor,
        "--btn-text":             transparent ? textColor : "var(--btn-solid-text, #ffffff)",
        "--btn-fill-bg":          fillBgColor,
        "--btn-fill-text":        fillTextColor,
        "--btn-fill-bg-hover":    resolvedHoverFillBgColor,
        "--btn-fill-text-hover":  resolvedHoverFillTextColor,
        "--btn-arrow":            resolvedArrowColor,
        "--btn-arrow-hover":      resolvedHoverArrowColor,
        "borderColor":            resolvedBorderColor,
      }}
    >
      {/* Base label (always visible at button's text color) */}
      <span className="arrow-fill-btn__text">{btnText}</span>

      {/* Fill sweep — grows from icon circle to full button width */}
      <div aria-hidden="true" className="arrow-fill-btn__fill" />

      {/* Clipped overlay — reveals fill-colored text as sweep expands */}
      <div aria-hidden="true" className="arrow-fill-btn__overlay">
        <span className="arrow-fill-btn__overlay-text">{btnText}</span>
      </div>

      {/* Arrow icon circle */}
      <span aria-hidden="true" className="arrow-fill-btn__icon">
        {/* Arrow entering from the left */}
        <ArrowRight
          className="arrow-fill-btn__arrow-in"
          strokeWidth={1.8}
        />
        {/* Arrow exiting to the right */}
        <ArrowRight
          className="arrow-fill-btn__arrow-out"
          strokeWidth={1.8}
        />
      </span>
    </a>
  );
}

export default ArrowFillButton;
