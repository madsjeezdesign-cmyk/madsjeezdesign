"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Monitor,
  Smartphone,
  Zap,
} from "lucide-react";
import { site } from "@/lib/data";
import type { ShowcaseCardMeta } from "@/lib/demos-showcase-meta";
import {
  CinematicBackdrop,
  ShowcaseSiteFooter,
  ShowcaseSiteNav,
} from "./demo-showcase-chrome";

type Props = {
  industry: string;
  title: string;
  tagline: string;
  coverSrc: string;
  showcase: ShowcaseCardMeta;
  children: React.ReactNode;
};

function FeatureRow({ text, accent }: { text: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
      <CheckCircle2 size={12} className={`shrink-0 ${accent}`} />
      {text}
    </div>
  );
}

export function DemoSlugPageShell({
  industry,
  title,
  tagline,
  coverSrc,
  showcase,
  children,
}: Props) {
  const year = site.activeYear;
  const { color, accent, features, pitch } = showcase;

  return (
    <div className="relative min-h-screen bg-black font-[family-name:var(--font-demo-montserrat)] text-zinc-100 selection:bg-white selection:text-black">
      <CinematicBackdrop />
      <ShowcaseSiteNav sticky showDemosIndexLink />

      <header className="relative z-10 mx-auto max-w-[1400px] px-6 pb-10 pt-2 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-6 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">
              Showroom {year} · demo en vivo
            </span>
            <div className="hidden h-px flex-1 bg-white/10 md:block" />
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="absolute inset-0 z-0">
              <Image
                src={coverSrc}
                alt=""
                fill
                className="object-cover opacity-25 grayscale sm:opacity-30"
                sizes="(max-width: 1400px) 100vw, 1400px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-zinc-950/40" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${color} to-transparent opacity-70`}
              />
            </div>

            <div className="relative z-10 grid gap-8 p-8 md:grid-cols-2 md:p-10 lg:gap-12 lg:p-12">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <div
                    className={`rounded-full border border-white/10 bg-black/45 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md ${accent}`}
                  >
                    {industry}
                  </div>
                  <div className="flex gap-2 text-zinc-500">
                    <Monitor size={14} />
                    <Smartphone size={14} />
                  </div>
                </div>
                <h1 className="mb-3 font-[family-name:var(--font-demo-playfair)] text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <p className={`text-sm font-semibold md:text-base ${accent}`}>
                  {tagline}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  {pitch}
                </p>
              </div>
              <div className="flex flex-col justify-between gap-8">
                <div className="grid gap-2.5">
                  {features.map((f) => (
                    <FeatureRow key={f} text={f} accent={accent} />
                  ))}
                </div>
                <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 md:flex-row md:items-center md:justify-between">
                  <span className="flex items-center gap-2">
                    <Zap size={14} className="text-yellow-500" /> Scroll para la
                    landing de ejemplo
                  </span>
                  <span className="hidden sm:inline">Modelo por rubro</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      <div className="relative z-10">{children}</div>

      <ShowcaseSiteFooter />
    </div>
  );
}
