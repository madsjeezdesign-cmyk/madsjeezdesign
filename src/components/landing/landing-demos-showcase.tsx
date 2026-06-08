"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { DEMOS, type DemoMeta } from "@/lib/demos-registry";
import { useMotionTransition, useReducedMotion } from "@/lib/motion";
import { ShowcaseFrame } from "./_internals/showcase-frame";
import {
  ShowcaseCategoryNav,
  type ShowcaseCategory,
} from "./_internals/showcase-category-nav";

/* -----------------------------------------------------------
 * Categories — group the 93 demos by sector.
 *
 * Order matters (first = default selected). Each entry pulls slugs from the
 * `DEMOS` registry. The auto-cycle iterates a category's `slugs` array.
 * --------------------------------------------------------- */

type CategoryDef = Omit<ShowcaseCategory, "slugs"> & { match: (d: DemoMeta) => boolean };

const CATEGORY_DEFS: CategoryDef[] = [
  {
    id: "ecommerce",
    label: "E-commerce & retail",
    accent: "#f97316",
    match: (d) => /(ferret|almac|kiosc|libr|bazar|carnic|granja|computa|super|panad|masa-madre|nido-linaje|deco-bazar|raices-criollas|nexus|celulares|ropa)/i.test(d.slug),
  },
  {
    id: "gastronomia",
    label: "Gastronomía & bebida",
    accent: "#dc2626",
    match: (d) => /(restaurante|panaderia|heladeria|catering|gelato|burger|pizzeria|gustitos|masa-madre|central-bebidas)/i.test(d.slug),
  },
  {
    id: "moda",
    label: "Moda & boutique",
    accent: "#ec4899",
    match: (d) => d.sector === "moda-retail" || /^moda-/i.test(d.slug) || /(intima-co|barber|leclat)/i.test(d.slug),
  },
  {
    id: "salud",
    label: "Salud & bienestar",
    accent: "#14b8a6",
    match: (d) => /(farmacia|odonto|optica|veterinaria|yoga|estetica|gimnasio|luna-petit)/i.test(d.slug),
  },
  {
    id: "servicios",
    label: "Servicios profesionales",
    accent: "#94a3b8",
    match: (d) => /(abogados|contadores|arquitectos|inmobiliaria|marketing|tech|imprenta|coworking|foto)/i.test(d.slug),
  },
  {
    id: "trade",
    label: "Oficios & trade",
    accent: "#f59e0b",
    match: (d) => /(herreria|taller|gasista|electricista|albanil|cerrajeria|motores|seguridad|limpieza|lavadero|detailing|paisajismo|taller-motos|tattoo)/i.test(d.slug),
  },
  {
    id: "hospitality",
    label: "Hospitalidad & viajes",
    accent: "#d97706",
    match: (d) => /(hotel|viajes|musica)/i.test(d.slug),
  },
  {
    id: "gaming",
    label: "Gaming servers",
    accent: "#22c55e",
    match: (d) => /(minecraft|roblox|cs2|fivem|muonline|lineage2|rust|ark|terraria|palworld)/i.test(d.slug),
  },
  {
    id: "creadores",
    label: "Creadores & medios",
    accent: "#9146ff",
    match: (d) => /(streamer|youtuber|tiktoker|comunicadores)/i.test(d.slug),
  },
];

const CATEGORIES: ShowcaseCategory[] = (() => {
  const used = new Set<string>();
  const out: ShowcaseCategory[] = [];
  for (const def of CATEGORY_DEFS) {
    const slugs: string[] = [];
    for (const d of DEMOS) {
      if (used.has(d.slug)) continue;
      if (def.match(d)) {
        slugs.push(d.slug);
        used.add(d.slug);
      }
    }
    if (slugs.length > 0) out.push({ id: def.id, label: def.label, accent: def.accent, slugs });
  }
  // Sweep any leftovers into a "Más rubros" bucket so all 93 are reachable
  const leftover = DEMOS.filter((d) => !used.has(d.slug)).map((d) => d.slug);
  if (leftover.length > 0) {
    out.push({ id: "otros", label: "Más rubros", accent: "#64748b", slugs: leftover });
  }
  return out;
})();

const TOTAL = DEMOS.length;
const CYCLE_MS = 4000;
const MANUAL_RESUME_MS = 8000;

/* -----------------------------------------------------------
 * Section header
 * --------------------------------------------------------- */

function ShowcaseHeader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const t = useMotionTransition("display", "display");

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-10">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={t}
        className="text-micro font-[family-name:var(--font-jetbrains)]"
      >
        Demos · {TOTAL} industrias · Código abierto
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ ...t, delay: reduced ? 0 : 0.08 }}
        className="mt-3 max-w-3xl font-[family-name:var(--font-instrument)] text-balance text-body-strong"
        style={{
          fontSize: "var(--font-size-display-2)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        Una landing distinta para cada{" "}
        <span className="italic" style={{ color: "var(--accent)" }}>
          rubro
        </span>
        .
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ ...t, delay: reduced ? 0 : 0.14 }}
        className="mt-5 max-w-xl text-body"
        style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}
      >
        Sin templates. Cada demo es código propio.
      </motion.p>
    </div>
  );
}

/* -----------------------------------------------------------
 * Main component
 * --------------------------------------------------------- */

export function LandingDemosShowcase() {
  const reduced = useReducedMotion();
  const [activeCatId, setActiveCatId] = useState<string>(CATEGORIES[0]!.id);
  const [stepIndex, setStepIndex] = useState(0); // index within active category
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [manualUntil, setManualUntil] = useState(0); // epoch ms

  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCatId) ?? CATEGORIES[0]!,
    [activeCatId],
  );
  const activeSlug = activeCategory.slugs[Math.min(stepIndex, activeCategory.slugs.length - 1)] ?? activeCategory.slugs[0]!;
  const activeDemo: DemoMeta = useMemo(
    () => DEMOS.find((d) => d.slug === activeSlug) ?? DEMOS[0]!,
    [activeSlug],
  );

  // Global index within DEMOS — for the "12 / 93" counter
  const globalIndex = useMemo(
    () => DEMOS.findIndex((d) => d.slug === activeSlug),
    [activeSlug],
  );

  // Auto-cycle within the active category
  useEffect(() => {
    if (paused || hovered || reduced) return;
    const now = Date.now();
    if (now < manualUntil) {
      const wait = manualUntil - now;
      const resume = setTimeout(() => setManualUntil(0), wait);
      return () => clearTimeout(resume);
    }
    const id = setInterval(() => {
      setStepIndex((i) => (i + 1) % activeCategory.slugs.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [activeCategory.slugs.length, paused, hovered, reduced, manualUntil]);

  // Reset step when category changes
  useEffect(() => {
    setStepIndex(0);
  }, [activeCatId]);

  const selectCategory = useCallback((id: string) => {
    setActiveCatId(id);
    setManualUntil(Date.now() + MANUAL_RESUME_MS);
  }, []);

  const jumpToDot = useCallback((i: number) => {
    setStepIndex(i);
    setManualUntil(Date.now() + MANUAL_RESUME_MS);
  }, []);

  // Visible dots — cap at 10, scroll-window if more
  const totalSteps = activeCategory.slugs.length;
  const maxDots = 10;
  const dots = useMemo(() => {
    if (totalSteps <= maxDots) return Array.from({ length: totalSteps }, (_, i) => i);
    // Window the dots around the current step
    const half = Math.floor(maxDots / 2);
    let start = Math.max(0, stepIndex - half);
    const end = Math.min(totalSteps, start + maxDots);
    start = Math.max(0, end - maxDots);
    return Array.from({ length: end - start }, (_, k) => start + k);
  }, [stepIndex, totalSteps]);

  return (
    <section
      id="showcase"
      aria-label="Showcase de demos"
      className="relative scroll-mt-24 py-24 md:py-32"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <ShowcaseHeader />

      <div className="mx-auto mt-14 max-w-7xl px-6 md:mt-20 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — category nav */}
          <aside
            className="lg:col-span-3"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="hidden lg:mb-4 lg:block">
              <span
                className="text-micro font-[family-name:var(--font-jetbrains)]"
                style={{ color: "var(--muted-body)" }}
              >
                Categorías
              </span>
            </div>
            <ShowcaseCategoryNav
              categories={CATEGORIES}
              activeId={activeCatId}
              onSelect={selectCategory}
            />
          </aside>

          {/* RIGHT — visual frame + status */}
          <div
            className="lg:col-span-9"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo.slug}
                  initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduced ? 0 : 8 }}
                  transition={{ duration: reduced ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ShowcaseFrame demo={activeDemo} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption — industry, title, link */}
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo.slug + "-cap"}
                  initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl"
                >
                  <p
                    className="text-micro font-[family-name:var(--font-jetbrains)]"
                    style={{ color: activeDemo.accent }}
                  >
                    {activeDemo.industry}
                  </p>
                  <h3
                    className="mt-1.5 font-[family-name:var(--font-instrument)] text-body-strong"
                    style={{
                      fontSize: "var(--font-size-h2)",
                      lineHeight: "var(--leading-heading)",
                      letterSpacing: "var(--tracking-heading)",
                    }}
                  >
                    {activeDemo.title}
                  </h3>
                  <p
                    className="mt-1 max-w-[48ch] text-body"
                    style={{ fontSize: "var(--font-size-small)", lineHeight: "var(--leading-body)" }}
                  >
                    {activeDemo.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>

              <Link
                href={`/demos/${activeDemo.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-body-strong transition-colors hover:text-[var(--accent)]"
                style={{
                  transitionDuration: "var(--duration-snap)",
                  transitionTimingFunction: "var(--ease-snap)",
                }}
              >
                Ver demo completa
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Status row */}
            <div
              className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-4"
              style={{ borderColor: "var(--hairline)" }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="font-[family-name:var(--font-jetbrains)] tabular-nums"
                  style={{
                    color: "var(--muted-body)",
                    fontSize: "var(--font-size-small)",
                    letterSpacing: "var(--tracking-micro)",
                  }}
                >
                  <span style={{ color: "var(--foreground)" }}>
                    {String(globalIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-1.5 opacity-50">/</span>
                  {TOTAL}
                </span>

                <span
                  className="hidden h-3 w-px md:inline-block"
                  style={{ background: "var(--hairline)" }}
                />

                <span
                  className="hidden font-[family-name:var(--font-jetbrains)] text-[11px] md:inline"
                  style={{
                    color: "var(--muted-body)",
                    letterSpacing: "var(--tracking-micro)",
                  }}
                >
                  <span style={{ color: "var(--foreground)" }}>{activeDemo.slug}</span>
                  <span className="mx-1.5 opacity-50">·</span>
                  {activeDemo.industry.split(" · ")[0]}
                </span>

                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Reanudar auto-cycle" : "Pausar auto-cycle"}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors"
                  style={{
                    color: "var(--muted-body)",
                    border: "1px solid var(--hairline)",
                    background: "transparent",
                    transitionDuration: "var(--duration-snap)",
                    transitionTimingFunction: "var(--ease-snap)",
                  }}
                >
                  {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                </button>
              </div>

              <ProgressDots
                count={totalSteps}
                indices={dots}
                activeIndex={stepIndex}
                accent={activeCategory.accent}
                onJump={jumpToDot}
              />
            </div>
          </div>
        </div>

        {/* CTA below the showcase */}
        <div className="mt-20 flex flex-col items-start gap-5 md:mt-24 md:flex-row md:items-end md:justify-between">
          <p
            className="max-w-2xl font-[family-name:var(--font-instrument)] text-balance"
            style={{
              color: "var(--foreground)",
              fontSize: "var(--font-size-h2)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Las{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              {TOTAL} demos
            </span>{" "}
            viven en{" "}
            <span className="font-[family-name:var(--font-jetbrains)] text-[0.78em] tracking-tight">
              /demos
            </span>
            . Encontrá la tuya o pedinos una propia.
          </p>

          <Link
            href="/demos"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all"
            style={{
              color: "var(--foreground)",
              background: "transparent",
              border: "1px solid var(--foreground)",
              transitionDuration: "var(--duration-ui)",
              transitionTimingFunction: "var(--ease-ui)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--foreground)";
              e.currentTarget.style.color = "var(--background)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--foreground)";
            }}
          >
            Explorar las {TOTAL} demos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * ProgressDots — small clickable timeline.
 * Active dot animates from a small circle to a wider pill.
 * --------------------------------------------------------- */

function ProgressDots({
  count,
  indices,
  activeIndex,
  accent,
  onJump,
}: {
  count: number;
  indices: number[];
  activeIndex: number;
  accent: string;
  onJump: (i: number) => void;
}) {
  const snap = useMotionTransition("snap", "snap");
  return (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Demos en esta categoría">
      {indices.map((i) => {
        const active = i === activeIndex;
        return (
          <motion.button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Demo ${i + 1} de ${count}`}
            onClick={() => onJump(i)}
            initial={false}
            animate={{ width: active ? 22 : 6 }}
            transition={snap}
            className="h-1.5 rounded-full"
            style={{
              background: active ? accent : "color-mix(in srgb, var(--muted-body) 30%, transparent)",
              border: "none",
              cursor: "pointer",
            }}
          />
        );
      })}
    </div>
  );
}
