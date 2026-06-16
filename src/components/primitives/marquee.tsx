"use client";

import type { ReactNode } from "react";

/**
 * <Marquee> — infinite horizontal scrolling band. The agency-site staple.
 *
 * Renders the children twice back-to-back and translates -50% in a loop, so
 * the seam is invisible. Pure CSS animation — paused on hover, frozen under
 * prefers-reduced-motion (global rule already covers the keyframe).
 *
 * Use for value-prop word bands, tech logos, "DISEÑO · CÓDIGO · …" strips.
 */
export type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full cycle. Lower = faster. Default 32. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
  className?: string;
};

export function Marquee({
  children,
  speed = 32,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`group/marquee relative flex overflow-hidden ${className}`}
      style={
        {
          // edge fade so words dissolve at both ends
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        } as React.CSSProperties
      }
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center"
          style={{
            animation: `marquee-scroll ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            willChange: "transform",
          }}
        >
          {children}
        </div>
      ))}

      <style jsx>{`
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .group\\/marquee:hover > div {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .group\\/marquee > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
