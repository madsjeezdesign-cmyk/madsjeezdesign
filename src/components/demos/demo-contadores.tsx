import { Calculator, FileSpreadsheet, Landmark, Scale, ShieldCheck } from "lucide-react";
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
import { DemoBrandNav } from "./demo-brand-nav";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "contadores" as const;

export function DemoContadoresLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <DemoBrandNav
        slug={SLUG}
        brand="Número Exacto"
        iconKey="Calculator"
        primaryCta="Agendar videollamada"
        primaryCtaClass={art.secondaryCta}
      />

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-slate-400"
        kicker={<p className={`text-[10px] uppercase tracking-[0.35em] text-slate-500 ${h}`}>Estudio contable · cloud</p>}
        title={
          <>
            Contabilidad
            <br />
            <span className="text-slate-400">que habla con tu banco</span>
          </>
        }
        lead="Monotributo, responsable inscripto, SAS y sociedades. Presentaciones AFIP y ARBA, balances auditables demo, payroll outsourcing y armado de carpetas para créditos bancarios. Integramos extractos vía banca electrónica y conciliamos tarjetas con ERP o Excel compartido."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Cotizar plan
            </button>
            <button type="button" className={art.secondaryCta}>
              Ver servicios
            </button>
          </>
        }
      />

      <DemoLongStory
        sectionHeadingClass={h}
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
            <div key={t} className={`p-6 ${art.cardShell}`}>
              <I className="h-6 w-6 text-slate-400" />
              <h3 className={`mt-3 font-bold text-white ${h}`}>{t}</h3>
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
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-white ${h}`}
        labelClass="mt-2 text-[11px] font-bold uppercase text-slate-500"
        sectionClass="border-y border-slate-800 bg-slate-950/50"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Onboarding"
        subtitle="En dos semanas tenés balances normalizados y calendario listo."
        steps={[
          { n: "01", t: "Kick-off", d: "Relevamos sistemas actuales, usuarios y permisos. Migración de histórico si aplica." },
          { n: "02", t: "Normalización", d: "Plan de cuentas, centros de costo y reglas de imputación IVA / compras." },
          { n: "03", t: "Primer cierre", d: "Cierre contable paralelo al sistema viejo para validar diferencias." },
          { n: "04", t: "Operación continua", d: "Mes cerrado hasta día 8 hábil con reunión de 15 minutos de variaciones." },
        ]}
        stepNumClass="text-slate-400"
        titleClass="text-white"
        subtitleClass="text-slate-500"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-slate-500"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Planes orientativos"
        items={[
          { title: "Monotributo full", body: "Facturación, recategorización, obra social y DDJJ anuales. Incluye respuesta a ARCA sobre ventas cruzadas demo." },
          { title: "PyME multi-sucursal", body: "Consolidación, transfer pricing básico y asientos de eliminación intragrupo." },
          { title: "Due diligence venta", body: "Data room contable, ajustes de working capital y proforma de deuda." },
          { title: "Recuperación mora", body: "Cartas documento coordinadas con estudio externo y provisión contable." },
        ]}
        itemTitleClass="font-bold text-slate-300"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemBodyClass="mt-2 text-sm text-slate-500"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Referencias"
        quotes={[
          { text: "Pasamos de planilla a reportes que entiendo en el celular.", author: "Laura Bench", role: "Retail indumentaria" },
          { text: "Nos salvaron el cierre para el fondo ángel.", author: "Tomás Arias", role: "Startup SaaS demo" },
          { text: "Precio fijo mensual sin sorpresas.", author: "Miguel Fornes", role: "Distribuidor" },
        ]}
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-slate-400"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-slate-300"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ impuestos"
        items={[
          { q: "¿Trabajan con contador interno del cliente?", a: "Sí, en modelo híbrido: nosotros fiscal y consolidación, tu equipo operativo." },
          { q: "¿Software obligatorio?", a: "Recomendamos stack con el que ya integrábamos; si no, migramos con costo acotado demo." },
          { q: "¿Auditorías externas?", a: "Armado de file y liaison con auditores; no emitimos opinión de auditoría." },
          { q: "¿Secretaría societarial?", a: "Actas y designaciones vía estudio jurídico asociado demo." },
        ]}
        titleClass="text-white"
        qClass="font-bold text-slate-200"
        aClass="mt-2 text-sm text-slate-500"
      />

      <section className="flex flex-wrap items-center justify-center gap-2 bg-slate-800 px-4 py-10">
        <Scale className="h-8 w-8 shrink-0 text-slate-300" />
        <span className={`text-center text-sm font-bold text-white md:text-base ${h}`}>
          Primera consulta 30 min sin costo demo · cupos mayo
        </span>
      </section>

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Número Exacto"
        sectionClass="border-y border-slate-700 bg-slate-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-slate-400"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-slate-300"
        extraTestimonialsTitle="PyMEs y profesionales"
        extraTestimonials={[
          { text: "Pasamos monotributo a responsable inscripto sin estrés en enero.", author: "Damián", role: "Servicios IT" },
          { text: "Dashboard que entiendo desde el teléfono.", author: "Laura", role: "Retail demo" },
          { text: "Cierre listo 48 h antes del estatuto societario.", author: "HoldCo", role: "CFO family" },
        ]}
      />

      <footer className="py-8 text-center text-xs text-slate-600">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoContadoresLanding as DemoContadores };
