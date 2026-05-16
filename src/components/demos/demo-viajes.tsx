import { Compass, Globe, Luggage, Plane, Ship } from "lucide-react";
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

const SLUG = "viajes" as const;

export function DemoViajesLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="flex items-center justify-between px-4 py-4 md:px-10">
        <span className={`flex items-center gap-2 font-bold text-white ${h}`}>
          <Globe className="h-6 w-6 text-teal-400" />
          Atlas Experiencias
        </span>
        <button type="button" className={art.primaryCta}>
          Planificar viaje
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-teal-200/80"
        kicker={
          <p className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-teal-400 ${h}`}>
            <Plane className="h-4 w-4" /> IATA · cruceros · MICE
          </p>
        }
        title={
          <>
            Viajes
            <br />
            <span className="text-teal-400">a tu medida</span>
          </>
        }
        lead="Aéreos consolidados, cruceros con bebidas premium, circuitos en Europa y escapes domestic premium demo. Armamos itinerarios con buffers de tiempo, seguro asistencial con cobertura COVID legacy y soporte WhatsApp en destino 12/7. Eventos corporativos e incentivos con ROI medible."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Cotizar itinerario
            </button>
            <button type="button" className={art.secondaryCta}>
              Newsletter rutas
            </button>
          </>
        }
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Consultoras certificadas"
        title="Menos improvisación en conexiones y visas"
        paragraphs={[
          "Chequeamos validez de pasaporte, visados de tránsito y política de equipaje interlínea antes de emitir. Para grupos numerosos bloqueamos asientos y nombreamos tour leader con brief de emergencias.",
          "Integraciones con cámaras empresarias para facturación y conciliación de gastos en viaje de negocios demo.",
        ]}
        kickerClass="text-teal-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-teal-100/75"
      />

      <section className="grid gap-4 border-y border-teal-800/40 px-4 py-12 md:grid-cols-4 md:px-10">
        {[
          { icon: Plane, t: "Aéreos", d: "GDS + fare rules explicados en castellano." },
          { icon: Ship, t: "Cruceros", d: "Cabinas conectadas y dining preferences." },
          { icon: Luggage, t: "Micromovilidad", d: "Transfers VIP y maleteros hotel." },
          { icon: Compass, t: "Terrestre", d: "Tren Eurail y autos con exceso cero demo." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className={`p-5 ${art.cardShell}`}>
            <I className="h-6 w-6 text-teal-400" />
            <p className={`mt-2 font-bold text-white ${h}`}>{t}</p>
            <p className="mt-1 text-xs text-teal-200/65">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "18", label: "Años IATA", hint: "Agencia demo" },
          { value: "8500+", label: "Pasajeros", hint: "Histórico" },
          { value: "42", label: "Destinos top", hint: "Circuitos armados" },
          { value: "97%", label: "Recompra", hint: "Encuesta 2025 demo" },
        ]}
        valueClass={`text-3xl font-black text-teal-400 ${h}`}
        cardClass={`p-6 ${art.cardShell}`}
        sectionClass="border-y border-teal-800/40 bg-teal-950/30"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Cómo cotizamos"
        steps={[
          { n: "01", t: "Brief", d: "Fechas flexibles, presupuesto holgado y restricciones dietéticas." },
          { n: "02", t: "Opciones A/B", d: "Dos escenarios con pros/contras honestos." },
          { n: "03", t: "Reserva", d: "Seña y vouchers en PDF + app con agenda." },
          { n: "04", t: "Pre viaje", d: "Checklist documentación y alertas de huelgas aéreas demo." },
        ]}
        stepNumClass="text-teal-400"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-teal-200/70"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Productos"
        items={[
          { title: "Luna de miel", body: "Islas + ciudad con upgrade habitación y cena aniversario gestionada." },
          { title: "MICE", body: "Salas breakout, team building y reporte de asistencia ISO demo." },
          { title: "Educational", body: "Grupos escolares con seguro colectivo y acompañante docente gratis 15+ pax." },
          { title: "Slow travel", body: "Tren + bicicleta eléctrica con logística de equipaje día a día." },
        ]}
        itemTitleClass="font-bold text-teal-300"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemBodyClass="mt-2 text-sm text-teal-100/80"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Historias"
        quotes={[
          { text: "Cuando cancelling el vuelo, nos reacomodaron en 40 minutos desde WhatsApp.", author: "Pato y Lu", role: "Honey moon demo" },
          { text: "El crucero quedó igual que el PDF pero con camarote mejor por overbooking línea.", author: "Grupo Rivas", role: "Familia" },
          { text: "Factura empresa sin drama.", author: "CFO SteelBlue", role: "Corporativo" },
        ]}
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-teal-100/88"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-teal-400"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        items={[
          { q: "¿Cobran fee de servicio?", a: "Transparente en cotización; comparás contra emisión directa si querés." },
          { q: "¿EMD por equipaje?", a: "Incluido en tabla comparativa antes de pagar." },
          { q: "¿COVID?", a: "Restricciones según fuente oficial actualizada semanalmente demo." },
          { q: "¿Grupos?", a: "Negociación naming rights en micros privados según disponibilidad." },
        ]}
        titleClass="text-white"
        qClass="font-bold text-teal-100"
        aClass="mt-2 text-sm text-teal-200/75"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Atlas Experiencias"
        shopCardClass="border border-teal-600/35 bg-teal-950/50"
        shopAccentClass="bg-teal-500 font-bold text-teal-950"
        sectionClass="border-y border-teal-800/35 bg-teal-950/80"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-teal-100/88"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-teal-400"
        extraTestimonialsTitle="Viajeros"
        extraTestimonials={[
          { text: "Reacomodación de vuelo en 40 min por WhatsApp — salvadores.", author: "Pato & Lu", role: "Luna de miel demo" },
          { text: "Crucero igual al folleto; camarote mejor por overbooking.", author: "Familia Rivas", role: "Caribe" },
          { text: "Evento MICE sin sobrecostos ocultos en AV.", author: "SteelBlue", role: "Marketing B2B" },
        ]}
      />

      <footer className="py-10 text-center text-xs text-teal-900">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoViajesLanding as DemoViajes };
