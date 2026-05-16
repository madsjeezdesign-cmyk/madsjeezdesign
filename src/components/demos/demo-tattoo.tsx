import Image from "next/image";
import { Clock, Pen, ShieldAlert } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoDetailGrid, DemoFaqList, DemoLongStory } from "./demo-common-sections";
import { DemoBrandNav } from "./demo-brand-nav";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "tattoo" as const;

export function DemoTattooLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <DemoBrandNav
        slug={SLUG}
        brand="INK · ORÁCULO"
        iconKey="Pen"
        primaryCta="Lista espera"
        primaryCtaClass={art.primaryCta}
      />
      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-rose-50"
        leadColorClass="text-rose-100/55"
        kicker={
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-500">
            <Pen className="h-4 w-4" /> Guest artists · bio-seguridad · merch
          </span>
        }
        title={
          <>
            Estudio
            <br />
            <span className="text-rose-500">con voz de galería</span>
          </>
        }
        lead="Tatuadores y managers necesitan agenda cerrada, políticas de seña claras, aftercare descargable y mood oscuro sin perder accesibilidad. Esta demo mezcla disclaimer legal, bloque de artistas invitados y ecommerce mínimo para productos de cuidado."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Ver calendario flash
            </button>
            <button type="button" className={art.secondaryCta}>
              Guía aftercare
            </button>
          </>
        }
      />

      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {[v.a, v.b, v.c, v.d, v.e].filter(Boolean).map((src, i) => (
            <div
              key={src}
              className={`relative aspect-[3/4] overflow-hidden rounded-lg border border-rose-900/40 ${i === 0 ? "col-span-2 row-span-2 aspect-[4/5] md:col-span-2" : ""}`}
            >
              <Image src={src!} alt="" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" sizes="(max-width:768px) 50vw, 33vw" />
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-rose-200/40">
          Masonry asimétrico propio de portfolios de estudio — rompe la grilla 3×3 genérica.
        </p>
      </section>

      <section className="border-y border-rose-900/40 bg-black/40 px-4 py-10 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-rose-200">
            <ShieldAlert className="h-8 w-8 text-rose-500" />
            <div>
              <p className={`${h} text-lg text-rose-50`}>Política de consentimiento informado</p>
              <p className="text-sm text-rose-200/50">Menores acompañados · documentación demo · derecho a pausar sesión.</p>
            </div>
          </div>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
            <Clock className="h-4 w-4" /> Depósito no reembolsable 40%
          </span>
        </div>
      </section>

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Cómo vendemos tiempo de aguja"
        titleClass="text-rose-50"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-rose-500"
        itemBodyClass="mt-2 text-sm text-rose-100/55"
        items={[
          { title: "Guest spots", body: "Landing efímera con countdown y link a depósito internacional demo." },
          { title: "Merch limitado", body: "Drop anunciado por mailing segmentado — integración simple con carrito." },
          { title: "Piel sensible", body: "Protocolo visible para alergias y tiempos de curación." },
          { title: "Colaboraciones", body: "Sección prensa y museos para posicionamiento premium." },
        ]}
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="SEO local"
        title="Ranking sin caer en clichés de calaveras"
        paragraphs={[
          "Copy orientado a estilos (ornamental, neo trad, fine line) con schema FAQ para preguntas de dolor y precios orientativos.",
          "Map embed limpio y horarios sincronizados con Google Business para no desinformar antes de la seña.",
        ]}
        kickerClass="text-rose-500"
        titleClass="text-rose-50"
        pClass="mt-4 text-sm text-rose-100/60"
        sectionClass="bg-rose-950/20"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="Leyes & salud"
        items={[
          { q: "¿Trabajan con pigmentos veganos?", a: "Listado de marcas y lotes en ficha descargable demo." },
          { q: "¿Puedo llevar diseño externo?", a: "Sí, con revisión de legibilidad y ajuste de línea." },
        ]}
        sectionClass="border-t border-rose-900/30"
        titleClass="text-rose-50"
        qClass="font-bold text-rose-100"
        aClass="mt-2 text-sm text-rose-200/45"
        rowClass="border-b border-rose-900/35 py-5 last:border-0"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Oráculo Ink Lab"
        shopCardClass="border border-rose-800/50 bg-black/60"
        shopAccentClass="bg-rose-600 font-bold text-white"
        sectionClass="bg-[#070308]"
        titleClass="text-rose-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-rose-100/65"
        authorClass="mt-4 text-xs font-bold text-rose-500"
        extraTestimonials={[{ text: "El minimal shop ayudó a vender aftercare sin distraer del portfolio.", author: "Nico", role: "Front desk" }]}
      />

      <footer className="py-8 text-center text-xs text-rose-900/70">Demo · Oráculo Ink Lab</footer>
    </div>
  );
}

export { DemoTattooLanding as DemoTattoo };
