import { Bath, Sparkles, UtensilsCrossed, Wine } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoLongStory, DemoProcessSteps, DemoTestimonials } from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "hotel" as const;

export function DemoHotelLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <div className="border-b border-amber-900/50 bg-stone-900/80 px-4 py-3 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200/90">
          <span>Posada 9 Luces · Villa demo</span>
          <div className="flex flex-wrap gap-4 text-amber-100/70">
            <span>Check-in 15:00</span>
            <span>Spa 11–21 h</span>
            <span>MICE 12 pax</span>
          </div>
          <button type="button" className="rounded-sm border border-amber-600/60 px-4 py-2 text-amber-100 hover:bg-amber-900/40">
            Reservar suite
          </button>
        </div>
      </div>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-amber-50"
        leadColorClass="text-amber-100/60"
        kicker={<p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-400">Relais · viñedo · cocina a leña</p>}
        title={
          <>
            Noches que
            <br />
            <span className="text-amber-500">piden quedarse otro día</span>
          </>
        }
        lead="Hoteles boutique necesitan storytelling editorial, upsell de experiencias y páginas MICE sin parecer portal corporate. Esta demo une tono cálido, itinerarios descargables y señales de confianza (revistas, premios) con booking simulado en carrito."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Ver disponibilidad
            </button>
            <button type="button" className={art.secondaryCta}>
              Deck eventos
            </button>
          </>
        }
      />

      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {[
            {
              title: "Suite piedra y roble",
              meta: "45 m² · hidro · vista monte",
              body: "Tarifa flexible con política clara de cambios — lo que buscan OTAs y clientes directos.",
            },
            {
              title: "Cuarto jardín",
              meta: "Acceso spa incluido",
              body: "Paquete romance con maridaje — cross-sell visible sin recargar la home.",
            },
          ].map((room) => (
            <article key={room.title} className={`flex flex-col p-8 ${art.cardShell}`}>
              <h3 className={`${h} text-2xl text-amber-50`}>{room.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-amber-500/80">{room.meta}</p>
              <p className="mt-4 flex-1 text-sm text-amber-100/55">{room.body}</p>
              <button type="button" className={`mt-6 w-fit ${art.secondaryCta}`}>
                Ficha PDF demo
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-amber-900/40 bg-stone-950/50 px-4 py-16 md:px-10">
        <h2 className={`mx-auto max-w-5xl text-center ${h} text-3xl text-amber-50 md:text-4xl`}>
          Experiencias que suben ADR
        </h2>
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Wine, t: "Cava vertical", d: "Degustación guiada" },
            { icon: UtensilsCrossed, t: "Asador", d: "Menú fueño 7 pasos" },
            { icon: Sparkles, t: "Rituales", d: "Masajes de autor" },
            { icon: Bath, t: "Hidrología", d: "Circuito térmico" },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`p-6 ${art.cardShell}`}>
              <I className="h-6 w-6 text-amber-500" />
              <p className={`mt-3 ${h} text-lg text-amber-50`}>{t}</p>
              <p className="text-xs text-amber-200/50">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Estancia sin fricción"
        subtitle="Journey guest-facing con microcopy hotelero."
        steps={[
          { n: "I", t: "Pre-arribo", d: "WhatsApp con clima, traslado opcional y menú room service." },
          { n: "II", t: "Llegada", d: "Check-in tablet + upgrade sugerido según ocup demo." },
          { n: "III", t: "Estadía", d: "QR a concierge digital con itinerario vivo." },
          { n: "IV", t: "Salida", d: "Late-out ofertado según housekeeping map." },
        ]}
        sectionClass="bg-stone-900/30"
        titleClass="text-amber-50"
        subtitleClass="text-amber-200/40"
        stepNumClass="text-amber-500"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-amber-100"
        stepDescClass="mt-2 text-sm text-amber-100/55"
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Revenue management"
        title="Contenido que alimenta SEO de destino"
        paragraphs={[
          "Bloques de escapadas 48h, rutas en bici y mapas locales enlazados — fundamental para hoteles fuera del centro urbano.",
          "Integración demo con motor de reservas y giftcards digitales en la misma UI para maximizar ADR combinado.",
        ]}
        kickerClass="text-amber-500"
        titleClass="text-amber-50"
        pClass="mt-4 text-sm text-amber-100/60"
        sectionClass="border-t border-amber-900/30"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Huéspedes & planners"
        quotes={[
          { text: "Logramos vender el patio de eventos chico con solo dos párrafos bien ubicados.", author: "Martina", role: "Wedding planner" },
        ]}
        sectionClass="bg-amber-950/20"
        titleClass="text-amber-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-amber-100/70"
        authorClass="mt-4 text-xs font-bold uppercase text-amber-500"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Posada 9 Luces"
        shopCardClass="border border-amber-800/50 bg-stone-950/80"
        shopAccentClass="bg-amber-600 font-bold text-stone-950"
        sectionClass="bg-stone-950"
        titleClass="text-amber-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-amber-100/70"
        authorClass="mt-4 text-xs font-bold text-amber-500"
      />

      <footer className="py-8 text-center text-xs text-amber-200/30">Demo · Posada 9 Luces</footer>
    </div>
  );
}

export { DemoHotelLanding as DemoHotel };
