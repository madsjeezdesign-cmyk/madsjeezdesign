"use client";

import { useSyncExternalStore } from "react";

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};
const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServer = () => false;

/**
 * Site-wide ambient background layer.
 *
 * Composition:
 *   1. Subtle dot grid (1px dot, 32px cell) — 5% on dark, 3% on light.
 *   2. One huge soft accent orb drifting across the viewport over 90s.
 *   3. Slow horizontal scanning line sweeping vertically over 30s, 2% opacity.
 *
 * - Fixed, z-index -1, sits behind all content above the body bg.
 * - Disabled entirely when prefers-reduced-motion is set.
 * - pointer-events: none, aria-hidden — purely decorative.
 */
export function SiteAmbientBg() {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  if (reduced) return null;

  return (
    <>
      <style>{`
        .site-ambient {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          contain: strict;
        }

        /* Layer 1 — dot grid */
        .site-ambient__dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            circle,
            color-mix(in oklab, var(--foreground) 28%, transparent) 1px,
            transparent 1.4px
          );
          background-size: 32px 32px;
          background-position: 0 0;
          opacity: 0.10;
          mix-blend-mode: multiply;
          mask-image: radial-gradient(
            ellipse at center,
            black 0%,
            black 55%,
            transparent 95%
          );
          -webkit-mask-image: radial-gradient(
            ellipse at center,
            black 0%,
            black 55%,
            transparent 95%
          );
        }
        :where(html.dark) .site-ambient__dots {
          opacity: 0.18;
          mix-blend-mode: screen;
        }

        /* Layer 2 — drifting accent orb */
        .site-ambient__orb {
          position: absolute;
          width: 1200px;
          height: 1200px;
          border-radius: 9999px;
          background: radial-gradient(
            circle at center,
            color-mix(in oklab, var(--accent) 25%, transparent) 0%,
            color-mix(in oklab, var(--accent) 12%, transparent) 35%,
            transparent 70%
          );
          filter: blur(180px);
          opacity: 0.55;
          top: -600px;
          left: -600px;
          will-change: transform;
          animation: site-ambient-drift 90s ease-in-out infinite alternate;
          mix-blend-mode: multiply;
        }
        :where(html.dark) .site-ambient__orb {
          opacity: 0.75;
          mix-blend-mode: screen;
        }

        @keyframes site-ambient-drift {
          0%   { transform: translate3d(0vw, 0vh, 0); }
          25%  { transform: translate3d(60vw, 20vh, 0); }
          50%  { transform: translate3d(80vw, 90vh, 0); }
          75%  { transform: translate3d(20vw, 70vh, 0); }
          100% { transform: translate3d(0vw, 0vh, 0); }
        }

        /* Layer 3 — slow scan line */
        .site-ambient__scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          top: 0;
          background: linear-gradient(
            to right,
            transparent 0%,
            color-mix(in oklab, var(--foreground) 35%, transparent) 50%,
            transparent 100%
          );
          opacity: 0.02;
          animation: site-ambient-scan 30s linear infinite;
        }
        :where(html.dark) .site-ambient__scan {
          opacity: 0.05;
        }

        @keyframes site-ambient-scan {
          0%   { transform: translateY(0vh); }
          100% { transform: translateY(100vh); }
        }

        @media (prefers-reduced-motion: reduce) {
          .site-ambient { display: none !important; }
        }
      `}</style>
      <div className="site-ambient" aria-hidden="true">
        <div className="site-ambient__orb" />
        <div className="site-ambient__scan" />
        <div className="site-ambient__dots" />
      </div>
    </>
  );
}

export default SiteAmbientBg;
