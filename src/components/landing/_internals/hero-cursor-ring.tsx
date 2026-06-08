"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Custom cursor ring that follows the pointer with ~150ms lag.
 * - 24px accent border ring, no fill.
 * - Hidden on touch / coarse pointer via @media (hover: hover).
 * - Fades out when idle for >2.5s.
 * - Disabled under prefers-reduced-motion.
 *
 * Implemented with rAF on the DOM (no canvas dep, no extra renders).
 * Scoped to its parent container via `data-hero-cursor-root` on the section.
 */
export function HeroCursorRing() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    if (!hoverCapable) return;

    const ring = ringRef.current;
    if (!ring) return;
    const root = ring.parentElement;
    if (!root) return;

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let visible = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;

    const showRing = () => {
      if (!visible) {
        ring.style.opacity = "1";
        visible = true;
      }
    };
    const hideRing = () => {
      ring.style.opacity = "0";
      visible = false;
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const inX = e.clientX >= rect.left && e.clientX <= rect.right;
      const inY = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inX || !inY) {
        hideRing();
        return;
      }
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      showRing();
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(hideRing, 2500);
    };

    const onLeave = () => hideRing();

    const tick = () => {
      // Critically-damped follow — gives the ~150ms tail.
      const ease = 0.18;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      ring.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      ref={ringRef}
      className="pointer-events-none absolute left-0 top-0 z-[12] hidden h-6 w-6 rounded-full opacity-0 transition-opacity duration-300 hover:[@media(hover:hover)]:block"
      style={{
        border: "1px solid color-mix(in srgb, var(--accent) 75%, transparent)",
        boxShadow:
          "0 0 0 1px color-mix(in srgb, var(--accent) 14%, transparent), 0 0 18px -4px color-mix(in srgb, var(--accent) 55%, transparent)",
        backdropFilter: "blur(2px)",
        mixBlendMode: "difference",
      }}
    />
  );
}
