import { Flower2, Gift, Heart, Leaf, Truck } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";

export function DemoFloreriaLanding() {
  return (
    <div className="min-h-screen bg-emerald-950 font-[family-name:var(--font-demo-montserrat)] text-emerald-50">
      <nav className="flex items-center justify-between px-5 py-5 md:px-10">
        <span className="font-[family-name:var(--font-demo-playfair)] text-2xl italic text-pink-200">
          Jardín Urbano
        </span>
        <button
          type="button"
          className="rounded-full bg-pink-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-pink-500/20"
        >
          Armar ramo
        </button>
      </nav>

      <header className="relative overflow-hidden px-5 pb-24 pt-8 md:px-10">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full border border-pink-500/20 bg-pink-500/5 blur-2xl" />
        <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl md:flex md:items-center md:gap-16">
          <div className="flex-1">
            <h1 className="font-[family-name:var(--font-demo-playfair)] text-4xl leading-tight md:text-6xl">
              Flores
              <br />
              <span className="text-pink-400">que emocionan</span>
            </h1>
            <p className="mt-6 max-w-md text-sm text-emerald-200/80">
              Ramos a domicilio, suscripción semanal de tulipanes y decoración
              para eventos. Entrega en frío y nota personalizada.
            </p>
          </div>
          <div className="relative mt-12 flex flex-1 justify-center md:mt-0">
            <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-pink-400/30 bg-gradient-to-br from-emerald-900 to-pink-950/50">
              <Flower2 className="h-28 w-28 text-pink-300/80" strokeWidth={1} />
            </div>
            <div className="absolute -bottom-2 flex gap-2">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <Heart className="h-8 w-8 text-pink-400" />
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-emerald-800/50 bg-emerald-900/40 px-5 py-14 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {[
            { icon: Truck, t: "Envíos", d: "Misma tarde · CABA & GBA" },
            { icon: Gift, t: "Eventos", d: "Bodas, 15 años, lanzamientos" },
            { icon: Flower2, t: "Club", d: "Flor fresca en tu oficina" },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl bg-emerald-950/60 p-6 text-center">
              <I className="mx-auto h-7 w-7 text-pink-400" />
              <p className="mt-3 font-bold text-white">{t}</p>
              <p className="mt-1 text-xs text-emerald-300/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoLongStory
        kicker="Fresco diario"
        title="Cadena de frío verificada y narrativa emocional en cada nota de entrega"
        paragraphs={[
          "Compramos en plaza central antes del amanecer y procesamos tallos en mesa refrigerada para extender vida útil sin químicos agresivos. Nuestro driver lleva conservadora rota y sticker de temperatura en entregas corporativas demo.",
          "Para bodas armamos piloto en venue 24 h antes con bucket test y checklist fotográfico; pack de reposición express si el catering demora montaje.",
        ]}
        kickerClass="text-pink-400"
        titleClass="text-pink-100"
        pClass="mt-4 text-sm text-emerald-200/80"
        sectionClass="bg-emerald-900/30"
      />

      <DemoStatsStrip
        stats={[
          { value: "18", label: "Años", hint: "Familia floristas" },
          { value: "450+", label: "Eventos", hint: "Tipo casamiento demo" },
          { value: "4", label: "Camiones frío", hint: "Flota propia" },
          { value: "2 h", label: "Radio express", hint: "Cap. fed CABA" },
        ]}
        sectionClass="border-y border-emerald-800/50 bg-emerald-950/50"
        cardClass="rounded-2xl border border-pink-500/20 bg-emerald-900/40 p-6"
        valueClass="text-3xl font-black text-pink-300"
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300/70"
        hintClass="mt-1 text-xs text-emerald-200/60"
      />

      <DemoProcessSteps
        title="Evento full service"
        subtitle="Brief creativo + presupuesto cerrado con 1 ronda de cambios escrita."
        steps={[
          { n: "01", t: "Moodboard", d: "Referencias reales de stock disponible, no Pinterest imposible." },
          { n: "02", t: "Site visit", d: "Medición alturas y plan eléctrico luces botánicas demo." },
          { n: "03", t: "Producción", d: "Workshop con hydrata coolers y etiquetas QR de cuidados." },
          { n: "04", t: "Strike", d: "Desmontaje y compostaje de orgánico — certificado green event." },
        ]}
        sectionClass="bg-emerald-950/40"
        titleClass="text-pink-100"
        subtitleClass="text-emerald-200/70"
        stepNumClass="text-pink-400"
        cardClass="rounded-2xl border border-emerald-700/40 bg-black/30 p-6"
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-emerald-200/70"
      />

      <DemoDetailGrid
        title="Suscripciones"
        sectionClass="bg-emerald-900/20"
        titleClass="text-pink-100"
        cardClass="rounded-2xl border border-pink-500/15 bg-emerald-950/60 p-6"
        itemTitleClass="font-bold text-pink-300"
        itemBodyClass="mt-2 text-sm text-emerald-100/75"
        items={[
          { title: "Oficina boutique", body: "Jarrón mediano lunes + mini card terapéutica aromática demo." },
          { title: "House warming", body: "3 entregas escalonadas con macetas nutritivas y guía de trasplante." },
          { title: "Retail pop-up", body: "Columnas florales con logo sutil y mantenimiento cada 48 h." },
          { title: "Condolencias", body: "Coronas clásicas o diseño moderno minimal con delivery silencioso." },
        ]}
      />

      <DemoTestimonials
        title="Novias y producers"
        sectionClass="border-y border-emerald-800/40 bg-black/20"
        titleClass="text-pink-100"
        cardClass="rounded-2xl border border-pink-500/20 bg-emerald-950/40 p-6"
        quoteClass="text-sm italic text-emerald-50/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-pink-400"
        quotes={[
          { text: "Flores que aguantaron 38 °C en carpa sin drama.", author: "Luli & Gon", role: "Campo demo" },
          { text: "Nos salvaron el photo shoot con reemplazo express.", author: "Martu Planner", role: "Wedding" },
          { text: "La suscripción llega tan fresca que parece recién cortada.", author: "CEO Bloom", role: "Holding" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        sectionClass="bg-emerald-950"
        titleClass="text-pink-100"
        qClass="font-bold text-emerald-100"
        aClass="mt-2 text-sm text-emerald-200/75"
        rowClass="border-b border-emerald-800/40 py-6 last:border-0"
        items={[
          { q: "¿Presupuesto mínimo evento?", a: "Cotización desde 12 arreglos centrales equivalentes demo." },
          { q: "¿Flores importadas?", a: "Sí, con documentación fitosanitaria y carbon offset opcional." },
          { q: "¿Packaging sustentable?", a: "Base celulosa; sin foam salvo pedido explícito retail." },
          { q: "¿Cambios última hora?", a: "Ventana 6 h con fee rush transparente." },
        ]}
      />

      <section className="px-5 py-16 md:px-10">
        <h2 className="text-center font-[family-name:var(--font-demo-playfair)] text-3xl text-pink-100">
          Colección temporada demo
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {["Peonías & eucalipto", "Garden roses blush", "Monocromo blanco", "Tropical punch"].map(
            (name) => (
              <div
                key={name}
                className="rounded-xl border border-pink-500/20 bg-gradient-to-r from-emerald-900/80 to-pink-950/40 px-5 py-4"
              >
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-emerald-300/70">Desde $ — · stock demo</p>
              </div>
            ),
          )}
        </div>
      </section>

      <DemoEnhancements
        slug="floreria"
        brandLabel="Jardín Urbano"
        shopCardClass="border border-pink-500/25 bg-emerald-950/60"
        shopAccentClass="bg-pink-500 font-bold text-white"
        sectionClass="border-y border-emerald-800/40 bg-emerald-950/50"
        titleClass="text-pink-100"
        cardClass="rounded-2xl border border-pink-500/20 bg-emerald-950/40 p-6"
        quoteClass="text-sm italic text-emerald-50/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-pink-400"
        extraTestimonialsTitle="Eventos & regalos"
        extraTestimonials={[
          { text: "Centro de mesa idéntico al moodboard, impecable.", author: "Lu & Tomi", role: "Civil demo" },
          { text: "Suscripción oficina — llegan frescas los lunes.", author: "Ops Lead", role: "Scale-up" },
          { text: "Salvaron el casamiento con reposición express de peonías.", author: "Wedding Pro", role: "Planner" },
        ]}
      />

      <footer className="py-10 text-center text-xs text-emerald-800">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoFloreriaLanding as DemoFloreria };
