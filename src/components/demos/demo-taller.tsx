import { Car, Cog, Gauge, Wrench } from "lucide-react";
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

const SLUG = "taller" as const;

export function DemoTallerLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <div
        className="h-2 w-full bg-[repeating-linear-gradient(-45deg,#dc2626_0px,#dc2626_12px,#18181b_12px,#18181b_24px)]"
        aria-hidden
      />

      <nav className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-10">
        <span className={`${h} text-3xl tracking-wide text-red-500`}>GARAGE 27</span>
        <button type="button" className={art.primaryCta}>
          Pedir turno
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-zinc-500"
        kicker={
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
            Multimarca · scanner OBD
          </p>
        }
        title={
          <>
            Mecánica
            <br />
            <span className="text-red-500">sin vueltas</span>
          </>
        }
        lead="Frenos, tren delantero, service con aceites viscosidad OEM y alineación digital. Presupuesto antes de tocar un tornillo."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Diagnóstico
            </button>
            <button type="button" className={art.secondaryCta}>
              WhatsApp
            </button>
          </>
        }
      />

      <section className="px-4 py-8 md:px-10">
        <div className={`relative mx-auto max-w-5xl overflow-hidden p-6 md:p-8 ${art.cardShell}`}>
          <Gauge className="absolute right-4 top-4 h-32 w-48 text-red-600/15 md:h-40 md:w-64" strokeWidth={0.25} />
          <div className="relative flex items-center gap-6">
            <p className={`text-4xl font-black text-red-500 ${h}`}>15%</p>
            <p className={`max-w-xs text-xs uppercase tracking-wider text-zinc-500 ${h}`}>
              Off primer service demo · presupuesto sin letra chica
            </p>
          </div>
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Taller honesto"
        title="Diagnóstico pago si seguís con la reparación; fotos antes de desarmar"
        paragraphs={[
          "Te mostramos piezas defectuosas al banco de armado y guardamos las viejas en bolsa sellada por si querés auditoría externa. Alineación en rampa con cámara 3D calibrada semanalmente y torque wrench digital logueado demo.",
          "Stock de repuestos OEM y alternativas homologadas con diferencia de precio explicada — nunca cambiamos silenciosamente marca sin OK escrito.",
        ]}
        kickerClass="text-red-500"
        titleClass="text-white"
        pClass="mt-4 text-sm text-zinc-500"
        sectionClass="bg-zinc-950"
      />

      <DemoStatsStrip
        stats={[
          { value: "11", label: "Elevadores", hint: "2 alineación" },
          { value: "27", label: "Marcas", hint: "Scaner compatible demo" },
          { value: "45'", label: "Diagnóstico", hint: "Promedio" },
          { value: "24 meses", label: "Garantía mano obra", hint: "Repuestos según fábrica" },
        ]}
        sectionClass="border-y border-zinc-800 bg-black/30"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-red-500 ${h}`}
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500"
        hintClass="mt-1 text-xs text-zinc-600"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Service programado"
        subtitle="Recordatorio WhatsApp con checklist de fluidos y correa según km reales."
        steps={[
          { n: "01", t: "Recepción", d: "Fotos 360 y lectura códigos fallas históricas." },
          { n: "02", t: "Presupuesto", d: "Ítem part por part con urgencia etiquetada demo." },
          { n: "03", t: "Ejecución", d: "Torque log + fluidos nuevos mostrados en envases sellados." },
          { n: "04", t: "Prueba ruta", d: "5 km con monitoreo parámetros OBD si hubo intervención motor." },
        ]}
        sectionClass="bg-zinc-900"
        titleClass="text-white"
        subtitleClass="text-zinc-500"
        stepNumClass="text-red-500"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-zinc-500"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Especialidades"
        sectionClass="bg-zinc-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-red-400"
        itemBodyClass="mt-2 text-sm text-zinc-500"
        items={[
          { title: "Diesel common rail", body: "Inyectores, alta presión y reprogramación fabricante demo." },
          { title: "Híbridos livianos", body: "Aislación HV certificada y fluido inverter OEM." },
          { title: "Chapa y pintura rápida", body: "Cabina cerrada con barniz base agua bajo VOC." },
          { title: "Movilidad", body: "Auto sustituto cortesía 24 h si la reparación supera 8 h de taller." },
        ]}
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Clientes"
        sectionClass="border-y border-zinc-800 bg-black/25"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-red-500"
        quotes={[
          { text: "Me enseñaron el rolo gastado vs el repuesto nuevo sin apuro.", author: "Hernán P.", role: "Pick up demo" },
          { text: "La alineación dejó de tironear a los 300 km como dijeron.", author: "Lucía R.", role: "SUV" },
          { text: "Factura electrónica y seguro sin drama.", author: "Flete Norte SA", role: "Flota" },
        ]}
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        sectionClass="border-t border-zinc-800 bg-zinc-950"
        titleClass="text-white"
        qClass="font-bold text-zinc-200"
        aClass="mt-2 text-sm text-zinc-500"
        rowClass="border-b border-zinc-800 py-6 last:border-0"
        items={[
          { q: "¿Turnos sábado?", a: "Previa carga; no atendemos domingos para descanso del equipo." },
          { q: "¿Garantía repuesto?", a: "Igual que importador; registramos número de serie en factura demo." },
          { q: "¿Uber?", a: "Te acercamos al metro si la quedada supera 3 h." },
          { q: "¿Financiación?", a: "3 cuotas sin interés con bancos seleccionados sobre mano de obra." },
        ]}
      />

      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { icon: Wrench, t: "Mecánica general", d: "Embrague, distribución" },
            { icon: Car, t: "Diagnóstico", d: "Scanner + informe PDF" },
            { icon: Cog, t: "Suspensión", d: "Amortiguadores y tren" },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`p-6 transition-colors hover:border-red-600/40 ${art.cardShell}`}>
              <I className="h-7 w-7 text-red-500" />
              <p className={`mt-4 font-bold text-white ${h}`}>{t}</p>
              <p className="mt-2 text-xs text-zinc-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-red-600 px-4 py-12 md:px-10">
        <p className={`mx-auto max-w-3xl text-center text-3xl uppercase text-black md:text-4xl ${h}`}>
          “Lo dejamos listo para la ruta”
        </p>
      </section>

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Garage 27"
        shopCardClass="border border-red-600/30 bg-zinc-900/70"
        shopAccentClass="bg-red-600 font-bold text-white"
        sectionClass="border-y border-red-900/30 bg-zinc-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-red-500"
        extraTestimonialsTitle="Conductores"
        extraTestimonials={[
          { text: "Presupuesto cerrado antes de tocar nada — cumplieron.", author: "Diego M.", role: "SUV turbo" },
          { text: "Me guardaron piezas viejas en bolsa etiquetada.", author: "Verónica", role: "Utilitario demo" },
          { text: "Flota empresa con facturación sin vueltas.", author: "Logística Sur", role: "Transporte" },
        ]}
      />

      <footer className="py-8 text-center text-xs text-zinc-700">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoTallerLanding as DemoTaller };
