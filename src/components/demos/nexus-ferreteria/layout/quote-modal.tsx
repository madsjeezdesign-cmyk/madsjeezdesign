"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { useState } from "react";
import { NEXUS_FERRETERIA_CONFIG, nexusWhatsAppLink } from "@/lib/nexus-ferreteria";
import { MagneticButton } from "../shared/magnetic-button";

type Props = { open: boolean; onClose: () => void };

export function QuoteModal({ open, onClose }: Props) {
  const [obra, setObra] = useState("");
  const [items, setItems] = useState("");

  const send = () => {
    const msg = `*COTIZACIÓN OBRA — ${NEXUS_FERRETERIA_CONFIG.brand}*\n\nObra: ${obra || "—"}\n\nMateriales:\n${items || "—"}\n\nSolicito presupuesto detallado con plazos.`;
    window.open(nexusWhatsAppLink(msg), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
            aria-label="Cerrar"
          />
          <motion.div
            className="relative w-full max-w-lg rounded-2xl border border-orange-500/20 bg-zinc-900 p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            role="dialog"
            aria-labelledby="quote-title"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-400" />
                <h2 id="quote-title" className="text-lg font-semibold text-white">
                  Cotización rápida
                </h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Cerrar">
                <X className="h-5 w-5 text-[color:var(--muted-body)]" />
              </button>
            </div>
            <label className="mb-4 block text-sm text-zinc-400">
              Nombre de obra / cliente
              <input
                value={obra}
                onChange={(e) => setObra(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-orange-500/50"
              />
            </label>
            <label className="mb-6 block text-sm text-zinc-400">
              Lista de materiales
              <textarea
                value={items}
                onChange={(e) => setItems(e.target.value)}
                rows={4}
                placeholder="Ej: 20 bolsas cemento, 50m cable 2.5mm..."
                className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-orange-500/50"
              />
            </label>
            <MagneticButton
              onClick={send}
              className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 py-3 font-bold text-black"
            >
              Enviar por WhatsApp
            </MagneticButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
