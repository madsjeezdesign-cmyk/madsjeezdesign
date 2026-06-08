"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { CountUp } from "./count-up";

type Props = {
  value: number;
  max?: number;
  label?: string;
  decimals?: number;
  suffix?: string;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
};

/**
 * Animated SVG arc circular progress indicator.
 * Used for the boutique case "conversion 3.2%".
 */
export function CircularProgress({
  value,
  max = 100,
  label,
  decimals = 1,
  suffix = "%",
  size = 220,
  stroke = 10,
  color = "var(--accent)",
  trackColor = "color-mix(in srgb, currentColor 14%, transparent)",
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const progress = useMotionValue(reduced ? value : 0);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = useTransform(progress, (latest) => {
    const ratio = Math.min(Math.max(latest / max, 0), 1);
    return circumference * (1 - ratio);
  });

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(progress, value, {
      duration: 1.6,
      ease: [0.19, 1, 0.22, 1],
    });
    return controls.stop;
  }, [inView, reduced, value, progress]);

  return (
    <div
      className="relative inline-flex flex-col items-center"
      style={{ width: size }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CountUp
            to={value}
            decimals={decimals}
            suffix={suffix}
            grouping={false}
            className="font-[family-name:var(--font-instrument)]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "var(--tracking-display)",
              color: "var(--foreground)",
            }}
          />
          {label ? (
            <span className="mt-1 text-micro font-[family-name:var(--font-jetbrains)]">
              {label}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
