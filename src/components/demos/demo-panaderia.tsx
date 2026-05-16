import { Coffee, Croissant, Leaf, Wheat } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";

export function DemoPanaderiaLanding() {
  return (
    <div className="min-h-screen bg-amber-950 font-[family-name:var(--font-demo-montserrat)] text-amber-50">
      <nav className="flex items-center justify-between border-b border-amber-700/40 px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-playfair)] text-2xl font-semibold text-amber-100">El Horno de Raíz</span>
        <button type="button" className="rounded-full bg-amber-500 px-5 py-2 text-xs font-bold text-amber-950">Pedir encargue</button>
      </nav>

      <header className="px-4 pb-14 pt-14 md:px-10 md:pt-20">
        <h1 className="font-[family-name:var(--font-demo-bebas)] text-6xl uppercase text-white md:text-8xl">
          Masa madre,
          <br />
          <span className="text-amber-400">fuego y café</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm text-amber-200/80 md:text-base">
          Pan de fermentación lenta, viennoiserie con manteca europea demo,
          pastelería sin exceso de azúcar y café de especialidad con origen
          rotativo. Menú de lunch con focaccias saladas y opción sin gluten
          acotada. Encargues corporativos con etiqueta personalizada para
          eventos.
        </p>
      </header>

      <DemoLongStory
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
          <div key={t} className="rounded-2xl border border-amber-800/50 bg-black/20 p-5">
            <I className="h-6 w-6 text-amber-400" />
            <p className="mt-2 font-bold">{t}</p>
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
        valueClass="text-3xl font-black text-amber-400"
      />

      <DemoProcessSteps
        title="Encargos grandes"
        steps={[
          { n: "01", t: "Presupuesto", d: "Cantidades, horario de entrega y etiquetas." },
          { n: "02", t: "Seña 30%", d: "Reserva producción en franja nocturna." },
          { n: "03", t: "Pre horno", d: "Congelado parcial para hornear en tu horario." },
          { n: "04", t: "Entrega", d: "Furgón térmico o retiro en mostrador." },
        ]}
        stepNumClass="text-amber-400"
      />

      <DemoDetailGrid
        title="Especialidades"
        items={[
          { title: "Pan de campo 1 kg", body: "Corteza oscura, hidratación 78 %, ideal para bruschetta y sandwich de lomo." },
          { title: "Brioche hamburguesas", body: "Para locales gastronómicos: molde estándar y XL 120 g demo." },
          { title: "Facturas surtidas", body: "Bandeja 24 u al por mayor con glaseado y sin glaseado." },
          { title: "Sin TACC fraccionada", body: "Línea en cocina separada días martes y jueves; listado de alérgenos en web." },
        ]}
        itemTitleClass="text-amber-300"
      />

      <DemoTestimonials
        title="Vecinos y chefs"
        quotes={[
          { text: "El chico celíaco puede elegir sin que lo traten freak.", author: "Maru Ledesma", role: "Madre" },
          { text: "Usamos su brioche en las burgers del pop-up.", author: "Chef Kano", role: "Kitchen lab demo" },
          { text: "Encargue de 200 medialunas llegó caliente para el congreso.", author: "Euge Planas", role: "Eventos" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        items={[
          { q: "¿Conservación?", a: "Pan congelado en bolsa al vacío mantiene 45 días; horneado 8 min 200 °C." },
          { q: "¿Veganos?", a: "Focaccia aceite y ciabatta sin derivados lácteos en vitrina marcada." },
          { q: "¿Parking?", a: "15 minutos en descarga frente; cocheras a 80 m." },
          { q: "¿Menú lunch?", a: "12–15 h focaccia + bebida combo demo." },
        ]}
      />

      <footer className="py-10 text-center text-xs text-amber-900">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoPanaderiaLanding as DemoPanaderia };
