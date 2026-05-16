import type { CSSProperties } from "react";
import { DEMO_SLUGS } from "@/lib/demos-registry";

type DemoSlug = (typeof DEMO_SLUGS)[number];

/** Variante visual del hero temático (0–29 layouts distintos). */
export const DEMO_HERO_VARIANT: Record<DemoSlug, number> = {
  ferreteria: 0,
  restaurante: 1,
  estetica: 2,
  gimnasio: 3,
  veterinaria: 4,
  inmobiliaria: 5,
  tech: 6,
  floreria: 7,
  taller: 8,
  abogados: 9,
  farmacia: 10,
  odontologia: 11,
  contadores: 12,
  musica: 13,
  detailing: 14,
  panaderia: 15,
  viajes: 16,
  limpieza: 17,
  foto: 18,
  optica: 19,
  heladeria: 20,
  lavadero: 21,
  seguridad: 22,
  yoga: 23,
  hotel: 24,
  catering: 25,
  paisajismo: 26,
  tattoo: 27,
  cerrajeria: 28,
  coworking: 29,
};

/** Clases Tailwind para títulos (families únicas; expuesto literal para el JIT). */
export const DEMO_HEADING_CLASS: Record<DemoSlug, string> = {
  ferreteria: "font-[family-name:var(--font-demo-h-ferreteria)]",
  restaurante: "font-[family-name:var(--font-demo-h-restaurante)]",
  estetica: "font-[family-name:var(--font-demo-h-estetica)]",
  gimnasio: "font-[family-name:var(--font-demo-h-gimnasio)]",
  veterinaria: "font-[family-name:var(--font-demo-h-veterinaria)]",
  inmobiliaria: "font-[family-name:var(--font-demo-h-inmobiliaria)]",
  tech: "font-[family-name:var(--font-demo-h-tech)]",
  floreria: "font-[family-name:var(--font-demo-h-floreria)]",
  taller: "font-[family-name:var(--font-demo-h-taller)]",
  abogados: "font-[family-name:var(--font-demo-h-abogados)]",
  farmacia: "font-[family-name:var(--font-demo-h-farmacia)]",
  odontologia: "font-[family-name:var(--font-demo-h-odontologia)]",
  contadores: "font-[family-name:var(--font-demo-h-contadores)]",
  musica: "font-[family-name:var(--font-demo-h-musica)]",
  detailing: "font-[family-name:var(--font-demo-h-detailing)]",
  panaderia: "font-[family-name:var(--font-demo-h-panaderia)]",
  viajes: "font-[family-name:var(--font-demo-h-viajes)]",
  limpieza: "font-[family-name:var(--font-demo-h-limpieza)]",
  foto: "font-[family-name:var(--font-demo-h-foto)]",
  optica: "font-[family-name:var(--font-demo-h-optica)]",
  heladeria: "font-[family-name:var(--font-demo-h-heladeria)]",
  lavadero: "font-[family-name:var(--font-demo-h-lavadero)]",
  seguridad: "font-[family-name:var(--font-demo-h-seguridad)]",
  yoga: "font-[family-name:var(--font-demo-h-yoga)]",
  hotel: "font-[family-name:var(--font-demo-h-hotel)]",
  catering: "font-[family-name:var(--font-demo-h-catering)]",
  paisajismo: "font-[family-name:var(--font-demo-h-paisajismo)]",
  tattoo: "font-[family-name:var(--font-demo-h-tattoo)]",
  cerrajeria: "font-[family-name:var(--font-demo-h-cerrajeria)]",
  coworking: "font-[family-name:var(--font-demo-h-coworking)]",
};

/** Clase Tailwind de título de sección (misma familia display que el rubro). */
export function demoSectionHeadingClass(slug: string): string {
  const s = slug as DemoSlug;
  return DEMO_HEADING_CLASS[s] ?? DEMO_HEADING_CLASS.ferreteria;
}

export function demoBodyStyle(slug: DemoSlug): CSSProperties {
  return {
    fontFamily: `var(--font-demo-b-${slug}), ui-sans-serif, system-ui, sans-serif`,
  };
}

export type DemoArtDirection = {
  slug: DemoSlug;
  heroVariant: number;
  /** Contenedor de página (fondos y mood únicos). */
  pageRoot: string;
  /** Patrón para tarjetas / bloques internos del demo. */
  cardShell: string;
  /** CTA primario (forma y color distintos por rubro). */
  primaryCta: string;
  secondaryCta: string;
};

const ART: Record<DemoSlug, Omit<DemoArtDirection, "slug" | "heroVariant">> = {
  ferreteria: {
    pageRoot:
      "min-h-screen bg-[#0c0a09] text-zinc-100 antialiased selection:bg-orange-500/30",
    cardShell:
      "rounded-sm border border-orange-500/25 bg-zinc-900/70 shadow-[4px_4px_0_0_rgba(234,88,12,0.15)]",
    primaryCta:
      "rounded-none border-2 border-orange-500 bg-orange-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-none",
    secondaryCta:
      "rounded-none border border-zinc-600 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-300",
  },
  restaurante: {
    pageRoot:
      "min-h-screen bg-gradient-to-b from-[#1f0d12] via-[#120809] to-black text-amber-50 antialiased selection:bg-rose-500/25",
    cardShell:
      "rounded-[2.5rem] border border-rose-900/40 bg-black/35 backdrop-blur-md",
    primaryCta:
      "rounded-full bg-gradient-to-r from-amber-600 to-rose-700 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-rose-900/40",
    secondaryCta:
      "rounded-full border border-amber-700/50 bg-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-amber-200/90",
  },
  estetica: {
    pageRoot:
      "min-h-screen bg-[#f6f1ea] text-stone-800 antialiased selection:bg-amber-200/80",
    cardShell:
      "rounded-3xl border border-stone-200/80 bg-white/90 shadow-[0_20px_60px_-24px_rgba(120,80,40,0.35)]",
    primaryCta:
      "rounded-2xl bg-stone-900 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-amber-50 shadow-md",
    secondaryCta:
      "rounded-2xl border-2 border-stone-300 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-700",
  },
  gimnasio: {
    pageRoot:
      "min-h-screen bg-[#070b06] text-lime-50 antialiased selection:bg-lime-400/30",
    cardShell:
      "rounded-xl border border-lime-500/20 bg-zinc-950/90 ring-1 ring-lime-400/10",
    primaryCta:
      "bg-lime-400 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black [clip-path:polygon(0_0,100%_0,100%_82%,94%_100%,0_100%)]",
    secondaryCta:
      "rounded-lg border border-zinc-600 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-zinc-300",
  },
  veterinaria: {
    pageRoot:
      "min-h-screen bg-gradient-to-br from-teal-950 via-[#0a1c1a] to-black text-teal-50 antialiased selection:bg-orange-300/30",
    cardShell:
      "rounded-2xl border border-teal-700/35 bg-teal-950/50 backdrop-blur-sm",
    primaryCta:
      "rounded-full bg-orange-400 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-teal-950",
    secondaryCta:
      "rounded-full border-2 border-teal-400/50 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-teal-100",
  },
  inmobiliaria: {
    pageRoot:
      "min-h-screen bg-[#0a0c10] text-slate-100 antialiased selection:bg-amber-500/25",
    cardShell:
      "rounded-none border border-amber-900/30 bg-slate-900/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
    primaryCta:
      "rounded-sm border border-amber-600/80 bg-amber-600/90 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-950",
    secondaryCta:
      "rounded-sm border border-slate-500 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-200",
  },
  tech: {
    pageRoot:
      "min-h-screen bg-slate-950 text-slate-200 antialiased selection:bg-violet-500/35",
    cardShell:
      "rounded-lg border border-violet-500/25 bg-slate-900/60 shadow-[0_0_40px_-10px_rgba(139,92,246,0.35)]",
    primaryCta:
      "rounded-md bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-950",
    secondaryCta:
      "rounded-md border border-violet-500/50 bg-violet-950/40 px-6 py-3 text-xs font-bold uppercase tracking-widest text-violet-200",
  },
  floreria: {
    pageRoot:
      "min-h-screen bg-gradient-to-b from-emerald-950 via-[#0f1722] to-emerald-950 text-emerald-50 antialiased selection:bg-pink-500/25",
    cardShell:
      "rounded-[1.75rem] border border-pink-500/30 bg-emerald-900/35",
    primaryCta:
      "rounded-full bg-pink-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white",
    secondaryCta:
      "rounded-full border border-emerald-400/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-emerald-100",
  },
  taller: {
    pageRoot:
      "min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-red-500/25",
    cardShell:
      "rounded-none border-l-4 border-red-600 bg-zinc-900/80 pl-5 pr-4 py-4",
    primaryCta:
      "rounded-sm bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white",
    secondaryCta:
      "rounded-sm border border-zinc-600 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-zinc-300",
  },
  abogados: {
    pageRoot:
      "min-h-screen bg-[#0d0d0c] text-neutral-200 antialiased selection:bg-amber-600/25",
    cardShell:
      "rounded-xl border border-amber-900/40 bg-neutral-950/90",
    primaryCta:
      "rounded border-2 border-amber-600/70 bg-amber-950/50 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-400",
    secondaryCta:
      "rounded border border-neutral-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-neutral-300",
  },
  farmacia: {
    pageRoot:
      "min-h-screen bg-emerald-950 text-emerald-50 antialiased selection:bg-green-400/25",
    cardShell:
      "rounded-2xl border border-emerald-700/35 bg-emerald-900/40",
    primaryCta:
      "rounded-2xl bg-green-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-emerald-950",
    secondaryCta:
      "rounded-2xl border border-emerald-400/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-emerald-100",
  },
  odontologia: {
    pageRoot:
      "min-h-screen bg-sky-950 text-sky-50 antialiased selection:bg-sky-300/25",
    cardShell:
      "rounded-3xl border border-sky-700/30 bg-sky-900/30 backdrop-blur",
    primaryCta:
      "rounded-full bg-sky-400 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-sky-950",
    secondaryCta:
      "rounded-full border border-sky-300/50 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-sky-100",
  },
  contadores: {
    pageRoot:
      "min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-slate-200/25",
    cardShell:
      "rounded-md border border-slate-700 bg-slate-900/70 shadow-inner",
    primaryCta:
      "rounded-md bg-slate-100 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-900",
    secondaryCta:
      "rounded-md border border-slate-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-200",
  },
  musica: {
    pageRoot:
      "min-h-screen bg-violet-950 text-violet-50 antialiased selection:bg-fuchsia-500/30",
    cardShell:
      "rounded-2xl border border-fuchsia-500/25 bg-black/35",
    primaryCta:
      "rounded-full bg-fuchsia-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white",
    secondaryCta:
      "rounded-full border border-violet-400/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-violet-100",
  },
  detailing: {
    pageRoot:
      "min-h-screen bg-[#0b0f14] text-slate-100 antialiased selection:bg-sky-400/25",
    cardShell:
      "rounded-2xl border border-sky-500/20 bg-slate-900/55",
    primaryCta:
      "rounded-xl bg-sky-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950",
    secondaryCta:
      "rounded-xl border border-slate-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-200",
  },
  panaderia: {
    pageRoot:
      "min-h-screen bg-gradient-to-b from-amber-950 to-[#2a1810] text-amber-50 antialiased selection:bg-amber-400/25",
    cardShell:
      "rounded-t-3xl rounded-b-lg border border-amber-800/40 bg-black/25",
    primaryCta:
      "rounded-b-2xl rounded-t-md bg-amber-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-amber-950",
    secondaryCta:
      "rounded-b-2xl rounded-t-md border border-amber-700/60 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-amber-100",
  },
  viajes: {
    pageRoot:
      "min-h-screen bg-gradient-to-br from-teal-900 via-[#0c1924] to-teal-950 text-teal-50 antialiased selection:bg-cyan-300/25",
    cardShell:
      "rounded-[2rem] border border-teal-600/25 bg-teal-950/40",
    primaryCta:
      "rounded-2xl bg-teal-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-teal-950",
    secondaryCta:
      "rounded-2xl border border-teal-300/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-teal-100",
  },
  limpieza: {
    pageRoot:
      "min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-400/25",
    cardShell:
      "rounded-xl border border-indigo-900/45 bg-slate-900/65",
    primaryCta:
      "rounded-lg bg-indigo-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white",
    secondaryCta:
      "rounded-lg border border-indigo-400/35 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-indigo-100",
  },
  foto: {
    pageRoot:
      "min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-400/20",
    cardShell:
      "rounded-none border border-zinc-700 bg-zinc-900/50",
    primaryCta:
      "rounded-none bg-amber-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-zinc-950",
    secondaryCta:
      "rounded-none border border-zinc-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-zinc-200",
  },
  optica: {
    pageRoot:
      "min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-400/25",
    cardShell:
      "rounded-[3rem] border border-slate-700 bg-slate-900/55",
    primaryCta:
      "rounded-full bg-sky-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950",
    secondaryCta:
      "rounded-full border border-slate-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-200",
  },
  heladeria: {
    pageRoot:
      "min-h-screen bg-gradient-to-br from-[#1a0b18] via-[#0f172a] to-[#042f2e] text-cyan-50 antialiased selection:bg-fuchsia-500/30",
    cardShell:
      "rounded-[2rem] border border-fuchsia-500/30 bg-black/35 backdrop-blur-md",
    primaryCta:
      "rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-fuchsia-900/40",
    secondaryCta:
      "rounded-full border border-cyan-400/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-cyan-100",
  },
  lavadero: {
    pageRoot:
      "min-h-screen bg-[#070d12] text-cyan-50 antialiased selection:bg-cyan-400/25",
    cardShell:
      "rounded-xl border border-cyan-500/25 bg-slate-900/70 shadow-[0_0_50px_-20px_rgba(34,211,238,0.35)]",
    primaryCta:
      "rounded-lg bg-cyan-400 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-slate-950",
    secondaryCta:
      "rounded-lg border border-slate-600 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-slate-300",
  },
  seguridad: {
    pageRoot:
      "min-h-screen bg-[#050a08] text-emerald-50 antialiased selection:bg-emerald-400/30",
    cardShell:
      "rounded-lg border border-emerald-800/40 bg-emerald-950/40",
    primaryCta:
      "rounded-md bg-emerald-400 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-emerald-950",
    secondaryCta:
      "rounded-md border border-emerald-500/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-emerald-100",
  },
  yoga: {
    pageRoot:
      "min-h-screen bg-[#f4f1ff] text-violet-950 antialiased selection:bg-violet-300/40",
    cardShell:
      "rounded-3xl border border-violet-200 bg-white/85 shadow-[0_24px_60px_-24px_rgba(109,40,217,0.35)]",
    primaryCta:
      "rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white",
    secondaryCta:
      "rounded-2xl border-2 border-violet-300 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-violet-800",
  },
  hotel: {
    pageRoot:
      "min-h-screen bg-[#1c1410] text-amber-50 antialiased selection:bg-amber-500/25",
    cardShell:
      "rounded-sm border border-amber-800/40 bg-stone-900/55",
    primaryCta:
      "rounded-sm bg-amber-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-stone-950",
    secondaryCta:
      "rounded-sm border border-amber-200/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-100",
  },
  catering: {
    pageRoot:
      "min-h-screen bg-gradient-to-b from-[#140808] to-black text-red-50 antialiased selection:bg-red-500/25",
    cardShell:
      "rounded-2xl border border-red-900/45 bg-red-950/25 backdrop-blur",
    primaryCta:
      "rounded-xl bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white",
    secondaryCta:
      "rounded-xl border border-red-400/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-red-100",
  },
  paisajismo: {
    pageRoot:
      "min-h-screen bg-green-950 text-lime-50 antialiased selection:bg-lime-400/25",
    cardShell:
      "rounded-2xl border border-green-800/50 bg-green-900/35",
    primaryCta:
      "rounded-full bg-lime-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-green-950",
    secondaryCta:
      "rounded-full border border-lime-400/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-lime-100",
  },
  tattoo: {
    pageRoot:
      "min-h-screen bg-[#0a0508] text-rose-50 antialiased selection:bg-rose-600/30",
    cardShell:
      "rounded-lg border border-rose-900/50 bg-black/55",
    primaryCta:
      "rounded-lg bg-rose-600 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white",
    secondaryCta:
      "rounded-lg border border-rose-500/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-rose-100",
  },
  cerrajeria: {
    pageRoot:
      "min-h-screen bg-neutral-950 text-yellow-50 antialiased selection:bg-yellow-400/20",
    cardShell:
      "rounded-2xl border border-yellow-700/35 bg-zinc-900/75",
    primaryCta:
      "rounded-xl bg-yellow-400 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black",
    secondaryCta:
      "rounded-xl border border-yellow-500/50 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-yellow-100",
  },
  coworking: {
    pageRoot:
      "min-h-screen bg-slate-950 text-sky-50 antialiased selection:bg-sky-400/25",
    cardShell:
      "rounded-[2rem] border border-sky-500/20 bg-slate-900/55",
    primaryCta:
      "rounded-2xl bg-sky-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950",
    secondaryCta:
      "rounded-2xl border border-sky-400/35 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-sky-100",
  },
};

export function getDemoArtDirection(slug: string): DemoArtDirection {
  const s = slug as DemoSlug;
  const base = ART[s] ?? ART.ferreteria;
  return {
    slug: s,
    heroVariant: DEMO_HERO_VARIANT[s] ?? 0,
    pageRoot: `${base.pageRoot} overflow-x-hidden`,
    cardShell: base.cardShell,
    primaryCta: base.primaryCta,
    secondaryCta: base.secondaryCta,
  };
}
