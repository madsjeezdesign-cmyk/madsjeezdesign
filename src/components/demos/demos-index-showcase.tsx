"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
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
  Gem,
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

export function DemosIndexShowcase({ items }: { items: DemosShowcaseItem[] }) {
  const year = site.activeYear;

  return (
    <div className="showcase-page-noise relative min-h-screen overflow-x-hidden bg-[#050505] font-[family-name:var(--font-demo-jakarta)] text-zinc-100 selection:bg-white selection:text-black">
      <CinematicBackdrop />
      <ShowcaseSiteNav />

      <header className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-8 text-left md:px-12 md:pb-20 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85 }}
        >
          <motion.div className="mb-8 flex w-full items-center gap-4 md:mb-10">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.42em] text-zinc-500">
              Showroom {year}
            </span>
            <motion.div className="h-px flex-1 bg-white/15" />
          </motion.div>

          <h1 className="mb-10 flex w-full flex-col items-start leading-[0.82]">
            <span className="font-[family-name:var(--font-demo-bebas)] text-[clamp(3.4rem,14vw,11rem)] uppercase tracking-[-0.02em] text-white">
              Landing
            </span>
            <span className="-mt-2 font-[family-name:var(--font-demo-playfair)] text-[clamp(2.25rem,9vw,6.75rem)] font-normal italic leading-none tracking-tight text-zinc-400 md:-mt-4">
              demo
            </span>
          </h1>

          <motion.div className="grid grid-cols-1 items-end gap-10 md:grid-cols-3">
            <motion.div className="md:col-span-2">
              <p className="max-w-3xl text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
                Modelos de alta fidelidad por industria.{" "}
                <span className="text-white">Estrategia visual, performance y conversión</span> en cada
                bloque: galería, video, e‑commerce simulado y captación de leads.
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-start gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 md:items-end md:text-[10px]">
              <motion.div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-yellow-500" aria-hidden />
                Core Web Vitals aware
              </motion.div>
              <motion.div className="flex items-center gap-2">
                <Monitor className="h-3.5 w-3.5 text-blue-500" aria-hidden />
                SEO-ready structure
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1400px] px-6 pb-28 md:px-12 md:pb-40 lg:px-16">
        <ul className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <DemoCard key={item.slug} item={item} index={index} />
          ))}
        </ul>
      </main>

      <ShowcaseSiteFooter />
    </div>
  );
}
