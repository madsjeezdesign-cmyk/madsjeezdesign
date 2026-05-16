import Image from "next/image";
import { getDemoVisuals } from "@/lib/demo-assets";
import { demoSectionHeadingClass } from "@/lib/demo-art-direction";
import { getDemoBySlug } from "@/lib/demos-registry";
import { getShowcaseMeta } from "@/lib/demos-showcase-meta";
import { DEMO_LEAD_COPY } from "@/lib/demo-visual-catalog";
import { demoContainer, demoSectionTight } from "./demo-layout";
import { DemoLeadForm } from "./demo-lead-form";
import { DemoShopFlow } from "./demo-shop-flow";
import { DemoTestimonials } from "./demo-common-sections";
import { DemoSiteValueBlocks } from "./demo-rich-sections";

type Props = {
  slug: string;
  brandLabel: string;
  omitCoverBanner?: boolean;
  shopCardClass?: string;
  shopAccentClass?: string;
  extraTestimonials?: { text: string; author: string; role: string }[];
  extraTestimonialsTitle?: string;
  titleClass?: string;
  quoteClass?: string;
  authorClass?: string;
  cardClass?: string;
  sectionClass?: string;
};

export function DemoEnhancements({
  slug,
  brandLabel,
  omitCoverBanner = false,
  shopCardClass,
  shopAccentClass,
  extraTestimonials,
  extraTestimonialsTitle = "Más opiniones",
  titleClass = "text-white",
  quoteClass = "text-sm italic text-zinc-300",
  authorClass = "mt-4 text-xs font-bold uppercase tracking-wider text-zinc-500",
  cardClass = "rounded-2xl border border-white/10 bg-zinc-950/60 p-6",
  sectionClass = "bg-zinc-950/40",
}: Props) {
  const v = getDemoVisuals(slug);
  const demo = getDemoBySlug(slug);
  const galleryImages = [v.a, v.b, v.c, v.d, v.e]
    .filter((src): src is string => Boolean(src))
    .filter((src, i, arr) => arr.indexOf(src) === i);
  const meta = getShowcaseMeta(slug);
  const leadCopy = DEMO_LEAD_COPY[slug];
  const industry = demo?.industry ?? "referencia del rubro";
  const resolvedShopCard =
    shopCardClass ?? (v.lead.invert ? "border border-stone-200 bg-white shadow-sm" : undefined);
  const resolvedShopAccent =
    shopAccentClass ?? (v.lead.invert ? "bg-stone-900 text-amber-50" : undefined);

  const cardChrome = `group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 transition-all duration-700 ${meta.border}`;

  return (
    <>
      <DemoSiteValueBlocks
        slug={slug}
        brandLabel={brandLabel}
        headingClass={demoSectionHeadingClass(slug)}
        sectionClass={sectionClass}
      />

      {!omitCoverBanner ? (
        <section className={`${demoSectionTight} ${sectionClass}`}>
          <div className={demoContainer}>
            <div className={`${cardChrome} shadow-[0_0_0_1px_rgba(255,255,255,0.04)]`}>
              <div className="relative aspect-[21/9] w-full min-h-[200px]">
                <Image
                  src={v.cover}
                  alt={`${brandLabel} — imagen principal · ${industry}`}
                  fill
                  className="object-cover opacity-90 grayscale transition-all duration-1000 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.color} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-50`}
                />
                <p className="absolute bottom-3 left-4 right-4 text-[10px] font-bold uppercase tracking-widest text-white/90 md:bottom-4">
                  Referencia visual · {industry}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="demo-galeria" className={demoSectionTight}>
        <div className={demoContainer}>
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            Galería de trabajos y ambientes
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {galleryImages.map((src, idx) => (
              <div key={`${slug}-gal-${idx}`} className={cardChrome}>
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={src}
                    alt={`${brandLabel} — foto ${idx + 1} · ${industry}`}
                    fill
                    className="object-cover opacity-90 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    sizes="(max-width: 640px) 45vw, 220px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.color} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-35`}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-zinc-500">
            En tu sitio usamos fotografía propia o licenciada. Estas imágenes son referencia del rubro.
          </p>
        </div>
      </section>

      <section className={`${demoSectionTight} pb-12`}>
        <div className={`${demoContainer} ${cardChrome} p-4 md:p-6`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Video promocional (demo)</p>
          <p className="mt-1 text-sm text-zinc-500">
            Reemplazalo por tu filmación de marca. Si un CDN falla, el reproductor prueba una segunda fuente.
          </p>
          <video
            className="mt-4 aspect-video w-full rounded-xl border border-white/10 bg-black"
            controls
            playsInline
            preload="metadata"
            poster={v.cover}
          >
            <source src={v.videoSrc} type="video/mp4" />
            <source src={v.videoFallbackSrc} type="video/mp4" />
          </video>
        </div>
      </section>

      {extraTestimonials && extraTestimonials.length > 0 ? (
        <DemoTestimonials
          sectionHeadingClass={demoSectionHeadingClass(slug)}
          title={extraTestimonialsTitle}
          quotes={extraTestimonials}
          sectionClass={sectionClass}
          titleClass={titleClass}
          cardClass={cardClass}
          quoteClass={quoteClass}
          authorClass={authorClass}
        />
      ) : null}

      {v.shop ? (
        <DemoShopFlow
          slug={slug}
          shop={v.shop}
          headingClass={demoSectionHeadingClass(slug)}
          cardClass={resolvedShopCard}
          accentClass={resolvedShopAccent}
          light={Boolean(v.lead.invert)}
        />
      ) : null}

      <div id="demo-contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={brandLabel}
          theme={v.lead}
          kicker={leadCopy?.kicker}
          title={leadCopy?.title}
          sub={leadCopy?.sub}
        />
      </div>
    </>
  );
}
