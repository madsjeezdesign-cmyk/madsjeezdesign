"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Bike,
  Calendar,
  Clock,
  CreditCard,
  Database,
  FileText,
  Gift,
  Heart,
  Image as ImageIcon,
  Map,
  MapPin,
  MessageSquare,
  Monitor,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Truck,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import { site } from "@/lib/data";
import { DEMO_SECTORS, type DemoSectorId } from "@/lib/demo-sectors";
import type { ShowcaseFeatures } from "@/lib/demo-showcase-features";
import { getShowcaseCardTheme } from "@/lib/demo-showcase-card-theme";
import {
  CinematicBackdrop,
  ShowcaseSiteFooter,
  ShowcaseSiteNav,
} from "./demo-showcase-chrome";
import "./demo-showcase-card.css";

const FEATURE_ICONS: LucideIcon[] = [
  Zap,
  Truck,
  Database,
  Users,
  Search,
  MessageSquare,
  FileText,
  Map,
  ShieldCheck,
  Calendar,
  Utensils,
  Bike,
  Sparkles,
  TrendingUp,
  Star,
  Gift,
  MapPin,
  QrCode,
  Clock,
  ShoppingBag,
  Heart,
  ImageIcon,
  CreditCard,
  Bell,
];

export type DemosShowcaseItem = {
  slug: string;
  category: string;
  sector: DemoSectorId;
  title: string;
  tagline: string;
  pitch: string;
  features: ShowcaseFeatures;
  accentHex: string;
};

function FeatureTag({
  text,
  icon: Icon,
  accentHex,
}: {
  text: string;
  icon: LucideIcon;
  accentHex: string;
}) {
  return (
    <motion.div className="showcase-feature-tag flex min-h-[2.25rem] items-center gap-2 rounded-xl p-2">
      <Icon className="h-3 w-3 shrink-0" style={{ color: accentHex }} aria-hidden />
      <span className="line-clamp-2 text-[10px] font-medium leading-tight text-zinc-300">{text}</span>
    </motion.div>
  );
}

function DemoCard({ item, index }: { item: DemosShowcaseItem; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const theme = getShowcaseCardTheme(item.slug, item.accentHex);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.9) }}
      className="flex h-full list-none"
    >
      <article
        ref={cardRef}
        onMouseMove={onMouseMove}
        className="showcase-card group"
        style={
          {
            "--accent-color": theme.accentHex,
            "--accent-glow": theme.accentGlow,
          } as React.CSSProperties
        }
      >
        <motion.div className="showcase-card-spotlight" aria-hidden />

        <motion.div className="showcase-card-inner">
          <motion.div className="mb-8 flex shrink-0 items-center justify-between">
            <motion.div
              className="flex max-w-[75%] items-center gap-2 rounded-full border px-3 py-1"
              style={{
                borderColor: `${theme.accentHex}33`,
                backgroundColor: `${theme.accentHex}1a`,
              }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: theme.accentHex,
                  boxShadow: `0 0 8px ${theme.accentHex}`,
                }}
              />
              <span
                className="truncate text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: theme.accentHex }}
              >
                {theme.badge}
              </span>
            </motion.div>
            <motion.div className="flex shrink-0 gap-3 text-zinc-600">
              <Monitor className="h-4 w-4" aria-hidden />
              <Smartphone className="h-4 w-4" aria-hidden />
            </motion.div>
          </motion.div>

          <motion.div className="mb-8 shrink-0">
            <h2 className="showcase-title-shimmer font-[family-name:var(--font-demo-playfair)] text-3xl font-bold leading-tight md:text-4xl">
              {item.title}
            </h2>
            <p
              className="mb-4 mt-3 text-xs font-semibold uppercase italic tracking-widest"
              style={{ color: `${theme.accentHex}cc` }}
            >
              {theme.subtitle}
            </p>
            <p className="line-clamp-4 text-sm font-light leading-relaxed text-zinc-400">{item.pitch}</p>
          </motion.div>

          <motion.div className="mb-10 grid min-h-0 flex-1 grid-cols-2 gap-2 content-start">
            {item.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length]!;
              const isLast = i === item.features.length - 1;
              return (
                <motion.div key={feature} className={isLast ? "col-span-2" : undefined}>
                  <FeatureTag text={feature} icon={Icon} accentHex={theme.accentHex} />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div className="mt-auto shrink-0 space-y-3">
            <Link
              href="/#contacto"
              className={`showcase-btn-shimmer flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
                theme.primaryBtnDarkText ? "text-black hover:opacity-90" : "text-white hover:opacity-90"
              }`}
              style={{ backgroundColor: theme.accentHex }}
            >
              Adquirir demo
              <ShoppingCart className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={`/demos/${item.slug}`}
              className="flex w-full items-center justify-center rounded-2xl border border-white/10 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
            >
              Ver preview en vivo
            </Link>
          </motion.div>
        </motion.div>
      </article>
    </motion.li>
  );
}

function groupBySector(items: DemosShowcaseItem[]) {
  const buckets: Partial<Record<DemoSectorId, DemosShowcaseItem[]>> = {};
  for (const item of items) {
    const list = buckets[item.sector] ?? [];
    list.push(item);
    buckets[item.sector] = list;
  }
  return DEMO_SECTORS.filter((s) => buckets[s.id]?.length).map((s) => ({
    ...s,
    items: buckets[s.id]!,
  }));
}

export function DemosIndexShowcase({ items }: { items: DemosShowcaseItem[] }) {
  const year = site.activeYear;
  const sections = groupBySector(items);
  let cardIndex = 0;

  const totalDemos = items.length;
  const totalCategories = sections.length;

  return (
    <div className="showcase-page-noise relative min-h-screen overflow-x-hidden bg-[#050505] font-[family-name:var(--font-demo-jakarta)] text-zinc-100 selection:bg-white selection:text-black">
      <CinematicBackdrop />
      <ShowcaseSiteNav />

      {/* HERO — brand-cyan accent, animated stats, no extreme tracking */}
      <header className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-8 text-left md:px-12 md:pb-20 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85 }}
        >
          {/* Live badge + section meta */}
          <div className="mb-8 flex w-full items-center gap-4 md:mb-10">
            <span
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1"
              style={{
                background: "color-mix(in srgb, var(--brand-cyan) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--brand-cyan) 30%, transparent)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.6875rem",
                letterSpacing: "var(--tracking-micro)",
                color: "var(--brand-cyan)",
              }}
            >
              <span aria-hidden className="live-ping-dot" />
              Showroom · {year}
            </span>
            <div className="h-px flex-1" style={{ background: "color-mix(in srgb, var(--brand-cyan) 20%, transparent)" }} />
            <span
              className="shrink-0"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.6875rem",
                letterSpacing: "var(--tracking-micro)",
                color: "var(--muted-body)",
              }}
            >
              madsjeezdesign.com / demos
            </span>
          </div>

          <h1 className="mb-10 flex w-full flex-col items-start leading-[0.82]">
            <span className="font-[family-name:var(--font-demo-bebas)] text-[clamp(3.4rem,14vw,11rem)] uppercase tracking-[-0.02em] text-white">
              Landing
            </span>
            <span
              className="-mt-2 font-[family-name:var(--font-demo-playfair)] text-[clamp(2.25rem,9vw,6.75rem)] font-normal italic leading-none tracking-tight md:-mt-4"
              style={{ color: "var(--brand-cyan)" }}
            >
              demo
            </span>
          </h1>

          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <p
                className="max-w-3xl text-lg font-light leading-relaxed md:text-xl"
                style={{ color: "var(--muted-body)" }}
              >
                Modelos de alta fidelidad por industria.{" "}
                <span className="text-white font-medium">
                  Estrategia visual, performance y conversión
                </span>{" "}
                en cada bloque: galería, video, e-commerce simulado y captación de leads.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "var(--tracking-micro)",
                  color: "var(--muted-body)",
                }}
              >
                <Zap
                  className="h-3.5 w-3.5"
                  style={{ color: "var(--brand-cyan)" }}
                  aria-hidden
                />
                Core Web Vitals aware
              </div>
              <div
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "var(--tracking-micro)",
                  color: "var(--muted-body)",
                }}
              >
                <Monitor
                  className="h-3.5 w-3.5"
                  style={{ color: "var(--brand-cyan)" }}
                  aria-hidden
                />
                SEO-ready structure
              </div>
            </div>
          </div>

          {/* Stats strip — animated count-up */}
          <div
            className="mt-12 grid grid-cols-2 gap-6 border-y py-6 md:mt-16 md:grid-cols-4 md:gap-8 md:py-8"
            style={{ borderColor: "color-mix(in srgb, var(--brand-cyan) 18%, transparent)" }}
          >
            <ShowcaseStat value={totalDemos} suffix="" label="Demos disponibles" />
            <ShowcaseStat value={totalCategories} suffix="" label="Categorías" />
            <ShowcaseStat value={100} suffix="%" label="A medida · sin templates" />
            <ShowcaseStat value={17} suffix=" años" label="Estudio · Buenos Aires" />
          </div>
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1400px] space-y-20 px-6 pb-28 md:px-12 md:pb-40 lg:px-16">
        {sections.map((section) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            aria-labelledby={`sector-${section.id}`}
          >
            <div
              className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b pb-8"
              style={{ borderColor: "color-mix(in srgb, var(--brand-cyan) 14%, transparent)" }}
            >
              <div>
                <h2
                  id={`sector-${section.id}`}
                  className="font-[family-name:var(--font-demo-bebas)] text-4xl uppercase tracking-wide text-white md:text-5xl"
                >
                  {section.label}
                </h2>
                <p
                  className="mt-3 max-w-3xl text-sm font-light leading-relaxed md:text-base"
                  style={{ color: "var(--muted-body)" }}
                >
                  {section.description}
                </p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                style={{
                  background: "color-mix(in srgb, var(--brand-cyan) 8%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--brand-cyan) 25%, transparent)",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "var(--tracking-micro)",
                  color: "var(--brand-cyan)",
                }}
              >
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 rounded-full"
                  style={{ background: "var(--brand-cyan)", boxShadow: "0 0 6px var(--brand-cyan)" }}
                />
                {section.items.length} modelos
              </span>
            </div>
            <ul className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => {
                const index = cardIndex++;
                return <DemoCard key={item.slug} item={item} index={index} />;
              })}
            </ul>
          </motion.section>
        ))}
      </main>

      <ShowcaseSiteFooter />
    </div>
  );
}

/** Stat counter for the showcase hero strip. */
function ShowcaseStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            obs.unobserve(node);
            const start = performance.now();
            const dur = 1400;
            const animate = (t: number) => {
              const k = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - k, 4);
              setDisplay(Math.round(value * eased));
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
  }, [value]);

  return (
    <div ref={ref}>
      <div
        className="font-[family-name:var(--font-demo-bebas)]"
        style={{
          fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
          lineHeight: 1,
          color: "white",
          letterSpacing: "-0.02em",
        }}
      >
        {display}
        <span style={{ color: "var(--brand-cyan)" }}>{suffix}</span>
      </div>
      <p
        className="mt-2"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.6875rem",
          letterSpacing: "var(--tracking-micro)",
          color: "var(--muted-body)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
    </div>
  );
}
