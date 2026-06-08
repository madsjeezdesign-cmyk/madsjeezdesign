"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { cases } from "@/lib/data";
import { useReducedMotion } from "@/lib/motion";
import { CountUp } from "./_internals/count-up";
import { CircularProgress } from "./_internals/circular-progress";
import { BeforeAfterBar } from "./_internals/before-after-bar";
import { MockupFerreteria } from "./_internals/mockup-ferreteria";
import { MockupBoutique } from "./_internals/mockup-boutique";
import { MockupClinica } from "./_internals/mockup-clinica";
import { MockupDistribuidora } from "./_internals/mockup-distribuidora";

/**
 * LandingCases — 4 real case studies, each with a deliberately different layout.
 *
 * 1. Ferretería El Tornillo (+180%): featured large case, mockup + body left,
 *    huge metric right with parallax + before/after bars.
 * 2. Boutique Alma (2.400 pedidos): flip layout, text + circular ring left,
 *    browser mockup right.
 * 3. Clínica Dental Sonrisa (−40%): full-bleed dark, centered calendar mockup
 *    + two big number pairs joined by hairline connectors.
 * 4. Distribuidora Norte (B2B portal): horizontal split, Excel/PDF vs Portal
 *    con login + secondary stat row.
 *
 * Motion: scroll-triggered count-ups, animated SVG arc, bar reveals, parallax
 * on big metric numbers — all gated by useReducedMotion().
 */

type CaseData = (typeof cases)[number];

/* -----------------------------------------------------------
 * Section header
 * --------------------------------------------------------- */

function SectionHeader() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-10">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: reduced ? 0 : 0.48, ease: [0.19, 1, 0.22, 1] }}
        className="text-micro font-[family-name:var(--font-jetbrains)]"
      >
        Casos · Datos reales · 2009—2026
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{
          duration: reduced ? 0 : 0.6,
          delay: reduced ? 0 : 0.08,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="mt-4 max-w-3xl font-[family-name:var(--font-instrument)] text-balance text-body-strong"
        style={{
          fontSize: "var(--font-size-display-2)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        Lo que pasa cuando el sitio{" "}
        <span className="italic" style={{ color: "var(--accent)" }}>
          empieza a vender
        </span>
        .
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          duration: reduced ? 0 : 0.56,
          delay: reduced ? 0 : 0.16,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="mt-5 max-w-2xl text-body"
        style={{
          fontSize: "var(--font-size-body)",
          lineHeight: "var(--leading-body)",
        }}
      >
        Cuatro proyectos publicados con métricas antes/después medidas en
        producción. Sin promesas ni pantallas inventadas.
      </motion.p>
    </div>
  );
}

/* -----------------------------------------------------------
 * Shared helpers
 * --------------------------------------------------------- */

function Tags({ tags, dark = false }: { tags: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-md border px-2 py-1 text-[0.65rem] font-[family-name:var(--font-jetbrains)] transition-transform group-hover:-translate-y-0.5"
          style={{
            color: dark ? "#cbd5e1" : "var(--muted-body)",
            background: dark
              ? "rgba(148,163,184,0.06)"
              : "color-mix(in srgb, var(--muted-body) 4%, transparent)",
            borderColor: dark ? "rgba(148,163,184,0.16)" : "var(--hairline)",
            transitionDuration: "var(--duration-snap)",
            transitionTimingFunction: "var(--ease-snap)",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function PeriodLine({
  period,
  industry,
  dark = false,
}: {
  period: string;
  industry: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-micro font-[family-name:var(--font-jetbrains)]"
        style={{ color: dark ? "#94a3b8" : "var(--muted-body)" }}
      >
        {industry}
      </span>
      <span
        className="h-px w-6"
        style={{ background: dark ? "rgba(148,163,184,0.3)" : "var(--hairline)" }}
      />
      <span
        className="text-micro font-[family-name:var(--font-jetbrains)]"
        style={{ color: dark ? "#94a3b8" : "var(--muted-body)" }}
      >
        {period}
      </span>
    </div>
  );
}

/* -----------------------------------------------------------
 * CASE 1 — Ferretería (warm orange, big +180% with parallax)
 * --------------------------------------------------------- */

function CaseFerreteria({ data }: { data: CaseData }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const metricY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [40, -40],
  );

  return (
    <section
      ref={ref}
      className="group relative scroll-mt-24 px-6 py-20 md:px-10 md:py-28"
      style={{
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
      aria-label={`Caso ${data.client}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(217,119,6,0.10), transparent 55%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6 md:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <MockupFerreteria />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              duration: reduced ? 0 : 0.56,
              delay: reduced ? 0 : 0.12,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="mt-8 space-y-5"
          >
            <PeriodLine industry={data.industry} period={data.period} />
            <h3
              className="font-[family-name:var(--font-instrument)] text-body-strong"
              style={{
                fontSize: "var(--font-size-h1)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              {data.client}
            </h3>
            <p
              className="max-w-[48ch] text-body"
              style={{ fontSize: "1.0625rem", lineHeight: "var(--leading-body)" }}
            >
              {data.description}
            </p>
            <Tags tags={data.tags} />
          </motion.div>
        </div>

        <div className="md:col-span-6">
          <motion.div style={{ y: metricY }} className="space-y-2">
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "var(--muted-body)" }}
            >
              Crecimiento en consultas
            </span>
            <div className="flex items-start gap-2">
              <span
                className="font-[family-name:var(--font-instrument)] text-body-strong"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  lineHeight: 0.95,
                  color: "#d97706",
                  letterSpacing: "var(--tracking-display)",
                }}
              >
                +
              </span>
              <CountUp
                to={180}
                grouping={false}
                className="font-[family-name:var(--font-instrument)] text-body-strong tabular-nums"
                style={{
                  fontSize: "clamp(5rem, 12vw, 11rem)",
                  lineHeight: 0.95,
                  letterSpacing: "var(--tracking-display)",
                }}
              />
              <span
                className="font-[family-name:var(--font-instrument)] text-body-strong"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "var(--tracking-display)",
                }}
              >
                %
              </span>
            </div>
            <p
              className="mt-3 max-w-md font-[family-name:var(--font-instrument)] italic"
              style={{
                fontSize: "1.25rem",
                color: "var(--muted-body)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              consultas por WhatsApp en 3 meses
            </p>
          </motion.div>

          <div className="mt-10 space-y-7">
            <BeforeAfterBar
              label="Consultas/mes"
              before={42}
              after={118}
              decimals={0}
            />
            <BeforeAfterBar
              label="Tasa de rebote"
              before={68}
              after={31}
              suffix="%"
              decimals={0}
              inverseGood
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * CASE 2 — Boutique (blush tint, circular conversion)
 * --------------------------------------------------------- */

function CaseBoutique({ data }: { data: CaseData }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const metricY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [30, -30],
  );

  return (
    <section
      ref={ref}
      className="group relative scroll-mt-24 px-6 py-20 md:px-10 md:py-28"
      style={{
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
      aria-label={`Caso ${data.client}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(232,213,208,0.45), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduced ? 0 : 0.56, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-5"
          >
            <PeriodLine industry={data.industry} period={data.period} />
            <h3
              className="font-[family-name:var(--font-instrument)] text-body-strong"
              style={{
                fontSize: "var(--font-size-h1)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              {data.client}
            </h3>
            <motion.div style={{ y: metricY }} className="flex items-baseline gap-2">
              <CountUp
                to={2400}
                grouping
                className="font-[family-name:var(--font-instrument)] text-body-strong tabular-nums"
                style={{
                  fontSize: "clamp(4rem, 10vw, 8.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "var(--tracking-display)",
                }}
              />
              <span
                className="font-[family-name:var(--font-instrument)] italic"
                style={{
                  color: "var(--muted-body)",
                  fontSize: "clamp(1.25rem, 2.6vw, 1.75rem)",
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                pedidos / primer año
              </span>
            </motion.div>
            <p
              className="max-w-[44ch] text-body"
              style={{ fontSize: "1.0625rem", lineHeight: "var(--leading-body)" }}
            >
              {data.description}
            </p>
            <Tags tags={data.tags} />

            <div className="flex flex-wrap items-center gap-8 pt-3">
              <CircularProgress
                value={3.2}
                max={5}
                decimals={1}
                suffix="%"
                label="Conversión"
                size={170}
                stroke={9}
                color="#9f1239"
              />
              <div className="space-y-1.5">
                <span
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--muted-body)" }}
                >
                  Ticket promedio
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-[family-name:var(--font-instrument)]"
                    style={{
                      fontSize: "1.6rem",
                      color: "var(--foreground)",
                      letterSpacing: "var(--tracking-heading)",
                    }}
                  >
                    $
                  </span>
                  <CountUp
                    to={18500}
                    grouping
                    className="font-[family-name:var(--font-instrument)] text-body-strong tabular-nums"
                    style={{
                      fontSize: "2.2rem",
                      lineHeight: 1,
                      letterSpacing: "var(--tracking-display)",
                    }}
                  />
                </div>
                <span
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--muted-body)" }}
                >
                  Mercado Pago · pedidos online
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-7 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : 0.1,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            <MockupBoutique />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * CASE 3 — Clínica (full-bleed dark, calendar + big number pairs)
 * --------------------------------------------------------- */

function CaseClinica({ data }: { data: CaseData }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="group relative scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      style={{
        background: "#0a0f1a",
        color: "#e2e8f0",
        borderTop: "1px solid rgba(45,212,191,0.18)",
        borderBottom: "1px solid rgba(45,212,191,0.18)",
      }}
      aria-label={`Caso ${data.client}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(45,212,191,0.13), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduced ? 0 : 0.56, ease: [0.19, 1, 0.22, 1] }}
          className="mx-auto max-w-3xl space-y-5 text-center"
        >
          <div className="flex justify-center">
            <PeriodLine industry={data.industry} period={data.period} dark />
          </div>
          <h3
            className="font-[family-name:var(--font-instrument)]"
            style={{
              color: "#f1f5f9",
              fontSize: "var(--font-size-h1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            {data.client}
          </h3>
          <p
            className="mx-auto max-w-[52ch]"
            style={{
              color: "#cbd5e1",
              fontSize: "1.0625rem",
              lineHeight: "var(--leading-body)",
            }}
          >
            {data.description}
          </p>
        </motion.div>

        <div className="my-14 md:my-16">
          <MockupClinica />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.6,
            delay: reduced ? 0 : 0.2,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="mb-12 text-center"
        >
          <span
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ color: "#94a3b8" }}
          >
            Llamadas perdidas en horario pico
          </span>
          <div className="mt-2 inline-flex items-baseline gap-1">
            <span
              className="font-[family-name:var(--font-instrument)]"
              style={{
                color: "#5eead4",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "var(--tracking-display)",
              }}
            >
              −
            </span>
            <CountUp
              to={40}
              grouping={false}
              className="font-[family-name:var(--font-instrument)] tabular-nums"
              style={{
                color: "#f1f5f9",
                fontSize: "clamp(5rem, 12vw, 11rem)",
                lineHeight: 0.95,
                letterSpacing: "var(--tracking-display)",
              }}
            />
            <span
              className="font-[family-name:var(--font-instrument)]"
              style={{
                color: "#f1f5f9",
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                lineHeight: 0.95,
                letterSpacing: "var(--tracking-display)",
              }}
            >
              %
            </span>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* Pair 1 — Turnos online 0 -> 72 */}
          <div className="space-y-4">
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#94a3b8" }}
            >
              Turnos online
            </span>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <CountUp
                  to={0}
                  grouping={false}
                  suffix="%"
                  className="block font-[family-name:var(--font-instrument)] tabular-nums"
                  style={{
                    color: "#475569",
                    fontSize: "clamp(2.5rem, 5vw, 3.6rem)",
                    lineHeight: 1,
                    letterSpacing: "var(--tracking-display)",
                  }}
                />
                <span
                  className="mt-1 block text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "#64748b" }}
                >
                  antes
                </span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.9,
                  delay: reduced ? 0 : 0.35,
                  ease: [0.19, 1, 0.22, 1],
                }}
                style={{ originX: 0 }}
                className="h-px flex-1"
              >
                <div className="h-full w-full" style={{ background: "#2dd4bf" }} />
              </motion.div>
              <div className="text-center">
                <CountUp
                  to={72}
                  grouping={false}
                  suffix="%"
                  className="block font-[family-name:var(--font-instrument)] tabular-nums"
                  style={{
                    color: "#5eead4",
                    fontSize: "clamp(3rem, 6vw, 4.4rem)",
                    lineHeight: 1,
                    letterSpacing: "var(--tracking-display)",
                  }}
                />
                <span
                  className="mt-1 block text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "#5eead4" }}
                >
                  después
                </span>
              </div>
            </div>
          </div>

          {/* Pair 2 — No-shows 18 -> 9 */}
          <div className="space-y-4">
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#94a3b8" }}
            >
              Inasistencias
            </span>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <CountUp
                  to={18}
                  grouping={false}
                  suffix="%"
                  className="block font-[family-name:var(--font-instrument)] tabular-nums"
                  style={{
                    color: "#475569",
                    fontSize: "clamp(2.5rem, 5vw, 3.6rem)",
                    lineHeight: 1,
                    letterSpacing: "var(--tracking-display)",
                  }}
                />
                <span
                  className="mt-1 block text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "#64748b" }}
                >
                  antes
                </span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.9,
                  delay: reduced ? 0 : 0.4,
                  ease: [0.19, 1, 0.22, 1],
                }}
                style={{ originX: 0 }}
                className="h-px flex-1"
              >
                <div className="h-full w-full" style={{ background: "#2dd4bf" }} />
              </motion.div>
              <div className="text-center">
                <CountUp
                  to={9}
                  grouping={false}
                  suffix="%"
                  className="block font-[family-name:var(--font-instrument)] tabular-nums"
                  style={{
                    color: "#5eead4",
                    fontSize: "clamp(3rem, 6vw, 4.4rem)",
                    lineHeight: 1,
                    letterSpacing: "var(--tracking-display)",
                  }}
                />
                <span
                  className="mt-1 block text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "#5eead4" }}
                >
                  después
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Tags tags={data.tags} dark />
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * CASE 4 — Distribuidora (neutral graphite, table-style row)
 * --------------------------------------------------------- */

function CaseDistribuidora({ data }: { data: CaseData }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="group relative scroll-mt-24 px-6 py-20 md:px-10 md:py-28"
      style={{
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
      aria-label={`Caso ${data.client}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(71,85,105,0.10), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 items-end gap-6 md:mb-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduced ? 0 : 0.56, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-4"
          >
            <PeriodLine industry={data.industry} period={data.period} />
            <h3
              className="font-[family-name:var(--font-instrument)] text-body-strong"
              style={{
                fontSize: "var(--font-size-h1)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              {data.client}
            </h3>
            <p
              className="max-w-[50ch] text-body"
              style={{ fontSize: "1.0625rem", lineHeight: "var(--leading-body)" }}
            >
              {data.description}
            </p>
            <Tags tags={data.tags} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: reduced ? 0 : 0.56,
              delay: reduced ? 0 : 0.1,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="md:text-right"
          >
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "var(--muted-body)" }}
            >
              Pedidos digitales
            </span>
            <div className="mt-1 flex items-baseline gap-3 md:justify-end">
              <CountUp
                to={12}
                grouping={false}
                suffix="%"
                className="font-[family-name:var(--font-instrument)] tabular-nums"
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.6rem)",
                  color: "var(--muted-body)",
                  letterSpacing: "var(--tracking-display)",
                }}
              />
              <span
                className="font-[family-name:var(--font-instrument)]"
                style={{ color: "var(--muted-body)", fontSize: "1.5rem" }}
              >
                →
              </span>
              <CountUp
                to={64}
                grouping={false}
                suffix="%"
                className="font-[family-name:var(--font-instrument)] text-body-strong tabular-nums"
                style={{
                  fontSize: "clamp(4.5rem, 9vw, 7rem)",
                  lineHeight: 0.95,
                  letterSpacing: "var(--tracking-display)",
                }}
              />
            </div>
            <p
              className="mt-2 max-w-md text-body md:ml-auto"
              style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
            >
              Reemplazaron PDFs por correo con una herramienta que escala.
            </p>
          </motion.div>
        </div>

        <MockupDistribuidora />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reduced ? 0 : 0.56,
            delay: reduced ? 0 : 0.2,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2"
        >
          <div
            className="hairline flex items-center justify-between gap-4 p-5"
            style={{ background: "var(--card)", borderRadius: "var(--radius-md)" }}
          >
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "var(--muted-body)" }}
            >
              Errores de pedido
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className="font-[family-name:var(--font-instrument)] tabular-nums"
                style={{
                  fontSize: "1.4rem",
                  color: "var(--muted-body)",
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                8%
              </span>
              <span style={{ color: "var(--muted-body)" }}>→</span>
              <CountUp
                to={1.5}
                grouping={false}
                decimals={1}
                suffix="%"
                className="font-[family-name:var(--font-instrument)] text-body-strong tabular-nums"
                style={{ fontSize: "2rem", letterSpacing: "var(--tracking-heading)" }}
              />
            </div>
          </div>
          <div
            className="hairline flex items-center justify-between gap-4 p-5"
            style={{ background: "var(--card)", borderRadius: "var(--radius-md)" }}
          >
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "var(--muted-body)" }}
            >
              Tiempo de armado de pedido
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className="font-[family-name:var(--font-instrument)] tabular-nums"
                style={{
                  fontSize: "1.4rem",
                  color: "var(--muted-body)",
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                ~22 min
              </span>
              <span style={{ color: "var(--muted-body)" }}>→</span>
              <CountUp
                to={4}
                grouping={false}
                suffix=" min"
                className="font-[family-name:var(--font-instrument)] text-body-strong tabular-nums"
                style={{ fontSize: "2rem", letterSpacing: "var(--tracking-heading)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Public export
 * --------------------------------------------------------- */

export function LandingCases() {
  const [c1, c2, c3, c4] = cases;

  return (
    <section
      id="casos"
      aria-label="Casos de estudio"
      className="relative"
      style={{ background: "var(--background)" }}
    >
      <div className="pt-24 md:pt-32">
        <SectionHeader />
      </div>
      <div className="mt-16 md:mt-20">
        <CaseFerreteria data={c1} />
        <CaseBoutique data={c2} />
        <CaseClinica data={c3} />
        <CaseDistribuidora data={c4} />
      </div>
    </section>
  );
}
