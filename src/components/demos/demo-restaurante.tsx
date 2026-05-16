import { ChefHat, Clock, MapPin, Star, Wine } from "lucide-react";
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

const SLUG = "restaurante" as const;

export function DemoRestauranteLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="grid grid-cols-1 gap-4 border-b border-rose-900/50 px-5 py-6 md:grid-cols-3 md:items-center md:px-12">
        <span className={`${h} text-center text-xl font-semibold italic text-amber-100 md:text-left md:text-2xl`}>
          La Mesa Norteña
        </span>
        <div className="flex justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-amber-200/70">
          <span className="hidden sm:inline">Carta</span>
          <span className="hidden sm:inline">Vinos</span>
          <span>Reservas</span>
        </div>
        <div className="flex justify-center md:justify-end">
          <button type="button" className={art.secondaryCta}>
            Menú
          </button>
        </div>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-amber-50"
        leadColorClass="text-rose-200/80"
        kicker={
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-800/50 bg-rose-950/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-300">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            Chef &amp; parrilla · desde 2009
          </div>
        }
        title={
          <>
            Cocina de autor con{" "}
            <span className="bg-gradient-to-r from-amber-200 to-rose-300 bg-clip-text text-transparent">
              fuego y vino
            </span>
          </>
        }
        lead="Degustación de 7 pasos los viernes. Carta de vinos boutique. Ambiente íntimo para 40 cubiertos — reservá con seña online."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Reservar mesa
            </button>
            <button
              type="button"
              className="rounded-full border border-amber-200/30 bg-transparent px-8 py-3.5 text-sm font-bold text-amber-100"
            >
              Ver carta degustación
            </button>
          </>
        }
      />

      <section className="border-y border-rose-900/40 bg-black/30 px-5 py-16 md:px-12">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {[
            { icon: Clock, t: "Horarios", d: "Mar–Dom 19:00–00:30" },
            { icon: MapPin, t: "Ubicación", d: "Palermo · estacionamiento" },
            { icon: Wine, t: "Carta", d: "+120 etiquetas en cava" },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`text-center ${art.cardShell} p-6`}>
              <I className="mx-auto h-7 w-7 text-rose-400" />
              <p className="mt-3 font-bold text-amber-100">{t}</p>
              <p className="mt-1 text-sm text-rose-300/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row">
          <div className="flex-1">
            <h2 className={`${h} flex items-center gap-3 text-3xl text-amber-50`}>
              <ChefHat className="h-8 w-8 text-amber-500" />
              Experiencias
            </h2>
            <ul className="mt-8 space-y-6">
              {[
                "Menú ejecutivo mediodía — $ demo",
                "Parrilla premium + guarnición regional",
                "Maridaje guiado cada 15 días",
              ].map((line) => (
                <li key={line} className="border-l-2 border-amber-600/50 pl-4 text-sm text-rose-200/80">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className={`flex-1 bg-gradient-to-b from-rose-950/50 to-transparent p-8 ${art.cardShell}`}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Próximas fechas</p>
            <p className={`mt-4 text-2xl text-amber-100 ${h}`}>Cena maridaje 8 pasos</p>
            <p className="mt-2 text-sm text-rose-300/70">Sábado demo · cupos limitados</p>
            <button type="button" className="mt-8 w-full rounded-xl bg-rose-700 py-3 text-sm font-bold text-white">
              Anotarme lista de espera
            </button>
          </div>
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Mise en place"
        title="Una casa de fuego que respeta el productor y el viticultor"
        paragraphs={[
          "Seleccionamos cortes maduración controlada y pescados de litoral con trazabilidad en menos de 36 h. La parrilla trabaja con brasas de quebracho blanco y reposo en cámara antes del paso final al plato para sellar jugos sin sobrecocción.",
          "Carta de vinos con coravin en etiquetas boutique y anagramas de bodegas familiares que visitamos cada temporada demo. Sommeliers en sala explican maridajes sin postureo; lista también en formato sin alcohol craft.",
        ]}
        kickerClass="text-rose-400"
        titleClass="text-amber-50"
        pClass="mt-4 text-sm text-rose-200/75"
        sectionClass="bg-black/20"
      />

      <DemoStatsStrip
        stats={[
          { value: "40", label: "Cubiertos", hint: "Salón + patio cerrado" },
          { value: "7", label: "Pasos degustación", hint: "Viernes boutique" },
          { value: "120+", label: "Etiquetas cava", hint: "Rotación trimestral" },
          { value: "16", label: "Proveedores", hint: "Chacras y mar demo" },
        ]}
        sectionClass="border-y border-rose-900/40 bg-rose-950/20"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-amber-300 ${h}`}
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-rose-400/80"
        hintClass="mt-1 text-xs text-rose-300/60"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Reservas y seña"
        subtitle="Cupos limitados para mantener timing de servicio y espacio entre mesas."
        steps={[
          { n: "01", t: "Elegís fecha", d: "Calendario online con franja horaria 15 min." },
          { n: "02", t: "Preferencias", d: "Alergias religiosas, intolerancias y nivel de maridaje (light/full)." },
          { n: "03", t: "Seña 30 %", d: "Mercado Pago o transferencia; voucher por mail." },
          { n: "04", t: "Confirmación", d: "Whatsapp recordatorio 24 h con opción de reprogramar demo." },
        ]}
        sectionClass="bg-[#180d12]"
        titleClass="text-amber-100"
        subtitleClass="text-rose-300/70"
        stepNumClass="text-rose-500"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-amber-50"
        stepDescClass="mt-2 text-sm text-rose-200/65"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Carta en profundidad"
        sectionClass="bg-black/25"
        titleClass="text-amber-100"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-amber-200"
        itemBodyClass="mt-2 text-sm text-rose-200/70"
        items={[
          {
            title: "Terruño norte",
            body: "Humita en olla de barro, empanadas al rescoldo y chorizo de elaboración propia con chimichurri fresquísimo.",
          },
          {
            title: "Mar y río",
            body: "Pesca del día con limón konbu, ostras patagónicas cuando hay luna y vieiras con manteca marrón inducción demo.",
          },
          {
            title: "Postre y digestivo",
            body: "Helado de algarroba tostada, digestivos artesanales y café filtrado de finca única con notas frutales.",
          },
          { title: "Sin alcohol", body: "Pairing de kombucha, té cold brew especiado y cordiales de citrus de estación." },
        ]}
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Comensales"
        sectionClass="border-y border-rose-900/30 bg-black/30"
        titleClass="text-amber-100"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-rose-200/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-500/90"
        quotes={[
          { text: "El punto de la costilla fue religioso; el maridaje sin pomposidad.", author: "Fede R.", role: "Sommelier visitante demo" },
          { text: "Me avisaron del huevo oculto en el menú degustación sin drama.", author: "Mica A.", role: "Celíaca verificada" },
          { text: "Reservamos la terraza cerrada para 12; servicio impecable.", author: "HR TechCo", role: "Cena empresa" },
        ]}
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="Preguntas frecuentes"
        sectionClass="border-t border-rose-900/30 bg-[#12080c]"
        titleClass="text-amber-100"
        qClass="font-bold text-rose-100"
        aClass="mt-2 text-sm text-rose-300/65"
        rowClass="border-b border-rose-900/25 py-6 last:border-0"
        items={[
          { q: "¿Menú vegetariano?", a: "Menú plant-based de 5 pasos previo aviso 48 h con mismas técnicas de fuego." },
          { q: "¿Niños?", a: "Sí, menú junior y horario temprano 19 h con sillitas altas limitadas." },
          { q: "¿Estacionamiento?", a: "Cortesía 2 h en garage acuerdo en recepción; vouchers escaneables demo." },
          { q: "Gift card", a: "Digital con fecha abierta 12 meses y mensaje personalizado." },
        ]}
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="La Mesa Norteña"
        sectionClass="border-y border-rose-900/25 bg-[#12080c]"
        titleClass="text-amber-100"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-rose-100/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-500"
        extraTestimonialsTitle="Más experiencias"
        extraTestimonials={[
          { text: "Reservamos desde el celular con seña y llegamos con la mesa lista.", author: "Ceci Manu", role: "Aniversario demo" },
          { text: "La cata de malbec sin pretensión nos enamoró del terruño.", author: "Guido P.", role: "Enólogo visitante" },
          { text: "Traen pan sin TACC caliente, raro en fine dining.", author: "Lucas", role: "Celíaco" },
        ]}
      />

      <footer className="px-5 py-12 text-center text-xs text-rose-900/80 md:px-12">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoRestauranteLanding as DemoRestaurante };
