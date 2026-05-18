"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { LUNA_PRODUCTS, type LunaProduct } from "@/lib/luna-petit-co";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (p: LunaProduct) => void;
};

export function SearchOverlay({ open, onClose, onSelect }: Props) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return LUNA_PRODUCTS.slice(0, 4);
    return LUNA_PRODUCTS.filter((p) => p.name.toLowerCase().includes(query));
  }, [q]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[#F8F6F2]/95 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-2xl px-4 pt-24">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar prendas..."
                className="w-full rounded-2xl border border-neutral-200/60 bg-white/80 py-4 pl-12 pr-12 text-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-neutral-300/50"
              />
              <button type="button" onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              {results.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(p);
                      onClose();
                    }}
                    className="w-full rounded-xl border border-transparent px-4 py-3 text-left transition hover:border-neutral-200 hover:bg-white/80"
                  >
                    {p.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
