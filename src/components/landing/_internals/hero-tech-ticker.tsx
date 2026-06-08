"use client";

import { useReducedMotion } from "framer-motion";

const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Supabase",
  "Mercado Pago",
  "Stripe",
  "PostgreSQL",
  "Prisma",
  "Railway",
  "Vercel",
  "Docker",
  "Tailwind CSS",
  "Node.js",
  "Framer Motion",
  "React Native",
];

/**
 * Subtle horizontal marquee of stack chips just above the hero hairline.
 * Pauses on hover, mask-faded at both ends, respects prefers-reduced-motion
 * (renders truncated static row).
 */
export function HeroTechTicker() {
  const reduced = useReducedMotion();

  const Row = () => (
    <ul className="hero-tech-row flex shrink-0 items-center gap-7 pr-7">
      {STACK.map((label) => (
        <li
          key={label}
          className="inline-flex items-center gap-3 whitespace-nowrap"
          style={{
            color: "var(--muted-body)",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.72rem",
            letterSpacing: "var(--tracking-micro)",
          }}
        >
          <span>{label}</span>
          <span
            aria-hidden
            className="inline-block h-1 w-1 rounded-full"
            style={{
              background:
                "color-mix(in srgb, var(--foreground) 30%, transparent)",
            }}
          />
        </li>
      ))}
    </ul>
  );

  if (reduced) {
    return (
      <div
        aria-hidden
        className="relative mt-10 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="flex">
          <Row />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="hero-tech-ticker relative mt-10 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div className="hero-tech-track flex">
        <Row />
        <Row />
      </div>
      <style jsx>{`
        .hero-tech-track {
          width: max-content;
          animation: hero-tech-scroll 82s linear infinite;
          will-change: transform;
        }
        .hero-tech-ticker:hover .hero-tech-track {
          animation-play-state: paused;
        }
        @keyframes hero-tech-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
