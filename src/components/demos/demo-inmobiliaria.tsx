import { Building2, KeyRound, Landmark, MapPin } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";

export function DemoInmobiliariaLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-[family-name:var(--font-demo-montserrat)] text-slate-100">
      <nav className="flex items-center justify-between border-b border-amber-900/30 px-6 py-5 md:px-14">
        <div className="flex items-center gap-3">
          <Landmark className="h-7 w-7 text-amber-500" />
          <span className="text-sm font-light tracking-[0.3em] uppercase text-amber-100/90">
            Horizonte
          </span>
        </div>
        <button
          type="button"
          className="border border-amber-600/50 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-amber-200"
        >
          Tasación
        </button>
      </nav>

      <header className="relative px-6 pb-20 pt-12 md:px-14 md:pt-20">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-600">
          Propiedades premium
        </p>
        <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-demo-playfair)] text-4xl font-medium leading-tight text-white md:text-6xl">
          Espacios que marcan{" "}
          <span className="text-amber-400">distinción</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400">
          Portfolio curado en zona norte y proyectos llave en mano. Acompañamiento
          legal y financiero con socios de confianza.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "En venta", n: "24", icon: Building2 },
            { label: "En alquiler", n: "11", icon: KeyRound },
            { label: "USD / ARS", n: "Flexible", icon: MapPin },
          ].map(({ label, n, icon: I }) => (
            <div
              key={label}
              className="border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-amber-700/30"
            >
              <I className="h-5 w-5 text-amber-600" />
              <p className="mt-3 text-2xl font-light text-white">{n}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </header>

      <DemoLongStory
        kicker="Curaduría"
        title="Ficha limpia o no publicamos: tiempo perdido es reputación perdida"
        paragraphs={[
          "Verificamos inhibiciones, deudas de expensas y estado de planos municipales antes de subir el aviso. Fotografía twilight y tour matterport incluidos en comisión premium sin sorpresas demo.",
          "Para compradores institucionales armamos data room con PDF indexado y calls de due diligence coordinados con escribanía de confianza.",
        ]}
        kickerClass="text-amber-600"
        titleClass="text-white"
        pClass="mt-4 text-sm text-slate-400"
        sectionClass="bg-slate-900/50"
      />

      <DemoStatsStrip
        stats={[
          { value: "USD 42M", label: "Transado 2025", hint: "Pipeline acumulado demo" },
          { value: "11 días", label: "Promedio visita", hint: "Agenda digital" },
          { value: "98 %", label: "Operaciones cerradas", hint: "Ofertas aceptadas" },
          { value: "6", label: "Asesores senior", hint: "Zona norte" },
        ]}
        sectionClass="border-y border-slate-800 bg-slate-950"
        cardClass="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        valueClass="text-3xl font-black text-amber-400"
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-500"
        hintClass="mt-1 text-xs text-slate-600"
      />

      <DemoProcessSteps
        title="Vender con nosotros"
        subtitle="Comisión progresiva si el precio acordado se respeta 60 días."
        steps={[
          { n: "01", t: "Tasación", d: "Comparables reales + stress test de retasación bajista." },
          { n: "02", t: "Staging", d: "Proveedores homologados con fee deducible de venta demo." },
          { n: "03", t: "Marketing", d: "Media social + base inversores internacional." },
          { n: "04", t: "Cierre", d: "Coordinación banco, escritura y posesión sin idas extras al estudio." },
        ]}
        sectionClass="bg-slate-900/80"
        titleClass="text-white"
        subtitleClass="text-slate-500"
        stepNumClass="text-amber-500"
        cardClass="rounded-2xl border border-slate-800 bg-slate-950/80 p-6"
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-slate-400"
      />

      <DemoDetailGrid
        title="Verticales"
        sectionClass="bg-slate-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
        itemTitleClass="font-bold text-amber-400"
        itemBodyClass="mt-2 text-sm text-slate-400"
        items={[
          { title: "Country & golf", body: "Lotes y casas llave en mano; membership transfer con asesor club incluido." },
          { title: "Developers", body: "Preventa off-plan con esquema de pagos constructores homologados demo." },
          { title: "Renta corporativa", body: "Triple net y fit-out allowance negociado con abogado tenant side aliado." },
          { title: "Repatriación", body: "Clientes del exterior con cuenta local y asesoría cambiaria prudencial." },
        ]}
      />

      <DemoTestimonials
        title="Clientes"
        sectionClass="border-y border-slate-800 bg-slate-900/30"
        titleClass="text-white"
        cardClass="rounded-2xl border border-slate-800 bg-slate-950/60 p-6"
        quoteClass="text-sm italic text-slate-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-500"
        quotes={[
          { text: "Vendimos en el rango alto sin bajar precio en panfleto.", author: "Familia Azcuénaga", role: "PH recoleta demo" },
          { text: "El tour 360 filtró curiosos; solo vinieron qualified cash.", author: "VC Founder", role: "Inversor" },
          { text: "Compré alquiler en una sola visita gracias al data room.", author: "Family office", role: "Regional" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        sectionClass="bg-slate-950 border-t border-slate-800"
        titleClass="text-white"
        qClass="font-bold text-slate-200"
        aClass="mt-2 text-sm text-slate-500"
        rowClass="border-b border-slate-800 py-6 last:border-0"
        items={[
          { q: "¿Solo zona norte?", a: "Core norte; selectively microcentro boutique para penthouse." },
          { q: "¿Alquiler temporal?", a: "Gestión Airbnb premium con revenue management demo." },
          { q: "¿Fees comprador?", a: "Transparentes en boleto; no cobramos doble representación oculta." },
          { q: "¿Tasación online?", a: "Ballpark gratis; presencial con costo descontable si listás." },
        ]}
      />

      <section className="grid md:grid-cols-2">
        <div className="flex min-h-[360px] flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-800 p-8 md:p-12">
          <p className="text-xs text-amber-600">Destacado demo</p>
          <h2 className="mt-2 font-[family-name:var(--font-demo-playfair)] text-3xl text-white">
            Penthouse con terraza · 320 m²
          </h2>
          <p className="mt-2 text-sm text-slate-500">Cocheras · sum · norte libre</p>
        </div>
        <div className="border-t border-slate-800 p-8 md:border-l md:border-t-0 md:p-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-600">
            Por qué elegirnos
          </h3>
          <ul className="mt-8 space-y-6 text-sm text-slate-400">
            <li className="border-l border-amber-600/50 pl-4">
              Fotografía profesional y tour 360° en cada publicación.
            </li>
            <li className="border-l border-amber-600/50 pl-4">
              Ficha técnica con escritura y consorcio verificados.
            </li>
            <li className="border-l border-amber-600/50 pl-4">
              Newsletter mensual solo para inversores calificados.
            </li>
          </ul>
          <button
            type="button"
            className="mt-10 w-full bg-amber-600 py-4 text-sm font-bold uppercase tracking-wider text-slate-950"
          >
            Agendar visita privada
          </button>
        </div>
      </section>

      <DemoEnhancements
        slug="inmobiliaria"
        brandLabel="Horizonte Propiedades"
        sectionClass="border-y border-slate-800 bg-slate-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        quoteClass="text-sm italic text-slate-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-500"
        extraTestimonialsTitle="Compradores y vendedores"
        extraTestimonials={[
          { text: "Tour 360 filtró curiosos; solo vinieron cash-out listos.", author: "Martín", role: "Inversor demo" },
          { text: "Vendimos en el precio publicado sin bajar en 90 días.", author: "Clara B.", role: "Vendedora PH" },
          { text: "Data room impecable para due diligence del fondo.", author: "Analyst", role: "Family office" },
        ]}
      />

      <footer className="py-10 text-center text-xs text-slate-600">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoInmobiliariaLanding as DemoInmobiliaria };
