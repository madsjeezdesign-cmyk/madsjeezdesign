import Image from "next/image";
import { getDemoVisuals } from "@/lib/demo-assets";
import { demoSectionHeadingClass } from "@/lib/demo-art-direction";
import { getShowcaseMeta } from "@/lib/demos-showcase-meta";
import { DemoLeadForm } from "./demo-lead-form";
import { DemoShopFlow } from "./demo-shop-flow";
import { DemoTestimonials } from "./demo-common-sections";

type Props = {
  slug: string;
  brandLabel: string;
  /** Oculta el banner superior si el hero del demo ya usa la misma portada temática. */
  omitCoverBanner?: boolean;
  /** Estilos opcionales del bloque shop para acordar con la paleta */
  shopCardClass?: string;
  shopAccentClass?: string;
  /** Tercera tanda de testimonios (rubro-específicos cortos) */
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
  cardClass = "rounded-[2.5rem] border border-white/10 bg-zinc-950/60 p-6",
  sectionClass = "bg-zinc-950/40",
}: Props) {
  const v = getDemoVisuals(slug);
  const meta = getShowcaseMeta(slug);
  const resolvedShopCard =
    shopCardClass ?? (v.lead.invert ? "border border-stone-200 bg-white shadow-sm" : undefined);
  const resolvedShopAccent =
    shopAccentClass ?? (v.lead.invert ? "bg-stone-900 text-amber-50" : undefined);

  const cardChrome = `group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-950 transition-all duration-700 ${meta.border}`;

  return (
    <>
      {!omitCoverBanner ? (
        <section className="px-4 pb-6 pt-4 md:px-10">
          <div
            className={`mx-auto max-w-6xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)] ${cardChrome}`}
          >
            <div className="relative aspect-[16/7] w-full min-h-[180px] md:aspect-[21/8] md:min-h-[240px]">
              <Image
                src={v.cover}
                alt=""
                fill
                className="object-cover opacity-90 grayscale transition-all duration-1000 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 1152px"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.color} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-60`}
              />
              <p className="absolute bottom-3 left-4 right-4 text-[10px] font-bold uppercase tracking-widest text-white/90 md:bottom-4 md:left-6">
                Imagen demo · referencia visual del rubro
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-8 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3 md:gap-4">
          {[v.a, v.b, v.c].map((src) => (
            <div key={src} className={cardChrome}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover opacity-90 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.color} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-40`}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-6xl text-center text-[11px] text-zinc-500">
          Galería demostrativa (stock). En tu sitio usamos fotografía propia o licenciada.
        </p>
      </section>

      <section className="px-4 pb-12 md:px-10">
        <div
          className={`mx-auto max-w-4xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:p-6 ${cardChrome}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
            Video promocional (demo)
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Clip de ejemplo libre de derechos; reemplazalo por tu filmación vertical u horizontal
            según campaña. Si un CDN falla, el reproductor prueba una segunda fuente.
          </p>
          <video
            className="mt-4 aspect-video w-full rounded-2xl border border-white/10 bg-black"
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
          cardClass={resolvedShopCard}
          accentClass={resolvedShopAccent}
          light={Boolean(v.lead.invert)}
        />
      ) : null}

      <DemoLeadForm slug={slug} brandLabel={brandLabel} theme={v.lead} />
    </>
  );
}
