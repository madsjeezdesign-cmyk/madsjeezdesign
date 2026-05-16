import { Car, Cog, Gauge, Wrench } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";

export function DemoTallerLanding() {
  return (
    <div className="min-h-screen bg-zinc-900 font-[family-name:var(--font-demo-montserrat)] text-zinc-100">
      <div
        className="h-2 w-full bg-[repeating-linear-gradient(-45deg,#dc2626_0px,#dc2626_12px,#18181b_12px,#18181b_24px)]"
        aria-hidden
      />

      <nav className="flex items-center justify-between px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-bebas)] text-3xl tracking-wide text-red-500">
          GARAGE 27
        </span>
        <button
          type="button"
          className="border-2 border-red-600 bg-red-600/10 px-5 py-2 text-xs font-black uppercase text-red-500"
        >
          Pedir turno
        </button>
      </nav>

      <header className="border-b border-zinc-800 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              Multimarca · scanner OBD
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-5xl uppercase leading-none text-white md:text-7xl">
              Mecánica
              <br />
              <span className="text-red-500">sin vueltas</span>
            </h1>
            <p className="mt-6 text-sm text-zinc-500">
              Frenos, tren delantero, service con aceites viscosidad OEM y
              alineación digital. Presupuesto antes de tocar un tornillo.
            </p>
          </div>
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
            <Gauge className="h-40 w-full text-red-600/20" strokeWidth={0.25} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-xl border border-red-600/40 bg-black/80 px-6 py-4 text-center">
                <p className="text-3xl font-black text-red-500">15%</p>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Off primer service demo
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <DemoLongStory
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
        cardClass="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
        valueClass="text-3xl font-black text-red-500"
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500"
        hintClass="mt-1 text-xs text-zinc-600"
      />

      <DemoProcessSteps
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
        cardClass="rounded-2xl border border-zinc-800 bg-black/40 p-6"
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-zinc-500"
      />

      <DemoDetailGrid
        title="Especialidades"
        sectionClass="bg-zinc-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
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
        title="Clientes"
        sectionClass="border-y border-zinc-800 bg-black/25"
        titleClass="text-white"
        cardClass="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-red-500"
        quotes={[
          { text: "Me enseñaron el rolo gastado vs el repuesto nuevo sin apuro.", author: "Hernán P.", role: "Pick up demo" },
          { text: "La alineación dejó de tironear a los 300 km como dijeron.", author: "Lucía R.", role: "SUV" },
          { text: "Factura electrónica y seguro sin drama.", author: "Flete Norte SA", role: "Flota" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        sectionClass="bg-zinc-950 border-t border-zinc-800"
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
            <div
              key={t}
              className="border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-red-600/40"
            >
              <I className="h-7 w-7 text-red-500" />
              <p className="mt-4 font-bold text-white">{t}</p>
              <p className="mt-2 text-xs text-zinc-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-red-600 px-4 py-12 md:px-10">
        <p className="mx-auto max-w-3xl text-center font-[family-name:var(--font-demo-bebas)] text-3xl uppercase text-black md:text-4xl">
          “Lo dejamos listo para la ruta”
        </p>
      </section>

      <footer className="py-8 text-center text-xs text-zinc-700">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoTallerLanding as DemoTaller };
