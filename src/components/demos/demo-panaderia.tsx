import { Coffee, Croissant, Leaf, Wheat } from "lucide-react";
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

const SLUG = "panaderia" as const;

export function DemoPanaderiaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="flex w-full justify-end border-b border-amber-700/40 px-4 py-4 md:px-10">
        <div className="flex w-full max-w-6xl items-center justify-between">
          <span className={`text-2xl font-semibold text-amber-100 ${h}`}>El Horno de Raíz</span>
          <button type="button" className={art.primaryCta}>
            Pedir encargue
          </button>
        </div>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-amber-200/80"
        kicker={
          <p className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-amber-400 ${h}`}>
            <Wheat className="h-4 w-4" /> Masa madre · horno de piedra
          </p>
        }
        title={
          <>
            Masa madre,
            <br />
            <span className="text-amber-400">fuego y café</span>
          </>
        }
        lead="Pan de fermentación lenta, viennoiserie con manteca europea demo, pastelería sin exceso de azúcar y café de especialidad con origen rotativo. Menú de lunch con focaccias saladas y opción sin gluten acotada. Encargues corporativos con etiqueta personalizada para eventos."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Menú del día
            </button>
            <button type="button" className={art.secondaryCta}>
              Encargos
            </button>
          </>
        }
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Origen"
        title="Harinas, tiempo y horno de piedra"
        paragraphs={[
          "Amasamos con pre fermentados fríos mínimo 16 h para desarrollar aroma sin acidez agresiva. Horneamos en soles de lava que retienen vapor los primeros minutos para lograr corteza fina y miga alveolada.",
          "Rotamos menú de granos ancestrales (espelta, kamut) y panes con semillas activadas. Trazabilidad de lotes para clientes celiacos en productos certificados demo.",
        ]}
        kickerClass="text-amber-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-amber-200/75"
        sectionClass="bg-amber-900/30"
      />

      <section className="grid gap-4 border-y border-amber-800/40 px-4 py-12 md:grid-cols-4 md:px-10">
        {[
          { icon: Wheat, t: "Molienda", d: "Harina local y francesa T65 según receta." },
          { icon: Leaf, t: "Orgánicos", d: "Línea integral con certificado demo." },
          { icon: Croissant, t: "Laminados", d: "Croissant y pain au choc fin de semana." },
          { icon: Coffee, t: "Café", d: "Espresso 18 g, filtrados y cold brew verano." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className={`p-5 ${art.cardShell}`}>
            <I className="h-6 w-6 text-amber-400" />
            <p className={`mt-2 font-bold text-white ${h}`}>{t}</p>
            <p className="mt-1 text-xs text-amber-200/60">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "04:00", label: "Encendido horno", hint: "Pan para 8 h" },
          { value: "40+", label: "Referencias", hint: "Vitrina rotativa" },
          { value: "12", label: "Baristas", hint: "Turnos demo" },
          { value: "100%", label: "Takeaway compost", hint: "Bolsas kraft" },
        ]}
        valueClass={`text-3xl font-black text-amber-400 ${h}`}
        cardClass={`p-6 ${art.cardShell}`}
        sectionClass="border-y border-amber-900/30 bg-black/15"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Encargos grandes"
        steps={[
          { n: "01", t: "Presupuesto", d: "Cantidades, horario de entrega y etiquetas." },
          { n: "02", t: "Seña 30%", d: "Reserva producción en franja nocturna." },
          { n: "03", t: "Pre horno", d: "Congelado parcial para hornear en tu horario." },
          { n: "04", t: "Entrega", d: "Furgón térmico o retiro en mostrador." },
        ]}
        stepNumClass="text-amber-400"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-amber-200/70"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Especialidades"
        items={[
          { title: "Pan de campo 1 kg", body: "Corteza oscura, hidratación 78 %, ideal para bruschetta y sandwich de lomo." },
          { title: "Brioche hamburguesas", body: "Para locales gastronómicos: molde estándar y XL 120 g demo." },
          { title: "Facturas surtidas", body: "Bandeja 24 u al por mayor con glaseado y sin glaseado." },
          { title: "Sin TACC fraccionada", body: "Línea en cocina separada días martes y jueves; listado de alérgenos en web." },
        ]}
        itemTitleClass="font-bold text-amber-300"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemBodyClass="mt-2 text-sm text-amber-100/80"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Vecinos y chefs"
        quotes={[
          { text: "El chico celíaco puede elegir sin que lo traten freak.", author: "Maru Ledesma", role: "Madre" },
          { text: "Usamos su brioche en las burgers del pop-up.", author: "Chef Kano", role: "Kitchen lab demo" },
          { text: "Encargue de 200 medialunas llegó caliente para el congreso.", author: "Euge Planas", role: "Eventos" },
        ]}
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-amber-50/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-400"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        items={[
          { q: "¿Conservación?", a: "Pan congelado en bolsa al vacío mantiene 45 días; horneado 8 min 200 °C." },
          { q: "¿Veganos?", a: "Focaccia aceite y ciabatta sin derivados lácteos en vitrina marcada." },
          { q: "¿Parking?", a: "15 minutos en descarga frente; cocheras a 80 m." },
          { q: "¿Menú lunch?", a: "12–15 h focaccia + bebida combo demo." },
        ]}
        titleClass="text-white"
        qClass="font-bold text-amber-100"
        aClass="mt-2 text-sm text-amber-200/75"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="El Horno de Raíz"
        shopCardClass="border border-amber-700/40 bg-black/30"
        shopAccentClass="bg-amber-500 font-bold text-amber-950"
        sectionClass="border-y border-amber-900/30 bg-amber-950/70"
        titleClass="text-amber-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-amber-100/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-400"
        extraTestimonialsTitle="Vecinos & chefs"
        extraTestimonials={[
          { text: "Medialunas como en Europa — finas y mantecosas.", author: "Chef guest", role: "Pop-up demo" },
          { text: "Encargue corporativo puntual con etiquetas personalizadas.", author: "RRHH", role: "Evento anual" },
          { text: "Línea sin TACC con sabor real, no cartón.", author: "Sole M.", role: "Celíaca" },
        ]}
      />

      <footer className="py-10 text-center text-xs text-amber-900">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoPanaderiaLanding as DemoPanaderia };
