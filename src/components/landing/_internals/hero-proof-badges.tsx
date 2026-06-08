"use client";

import { motion, useReducedMotion } from "framer-motion";

const badges = [
  {
    brand: "Ferretería El Tornillo",
    metric: "+180%",
    label: "consultas por WhatsApp",
    accent: "var(--accent)",
    pos: "top-[-2%] left-[-6%]",
    delay: 0,
    rotate: -3.5,
  },
  {
    brand: "Boutique Alma",
    metric: "2.400",
    label: "pedidos · año 1",
    accent: "var(--warm)",
    pos: "top-[34%] right-[-8%]",
    delay: 0.4,
    rotate: 2.5,
  },
  {
    brand: "Clínica Sonrisa",
    metric: "72%",
    label: "turnos online",
    accent: "var(--accent)",
    pos: "bottom-[-4%] left-[8%]",
    delay: 0.8,
    rotate: -2,
  },
] as const;

/**
 * Floating proof badges with REAL stats from `cases` in lib/data.ts.
 * They orbit the product mockup with a slow float cycle (6-9s) and a
 * subtle ±2° tilt. Backdrop-blur kept at -md max per banlist.
 */
export function HeroProofBadges() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[4]">
      {badges.map((b) => (
        <motion.div
          key={b.brand}
          className={`absolute ${b.pos}`}
          initial={reduced ? false : { opacity: 0, y: 12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.6 + b.delay,
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1],
          }}
          style={{ transformOrigin: "center" }}
        >
          <motion.div
            animate={
              reduced
                ? { y: 0 }
                : { y: [0, -6, 0], rotate: [b.rotate, b.rotate + 1, b.rotate] }
            }
            transition={{
              duration: 7 + b.delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-2xl backdrop-blur-md"
            style={{
              background:
                "color-mix(in srgb, var(--card) 88%, transparent)",
              border: "1px solid color-mix(in srgb, var(--foreground) 12%, transparent)",
              boxShadow:
                "0 18px 40px -18px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in srgb, var(--foreground) 4%, transparent) inset",
              padding: "12px 16px",
              minWidth: 168,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: b.accent }}
              />
              <span
                className="truncate text-[10px] font-medium tracking-wide"
                style={{
                  color: "var(--muted-body)",
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                {b.brand}
              </span>
            </div>
            <div
              className="mt-1.5 text-[26px] leading-none"
              style={{
                color: "var(--foreground)",
                fontFamily: "var(--font-instrument), serif",
                letterSpacing: "var(--tracking-display)",
              }}
            >
              {b.metric}
            </div>
            <p
              className="mt-1 text-[11px] leading-tight"
              style={{ color: "var(--muted-body)" }}
            >
              {b.label}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
