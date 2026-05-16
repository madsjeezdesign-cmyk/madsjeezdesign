import { Compass, Globe, Luggage, Plane, Ship } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";

export function DemoViajesLanding() {
  return (
    <div className="min-h-screen bg-teal-950 font-[family-name:var(--font-demo-montserrat)] text-teal-50">
      <nav className="flex items-center justify-between border-b border-teal-500/30 px-4 py-4 md:px-10">
        <span className="flex items-center gap-2 font-bold text-white">
          <Globe className="h-6 w-6 text-teal-400" />
          Atlas Experiencias
        </span>
        <button type="button" className="rounded-full bg-teal-500 px-5 py-2 text-xs font-bold text-teal-950">
          Planificar viaje
        </button>
      </nav>

      <header className="px-4 pb-14 pt-14 md:px-10 md:pt-20">
        <h1 className="font-[family-name:var(--font-demo-bebas)] text-6xl uppercase text-white md:text-8xl">
          Viajes
          <br />
          <span className="text-teal-400">a tu medida</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm text-teal-200/80 md:text-base">
          Aéreos consolidados, cruceros con bebidas premium, circuitos en Europa
          y escapes domestic premium demo. Armamos itinerarios con buffers de
          tiempo, seguro asistencial con cobertura COVID legacy y soporte
          WhatsApp en destino 12/7. Eventos corporativos e incentivos con ROI
          medible.
        </p>
      </header>

      <DemoLongStory
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
          <div key={t} className="rounded-2xl border border-teal-600/30 bg-teal-900/40 p-5">
            <I className="h-6 w-6 text-teal-400" />
            <p className="mt-2 font-bold">{t}</p>
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
        valueClass="text-3xl font-black text-teal-400"
      />

      <DemoProcessSteps
        title="Cómo cotizamos"
        steps={[
          { n: "01", t: "Brief", d: "Fechas flexibles, presupuesto holgado y restricciones dietéticas." },
          { n: "02", t: "Opciones A/B", d: "Dos escenarios con pros/contras honestos." },
          { n: "03", t: "Reserva", d: "Seña y vouchers en PDF + app con agenda." },
          { n: "04", t: "Pre viaje", d: "Checklist documentación y alertas de huelgas aéreas demo." },
        ]}
        stepNumClass="text-teal-400"
      />

      <DemoDetailGrid
        title="Productos"
        items={[
          { title: "Luna de miel", body: "Islas + ciudad con upgrade habitación y cena aniversario gestionada." },
          { title: "MICE", body: "Salas breakout, team building y reporte de asistencia ISO demo." },
          { title: "Educational", body: "Grupos escolares con seguro colectivo y acompañante docente gratis 15+ pax." },
          { title: "Slow travel", body: "Tren + bicicleta eléctrica con logística de equipaje día a día." },
        ]}
        itemTitleClass="text-teal-300"
      />

      <DemoTestimonials
        title="Historias"
        quotes={[
          { text: "Cuando cancelling el vuelo, nos reacomodaron en 40 minutos desde WhatsApp.", author: "Pato y Lu", role: "Honey moon demo" },
          { text: "El crucero quedó igual que el PDF pero con camarote mejor por overbooking línea.", author: "Grupo Rivas", role: "Familia" },
          { text: "Factura empresa sin drama.", author: " CFO SteelBlue", role: "Corporativo" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        items={[
          { q: "¿Cobran fee de servicio?", a: "Transparente en cotización; comparás contra emisión directa si querés." },
          { q: "¿EMD por equipaje?", a: "Incluido en tabla comparativa antes de pagar." },
          { q: "¿COVID?", a: "Restricciones según fuente oficial actualizada semanalmente demo." },
          { q: "¿Grupos?", a: "Negociación naming rights en micros privados según disponibilidad." },
        ]}
      />

      <footer className="py-10 text-center text-xs text-teal-900">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoViajesLanding as DemoViajes };
