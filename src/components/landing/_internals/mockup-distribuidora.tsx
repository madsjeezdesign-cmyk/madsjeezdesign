"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Before/after split for Distribuidora Norte.
 * Left: Excel + PDF stack. Right: Portal con login.
 */
export function MockupDistribuidora() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative hairline overflow-hidden"
        style={{
          background: "var(--card)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
        }}
      >
        <div className="flex items-center justify-between pb-3">
          <span className="text-micro font-[family-name:var(--font-jetbrains)]">
            Antes · planillas y PDFs
          </span>
          <span
            className="text-[0.6rem] font-[family-name:var(--font-jetbrains)]"
            style={{ color: "#d97706" }}
          >
            v.legacy
          </span>
        </div>

        <div className="space-y-1">
          {[
            { col1: "SKU", col2: "Producto", col3: "Lista A", col4: "Lista B" },
            { col1: "B-001", col2: "Caja x12", col3: "$8.400", col4: "$7.900" },
            { col1: "B-002", col2: "Pack x6", col3: "$4.250", col4: "$3.980" },
            { col1: "B-003", col2: "Unidad", col3: "$780", col4: "$720" },
            { col1: "B-004", col2: "Bulto x24", col3: "$15.600", col4: "$14.800" },
            { col1: "B-005", col2: "Display", col3: "$2.150", col4: "$1.990" },
          ].map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[60px_1fr_70px_70px] gap-2 px-2 py-1"
              style={{
                background:
                  i === 0
                    ? "color-mix(in srgb, var(--muted-body) 8%, transparent)"
                    : "transparent",
                borderBottom:
                  "1px solid color-mix(in srgb, var(--muted-body) 8%, transparent)",
              }}
            >
              {[row.col1, row.col2, row.col3, row.col4].map((cell, ci) => (
                <span
                  key={ci}
                  className="truncate text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
                  style={{
                    color: i === 0 ? "var(--foreground)" : "var(--muted-body)",
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-[color:var(--hairline)] pt-3">
          <div className="flex gap-1">
            {["lista-mar.pdf", "lista-abr.pdf", "lista-may.pdf"].map((p, i) => (
              <span
                key={p}
                className="rounded-sm px-1.5 py-0.5 text-[0.55rem] font-[family-name:var(--font-jetbrains)]"
                style={{
                  background: "color-mix(in srgb, #d97706 12%, transparent)",
                  color: "#d97706",
                  transform: `translateY(${i * 1}px)`,
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <span
            className="ml-auto text-[0.6rem] font-[family-name:var(--font-jetbrains)]"
            style={{ color: "#d97706" }}
          >
            12% pedidos digitales
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: reduced ? 0 : 0.6,
          delay: reduced ? 0 : 0.3,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="flex items-center justify-center"
      >
        <div className="hidden md:flex md:flex-col md:items-center">
          <span
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ color: "var(--muted-body)" }}
          >
            5 semanas
          </span>
          <div className="my-2 h-px w-12" style={{ background: "var(--accent)" }} />
          <span
            className="text-[0.6rem] font-[family-name:var(--font-jetbrains)]"
            style={{ color: "var(--accent)" }}
          >
            →
          </span>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <span
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ color: "var(--muted-body)" }}
          >
            5 semanas
          </span>
          <div className="h-px w-12" style={{ background: "var(--accent)" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        transition={{
          duration: reduced ? 0 : 0.6,
          delay: reduced ? 0 : 0.15,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="relative overflow-hidden"
        style={{
          background: "#0f172a",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(45,212,191,0.25)",
          padding: 0,
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(148,163,184,0.12)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#2dd4bf" }}
            />
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#cbd5e1" }}
            >
              portal.distribuidoranorte.com.ar
            </span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[0.55rem] font-[family-name:var(--font-jetbrains)]"
            style={{
              background: "rgba(45,212,191,0.14)",
              color: "#5eead4",
              border: "1px solid rgba(45,212,191,0.25)",
            }}
          >
            Cliente: SuperZona · Lista B
          </span>
        </div>

        <div className="px-4 py-3">
          <p
            className="font-[family-name:var(--font-instrument)]"
            style={{
              color: "#f1f5f9",
              fontSize: "1rem",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Pedido recurrente · semana 23
          </p>

          <div className="mt-3 space-y-1">
            {[
              { name: "Caja x12", qty: "8", subtotal: "$67.200" },
              { name: "Pack x6", qty: "12", subtotal: "$51.000" },
              { name: "Bulto x24", qty: "4", subtotal: "$62.400" },
              { name: "Display", qty: "6", subtotal: "$12.900" },
            ].map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.32,
                  delay: reduced ? 0 : 0.45 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5"
                style={{ background: "rgba(148,163,184,0.06)" }}
              >
                <span className="text-[0.7rem]" style={{ color: "#e2e8f0" }}>
                  {row.name}
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
                    style={{ color: "#94a3b8" }}
                  >
                    {row.qty} u.
                  </span>
                  <span
                    className="text-[0.7rem] font-[family-name:var(--font-instrument)] tabular-nums"
                    style={{ color: "#5eead4" }}
                  >
                    {row.subtotal}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-3 flex items-center justify-between border-t pt-2.5"
            style={{ borderColor: "rgba(148,163,184,0.15)" }}
          >
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#94a3b8" }}
            >
              64% pedidos digitales
            </span>
            <span
              className="rounded-md px-3 py-1.5 text-[0.7rem] font-[family-name:var(--font-jetbrains)]"
              style={{ background: "#2dd4bf", color: "#06231f" }}
            >
              Confirmar · $193.500
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
