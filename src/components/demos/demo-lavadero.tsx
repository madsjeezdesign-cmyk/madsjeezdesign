import { Clock, Droplets, MapPin, ShieldCheck, Waves } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoFaqList, DemoTestimonials } from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "lavadero" as const;

export function DemoLavaderoLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <header className="border-b border-cyan-500/20 px-4 py-4 text-center md:px-10">
        <p className={`inline-block border-b-2 border-cyan-400 pb-1 text-[10px] font-bold uppercase tracking-[0.45em] text-cyan-300`}>
          Spin & Gloss
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <span className="cursor-default hover:text-cyan-300">Membresías</span>
          <span className="cursor-default hover:text-cyan-300">Detailing rápido</span>
          <span className="cursor-default hover:text-cyan-300">Flota PyME</span>
        </nav>
      </header>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-slate-400"
        kicker={
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-200">
            <Waves className="h-3.5 w-3.5" /> RFID · filas inteligentes
          </span>
        }
        title={
          <>
            Brillo
            <span className="text-cyan-400"> en menos vueltas</span>
          </>
        }
        lead="Tu cliente quiere ver tiempo estimado en fila, beneficios de membresía claros y addons de detailing sin confundir el túnel express. Esta demo muestra pricing por SUV, planes con cargo automático y cross-sell de ozono con carrito distinto al grid clásico."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Ver turnos hoy
            </button>
            <button type="button" className={art.secondaryCta}>
              PDF flotas
            </button>
          </>
        }
      />

      <section className="overflow-x-auto border-y border-white/5 bg-slate-900/40 px-4 py-6 md:px-10">
        <div className="mx-auto flex max-w-6xl min-w-max gap-4 md:min-w-0 md:justify-between">
          {[
            { t: "Túnel", d: "Alta presión + secado" },
            { t: "Express", d: "10 min SUV chico" },
            { t: "Ozono", d: "Sanitiza habitáculo" },
            { t: "Cerá", d: "Sellado rápido" },
            { t: "Flota", d: "Facturación única" },
          ].map((x) => (
            <div
              key={x.t}
              className={`shrink-0 rounded-2xl px-6 py-4 text-center md:min-w-[120px] ${art.cardShell}`}
            >
              <p className={`${h} text-lg text-cyan-400`}>{x.t}</p>
              <p className="mt-1 text-[11px] text-slate-500">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className={`${h} text-center text-4xl text-white md:text-5xl`}>Línea de tiempo operativa</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-500">
            Lo que las cadenas de lavado buscan en web: throughput, NPS y ticket medio — visualizamos el journey horizontal.
          </p>
          <div className="relative mt-14 hidden md:block">
            <div className="absolute left-0 right-0 top-6 h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20" />
            <div className="grid grid-cols-4 gap-6">
              {[
                { n: "Scan", d: "Lector RFID asigna cabina" },
                { n: "Prep", d: "Barro suave, PH controlado" },
                { n: "Sellado", d: "Cera express opcional" },
                { n: "Upsell", d: "Push notif detailing" },
              ].map((s) => (
                <div key={s.n} className={`relative pt-12 text-center ${art.cardShell} p-6`}>
                  <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950 text-xs font-bold text-cyan-300">
                    {s.n}
                  </div>
                  <p className="text-sm font-bold text-white">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 space-y-4 md:hidden">
            {["Scan", "Prep", "Sellado", "Upsell"].map((n, i) => (
              <div key={n} className={`flex gap-3 p-4 ${art.cardShell}`}>
                <Droplets className="h-6 w-6 shrink-0 text-cyan-400" />
                <p className="text-sm text-slate-300">
                  Paso {i + 1}: {n} — ver detalle en desktop.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            { icon: Clock, t: "Picos mediodía", d: "Cola virtual con SMS 2 pasos antes del túnel." },
            { icon: MapPin, t: "Multi-sede", d: "Sincronización de saldo entre plantas demo." },
            { icon: ShieldCheck, t: "Seguro flota", d: "Checklist fotográfico descargable por lavado." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`p-8 ${art.cardShell}`}>
              <I className="h-7 w-7 text-cyan-400" />
              <h3 className={`mt-4 ${h} text-xl text-white`}>{t}</h3>
              <p className="mt-2 text-sm text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Operadores y flotas"
        quotes={[
          { text: "Reducimos reclamos por rayones con el checklist web firmado.", author: "G. Ferro", role: "Transporte urbano" },
          { text: "El listado horizontal de planes convenció al COO en una sola reunión.", author: "Pilar", role: "Cadena 12 sucursales demo" },
        ]}
        sectionClass="border-y border-cyan-500/10"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-slate-400"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-cyan-500"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="Preguntas frecuentes"
        items={[
          { q: "¿Integran barreras automáticas?", a: "API demo con lectores LPR y whitelist de patentes corporativas." },
          { q: "¿Cómo evitan fraude en membresías?", a: "Límite de patentes, selfie opcional en alta y bloqueo remoto." },
        ]}
        sectionClass="bg-black/40"
        titleClass="text-white"
        qClass="font-bold text-white"
        aClass="mt-2 text-sm text-slate-500"
        rowClass="border-b border-white/5 py-5 last:border-0"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Spin & Gloss Autolavado"
        shopCardClass="border border-cyan-500/25 bg-slate-950/80"
        shopAccentClass="bg-cyan-400 font-bold text-slate-950"
        sectionClass="bg-slate-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-slate-400"
        authorClass="mt-4 text-xs font-bold text-cyan-400"
        extraTestimonials={[{ text: "El layout de lista en el shop nos diferenció en la propuesta.", author: "Leo", role: "Agencia partner demo" }]}
      />

      <footer className="px-4 py-8 text-center text-xs text-slate-600">Demo · Spin & Gloss</footer>
    </div>
  );
}

export { DemoLavaderoLanding as DemoLavadero };
