import { IceCream, Sparkles, ThermometerSun, Truck } from "lucide-react";
import Image from "next/image";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "heladeria" as const;

export function DemoHeladeriaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="sticky top-0 z-40 border-b border-fuchsia-500/20 bg-black/55 px-4 py-3 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span className={`${h} bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-2xl text-transparent`}>
            Alborada
          </span>
          <div className="flex flex-wrap gap-2">
            {["Carta de sabores", "Eventos", "Franquicia demo"].map((x) => (
              <span
                key={x}
                className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-100/80"
              >
                {x}
              </span>
            ))}
          </div>
          <button type="button" className={art.primaryCta}>
            Pedir ahora
          </button>
        </div>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-cyan-100/75"
        kicker={
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
            <IceCream className="h-4 w-4" /> Base leche · fruta de estación · sin atajos químicos
          </p>
        }
        title={
          <>
            Heladería
            <br />
            <span className="text-fuchsia-400">que sabe a verano real</span>
          </>
        }
        lead="Las empresas del rubro buscan narrar origen de la leche, rotación de sabores y claridad en alérgenos. Esta demo muestra catálogo por temporada, bundles para cumpleaños corporativos y logística fría con ventana horaria — todo listo para conectar tu ERP o tienda real."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Ver sabores de la semana
            </button>
            <button type="button" className={art.secondaryCta}>
              Menú eventos PDF
            </button>
          </>
        }
      />

      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className={`order-2 space-y-4 md:order-1 ${art.cardShell} p-8`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-300">Block A · inversión sensorial</p>
            <h2 className={`${h} text-3xl text-white md:text-4xl`}>Fotografía y microcopy que venden cucuruchos</h2>
            <p className="text-sm leading-relaxed text-cyan-100/70">
              Textura, derretido controlado y topping “hero” en primera mirada. En web, eso se traduce en carruseles táctiles,
              fichas con temperatura de servicio y CTA de delivery geolocalizado.
            </p>
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] border border-fuchsia-500/25 md:order-2">
            <Image src={v.b} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw,45vw" />
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-cyan-500/20">
            <Image src={v.d ?? v.a} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw,45vw" />
          </div>
          <div className={`${art.cardShell} p-8`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">Block B · datos que importan</p>
            <h3 className={`${h} mt-2 text-2xl text-white`}>Lo que tu contador y tu cliente quieren ver</h3>
            <ul className="mt-4 space-y-2 text-sm text-cyan-100/70">
              <li className="flex gap-2">
                <ThermometerSun className="h-4 w-4 shrink-0 text-fuchsia-400" />
                Trazabilidad cadena de frío y alertas HACCP en panel demo.
              </li>
              <li className="flex gap-2">
                <Truck className="h-4 w-4 shrink-0 text-fuchsia-400" />
                Franjas de reparto con ETA y cupos por barrio.
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-fuchsia-400" />
                Upsell de toppings y packaging compostable en checkout.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <DemoStatsStrip
        eyebrow="Indicadores marca premium"
        stats={[
          { value: "48 h", label: "Rotación pico sabor", hint: "Producción artesanal acotada" },
          { value: "18%", label: "Ticket medio delivery", hint: "Bundling postre + café" },
          { value: "32", label: "Eventos 2025 demo", hint: "Corp + cumpleaños + weddings" },
          { value: "−6 °C", label: "Cadena garantizada", hint: "Sensores IoT en móviles" },
        ]}
        sectionClass="border-y border-fuchsia-500/15 bg-black/30"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl ${h} text-fuchsia-300`}
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-cyan-200/60"
        hintClass="mt-1 text-xs text-zinc-500"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Del pedido al cucurucho"
        subtitle="Flujo pensado para picos de calor y campañas en redes."
        steps={[
          {
            n: "01",
            t: "Elegís base y topping",
            d: "Stock en tiempo real: si un sabor se agota, el sitio sugiere reemplazo aromático similar.",
          },
          { n: "02", t: "Ventana fría", d: "Elegís franja horaria; el algoritmo demo ajusta rutas para que el helado llegue firme." },
          { n: "03", t: "Pago y recetas", d: "Ticket con alérgenos y QR de receta ampliada — ideal para Instagram y cross-selling." },
          { n: "04", t: "Feedback NPS", d: "Dos toques post-entrega para medir derretido percibido y repurchase intent." },
        ]}
        sectionClass="bg-gradient-to-b from-transparent to-fuchsia-950/20"
        titleClass="text-white"
        subtitleClass="text-cyan-200/50"
        stepNumClass="text-fuchsia-400"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-cyan-100/65"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Qué buscan las heladerías en su web"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass={`font-bold text-cyan-300 ${h}`}
        itemBodyClass="mt-2 text-sm leading-relaxed text-cyan-100/65"
        items={[
          {
            title: "Storytelling de ingredientes",
            body: "Fincas, pasteurización y azúcares naturales: bloques editoriales con fotopería macro que justifican precio premium.",
          },
          {
            title: "Retail + B2B",
            body: "Listas para cafeterías hospedadas y hoteles con facturación separada y mínimos de pedido.",
          },
          {
            title: "SEO local y maps",
            body: "Schema de sucursales, horarios extendidos de verano y reviews integradas sin salir del sitio.",
          },
          {
            title: "Fidelización",
            body: "Pases sabor del mes y club de suscriptores con cupones en wallet digital.",
          },
        ]}
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Laboratorio"
        title="Carta dinámica con overlap gastronómico"
        paragraphs={[
          "Las heladerías fuerte estacional necesitan swap semanal sin rediseñar la home: componentes modulares con bandera “nuevo / agotado” y contador de lotes demo.",
          "Sumamos pairing sugerido con specialty coffee de vecinos y tabla nutricional descargable para escuelas y nutricionistas — posicionamiento B2B saludable.",
        ]}
        kickerClass="text-fuchsia-400"
        titleClass="text-white"
        pClass="mt-4 text-sm leading-relaxed text-cyan-100/70"
        sectionClass="border-y border-white/5 bg-black/25"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ express"
        items={[
          {
            q: "¿Hacen tortas heladas a medida?",
            a: "Sí, con aviso mínimo demo de 72 h y sketch de decoración cargado en el checkout.",
          },
          { q: "¿Trabajan con food trucks?", a: "Tenemos módulo de partners móviles con geofence y split de comisiones demo." },
          { q: "¿Exportan franquicia?", a: "Playbook digital con manuales y ordering unificado — conversá con nosotros en el formulario." },
        ]}
        sectionClass="bg-[#0a0612]"
        titleClass="text-white"
        qClass="font-bold text-white"
        aClass="mt-2 text-sm text-zinc-500"
        rowClass="border-b border-white/10 py-6 last:border-0"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Gelato Alborada"
        shopCardClass="border border-fuchsia-500/25 bg-black/50"
        shopAccentClass="bg-gradient-to-r from-fuchsia-500 to-cyan-500 font-bold text-white"
        sectionClass="border-y border-fuchsia-500/20 bg-[#080410]"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-fuchsia-100/80"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-cyan-300"
        extraTestimonialsTitle="Clientes y productores"
        extraTestimonials={[
          { text: "Venden la frescura antes del primer bocado: eso subió nuestro ticket catering.", author: "Lucía P.", role: "Productora musical" },
          { text: "Integración con nuestra app de loyalty fue plug & play demo.", author: "Marce K.", role: "CMO retail café" },
        ]}
      />

      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-zinc-600">
        Demo · Gelato Alborada · contenido ficticio
      </footer>
    </div>
  );
}

export { DemoHeladeriaLanding as DemoHeladeria };
