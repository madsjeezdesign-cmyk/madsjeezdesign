"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";
import { GUSTITOS_CONFIG, gustitosWhatsAppLink } from "@/lib/gustitos";

export function GustitosFooter() {
  const cfg = GUSTITOS_CONFIG;

  return (
    <footer id="contacto" className="relative border-t border-red-500/10 bg-zinc-950 pb-32 pt-20 lg:pb-24">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-red-600/15 blur-[80px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-gu-display)] text-3xl uppercase text-white">
            {cfg.brand}
          </h2>
          <p className="mt-4 flex items-start gap-2 text-sm text-[color:var(--muted-body)]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            {cfg.addressLines.join(" · ")}
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted-body)]">{cfg.hours}</p>
          <a
            href={gustitosWhatsAppLink("Hola GUSTITOS! Quiero hacer un pedido desde la demo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400"
          >
            <MessageCircle className="h-4 w-4" />
            Pedir por WhatsApp
          </a>
          <div className="mt-8 aspect-video max-w-xl overflow-hidden rounded-xl border border-white/10">
            <iframe title="Mapa GUSTITOS" src={cfg.mapsEmbedUrl} className="h-full w-full border-0 opacity-80" loading="lazy" />
          </div>
        </motion.div>
        <p className="mt-12 text-center text-xs text-[color:var(--muted-body)]">
          Demo gastronómica · {cfg.brand} · Mads Jeez Design
        </p>
      </div>
    </footer>
  );
}
