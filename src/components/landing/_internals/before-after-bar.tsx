"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { CountUp } from "./count-up";

type Props = {
  label: string;
  before: number;
  after: number;
  suffix?: string;
  decimals?: number;
  inverseGood?: boolean;
};

/**
 * Two horizontal bars that animate into view, used in the ferretería case.
 */
export function BeforeAfterBar({
  label,
  before,
  after,
  suffix = "",
  decimals = 0,
  inverseGood = false,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const max = Math.max(before, after);
  const beforePct = max === 0 ? 0 : (before / max) * 100;
  const afterPct = max === 0 ? 0 : (after / max) * 100;

  const target = inView || reduced;
  const beforeWidth = target ? `${beforePct}%` : "0%";
  const afterWidth = target ? `${afterPct}%` : "0%";

  const beforeColor = inverseGood
    ? "color-mix(in srgb, #d97706 70%, transparent)"
    : "color-mix(in srgb, var(--muted-body) 35%, transparent)";
  const afterColor = "var(--accent)";

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-micro font-[family-name:var(--font-jetbrains)]">
          {label}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ color: "var(--muted-body)" }}
          >
            antes
          </span>
          <CountUp
            to={before}
            decimals={decimals}
            suffix={suffix}
            className="font-[family-name:var(--font-instrument)] tabular-nums"
            style={{
              fontSize: "1.125rem",
              color: "var(--muted-body)",
              letterSpacing: "var(--tracking-heading)",
            }}
          />
        </div>
        <div
          className="relative h-1.5 w-full overflow-hidden rounded-full"
          style={{
            background: "color-mix(in srgb, var(--muted-body) 12%, transparent)",
          }}
        >
          <motion.div
            className="absolute inset-y-0 left-0"
            initial={{ width: "0%" }}
            animate={{ width: beforeWidth }}
            transition={{
              duration: reduced ? 0 : 1.4,
              ease: [0.19, 1, 0.22, 1],
              delay: reduced ? 0 : 0.1,
            }}
            style={{ background: beforeColor }}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ color: "var(--foreground)" }}
          >
            después
          </span>
          <CountUp
            to={after}
            decimals={decimals}
            suffix={suffix}
            className="font-[family-name:var(--font-instrument)] tabular-nums"
            style={{
              fontSize: "1.5rem",
              color: "var(--foreground)",
              letterSpacing: "var(--tracking-heading)",
            }}
          />
        </div>
        <div
          className="relative h-2.5 w-full overflow-hidden rounded-full"
          style={{
            background: "color-mix(in srgb, var(--muted-body) 12%, transparent)",
          }}
        >
          <motion.div
            className="absolute inset-y-0 left-0"
            initial={{ width: "0%" }}
            animate={{ width: afterWidth }}
            transition={{
              duration: reduced ? 0 : 1.6,
              ease: [0.19, 1, 0.22, 1],
              delay: reduced ? 0 : 0.25,
            }}
            style={{ background: afterColor }}
          />
        </div>
      </div>
    </div>
  );
}
