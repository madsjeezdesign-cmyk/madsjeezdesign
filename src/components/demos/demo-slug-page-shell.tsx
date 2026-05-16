"use client";

import { site } from "@/lib/data";
import { shouldRenderSiteExtrasInShell } from "@/lib/demo-content-extensions";
import { demoSectionHeadingClass } from "@/lib/demo-art-direction";
import type { ShowcaseCardMeta } from "@/lib/demos-showcase-meta";
import {
  CinematicBackdrop,
  ShowcaseSiteFooter,
  ShowcaseSiteNav,
} from "./demo-showcase-chrome";
import { DemoSiteValueBlocks } from "./demo-rich-sections";

type Props = {
  slug: string;
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
  slug,
  industry,
  title,
  tagline,
  showcase,
  children,
}: Props) {
  const year = site.activeYear;
  const { accent, pitch } = showcase;
  const showExtras = shouldRenderSiteExtrasInShell(slug);

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black">
      <CinematicBackdrop />
      <ShowcaseSiteNav sticky showDemosIndexLink industry={industry} demoTitle={title} />

      <div className="relative z-10 border-b border-white/10 bg-black/60 px-4 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto max-w-[1400px] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 md:text-[11px]">
            <span>
              Showroom {year} · <span className="text-zinc-400">{industry}</span>
            </span>
            <span className={`max-w-[220px] truncate text-right md:max-w-md ${accent}`}>
              {title} — {tagline}
            </span>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed text-zinc-500 md:text-sm">{pitch}</p>
        </div>
      </div>

      <div className="relative z-10">{children}</div>

      {showExtras ? (
        <DemoSiteValueBlocks
          slug={slug}
          brandLabel={title}
          headingClass={demoSectionHeadingClass(slug)}
        />
      ) : null}

      <ShowcaseSiteFooter />
    </div>
  );
}
