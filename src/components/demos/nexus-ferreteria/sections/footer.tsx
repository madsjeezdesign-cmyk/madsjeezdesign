"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";
import { NEXUS_FERRETERIA_CONFIG, nexusWhatsAppLink } from "@/lib/nexus-ferreteria";

export function NexusFooter() {
  const cfg = NEXUS_FERRETERIA_CONFIG;

  return (
    <footer id="contacto" className="relative border-t border-white/5 bg-zinc-950 pb-32 pt-24 lg:pb-24">
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-orange-600/10 blur-[100px]"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.04em] text-orange-400">
            {cfg.brand}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">{cfg.brandSub}</h2>
          <p className="mt-4 flex items-start gap-2 text-sm text-[color:var(--muted-body)]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            {cfg.addressLines.join(" · ")}
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted-body)]">{cfg.hours}</p>
          <a
            href={nexusWhatsAppLink("Hola NEXUS, consulta desde la web demo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-5 py-3 text-sm font-medium text-orange-400 transition hover:bg-orange-500/20"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp técnico
          </a>
          <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-white/10">
            <iframe
              title="Ubicación NEXUS"
              src={cfg.mapsEmbedUrl}
              className="h-full w-full border-0 grayscale contrast-125"
              loading="lazy"
            />
          </div>
        </motion.div>
        <p className="mt-16 text-center text-xs text-[color:var(--muted-body)]">
          Demo industrial · {cfg.brand} · Mads Jeez Design
        </p>
      </div>
    </footer>
  );
}
