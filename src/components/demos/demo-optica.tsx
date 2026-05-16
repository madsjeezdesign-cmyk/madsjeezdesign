import { Eye, Glasses, HeartPulse, Scan, Volume2 } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";

export function DemoOpticaLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-[family-name:var(--font-demo-montserrat)] text-sky-50">
      <nav className="flex items-center justify-between border-b border-sky-500/30 px-4 py-4 md:px-10">
        <span className="flex items-center gap-2 font-bold text-white">
          <Glasses className="h-7 w-7 text-sky-400" />
          Visión Clara
        </span>
        <button type="button" className="rounded-full bg-sky-500 px-5 py-2 text-xs font-bold text-slate-950">
          Turno online
        </button>
      </nav>

      <header className="px-4 pb-14 pt-14 md:px-10 md:pt-20">
        <h1 className="font-[family-name:var(--font-demo-playfair)] text-4xl font-medium leading-tight text-white md:text-6xl">
          Salud visual y auditiva en{" "}
          <span className="text-sky-400">un mismo lugar</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-sky-100/70 md:text-base">
          Examen optométrico computerizado, adaptación de lentes progresivos
          digitales demo, lentes de contacto especializados y gabinete de
          baja visión. Audiometría en cabina insonorizada y audífonos con
          Bluetooth rechargeable. Stock de armazones de diseñador y línea
          económica con garantía de adaptación 30 días.
        </p>
      </header>

      <DemoLongStory
        kicker="Cuidado integral"
        title="Protocolos clínicos y taller de montaje en el local"
        paragraphs={[
          "Cada historia clínica incluye agudeza binocular, tonometría sin contacto y mapa corneal para descartar contraindicaciones antes de recetar. Para pacientes con presbicia avanzada mostramos simulación digital de campos de visión por diseño de lente.",
          "Taller interno con centrado tridimensional y verificación de prismatic effect. Repuestos originales y política de reclamo express si la montura no tolera el script demo.",
        ]}
        kickerClass="text-sky-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-sky-100/75"
        sectionClass="bg-sky-950/30"
      />

      <section className="grid gap-4 border-y border-slate-800 px-4 py-12 md:grid-cols-4 md:px-10">
        {[
          { icon: Scan, t: "Screening", d: "OCT opcional y campo visual automatizado." },
          { icon: Eye, t: "Lentes", d: "Freeform, office, deportivos y filtro pantalla." },
          { icon: Volume2, t: "Audio", d: "Programación fina por audiólogo matriculado." },
          { icon: HeartPulse, t: "Obras sociales", d: "Autorizaciones online y facturación directa demo." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <I className="h-6 w-6 text-sky-400" />
            <p className="mt-2 font-bold">{t}</p>
            <p className="mt-1 text-xs text-sky-200/60">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "22", label: "Sucursales", hint: "Red demo" },
          { value: "35'", label: "Examen promedio", hint: "Con dilatación opcional" },
          { value: "4.9", label: "NPS", hint: "Último trimestre" },
          { value: "12", label: "Laboratorios", hint: "Prioridad surtido" },
        ]}
        valueClass="text-3xl font-black text-sky-400"
      />

      <DemoProcessSteps
        title="Tu primer visita"
        steps={[
          { n: "01", t: "Recepción", d: "Carga de obra social y antecedentes oculares." },
          { n: "02", t: "Examen", d: "Optometría + recomendación de lentes o derivación." },
          { n: "03", t: "Selección", d: "Armazón según puente, altura pupilar y estilo de vida." },
          { n: "04", t: "Entrega", d: "Ajuste biomecánico y educación de limpieza de lentes." },
        ]}
        stepNumClass="text-sky-400"
      />

      <DemoDetailGrid
        title="Soluciones"
        items={[
          { title: "Miodesopsias", body: "Educación paciente y seguimiento; derivación a retinólogo de red si corresponde demo." },
          {
            title: "Lentes progresivos",
            body: "Diseño personalizado según postura frente a pantalla, mapa de lectura y garantía de rehacer graduación 60 días.",
          },
          { title: "Niños", body: "Control cada 6 meses, filtros para recreo y lentes fotochromáticos." },
          { title: "Audífonos", body: "Préstamos demo 15 días y app de afinado remoto." },
        ]}
        itemTitleClass="text-sky-300"
      />

      <DemoTestimonials
        title="Pacientes"
        quotes={[
          { text: "Por fin entendí por qué los progresivos anteriores me mareaban.", author: "Laura Q.", role: "Contadora" },
          { text: "Me aprobaron la orden de obras sociales en el acto.", author: "Seba Pérez", role: "Jubilado demo" },
          { text: "El audífono con Bluetooth cambió mis reuniones.", author: "Ing. Roldán", role: "Tech" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        items={[
          { q: "¿Traigo receta?", a: "Sí, o realizamos examen completo si está vencida." },
          { q: "¿Stock de armazones?", a: "Más de 2.000 referencias entre titanium, acetato y rimless." },
          { q: "¿Turnos urgentes?", a: "Guardia visión los sábados AM en sucursal cabecera demo." },
          { q: "¿Garantía?", a: "Antirreflejo 12 meses contra decapado por defecto de fabricación." },
        ]}
      />

      <footer className="py-10 text-center text-xs text-slate-700">
        Demo · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoOpticaLanding as DemoOptica };
