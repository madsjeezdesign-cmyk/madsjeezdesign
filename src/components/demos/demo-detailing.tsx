import { Car, Droplets, Shield, Sparkles, Sun } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";

export function DemoDetailingLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-[family-name:var(--font-demo-montserrat)] text-slate-100">
      <nav className="flex items-center justify-between border-b border-blue-500/30 px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-bebas)] text-2xl text-sky-400 tracking-widest">SHINE</span>
        <button type="button" className="rounded-full bg-sky-500 px-5 py-2 text-xs font-bold text-slate-950">Reservar slot</button>
      </nav>

      <header className="px-4 pb-14 pt-14 md:px-10 md:pt-20">
        <h1 className="font-[family-name:var(--font-demo-bebas)] text-6xl uppercase text-white md:text-8xl">
          Detailing
          <br />
          <span className="text-sky-400">de altura</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm text-slate-400 md:text-base">
          Lavado químico, descontaminación férrica, corrección de barniz con
          pulidora rotativa/orbital, sellado cerámico y PPF parcial en puntos
          calientes demo. Box climatizado, luz CRI 95 y checklist fotográfico
          antes / después. Pickup & drop para ejecutivos con seguro de llave.
        </p>
      </header>

      <DemoLongStory
        kicker="Proceso"
        title="Ciencia de superficies, no solo brillo"
        paragraphs={[
          "Mapeamos espesor de laca con medidor para saber cuánta corrección es segura. Usamos pads graduados y lubricantes sin siliconas que puedan alterar el bonding del coating.",
          "Para interiores aplicamos limpieza por extracción con espuma seca en tapizados y ozono opcional demo. Los tapetes de goma se desmontan para limpiar canales de drenaje ocultos.",
        ]}
        kickerClass="text-sky-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-slate-400"
      />

      <section className="grid gap-4 border-y border-slate-800 px-4 py-12 md:grid-cols-3 md:px-10">
        {[
          { icon: Droplets, t: "Decontaminación", d: "Arcilla sintética + iron remover sin manchar plásticos." },
          { icon: Sun, t: "Cerámica 9H", d: "Dos capas base + topper hidrofóbico con curado acelerado IR demo." },
          { icon: Shield, t: "PPF parcial", d: "Faldones, espejos y borde de baúl con márgenes envueltos." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <I className="h-7 w-7 text-sky-400" />
            <h3 className="mt-3 font-bold">{t}</h3>
            <p className="mt-2 text-sm text-slate-500">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "850+", label: "Autos / año", hint: "SUV y premium" },
          { value: "3", label: "Técnicos senior", hint: "Certificación detailer demo" },
          { value: "36", label: "Meses garantía", hint: "Coating marcas aliadas" },
          { value: "4.9", label: "Google", hint: "Rating acumulado demo" },
        ]}
        valueClass="text-3xl font-black text-sky-400"
      />

      <DemoProcessSteps
        title="Tu auto en 4 fases"
        steps={[
          { n: "01", t: "Recepción", d: "Inspección bajo luz polarizada y acuerdo de alcance por escrito." },
          { n: "02", t: "Preparación", d: "Lavado, desinfección debajo de guardabarros, máscaras de plásticos." },
          { n: "03", t: "Corrección", d: "Un paso de corte + refinado según dureza de barniz medida." },
          { n: "04", t: "Protección", d: "Coating o cera natural según presupuesto; curado en box cerrado." },
        ]}
        stepNumClass="text-sky-400"
      />

      <DemoDetailGrid
        title="Paquetes demo"
        items={[
          { title: "Maintenance wash", body: "Ideal quincenal post-coating: shampoo pH neutro, secado air-blow y topper spray." },
          { title: "Interior full", body: "Paneles, techo alcántara, butacas cuero/Alcantara, sanitizado AC." },
          { title: "PPF frontal", body: "Capó, paragolpes y espejos con film pre-cortado y bordes envueltos para evitar levante." },
          { title: "Fleet corporativo", body: "Precio por flota 5+ unidades con agenda nocturna en planta cliente." },
        ]}
      />

      <DemoTestimonials
        title="Clientes"
        quotes={[
          { text: "Me devolvieron el auto con luz de estudio y el PPF ni se nota en el capó.", author: "Martín Ibañez", role: "SUV premium demo" },
          { text: "El interior olía a neutral, no a perfume barato.", author: "Paula Díaz", role: "Familiar" },
          { text: "Contrato para flota de ventas; facturan en una sola línea.", author: "HR TechAuto demo", role: "Fleet manager" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        items={[
          { q: "¿Cuánto dura el coating?", a: "Depende del trayecto y lavados; orientativo 18–30 meses con mantenimiento incluido demo." },
          { q: "¿Rayón profundo?", a: "Si atraviesa la laca, solo pintura; te lo marcamos antes de empezar." },
          { q: "¿Guardan la llave?", a: "Caja fuerte con log de retiro; seguro all-risk opcional." },
          { q: "¿Trabajan pintura?", a: "Solo tercerizado con carrocería aliada; nos enfocamos en clear coat sano." },
        ]}
      />

      <section className="flex justify-center gap-3 bg-sky-600 py-10">
        <Sparkles className="h-8 w-8 text-white" />
        <Car className="h-8 w-8 text-white" />
        <p className="font-bold text-white">Combo cerámica + interior 15% off demo · junio</p>
      </section>

      <DemoEnhancements
        slug="detailing"
        brandLabel="Shine Autodetail"
        shopCardClass="border border-sky-500/25 bg-slate-900/70"
        shopAccentClass="bg-sky-500 font-bold text-slate-950"
        sectionClass="border-y border-slate-800 bg-slate-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
        quoteClass="text-sm italic text-slate-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-sky-400"
        extraTestimonialsTitle="Dueños de auto"
        extraTestimonials={[
          { text: "PPF sin burbujas ni suciedad bajo el film.", author: "Fede K.", role: "SUV premium demo" },
          { text: "Interior crema que parecía nuevo después del detailing.", author: "Martín", role: "Pick up" },
          { text: "Nos pasaron técnica de lavado en casa sin vendernos kit caro.", author: "Lucía", role: "Hatch" },
        ]}
      />

      <footer className="py-8 text-center text-xs text-slate-600">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoDetailingLanding as DemoDetailing };