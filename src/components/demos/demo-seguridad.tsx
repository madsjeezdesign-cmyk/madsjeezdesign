"use client";

import { Activity, Bell, Camera, Lock, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoDetailGrid, DemoLongStory, DemoProcessSteps } from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "seguridad" as const;

export function DemoSeguridadLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="flex items-center justify-between border-b border-emerald-800/40 px-4 py-3 md:px-10">
        <div className="flex items-center gap-3">
          <Lock className="h-6 w-6 text-emerald-400" />
          <span className={`${h} text-xl tracking-tight text-white`}>
            VIGILUM<span className="text-emerald-400">.</span>
          </span>
        </div>
        <span className="rounded border border-emerald-500/40 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-300">
          Normas ABIN demo
        </span>
        <button type="button" className={art.primaryCta}>
          Auditoría express
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-emerald-100/60"
        kicker={
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-300">
            <Camera className="h-4 w-4" /> Videovigilancia · alarmas · respuesta
          </p>
        }
        title={
          <>
            Seguridad con
            <br />
            <span className="text-emerald-400">métricas de cobertura</span>
          </>
        }
        lead="Integradores y PyME buscan diagramas de zona, tiempos de instalación y SLA de monitoreo entendibles para no técnicos. Esta demo combina storytelling de amenazas mitigadas, ecommerce de kits y un panel simulado de eventos para generar confianza en RFPs."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Descargar brochure técnico
            </button>
            <button type="button" className={art.secondaryCta}>
              Simular cobertura
            </button>
          </>
        }
      />

      <section className="px-4 py-12 md:px-10">
        <p className="mx-auto mb-6 max-w-5xl text-center text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500">
          Panel demo · pulsos en vivo
        </p>
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-4">
          {[
            { label: "Cámaras online", val: "42/42", icon: Camera },
            { label: "Alarmas armadas", val: "12 zonas", icon: Bell },
            { label: "Latencia enlace", val: "28 ms", icon: Radio },
            { label: "Tickets abiertos", val: "1", icon: Activity },
          ].map(({ label, val, icon: I }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-xl p-5 ${art.cardShell}`}
            >
              <I className="h-5 w-5 text-emerald-400" />
              <p className="mt-3 text-2xl font-bold text-white">{val}</p>
              <p className="text-[11px] uppercase tracking-wider text-emerald-200/50">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Proyecto llave en mano"
        subtitle="Checklist que cierra ventas complejas sin prometer magia."
        steps={[
          { n: "01", t: "Levantamiento", d: "Visita, planos y matriz de riesgos compartida en la nube demo." },
          { n: "02", t: "Propuesta", d: "BOQ con alternativas de marca y TCO 36 meses." },
          { n: "03", t: "Instalación", d: "Certificación cableado y entrega de as-built digital." },
          { n: "04", t: "Monitoreo", d: "Handover a central con pruebas de escenario real." },
        ]}
        sectionClass="border-y border-emerald-900/40 bg-black/30"
        titleClass="text-white"
        subtitleClass="text-emerald-200/45"
        stepNumClass="text-emerald-400"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-emerald-100/55"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Oferta única Vigilum"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-emerald-400"
        itemBodyClass="mt-2 text-sm text-emerald-50/60"
        items={[
          {
            title: "Cyber-hardening NVR",
            body: "Segmentación VLAN, 2FA en acceso remoto y backups georeplicados — copy para CTOs exigentes.",
          },
          {
            title: "Playbooks incidentes",
            body: "Plantillas PDF/WhatsApp para consorcios y retail con roles claros.",
          },
          {
            title: "Compliance",
            body: "Bloques legales adaptativos según jurisdicción (demo).",
          },
          {
            title: "Expansion kits",
            body: "Carrito tipo bento para sumar cámaras sin rearmar todo el presupuesto.",
          },
        ]}
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Propuesta de valor"
        title="Lo que buscan CFO y facilities en la misma URL"
        paragraphs={[
          "Narrativa dual: ROI por reducción de siniestralidad más storytelling emocional para committee de barrio.",
          "Integración con access control y ascensores — roadmap visible para no prometer integraciones fantasmas.",
        ]}
        kickerClass="text-emerald-400"
        titleClass="text-white"
        pClass="mt-4 text-sm leading-relaxed text-emerald-100/65"
        sectionClass="bg-emerald-950/30"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Vigilum Alarmas"
        shopCardClass="border border-emerald-600/30 bg-black/50"
        shopAccentClass="bg-emerald-400 font-bold text-emerald-950"
        sectionClass="border-t border-emerald-800/40 bg-black"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-emerald-100/70"
        authorClass="mt-4 text-xs font-bold text-emerald-400"
        extraTestimonials={[{ text: "El layout bento del carrito ayudó a separar hardware de fee recurrente.", author: "Ing. Salessi", role: "Integrador" }]}
      />

      <footer className="py-8 text-center text-xs text-emerald-900/80">Demo · Vigilum</footer>
    </div>
  );
}

export { DemoSeguridadLanding as DemoSeguridad };
