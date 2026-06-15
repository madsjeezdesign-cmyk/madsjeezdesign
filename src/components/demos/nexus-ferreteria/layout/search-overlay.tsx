"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  NEXUS_PRODUCTS,
  formatNexusPrice,
  type NexusProduct,
} from "@/lib/nexus-ferreteria";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (p: NexusProduct) => void;
};

export function SearchOverlay({ open, onClose, onSelect }: Props) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return NEXUS_PRODUCTS.slice(0, 6);
    return NEXUS_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term),
    ).slice(0, 8);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-zinc-950/90 px-4 pt-24 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
          />
          <motion.div
            className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl nx-glow-orange"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <motion.div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Search className="h-5 w-5 text-orange-400" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por SKU, marca o producto..."
                className="flex-1 bg-transparent text-lg text-white outline-none placeholder:text-[color:var(--muted-body)]"
                autoFocus
              />
              <button type="button" onClick={onClose} aria-label="Cerrar">
                <X className="h-5 w-5 text-[color:var(--muted-body)]" />
              </button>
            </motion.div>
            <ul className="mt-4 max-h-80 overflow-y-auto">
              {results.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(p);
                      onClose();
                    }}
                    className="flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left transition hover:bg-white/5"
                  >
                    <div
                      className="h-12 w-12 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-white">{p.name}</p>
                      <p className="text-xs text-[color:var(--muted-body)]">
                        {p.brand} · {p.sku}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-orange-400">
                      {formatNexusPrice(p.price)}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
