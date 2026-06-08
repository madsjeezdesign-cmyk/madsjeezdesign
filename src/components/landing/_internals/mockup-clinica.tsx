"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Dental clinic booking UI mockup — calendar with floating slots.
 */
export function MockupClinica() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const cells = Array.from({ length: 28 }).map((_, i) => {
    if (i === 9 || i === 16 || i === 23) return "selected";
    if (i % 5 === 0) return "taken";
    return "free";
  });

  const floatingSlots = [
    { time: "09:30", date: "Mar 12", side: "left" as const, top: "12%" },
    { time: "11:00", date: "Mié 13", side: "right" as const, top: "30%" },
    { time: "16:15", date: "Jue 14", side: "left" as const, top: "62%" },
    { time: "18:00", date: "Vie 15", side: "right" as const, top: "78%" },
  ];

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative mx-auto w-full max-w-md"
        style={{
          background: "#0f172a",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(148,163,184,0.18)",
          boxShadow: "0 30px 80px -30px rgba(0,0,0,0.5)",
          padding: "1.25rem",
        }}
      >
        <div className="flex items-center justify-between pb-3">
          <div>
            <p
              className="font-[family-name:var(--font-instrument)]"
              style={{
                color: "#f1f5f9",
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
              }}
            >
              Marzo 2026
            </p>
            <p
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#94a3b8" }}
            >
              Turnos disponibles
            </p>
          </div>
          <div className="flex gap-1">
            <span
              className="rounded-md px-2 py-1 text-[0.65rem]"
              style={{ background: "rgba(148,163,184,0.12)", color: "#cbd5e1" }}
            >
              ←
            </span>
            <span
              className="rounded-md px-2 py-1 text-[0.65rem]"
              style={{ background: "rgba(148,163,184,0.12)", color: "#cbd5e1" }}
            >
              →
            </span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 pb-1.5">
          {days.map((d, i) => (
            <span
              key={`${d}-${i}`}
              className="text-center text-[0.6rem] font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#64748b" }}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((status, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={{
                duration: reduced ? 0 : 0.3,
                delay: reduced ? 0 : 0.15 + i * 0.008,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex aspect-square items-center justify-center text-[0.6rem]"
              style={{
                borderRadius: "6px",
                background:
                  status === "selected"
                    ? "rgba(45,212,191,0.22)"
                    : status === "taken"
                      ? "rgba(148,163,184,0.06)"
                      : "rgba(148,163,184,0.1)",
                color:
                  status === "selected"
                    ? "#5eead4"
                    : status === "taken"
                      ? "#475569"
                      : "#cbd5e1",
                border:
                  status === "selected"
                    ? "1px solid rgba(45,212,191,0.5)"
                    : "1px solid transparent",
                fontFamily: "var(--font-jetbrains)",
              }}
            >
              {i + 1}
            </motion.div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
          <span
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ color: "#94a3b8" }}
          >
            Selección: Mar 12 · 09:30
          </span>
          <span
            className="rounded-md px-3 py-1.5 text-[0.7rem] font-[family-name:var(--font-jetbrains)]"
            style={{ background: "#2dd4bf", color: "#06231f" }}
          >
            Reservar
          </span>
        </div>
      </motion.div>

      {floatingSlots.map((s, i) => (
        <motion.div
          key={`${s.time}-${i}`}
          initial={{ opacity: 0, x: s.side === "left" ? -20 : 20 }}
          animate={
            inView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: s.side === "left" ? -20 : 20 }
          }
          transition={{
            duration: reduced ? 0 : 0.6,
            delay: reduced ? 0 : 0.5 + i * 0.12,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="absolute hidden md:flex"
          style={{
            top: s.top,
            [s.side]: "0",
            transform: s.side === "left" ? "translateX(-20%)" : "translateX(20%)",
          }}
        >
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(15,23,42,0.7)",
              border: "1px solid rgba(45,212,191,0.25)",
              boxShadow: "0 12px 32px -12px rgba(0,0,0,0.6)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#2dd4bf" }}
            />
            <span
              className="text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#e2e8f0" }}
            >
              {s.date} · {s.time}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
