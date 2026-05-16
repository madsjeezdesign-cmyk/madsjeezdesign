import { Aperture, Camera, Clapperboard, Lightbulb, MonitorPlay } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import {
  DEMO_HEADING_CLASS,
  demoBodyStyle,
  getDemoArtDirection,
} from "@/lib/demo-art-direction";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "foto" as const;

export function DemoFotoLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="flex items-center justify-between border-b border-amber-500/20 px-4 py-4 md:px-10">
        <span className={`text-xl font-semibold text-amber-100 ${h}`}>Lúmenes Estudio</span>
        <button type="button" className={art.primaryCta}>
          Brief creativo
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-zinc-400"
        kicker={
          <p className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-amber-500 ${h}`}>
            <Camera className="h-4 w-4" /> Estudio · locación · eventos
          </p>
        }
        title={
          <>
            Fotografía y vídeo que{" "}
            <span className="text-amber-400">venden la idea</span> detrás del producto
          </>
        }
        lead="Estudio propio con ciclorama infinito, packshots con clipping path, campañas lifestyle en locación y cobertura de lanzamientos multitud. Color grading con LUT de marca, entrega en capas para retail y adaptaciones 9:16 para paid social. Equipo de producción demo con PM dedicado y call sheet compartido."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Pedir presupuesto
            </button>
            <button type="button" className={art.secondaryCta}>
              Ver reel
            </button>
          </>
        }
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Workflow"
        title="Del moodboard al master en una sola cadena"
        paragraphs={[
          "En prepro armamos shot list priorizada por ROI: qué tomas alimentan ecommerce, cuáles están pensadas para OOH y cuáles son B-roll orgánico. En set operamos con doble backup en NAS cifrado y nomenclatura que cruza con tu DAM.",
          "Post: retoque conservador en piel para moda, HDR controlado para arquitectura y retoque de producto sin mentir sobre textura. Revisiones por frame.io con timestamp para ahorrar idas y vueltas demo.",
        ]}
        kickerClass="text-amber-500"
        titleClass="text-white"
        pClass="mt-4 text-sm text-zinc-400"
      />

      <section className="grid gap-4 border-y border-zinc-800 px-4 py-12 md:grid-cols-4 md:px-10">
        {[
          { icon: Camera, t: "Still", d: "PhaseOne / Sony FX · tether Capture One demo." },
          { icon: MonitorPlay, t: "Motion", d: "4K 10-bit, gimbal RS3, dron habilitado ANAC." },
          { icon: Lightbulb, t: "Luz", d: "Profoto + modificadores para packaging metalizado." },
          { icon: Clapperboard, t: "Set", d: "Conductores y talent briefing centralizado." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className={`p-5 ${art.cardShell}`}>
            <I className="h-6 w-6 text-amber-500" />
            <p className={`mt-2 font-bold text-white ${h}`}>{t}</p>
            <p className="mt-1 text-xs text-zinc-500">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "1.2k+", label: "Producciones", hint: "Histórico demo" },
          { value: "48 h", label: "Rush stills", hint: "Hasta 40 fotos" },
          { value: "6", label: "Coloristas", hint: "Turnos paralelos" },
          { value: "100%", label: "Derechos", hint: "Uso web + paid 24 meses" },
        ]}
        valueClass={`text-3xl font-black text-amber-400 ${h}`}
        cardClass={`p-6 ${art.cardShell}`}
        sectionClass="border-y border-zinc-800 bg-zinc-950/50"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Cómo trabajamos con tu marca"
        steps={[
          { n: "01", t: "Kick-off", d: "Objetivos de campaña, benchmarks y restricciones legales." },
          { n: "02", t: "Producción", d: "Call sheet, catering y protocolo de seguridad en set." },
          { n: "03", t: "Selección", d: "Galería ligera en 24 h; elegís favoritos y notas por ítem." },
          { n: "04", t: "Entrega", d: "WeTransfer + carpeta estructurada `/master` `/social` `/shop`." },
        ]}
        stepNumClass="text-amber-500"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-zinc-500"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Paquetes demo"
        items={[
          { title: "E-commerce pack", body: "12 ángulos por SKU, máscara incluida, sombra natural opcional." },
          { title: "Lookbook temporada", body: "Locación 8 h, styling asistido, 40 selects editados." },
          { title: "Hero campaign", body: 'Stills + spot 15" + variaciones CTA para performance.' },
          { title: "Event coverage", body: "Dos operadores, same-day highlight 60 s para redes." },
        ]}
        itemTitleClass="font-bold text-amber-300"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemBodyClass="mt-2 text-sm text-zinc-500"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Marcas"
        quotes={[
          { text: "Subieron conversión del PDP 18 % tras el reshoot.", author: "Head of Growth", role: "Skincare demo" },
          { text: "Entendieron nuestra paleta sin guía escrita.", author: "Brand Mgr", role: "Bebidas" },
          { text: "El equipo en stand-by nos salvó el keynote.", author: "Events Lead", role: "SaaS" },
        ]}
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-500"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        items={[
          { q: "¿Modelos?", a: "Casting interno o traés agencia; contratos estándar AR audiovisual." },
          { q: "¿Locales?", a: "Alquiler de estudio incluido o locación con permisos gestionados." },
          { q: "¿Raw?", a: "Disponible con fee adicional y acuerdo de archivo 90 días." },
          { q: "¿Uso internacional?", a: "Extensión de licencia facturada por mercado demo." },
        ]}
        titleClass="text-white"
        qClass="font-bold text-zinc-200"
        aClass="mt-2 text-sm text-zinc-500"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Lúmenes Estudio"
        shopCardClass="border border-amber-500/25 bg-zinc-900/60"
        shopAccentClass="bg-amber-500 font-bold text-zinc-950"
        sectionClass="border-y border-amber-900/20 bg-zinc-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-500"
        extraTestimonialsTitle="Marcas & productoras"
        extraTestimonials={[
          { text: "Color grading fiel a nuestra guía de marca offline.", author: "Brand Mgr", role: "Cosmética demo" },
          { text: "Misma crew para packshot y lifestyle — ahorramos briefing.", author: "Euge", role: "E-commerce" },
          { text: "Highlight del evento en el día — cumplieron horario de keynote.", author: "Comms", role: "Enterprise" },
        ]}
      />

      <footer className="flex items-center justify-center gap-2 py-10 text-center text-xs text-zinc-600">
        <Aperture className="h-4 w-4" />
        Demo · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoFotoLanding as DemoFoto };
