import { Coffee, EthernetPort, Users, Wifi } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoDetailGrid, DemoFaqList, DemoStatsStrip } from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "coworking" as const;

export function DemoCoworkingLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-sky-500/20 bg-slate-950/90 px-4 py-3 backdrop-blur md:px-10">
        <div className="flex flex-col">
          <span className="text-[8px] font-bold uppercase tracking-[0.45em] text-sky-400">Muelle</span>
          <span className={`${h} text-xl text-sky-50`}>Hub</span>
        </div>
        <div className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 md:block">
          Ocupación live demo
        </div>
        <button type="button" className={art.primaryCta}>
          Day pass
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-sky-50"
        leadColorClass="text-slate-400"
        kicker={
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400">Fibra · cabinas fono · caffe lab</p>
        }
        title={
          <>
            Coworking
            <br />
            <span className="text-sky-400">que mide pulsos reales</span>
          </>
        }
        lead="Operadores flex necesitan mostrar disponibilidad por franja, ventajas para equipos híbridos y add-ons de AV. Esta demo usa layout sticky + bento en tienda para separar passes livianos de salas equipadas, sin parecer brochure genérico."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Mapa de planta
            </button>
            <button type="button" className={art.secondaryCta}>
              Convenio PyME
            </button>
          </>
        }
      />

      <section className="px-4 py-14 md:px-10">
        <h2 className="sr-only">Servicios Hub</h2>
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-4 md:grid-rows-2">
          {[
            { icon: Wifi, t: "Internet", d: "Simétrico dedicado por piso demo.", span: "md:col-span-2 md:row-span-2" },
            { icon: EthernetPort, t: "AV 4K", d: "HDMI + USBC + barra sonido.", span: "md:col-span-2" },
            { icon: Coffee, t: "Café terceros", d: "Convenio tostadores locales.", span: "md:col-span-1" },
            { icon: Users, t: "Community", d: "Afters tech los jueves.", span: "md:col-span-3" },
          ].map((b) => (
            <div key={b.t} className={`rounded-2xl border border-sky-500/15 bg-slate-900/50 p-6 ${b.span}`}>
              <b.icon className="h-6 w-6 text-sky-400" />
              <p className={`mt-3 ${h} text-lg text-white`}>{b.t}</p>
              <p className="mt-1 text-sm text-slate-500">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-slate-900/40 px-4 py-12 md:px-10">
        <div className={`mx-auto max-w-5xl p-8 text-center ${art.cardShell}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-sky-500">Planta tipo</p>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-4 gap-2 rounded-xl border border-dashed border-sky-500/30 bg-slate-950/60 p-6 text-[10px] text-slate-500">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`rounded ${i === 3 ? "col-span-2 bg-sky-500/20 ring-1 ring-sky-400" : "bg-slate-800/80"}`}
              >
                {i === 3 ? "Sala 8" : i % 2 === 0 ? "Hot" : "·"}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Grid abstracto — en producción SVG interactivo con sensores IoT demo.</p>
        </div>
      </section>

      <DemoStatsStrip
        eyebrow="Operación flexible"
        stats={[
          { value: "82%", label: "Ocupación piso 2", hint: "Martes 15 h demo" },
          { value: "14 ms", label: "Latencia LAN", hint: "Oficinas premium" },
          { value: "128", label: "Miembros activos", hint: "Plan mes + corporativo" },
          { value: "4", label: "Salas AV", hint: "Upgrade en una hora" },
        ]}
        sectionClass="border-y border-white/5"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl ${h} text-sky-400`}
        labelClass="mt-2 text-[11px] font-bold uppercase text-slate-400"
        hintClass="mt-1 text-xs text-slate-600"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Lo que equipos híbridos esperan ver"
        titleClass="text-sky-50"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-sky-400"
        itemBodyClass="mt-2 text-sm text-slate-400"
        items={[
          { title: "SSO & invitados", body: "Accesos temporales QR con caducidad y log de visitas demo." },
          { title: "Lockers inteligentes", body: "Asignación desde app sin tarjeta física." },
          { title: "Wellness", body: "Luz circadiana en cabinas profundas — argumento HR." },
          { title: "Parking bike", body: "Inventario de lugares y cargadores USB." },
        ]}
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="Facturación"
        items={[
          { q: "¿Emiten factura B a HQ?", a: "Splits por centro de costo y contrato marco demo." },
          { q: "¿Hay período de gracia?", a: "7 días trial en plan mes con límite de sala AV." },
        ]}
        sectionClass="bg-slate-900/50"
        titleClass="text-sky-50"
        qClass="font-bold text-white"
        aClass="mt-2 text-sm text-slate-500"
        rowClass="border-b border-white/5 py-5 last:border-0"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Hub Muelle"
        shopCardClass="border border-sky-500/25 bg-slate-950/70"
        shopAccentClass="bg-sky-500 font-bold text-slate-950"
        sectionClass="bg-slate-950"
        titleClass="text-sky-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-slate-400"
        authorClass="mt-4 text-xs font-bold text-sky-400"
        extraTestimonials={[{ text: "El shop bento explicó passes vs cabinas sin llamada comercial.", author: "Lean", role: "PM remoto" }]}
      />

      <footer className="py-8 text-center text-xs text-slate-600">Demo · Hub Muelle</footer>
    </div>
  );
}

export { DemoCoworkingLanding as DemoCoworking };
