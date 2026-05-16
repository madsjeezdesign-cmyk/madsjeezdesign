import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Layers,
  LayoutGrid,
  MessageCircle,
  ImageIcon,
  Palette,
} from "lucide-react";
import {
  getDemoCapabilityCards,
  getDemoQuickActions,
  getDemoTrustItems,
} from "@/lib/demo-content-extensions";
import { getShowcaseMeta } from "@/lib/demos-showcase-meta";
import { demoContainer, demoSectionTight } from "./demo-layout";

type SiteBlocksProps = {
  slug: string;
  brandLabel: string;
  headingClass?: string;
  sectionClass?: string;
};

export function DemoSiteValueBlocks({
  slug,
  brandLabel,
  headingClass = "",
  sectionClass = "bg-zinc-950/50",
}: SiteBlocksProps) {
  const capabilities = getDemoCapabilityCards(slug);
  const actions = getDemoQuickActions(slug);
  const meta = getShowcaseMeta(slug);

  return (
    <>
      <section id="demo-capacidades" className={`${demoSectionTight} ${sectionClass}`}>
        <div className={demoContainer}>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">
            Qué podés activar
          </p>
          <h2
            className={`mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl ${headingClass}`}
          >
            Opciones para {brandLabel}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400">
            Módulos habituales en sitios de este rubro. En producción adaptamos prioridades, copy y
            integraciones a tu operación real.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((card) => (
              <article
                key={card.title}
                className={`group rounded-2xl border border-white/10 bg-zinc-950/80 p-5 transition-colors duration-500 hover:border-white/20 ${meta.border}`}
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <LayoutGrid className={`h-4 w-4 ${meta.accent}`} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DemoTrustStrip slug={slug} />

      <section className={demoSectionTight}>
        <div className={demoContainer}>
          <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            Accesos rápidos
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((action, i) => {
              const icons: LucideIcon[] = [MessageCircle, ImageIcon, Layers, ArrowRight];
              const Icon = icons[i] ?? ArrowRight;
              const cls =
                "flex items-start gap-3 rounded-xl border border-white/10 bg-zinc-950/70 p-4 transition-all hover:border-white/25 hover:bg-zinc-900/80";
              const inner = (
                <>
                  <Icon className={`h-5 w-5 shrink-0 ${meta.accent}`} />
                  <div>
                    <p className="text-sm font-bold text-white">{action.label}</p>
                    <p className="mt-1 text-xs text-zinc-500">{action.sub}</p>
                  </div>
                </>
              );
              return action.href.startsWith("/") ? (
                <Link key={action.label} href={action.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a key={action.label} href={action.href} className={cls}>
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/** Barra compacta de confianza (legacy / enhancements / shell). */
export function DemoTrustStrip({ slug }: { slug: string }) {
  const trust = getDemoTrustItems(slug);
  const meta = getShowcaseMeta(slug);
  const icons: LucideIcon[] = [Clock, Palette, Layers, BadgeCheck];

  return (
    <section id="demo-confianza" className={`${demoSectionTight} border-y border-white/5 bg-zinc-950/30`}>
      <div className={demoContainer}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            return (
              <div
                key={item.label}
                className="flex gap-3 rounded-xl border border-white/5 bg-zinc-950/50 p-4"
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${meta.accent}`} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
