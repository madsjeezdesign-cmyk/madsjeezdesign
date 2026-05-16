import { Building2, Droplets, ShieldCheck, Sparkles, Users } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";

export function DemoLimpiezaLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-[family-name:var(--font-demo-montserrat)] text-indigo-50">
      <nav className="flex items-center justify-between border-b border-indigo-500/25 px-4 py-4 md:px-10">
        <span className="flex items-center gap-2 font-bold text-white">
          <Sparkles className="h-6 w-6 text-indigo-400" />
          ProLimpio Facility
        </span>
        <button
          type="button"
          className="rounded-full bg-indigo-500 px-5 py-2 text-xs font-bold text-white"
        >
          Cotizar obra
        </button>
      </nav>

      <header className="px-4 pb-14 pt-14 md:px-10 md:pt-20">
        <h1 className="font-[family-name:var(--font-demo-bebas)] text-6xl uppercase text-white md:text-8xl">
          Limpieza
          <br />
          <span className="text-indigo-400">industrial</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-indigo-200/75 md:text-base">
          Servicios integrales para edificios corporativos, clínicas con
          protocolos de asepsis demo, retail y plantas con normas de seguridad
          industrial. Dotación de insumos biodegradables, certificaciones de
          personal y supervisión con checklist digital hora a hora. Cobertura
          CABA, GBA y polo industrial oeste con flota propia.
        </p>
      </header>

      <DemoLongStory
        kicker="Operativa"
        title="Puestas en marcha, refuerzos y eventos puntuales"
        paragraphs={[
          "Coordinamos ingreso de brigadas con credenciales precargadas, inducción breve en riesgos y entrega de EPP sin fricción con tu HSE. En ampliaciones temporales escalamos dotación en 48 h con mismo estándar de calidad.",
          "Reportes fotográficos georreferenciados y KPI de reclamos por piso. Integración opcional con tu CAFM para cerrar tickets automáticamente al completar tarea demo.",
        ]}
        kickerClass="text-indigo-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-indigo-100/75"
        sectionClass="bg-indigo-950/40"
      />

      <section className="grid gap-4 border-y border-indigo-900/40 px-4 py-12 md:grid-cols-4 md:px-10">
        {[
          { icon: Building2, t: "Corporativo", d: "Turno noche sin ruido · ascensores coordinados." },
          { icon: Droplets, t: "Sanitizado", d: "Superficies alto contacto cada 2 h en períodos demo." },
          { icon: ShieldCheck, t: "Compliance", d: "MSDS digital y fichas de dilución accesibles." },
          { icon: Users, t: "Capacitación", d: "Charlas trimestrales y simulacros de derrame." },
        ].map(({ icon: I, t, d }) => (
          <div
            key={t}
            className="rounded-2xl border border-indigo-800/40 bg-slate-900/60 p-5"
          >
            <I className="h-6 w-6 text-indigo-400" />
            <p className="mt-2 font-bold">{t}</p>
            <p className="mt-1 text-xs text-indigo-200/65">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "920+", label: "Operarios", hint: "Plantilla demo" },
          { value: "14", label: "Años", hint: "Facility services" },
          { value: "4.2M", label: "m²", hint: "Contratos vigentes" },
          { value: "12 h", label: "SLA ticket", hint: "Respuesta regional" },
        ]}
        valueClass="text-3xl font-black text-indigo-400"
      />

      <DemoProcessSteps
        title="Implementación en 3 semanas"
        steps={[
          { n: "01", t: "Diagnóstico", d: "Recorrido con gerente de cuenta y muestreo ATP demo." },
          { n: "02", t: "Propuesta", d: "Dotación, horarios, insumos y precio todo incluido." },
          { n: "03", t: "Puesta en marcha", d: "Tutores emparejan procedimientos con tu cultura." },
          { n: "04", t: "Mejora continua", d: "Reuniones mensuales con acciones correctivas medibles." },
        ]}
        stepNumClass="text-indigo-400"
      />

      <DemoDetailGrid
        title="Líneas de servicio"
        items={[
          { title: "Limpieza diaria", body: "Barrido húmedo, aspirado, microfibras por color y desodorización neutra." },
          { title: "Alta profundidad", body: "Lavado de ductos, cristales en altura con IRATA y andamiaje certificado." },
          { title: "Industria ligera", body: "Extracción de polvo combustible con aspiradores clase H demo." },
          { title: "Post-obra", body: "Entrega llave en mano con retiro de residuo clasificado." },
        ]}
        itemTitleClass="text-indigo-300"
      />

      <DemoTestimonials
        title="Referencias"
        quotes={[
          { text: "Pasaron auditoría sin observaciones en limpieza de quirófanos.", author: "Dra. Morales", role: "Clínica demo" },
          { text: "El dashboard nos permitió comparar sucursales en tiempo real.", author: "COO RetailMax", role: "Operaciones" },
          { text: "Reemplazaron insumos sin costo extra al detectar alergénico.", author: "RRHH Nexus", role: "People" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        items={[
          { q: "¿Trabajan feriados?", a: "Sí, con recargos transparentes pactados en contrato." },
          { q: "¿Seguro ART?", a: "Cobertura al día y póliza de responsabilidad civil copiable." },
          { q: "¿Insumos incluidos?", a: "Pack estándar o te facturamos solo consumibles si preferís surtir vos." },
          { q: "¿Green seal?", a: "Línea ecológica opcional con certificados demo." },
        ]}
      />

      <DemoEnhancements
        slug="limpieza"
        brandLabel="ProLimpio"
        shopCardClass="border border-indigo-500/30 bg-slate-900/65"
        shopAccentClass="bg-indigo-500 font-bold text-white"
        sectionClass="border-y border-indigo-900/35 bg-slate-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-indigo-900/40 bg-slate-900/50 p-6"
        quoteClass="text-sm italic text-indigo-100/85"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-indigo-400"
        extraTestimonialsTitle="Facility & operaciones"
        extraTestimonials={[
          { text: "Auditoría hospitalaria sin observaciones en limpieza.", author: "BioRisk", role: "Clínica demo" },
          { text: "Dashboard por sucursal — comparábamos reclamos reales.", author: "COO", role: "Retail" },
          { text: "Sustituyeron químicos sin recargo cuando falló un lote.", author: "HSE", role: "Planta" },
        ]}
      />

      <footer className="py-10 text-center text-xs text-slate-700">
        Demo · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoLimpiezaLanding as DemoLimpieza };
