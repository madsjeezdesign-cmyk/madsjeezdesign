"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * <AnimatedStats> — counter that ticks up on viewport entry.
 *
 * Pure JS easing (no framer-motion needed). One observer per stat.
 * Respects prefers-reduced-motion (jumps to final value).
 */
export type StatItem = {
  /** Final numeric value. Use `format` for non-integer or formatted strings. */
  value: number;
  /** Display label below the number. */
  label: string;
  /** Optional prefix/suffix, e.g. "+", "%", "k" */
  prefix?: string;
  suffix?: string;
  /** Custom formatter — overrides default toLocaleString. */
  format?: (v: number) => string;
  /** Duration ms — default 1400. */
  duration?: number;
};

export type AnimatedStatsProps = {
  items: StatItem[];
  /** Layout: row (default) wraps to col on mobile, "grid-2"/"grid-3"/"grid-4". */
  layout?: "row" | "grid-2" | "grid-3" | "grid-4";
  className?: string;
};

export function AnimatedStats({
  items,
  layout = "row",
  className = "",
}: AnimatedStatsProps) {
  const layoutClass =
    layout === "row"
      ? "flex flex-wrap items-end gap-y-8 gap-x-12 md:gap-x-16"
      : layout === "grid-2"
        ? "grid grid-cols-1 sm:grid-cols-2 gap-8"
        : layout === "grid-3"
          ? "grid grid-cols-2 md:grid-cols-3 gap-8"
          : "grid grid-cols-2 md:grid-cols-4 gap-8";

  return (
    <div className={`${layoutClass} ${className}`}>
      {items.map((s, i) => (
        <Stat key={i} item={s} />
      ))}
    </div>
  );
}

function Stat({ item }: { item: StatItem }) {
  const [val, setVal] = useState(0);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(item.value);
      return;
    }
    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            obs.unobserve(node);
            const dur = item.duration ?? 1400;
            const start = performance.now();
            const animate = (t: number) => {
              const k = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - k, 4); // easeOutQuart
              setVal(Math.round(item.value * eased));
              if (k < 1) raf = requestAnimationFrame(animate);
            };
            raf = requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [item.value, item.duration]);

  const formatted = item.format
    ? item.format(val)
    : val.toLocaleString("es-AR");

  return (
    <div ref={elRef}>
      <div
        className="font-[family-name:var(--font-instrument)] text-balance"
        style={{
          fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
          lineHeight: 1,
          letterSpacing: "var(--tracking-display)",
          color: "var(--foreground)",
        }}
      >
        {item.prefix ?? ""}
        {formatted}
        {item.suffix ?? ""}
      </div>
      <p
        className="mt-3 text-micro"
        style={{
          fontFamily: "var(--font-mono), monospace",
          color: "var(--muted-body)",
        }}
      >
        {item.label}
      </p>
    </div>
  );
}
