"use client";

import { Leaf, Shield, Sparkles, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { LUNA_PETIT_CO_CONFIG } from "@/lib/luna-petit-co";

const ITEMS = [
  { icon: Truck, title: "Envíos premium", desc: `Gratis desde ${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(LUNA_PETIT_CO_CONFIG.freeShippingFrom)}` },
  { icon: Sparkles, title: "Calidad boutique", desc: "Telas certificadas · costuras de precisión" },
  { icon: Leaf, title: "Materiales suaves", desc: "Algodón orgánico · sin químicos agresivos" },
  { icon: Shield, title: "Pago seguro", desc: "3 y 6 cuotas · encriptación SSL" },
];

export function LunaTrust() {
  return (
    <section id="confianza" className="scroll-mt-24 border-y border-neutral-200/40 bg-white/40 py-16 backdrop-blur-sm md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-neutral-200/50 bg-white/70 p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.08)] backdrop-blur-md"
            >
              <Icon className="h-5 w-5 text-neutral-700" strokeWidth={1.25} />
              <p className="mt-4 font-serif text-lg text-neutral-900">{title}</p>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
