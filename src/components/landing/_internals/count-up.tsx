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

type Props = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  grouping?: boolean;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Reveals + animates a number from 0 → `to` once it enters the viewport.
 * Respects reduced motion (renders final value immediately).
 */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  grouping = true,
  duration = 1.6,
  className,
  style,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(reduced ? to : 0);

  const formatter = useTransform(value, (latest) => {
    const fixed = Number(latest).toFixed(decimals);
    const num = Number(fixed);
    const rendered = grouping
      ? num.toLocaleString("es-AR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : fixed;
    return `${prefix}${rendered}${suffix}`;
  });

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.19, 1, 0.22, 1],
    });
    return controls.stop;
  }, [inView, reduced, to, value, duration]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {formatter}
    </motion.span>
  );
}
