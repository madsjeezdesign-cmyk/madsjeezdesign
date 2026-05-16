"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Monitor,
  Smartphone,
  Zap,
} from "lucide-react";
import { site } from "@/lib/data";

export type DemosShowcaseItem = {
  slug: string;
  category: string;
  title: string;
  tagline: string;
  pitch: string;
  image: string;
  features: [string, string, string];
  color: string;
  accent: string;
  border: string;
};

function FeatureItem({ text, accent }: { text: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
      <CheckCircle2 size={12} className={`shrink-0 ${accent}`} />
      {text}
    </div>
  );
}

function DemoCard({ item, index }: { item: DemosShowcaseItem; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.9) }}
      className="list-none"
    >
      <Link
        href={`/demos/${item.slug}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`group relative flex h-[550px] flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-950 transition-all duration-700 ${item.border} outline-none ring-[#1de0b1]/0 focus-visible:ring-2 focus-visible:ring-[#1de0b1]`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover opacity-20 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
          <div className="mb-auto flex items-start justify-between">
            <div
              className={`rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md ${item.accent}`}
            >
              {item.category}
            </div>
            <div className="flex gap-2 opacity-40 transition-opacity group-hover:opacity-100">
              <Monitor size={14} className="text-zinc-300" />
              <Smartphone size={14} className="text-zinc-300" />
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="mb-4 font-[family-name:var(--font-demo-playfair)] text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
              {item.title}
            </h2>
            <p className="mb-2 max-w-sm text-sm leading-relaxed text-zinc-400 md:text-base">
              {item.tagline}
            </p>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-zinc-500 transition-all duration-500 md:text-base">
              {item.pitch}
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-2.5">
            {item.features.map((f) => (
              <FeatureItem key={f} text={f} accent={item.accent} />
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
            <span
              className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${hover ? `translate-x-1 ${item.accent}` : "text-zinc-500"} md:text-sm`}
            >
              Explorar demo
              <ArrowRight size={16} />
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-black">
              <ExternalLink size={18} />
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

export function DemosIndexShowcase({ items }: { items: DemosShowcaseItem[] }) {
  const year = site.activeYear;

  return (
    <div className="relative min-h-screen bg-black font-[family-name:var(--font-demo-montserrat)] text-zinc-100 selection:bg-white selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div
          className="absolute inset-0 opacity-[0.03] contrast-150"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px]" />
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 py-8 md:px-12 lg:px-16">
        <Link
          href="/demos"
          className="flex flex-col transition-opacity hover:opacity-90"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.45em] text-white md:text-xs">
            MADSJEEZ
          </span>
          <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-500 md:text-[9px]">
            Design Studio
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden rounded-full border border-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white sm:inline-flex"
          >
            Sitio
          </Link>
          <Link
            href="/#nexo"
            className="rounded-full border border-white/10 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black md:text-[10px]"
          >
            Contacto directo
          </Link>
        </div>
      </nav>

      <header className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-8 text-center md:px-12 md:pb-20 md:text-left lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85 }}
        >
          <div className="mb-6 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
              Showroom {year}
            </span>
            <div className="hidden h-px flex-1 bg-white/10 md:block" />
          </div>

          <h1 className="mb-10 font-[family-name:var(--font-demo-bebas)] text-[4.5rem] uppercase leading-[0.85] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem]">
            Landing
            <br />
            <span className="font-[family-name:var(--font-demo-playfair)] text-4xl font-light lowercase not-italic tracking-normal text-zinc-500 sm:text-5xl md:text-6xl lg:text-7xl">
              demo
            </span>
          </h1>

          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="max-w-3xl text-lg font-light leading-relaxed text-zinc-400 md:text-xl lg:text-2xl">
                Modelos de alta fidelidad por industria.{" "}
                <span className="text-white">
                  Estrategia visual, performance técnica y conversión
                </span>{" "}
                en cada bloque: galería, video, testimonios, e‑commerce simulado y lead al mismo panel
                que tu sitio principal.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 md:items-end md:text-[10px]">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-yellow-500" />
                Core Web Vitals aware
              </div>
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-blue-500" />
                SEO-ready structure
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1400px] px-6 pb-28 md:px-12 md:pb-40 lg:px-16">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item, index) => (
            <DemoCard key={item.slug} item={item} index={index} />
          ))}
        </ul>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 md:text-left">
            © {year} {site.name} · Creative solutions
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-white"
            >
              Email
            </a>
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
