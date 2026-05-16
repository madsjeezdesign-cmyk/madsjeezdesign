import { Calculator, FileSpreadsheet, Landmark, Scale, ShieldCheck } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";

export function DemoContadoresLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-[family-name:var(--font-demo-montserrat)] text-slate-200">
      <nav className="flex items-center justify-between border-b border-slate-700 px-4 py-4 md:px-10">
        <span className="flex items-center gap-2 font-bold text-white">
          <Calculator className="h-6 w-6 text-slate-400" />
          Número Exacto
        </span>
        <button type="button" className="rounded-lg border border-slate-600 px-4 py-2 text-xs font-bold uppercase text-white">
          Agendar videollamada
        </button>
      </nav>

      <header className="px-4 pb-14 pt-14 md:px-10 md:pt-20">
        <h1 className="font-[family-name:var(--font-demo-bebas)] text-5xl uppercase text-white md:text-7xl">
          Contabilidad
          <br />
          <span className="text-slate-400">que habla con tu banco</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
          Monotributo, responsable inscripto, SAS y sociedades. Presentaciones
          AFIP y ARBA, balances auditables demo, payroll outsourcing y armado de
          carpetas para créditos bancarios. Integramos extractos vía banca
          electrónica y conciliamos tarjetas con ERP o Excel compartido.
        </p>
      </header>

      <DemoLongStory
        kicker="Enfoque"
        title="Menos improvisación, más previsibilidad fiscal"
        paragraphs={[
          "Armamos calendario tributario personalizado con alertas 10 días antes de cada vencimiento crítico. Si tu actividad es estacional, proyectamos ingresos y anticipamos rebandas de monotributo o anticipos de ganancias.",
          "Para pymes en crecimiento analizamos punto de equilibrio mensual y stock en tránsito para no mezclar caja operativa con inversiones en activo fijo demo.",
        ]}
        kickerClass="text-slate-500"
        titleClass="text-white"
        pClass="mt-4 text-sm text-slate-400"
        sectionClass="bg-slate-900/40"
      />

      <section className="border-y border-slate-800 px-4 py-12 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { icon: FileSpreadsheet, t: "Reporting mensual", d: "Profit & loss comparativo, aging de cobranzas y comentarios ejecutivos en un PDF de una página." },
            { icon: ShieldCheck, t: "Compliance", d: "UIF cuando corresponde, convenio multilateral y control de retenciones sufridas." },
            { icon: Landmark, t: "Relación bancaria", d: "Te preparamos pack para gerente con ratios y proyección de flujo 6 meses demo." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <I className="h-6 w-6 text-slate-400" />
              <h3 className="mt-3 font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoStatsStrip
        stats={[
          { value: "220+", label: "Clientes activos", hint: "PyME y profesionales" },
          { value: "12", label: "Profesionales", hint: "Contadores y auxiliares" },
          { value: "100%", label: "Trabajo en cloud", hint: "Firma digital demo" },
          { value: "24 h", label: "SLA consultas", hint: "Días hábiles" },
        ]}
        cardClass="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        valueClass="text-3xl font-black text-white"
        labelClass="mt-2 text-[11px] font-bold uppercase text-slate-500"
      />

      <DemoProcessSteps
        title="Onboarding"
        subtitle="En dos semanas tenés balances normalizados y calendario listo."
        steps={[
          { n: "01", t: "Kick-off", d: "Relevamos sistemas actuales, usuarios y permisos. Migración de histórico si aplica." },
          { n: "02", t: "Normalización", d: "Plan de cuentas, centros de costo y reglas de imputación IVA / compras." },
          { n: "03", t: "Primer cierre", d: "Cierre contable paralelo al sistema viejo para validar diferencias." },
          { n: "04", t: "Operación continua", d: "Mes cerrado hasta día 8 hábil con reunión de 15 minutos de variaciones." },
        ]}
        stepNumClass="text-slate-400"
      />

      <DemoDetailGrid
        title="Planes orientativos"
        items={[
          { title: "Monotributo full", body: "Facturación, recategorización, obra social y DDJJ anuales. Incluye respuesta a ARCA sobre ventas cruzadas demo." },
          { title: "PyME multi-sucursal", body: "Consolidación, transfer pricing básico y asientos de eliminación intragrupo." },
          { title: "Due diligence venta", body: "Data room contable, ajustes de working capital y proforma de deuda." },
          { title: "Recuperación mora", body: "Cartas documento coordinadas con estudio externo y provisión contable." },
        ]}
        itemTitleClass="text-slate-300"
      />

      <DemoTestimonials
        title="Referencias"
        quotes={[
          { text: "Pasamos de planilla a reportes que entiendo en el celular.", author: "Laura Bench", role: "Retail indumentaria" },
          { text: "Nos salvaron el cierre para el fondo ángel.", author: "Tomás Arias", role: "Startup SaaS demo" },
          { text: "Precio fijo mensual sin sorpresas.", author: "Miguel Fornes", role: "Distribuidor" },
        ]}
      />

      <DemoFaqList
        title="FAQ impuestos"
        items={[
          { q: "¿Trabajan con contador interno del cliente?", a: "Sí, en modelo híbrido: nosotros fiscal y consolidación, tu equipo operativo." },
          { q: "¿Software obligatorio?", a: "Recomendamos stack con el que ya integrábamos; si no, migramos con costo acotado demo." },
          { q: "¿Auditorías externas?", a: "Armado de file y liaison con auditores; no emitimos opinión de auditoría." },
          { q: "¿Secretaría societarial?", a: "Actas y designaciones vía estudio jurídico asociado demo." },
        ]}
      />

      <section className="flex items-center justify-center gap-2 bg-slate-800 px-4 py-10">
        <Scale className="h-8 w-8" />
        <span className="font-bold text-white">Primera consulta 30 min sin costo demo · cupos mayo</span>
      </section>

      <footer className="py-8 text-center text-xs text-slate-600">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoContadoresLanding as DemoContadores };
