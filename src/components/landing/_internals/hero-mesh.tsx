"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient gradient mesh — Linear/Stripe atmosphere.
 *
 * Composed of 3 radial blobs that drift slowly on a long cycle (~55s).
 * Allowed because it's used WITH PURPOSE: editorial atmosphere, not slop gradient.
 * Colors are token-driven (accent + warm + dark surface) and blend via screen.
 *
 * Respects prefers-reduced-motion: blobs are positioned but do not animate.
 */
export function HeroMesh() {
  const reduced = useReducedMotion();

  const blob = (
    from: { x: string; y: string },
    to: { x: string; y: string },
  ) =>
    reduced
      ? { x: from.x, y: from.y }
      : {
          x: [from.x, to.x, from.x],
          y: [from.y, to.y, from.y],
        };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Accent blob — top-left */}
      <motion.div
        className="absolute h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%)",
          top: "-20vmax",
          left: "-15vmax",
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
        animate={blob(
          { x: "0%", y: "0%" },
          { x: "8%", y: "10%" },
        )}
        transition={{
          duration: 55,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      {/* Warm blob — right */}
      <motion.div
        className="absolute h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--warm) 35%, transparent), transparent 70%)",
          top: "10vmax",
          right: "-20vmax",
          filter: "blur(80px)",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
        animate={blob(
          { x: "0%", y: "0%" },
          { x: "-6%", y: "8%" },
        )}
        transition={{
          duration: 62,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      {/* Deep accent — bottom-center, anchor */}
      <motion.div
        className="absolute h-[50vmax] w-[80vmax] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent-dark) 45%, transparent), transparent 75%)",
          bottom: "-25vmax",
          left: "10%",
          filter: "blur(70px)",
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
        animate={blob(
          { x: "0%", y: "0%" },
          { x: "-5%", y: "-6%" },
        )}
        transition={{
          duration: 48,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      {/* Subtle radial vignette to anchor center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, transparent 40%, color-mix(in srgb, var(--background) 55%, transparent) 100%)",
        }}
      />
    </div>
  );
}
