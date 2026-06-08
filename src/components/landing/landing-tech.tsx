"use client";

import { motion, useInView } from "framer-motion";
import {
  Atom,
  Boxes,
  Braces,
  Cable,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Database,
  FileText,
  Globe,
  Hammer,
  Headphones,
  Layers,
  Leaf,
  Rocket,
  Server,
  ShoppingBag,
  Sigma,
  Smartphone,
  Sparkles,
  Terminal,
  Wand2,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionTransition, useReducedMotion } from "@/lib/motion";
import { process as processSteps, technologies } from "@/lib/data";

/**
 * LandingTech — single section, two subsections:
 *   A) Stack showcase: interactive packed grid of 21 tech chips with
 *      continuous "signal pulse" telemetry motion. Not a marquee.
 *   B) Process: 4 steps with editorial icons + animated connector line.
 *      No "01/02/03" prefixes — visual rhythm via line + icons only.
 *
 * Sits on var(--background) so the rhythm differs from sibling sections
 * that use --surface. Generous py-32 desktop. Respects reduced motion.
 */

// ---------- Tech grid ----------

type TechMeta = {
  /** lucide icon */
  icon: LucideIcon;
  /** column-span at the md breakpoint (organic packing 1–3) */
  span: 1 | 2 | 3;
  /** category cluster id (for subtle backdrop tint grouping) */
  cluster: ClusterId;
};

type ClusterId = "lang" | "ui" | "platform" | "data" | "commerce" | "ops";

const clusterTint: Record<ClusterId, string> = {
  lang:
    "radial-gradient(120% 80% at 30% 30%, color-mix(in srgb, var(--accent) 5%, transparent), transparent 70%)",
  ui:
    "radial-gradient(120% 80% at 70% 30%, color-mix(in srgb, var(--accent) 4%, transparent), transparent 70%)",
  platform:
    "radial-gradient(120% 80% at 50% 70%, color-mix(in srgb, var(--warm) 4%, transparent), transparent 70%)",
  data:
    "radial-gradient(120% 80% at 20% 70%, color-mix(in srgb, var(--accent) 5%, transparent), transparent 70%)",
  commerce:
    "radial-gradient(120% 80% at 80% 60%, color-mix(in srgb, var(--warm) 5%, transparent), transparent 70%)",
  ops:
    "radial-gradient(120% 80% at 60% 40%, color-mix(in srgb, var(--accent) 4%, transparent), transparent 70%)",
};

/**
 * Map tech name -> visual meta. Names match data.ts so this stays a thin
 * presentation layer; data.ts remains source of truth.
 */
const TECH_META: Record<string, TechMeta> = {
  TypeScript: { icon: Braces, span: 2, cluster: "lang" },
  JavaScript: { icon: Code2, span: 1, cluster: "lang" },
  Python: { icon: Sigma, span: 1, cluster: "lang" },
  "HTML / CSS": { icon: Wand2, span: 2, cluster: "lang" },

  React: { icon: Atom, span: 2, cluster: "ui" },
  "Next.js": { icon: Layers, span: 2, cluster: "ui" },
  "Vue.js": { icon: Leaf, span: 1, cluster: "ui" },
  "Tailwind CSS": { icon: Sparkles, span: 1, cluster: "ui" },

  "Node.js": { icon: Server, span: 2, cluster: "platform" },
  PostgreSQL: { icon: Database, span: 1, cluster: "data" },
  MongoDB: { icon: Boxes, span: 1, cluster: "data" },
  Supabase: { icon: Zap, span: 2, cluster: "data" },
  Prisma: { icon: Workflow, span: 1, cluster: "data" },
  "REST & GraphQL": { icon: Cable, span: 2, cluster: "platform" },

  "Mercado Pago": { icon: CreditCard, span: 2, cluster: "commerce" },
  Stripe: { icon: CreditCard, span: 1, cluster: "commerce" },

  Docker: { icon: Container, span: 1, cluster: "ops" },
  "Railway / Vercel": { icon: Cloud, span: 3, cluster: "ops" },

  WordPress: { icon: Globe, span: 1, cluster: "commerce" },
  Shopify: { icon: ShoppingBag, span: 1, cluster: "commerce" },
  "React Native": { icon: Smartphone, span: 2, cluster: "ui" },
};

function chipColSpan(span: 1 | 2 | 3) {
  if (span === 3) return "md:col-span-3";
  if (span === 2) return "md:col-span-2";
  return "md:col-span-1";
}

function TechChip({
  name,
  category,
  icon: Icon,
  span,
  pulsing,
  delaySec,
  reduced,
}: {
  name: string;
  category: string;
  icon: LucideIcon;
  span: 1 | 2 | 3;
  pulsing: boolean;
  delaySec: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.48,
        ease: [0.19, 1, 0.22, 1],
        delay: reduced ? 0 : delaySec,
      }}
      className={`group relative col-span-2 ${chipColSpan(span)}`}
    >
      <div
        className="surface-solid relative flex items-center gap-3 px-4 py-3 transition-[transform,border-color,background] hover:-translate-y-px"
        style={{
          transitionDuration: "var(--duration-snap)",
          transitionTimingFunction: "var(--ease-snap)",
          borderRadius: "var(--radius-md)",
        }}
      >
        {/* Pulse overlay — only when this chip is the active signal */}
        {!reduced && pulsing ? (
          <motion.span
            aria-hidden
            initial={{ opacity: 0, boxShadow: "0 0 0 0 transparent" }}
            animate={{
              opacity: [0, 1, 0],
              boxShadow: [
                "0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent)",
                "0 0 24px 2px color-mix(in srgb, var(--accent) 35%, transparent)",
                "0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent)",
              ],
            }}
            transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: "var(--radius-md)",
              border:
                "1px solid color-mix(in srgb, var(--accent) 50%, transparent)",
            }}
          />
        ) : null}

        {/* Hover ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--accent)",
            transitionDuration: "var(--duration-snap)",
            transitionTimingFunction: "var(--ease-snap)",
          }}
        />

        {/* Icon */}
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center"
          style={{
            background: "color-mix(in srgb, var(--accent) 8%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--accent) 18%, transparent)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
        </span>

        {/* Name + category */}
        <span className="flex min-w-0 flex-col">
          <span
            className="truncate text-body-strong"
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.2,
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            {name}
          </span>
          <span
            className="truncate font-[family-name:var(--font-jetbrains)]"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "var(--tracking-micro)",
              color: "var(--muted-body)",
              marginTop: 2,
            }}
          >
            {category}
          </span>
        </span>
      </div>
    </motion.div>
  );
}

function TechGrid() {
  const reduced = useReducedMotion();

  // Stable list with meta — graceful fallback if any name is unmapped.
  const items = useMemo(
    () =>
      technologies.map((t) => ({
        ...t,
        meta:
          TECH_META[t.name] ?? {
            icon: Terminal,
            span: 1 as const,
            cluster: "platform" as ClusterId,
          },
      })),
    [],
  );

  // "Signal pulse" — pick 3 random chips, rotate every ~1.6s.
  // Telemetry feel: proof the system is alive.
  const [pulses, setPulses] = useState<number[]>([]);

  useEffect(() => {
    if (reduced) return;
    const total = items.length;
    if (total === 0) return;

    const pickThree = () => {
      const set = new Set<number>();
      while (set.size < 3 && set.size < total) {
        set.add(Math.floor(Math.random() * total));
      }
      return Array.from(set);
    };

    // Seed via a 0-delay callback so the effect body stays sync-setState-free.
    const seedId = window.setTimeout(() => setPulses(pickThree()), 0);
    const id = window.setInterval(() => {
      setPulses(pickThree());
    }, 1600);
    return () => {
      window.clearTimeout(seedId);
      window.clearInterval(id);
    };
  }, [items.length, reduced]);

  return (
    <div className="relative">
      {/* Cluster tints — subtle, anchored behind the grid. Light/dark safe. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: [
            clusterTint.lang,
            clusterTint.ui,
            clusterTint.data,
            clusterTint.commerce,
            clusterTint.ops,
          ].join(", "),
          filter: "blur(40px)",
        }}
      />

      {/* The grid itself */}
      <div className="relative grid grid-cols-2 gap-2.5 md:grid-cols-6">
        {items.map((t, i) => (
          <TechChip
            key={t.name}
            name={t.name}
            category={t.category}
            icon={t.meta.icon}
            span={t.meta.span}
            pulsing={pulses.includes(i)}
            delaySec={Math.min(i, 12) * 0.03}
            reduced={reduced}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Process ----------

const PROCESS_ICONS: LucideIcon[] = [Headphones, FileText, Hammer, Rocket];

function ProcessConnector({ progress }: { progress: number }) {
  // progress in [0, 1] — animates as user scrolls through.
  return (
    <div
      aria-hidden
      className="absolute left-0 right-0 top-7 hidden md:block"
      style={{ marginLeft: "8%", marginRight: "8%" }}
    >
      {/* Base hairline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          height: 1,
          background: "var(--hairline)",
        }}
      />
      {/* Animated fill */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: 1,
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--accent) 0%, transparent), var(--accent) 50%, color-mix(in srgb, var(--accent) 60%, transparent))",
          transition: "width var(--duration-display) var(--ease-display)",
        }}
      />
    </div>
  );
}

function Process() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px", once: false });
  // Reduced motion: render connector fully extended from the start.
  const [progress, setProgress] = useState(() => (reduced ? 1 : 0));
  const tDisplay = useMotionTransition("display", "display");

  useEffect(() => {
    if (reduced || !inView) return;
    // Step through 0 -> 1 over ~1.2s once visible. Callback-only setState.
    const stops = [0.15, 0.4, 0.7, 1];
    let i = 0;
    const id = window.setInterval(() => {
      setProgress(stops[i]);
      i += 1;
      if (i >= stops.length) {
        window.clearInterval(id);
      }
    }, 280);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <div className="mt-24 md:mt-32">
      <div className="mb-12 max-w-2xl md:mb-16">
        <p className="text-micro font-[family-name:var(--font-jetbrains)]">
          Cómo trabajamos
        </p>
        <h2
          className="mt-3 font-[family-name:var(--font-instrument)] text-body-strong"
          style={{
            fontSize: "var(--font-size-h1)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          Un proceso{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>
            corto
          </span>
          , sin idas y vueltas.
        </h2>
      </div>

      <div ref={ref} className="relative">
        <ProcessConnector progress={progress} />

        <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {processSteps.map((s, i) => {
            const Icon = PROCESS_ICONS[i] ?? Headphones;
            return (
              <motion.li
                key={s.title}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  ...tDisplay,
                  delay: reduced ? 0 : i * 0.08,
                }}
                className="relative flex flex-col gap-4"
              >
                <div
                  className="surface-solid relative z-10 flex h-14 w-14 items-center justify-center"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    background: "var(--card)",
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-[family-name:var(--font-instrument)] text-body-strong"
                    style={{
                      fontSize: "1.5rem",
                      lineHeight: "var(--leading-heading)",
                      letterSpacing: "var(--tracking-heading)",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[28ch] text-body"
                    style={{ lineHeight: "var(--leading-body)" }}
                  >
                    {s.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

// ---------- Section ----------

const CALLOUTS = [
  { icon: Wrench, text: "Código 100% tuyo (sin lock-in)" },
  { icon: Rocket, text: "Deploys profesionales (Railway / Vercel / Docker)" },
  { icon: Zap, text: "Performance medible (Core Web Vitals)" },
];

export function LandingTech() {
  const reduced = useReducedMotion();
  const tDisplay = useMotionTransition("display", "display");

  return (
    <section
      id="tecnologias"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:px-10 md:py-32"
      style={{ background: "var(--background)" }}
    >
      {/* Subtle radial accent glow from top-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ===== A) Tech stack ===== */}
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-micro font-[family-name:var(--font-jetbrains)]">
            Stack · Lo que escribimos cada día
          </p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={tDisplay}
            className="mt-3 font-[family-name:var(--font-instrument)] text-body-strong"
            style={{
              fontSize: "var(--font-size-h1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Stack{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              moderno
            </span>
            . Sin atajos.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ ...tDisplay, delay: reduced ? 0 : 0.08 }}
            className="mt-5 max-w-[60ch] text-body"
            style={{ lineHeight: "var(--leading-body)" }}
          >
            Las herramientas que tocamos a diario. TypeScript de punta a punta,
            React y Next.js para la UI, Node y Postgres para el backend, pagos
            reales, deploy serio. Sin frameworks de moda que mañana no existen.
          </motion.p>
        </div>

        <TechGrid />

        {/* Callouts strip */}
        <div className="mt-10 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {CALLOUTS.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ ...tDisplay, delay: reduced ? 0 : i * 0.06 }}
              className="hairline flex items-center gap-3 px-4 py-3"
              style={{
                borderRadius: "var(--radius-md)",
                background: "var(--card)",
              }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center"
                style={{
                  background:
                    "color-mix(in srgb, var(--accent) 10%, transparent)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <Icon
                  className="h-3.5 w-3.5"
                  style={{ color: "var(--accent)" }}
                />
              </span>
              <span
                className="font-[family-name:var(--font-jetbrains)]"
                style={{
                  fontSize: "0.8125rem",
                  letterSpacing: "var(--tracking-micro)",
                  color: "var(--muted-body)",
                }}
              >
                {text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ===== B) Process ===== */}
        <Process />
      </div>
    </section>
  );
}
