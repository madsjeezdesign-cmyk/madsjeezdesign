"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Infinity, Sparkles, Truck, Zap } from "lucide-react";
import { useRef } from "react";
import type { RetailFashionConfig } from "@/lib/retail-fashion-demos";
import { whatsappGeneralUrl } from "@/lib/fashion-whatsapp";

type Props = { config: RetailFashionConfig };

const pillars = [
  {
    icon: Sparkles,
    title: "Colección OI",
    desc: "Siluetas de invierno curadas en boutique — lana, noir y elegancia parisina.",
  },
  {
    icon: Zap,
    title: "Compra en segundos",
    desc: "Carrito web → WhatsApp con tu pedido armado. Sin fricción, respuesta humana.",
  },
  {
    icon: Truck,
    title: "Ezeiza & alrededores",
    desc: "Retiro en local o coordiná envío. Atención personalizada @infinita_fashionstore.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

export function InfinitaFashionMarketing({ config }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const wa = whatsappGeneralUrl(config);

  return (
    <section id="coleccion" ref={ref} className="relative overflow-hidden bg-white py-28 md:py-40">
      <motion.div
        className="pointer-events-none absolute -right-24 top-0 font-serif text-[28vw] font-light leading-none text-black/[0.03]"
        initial={{ opacity: 0, x: 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.4 }}
        aria-hidden
      >
        ∞
      </motion.div>

      <motion.div className="mx-auto max-w-[90%]">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.04em] text-gray-400"
        >
          {config.seasonBadge}
        </motion.p>

        <motion.h2
          custom={1}
          variants={fade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-5xl text-center font-serif font-normal leading-[0.92] tracking-tighter text-black"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
        >
          {config.collectionTitle}
        </motion.h2>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto mt-8 max-w-2xl text-center text-base font-light leading-relaxed text-gray-600 md:text-lg"
        >
          {config.collectionSubtitle}
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#shop"
            className="group inline-flex items-center gap-3 bg-black px-10 py-5 text-[11px] font-bold uppercase tracking-[0.04em] text-white transition-transform hover:scale-[1.02]"
          >
            Explorar tienda
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-black px-10 py-5 text-[11px] font-bold uppercase tracking-[0.04em] text-black transition-colors hover:bg-black hover:text-white"
          >
            WhatsApp directo
          </a>
        </motion.div>

        <div className="mt-24 grid gap-px bg-black/10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              custom={4 + i}
              variants={fade}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group bg-white p-10 md:p-12"
            >
              <p.icon className="mb-6 h-6 w-6 stroke-[1.25] text-black/40 transition-colors group-hover:text-black" />
              <h3 className="font-serif text-2xl tracking-tight text-black md:text-3xl">{p.title}</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-gray-500">{p.desc}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          custom={7}
          variants={fade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="rf-marketing-glow mt-24 border border-black/10 bg-[#fafafa] px-8 py-14 text-center md:px-16 md:py-20"
        >
          <Infinity className="mx-auto mb-6 h-8 w-8 text-black/30" strokeWidth={1} />
          <p className="text-[10px] font-bold uppercase tracking-[0.04em] text-gray-400">
            Limited drop · Otoño Invierno
          </p>
          <p
            className="mx-auto mt-4 max-w-3xl font-serif italic leading-snug text-black"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            &ldquo;No seguimos tendencias — las vestimos en Ezeiza con actitud parisina.&rdquo;
          </p>
          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block text-[11px] font-bold uppercase tracking-[0.04em] text-black underline-offset-4 hover:underline"
          >
            @{config.instagramHandle} →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
