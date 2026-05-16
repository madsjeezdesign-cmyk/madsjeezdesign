"use client";

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
  showcase: ShowcaseCardMeta;
  children: React.ReactNode;
};

/**
 * Cromado global del showroom: nav + backdrop + pie.
 * El hero con imagen temática vive dentro de cada demo (disposición única por rubro).
 */
export function DemoSlugPageShell({
  industry,
  title,
  tagline,
  showcase,
  children,
}: Props) {
  const year = site.activeYear;
  const { accent } = showcase;

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black">
      <CinematicBackdrop />
      <ShowcaseSiteNav sticky showDemosIndexLink />

      <div className="relative z-10 border-b border-white/10 bg-black/60 px-4 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 md:text-[11px]">
          <span>
            Showroom {year} · <span className="text-zinc-400">{industry}</span>
          </span>
          <span className={`max-w-[220px] truncate text-right md:max-w-md ${accent}`}>
            {title} — {tagline}
          </span>
        </div>
      </div>

      <div className="relative z-10">{children}</div>

      <ShowcaseSiteFooter />
    </div>
  );
}
