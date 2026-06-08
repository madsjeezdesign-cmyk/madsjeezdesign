"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const IDLE_TIMEOUT_MS = 3000;
const LERP = 0.18; // approx ~150ms tail at 60fps
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label[for]';

const noopSubscribe = () => () => {};
const getEnabledSnapshot = () => {
  if (typeof window === "undefined") return false;
  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return hasFinePointer && !reduceMotion;
};
const getEnabledServerSnapshot = () => false;

/**
 * Atmospheric cursor ring. Trails the pointer with linear interpolation,
 * grows on interactive hover, ripples on click, fades out when idle.
 *
 * - Hidden on touch devices (@media (hover: none))
 * - Hidden when prefers-reduced-motion is set
 * - Portal-mounted to <body>, z-index 9999, pointer-events: none
 */
export function SiteCursor() {
  const enabled = useSyncExternalStore(
    noopSubscribe,
    getEnabledSnapshot,
    getEnabledServerSnapshot,
  );
  const ringRef = useRef<HTMLDivElement | null>(null);
  const ripplesLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const ripples = ripplesLayerRef.current;
    if (!ring || !ripples) return;

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let hovering = false;
    let visible = false;
    let idleTimer: number | undefined;

    const setVisible = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      ring.style.opacity = next ? "1" : "0";
    };

    const bumpIdle = () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      setVisible(true);
      idleTimer = window.setTimeout(() => setVisible(false), IDLE_TIMEOUT_MS);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      bumpIdle();

      const target = e.target as Element | null;
      const isInteractive = !!target?.closest?.(INTERACTIVE_SELECTOR);
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        ring.dataset.hover = hovering ? "true" : "false";
      }
    };

    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => bumpIdle();

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const dot = document.createElement("span");
      dot.className = "site-cursor__ripple";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ripples.appendChild(dot);
      window.setTimeout(() => dot.remove(), 320);
    };

    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    bumpIdle();
    rafId = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);

    return () => {
      cancelAnimationFrame(rafId);
      if (idleTimer) window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return createPortal(
    <>
      <style>{`
        .site-cursor__layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          contain: layout style paint;
        }
        .site-cursor__ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          border: 1.5px solid color-mix(in oklab, var(--accent) 80%, transparent);
          background: transparent;
          opacity: 0;
          will-change: transform, width, height, border-color;
          transition:
            width 180ms var(--ease-ui),
            height 180ms var(--ease-ui),
            border-color 180ms var(--ease-ui),
            opacity 220ms var(--ease-ui);
          mix-blend-mode: difference;
        }
        .site-cursor__ring[data-hover="true"] {
          width: 40px;
          height: 40px;
          border-color: color-mix(in oklab, var(--accent) 35%, transparent);
        }
        .site-cursor__ripple {
          position: fixed;
          width: 8px;
          height: 8px;
          margin-left: -4px;
          margin-top: -4px;
          border-radius: 9999px;
          background: var(--accent);
          opacity: 0.55;
          pointer-events: none;
          animation: site-cursor-ripple 250ms var(--ease-ui) forwards;
        }
        @keyframes site-cursor-ripple {
          0%   { transform: scale(0.6); opacity: 0.55; }
          100% { transform: scale(4);   opacity: 0;    }
        }
        @media (hover: none), (prefers-reduced-motion: reduce) {
          .site-cursor__layer { display: none !important; }
        }
      `}</style>
      <div className="site-cursor__layer" aria-hidden="true">
        <div ref={ripplesLayerRef} />
        <div ref={ringRef} className="site-cursor__ring" data-hover="false" />
      </div>
    </>,
    document.body,
  );
}

export default SiteCursor;
