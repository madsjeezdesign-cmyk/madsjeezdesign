"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Diagonal scan-line of light that sweeps across the hero ~once every 10s.
 * 1px-wide accent line at 45deg, ~6% opacity. Pure CSS keyframes — cheap.
 * Disabled under prefers-reduced-motion.
 */
export function HeroLightBeam() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <div className="hero-light-beam" />
      </div>
      <style jsx>{`
        .hero-light-beam {
          position: absolute;
          inset: -50%;
          background: linear-gradient(
            45deg,
            transparent 49.4%,
            color-mix(in srgb, var(--accent) 85%, transparent) 50%,
            transparent 50.6%
          );
          opacity: 0.06;
          transform: translate3d(-60%, -60%, 0);
          animation: hero-beam-sweep 11s linear infinite;
          will-change: transform, opacity;
        }
        @keyframes hero-beam-sweep {
          0% {
            transform: translate3d(-60%, -60%, 0);
            opacity: 0;
          }
          12% {
            opacity: 0.06;
          }
          88% {
            opacity: 0.06;
          }
          100% {
            transform: translate3d(60%, 60%, 0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
