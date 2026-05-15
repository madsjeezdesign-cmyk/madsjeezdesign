"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Code2,
  Command,
  Database,
  Layers,
  Menu,
  Share2,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { HyperContact } from "./hyper-contact";
import { HyperTerminal } from "./hyper-terminal";
import { LogoQuantum } from "./logo-quantum";
import { ParticleField } from "./particle-field";

const GITHUB_URL = "https://github.com/madsjeezdesign-cmyk/madsjeezdesign";

const capabilities = [
  {
    icon: Database,
    title: "Arquitectura Cloud",
    desc: "Instancias auto-escalables con latencia sub-milisegundo en cualquier nodo global.",
  },
  {
    icon: Code2,
    title: "Full Stack Elite",
    desc: "Desarrollo con tipado estricto (TS) enfocado en la mantenibilidad eterna del código.",
  },
  {
    icon: Layers,
    title: "Microfrontends",
    desc: "Sistemas desacoplados que permiten un despliegue independiente sin riesgo de fallo.",
  },
];

export function HyperLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070a] pt-0 font-[family-name:var(--font-plus-jakarta)] text-white selection:bg-[#1de0b1] selection:text-black">
      <ParticleField />

      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-700 ${
          scrolled
            ? "border-b border-white/5 bg-[#05070a]/80 py-4 backdrop-blur-2xl"
            : "bg-transparent py-10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
          <a href="#" className="group flex items-center gap-6">
            <LogoQuantum />
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black leading-none tracking-tighter transition-colors group-hover:text-[#1de0b1]">
                MADSJEEZ
              </span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                Hyperlabs
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 lg:flex">
            <a
              href="#sistemas"
              className="transition-all hover:text-[#1de0b1]"
            >
              Sistemas
            </a>
            <a
              href="#protocolos"
              className="transition-all hover:text-[#1de0b1]"
            >
              Protocolos
            </a>
            <a href="#nexo" className="transition-all hover:text-[#1de0b1]">
              Nexo
            </a>
            <a
              href="#nexo"
              className="rounded-full bg-[#1de0b1] px-8 py-3 text-[#05070a] shadow-[0_10px_20px_-5px_rgba(29,224,177,0.4)] transition-all hover:scale-105 hover:bg-white active:scale-95"
            >
              Desplegar
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white lg:hidden"
            onClick={() => setMobileOpen((x) => !x)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-b border-white/10 bg-[#05070a]/95 px-8 py-6 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-4 font-[family-name:var(--font-jetbrains)] text-sm font-bold uppercase tracking-widest text-zinc-300">
              <a href="#sistemas" onClick={() => setMobileOpen(false)}>
                Sistemas
              </a>
              <a href="#protocolos" onClick={() => setMobileOpen(false)}>
                Protocolos
              </a>
              <a href="#nexo" onClick={() => setMobileOpen(false)}>
                Nexo
              </a>
              <a
                href="#nexo"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full bg-[#1de0b1] py-3 text-black"
              >
                Desplegar
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden px-8 pb-32 pt-64">
        <div className="mx-auto grid max-w-7xl items-center gap-24 lg:grid-cols-2">
          <div className="relative z-10 space-y-12 text-left">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#1de0b1]/30 bg-[#1de0b1]/5 px-5 py-2.5 backdrop-blur-xl">
              <Activity className="h-4 w-4 animate-pulse text-[#1de0b1]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#1de0b1]">
                Global Status: Operational
              </span>
            </div>

            <h1 className="hyper-glow text-7xl font-extrabold leading-[0.85] tracking-tighter md:text-[110px]">
              CODEO
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
              >
                NIVEL
              </span>
              <br />
              DIOS.
            </h1>

            <p className="max-w-lg text-xl font-light leading-relaxed text-zinc-400">
              Construimos sistemas que desafían la lógica convencional.
              Escalabilidad infinita, rendimiento atómico y diseño que respira.
            </p>

            <div className="flex flex-col gap-6 pt-6 sm:flex-row">
              <a
                href="#nexo"
                className="group flex items-center justify-center gap-4 rounded-2xl bg-white px-12 py-6 text-sm font-black uppercase tracking-widest text-black transition-all hover:-translate-y-2 hover:bg-[#1de0b1]"
              >
                Iniciar Secuencia
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </a>
              <a
                href="#sistemas"
                className="flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-10 py-6 text-sm font-black uppercase tracking-widest backdrop-blur-md transition-all hover:bg-white/5"
              >
                <Command className="h-5 w-5" /> Explorar Docs
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite] rounded-full border border-[#1de0b1]/10" />
            <div className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-blue-500/5" />

            <div className="hyper-float relative z-10">
              <HyperTerminal />

              <div className="absolute -bottom-10 -right-10 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
                    <ShieldCheck className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      Encrypt Level
                    </div>
                    <div className="font-[family-name:var(--font-jetbrains)] text-lg font-bold tracking-tighter">
                      RSA-4096-AES
                    </div>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-3/4 animate-pulse bg-[#1de0b1]" />
                </div>
              </div>

              <div className="absolute -left-12 -top-12 rotate-[-6deg] rounded-3xl bg-[#1de0b1] p-5 text-left text-black shadow-2xl transition-transform duration-500 group-hover:rotate-0">
                <Zap className="mb-2 h-8 w-8" />
                <div className="text-2xl font-black tracking-tighter">99.9%</div>
                <div className="text-[9px] font-bold uppercase tracking-widest">
                  Uptime Performance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="sistemas"
        className="relative scroll-mt-24 px-8 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 flex flex-col items-end justify-between gap-10 text-left md:flex-row">
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tighter">
                SISTEMAS
                <br />
                CORE.
              </h2>
              <div className="h-1 w-20 bg-[#1de0b1]" />
            </div>
            <p className="max-w-sm font-[family-name:var(--font-jetbrains)] text-sm leading-relaxed tracking-tight text-zinc-500">
              Desglosamos la complejidad técnica en módulos elegantes y de alto
              rendimiento. Nuestra infraestructura es arte funcional.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="hyper-card group/card relative overflow-hidden rounded-[2.5rem] border border-white/5 p-10 text-left"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition-all duration-500 group-hover/card:bg-[#1de0b1] group-hover/card:text-black">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="font-light leading-relaxed text-zinc-500">
                  {item.desc}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#1de0b1] transition-all duration-700 group-hover/card:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="protocolos"
        className="relative overflow-hidden scroll-mt-24 border-y border-white/5 bg-[#0a0c10] py-24"
      >
        <div className="flex gap-12 overflow-hidden whitespace-nowrap py-10 opacity-20 transition-opacity duration-700 hover:opacity-100">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-12 font-[family-name:var(--font-jetbrains)] text-6xl font-black italic tracking-tighter text-white"
            >
              <span>{`IMPORT { QUANTUM } FROM '@MADSJEEZ/CORE';`}</span>
              <span className="text-[#1de0b1]">NEXT_GEN_SYSTEM();</span>
            </div>
          ))}
        </div>
      </section>

      <HyperContact />

      <footer className="relative overflow-hidden px-8 pt-40 pb-20">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-2">
          <div className="space-y-12 text-left">
            <h2 className="text-6xl font-black tracking-tighter">
              ¿ESTÁS LISTO PARA
              <br />
              <span className="text-[#1de0b1]">EL SIGUIENTE NIVEL?</span>
            </h2>
            <div className="flex flex-col items-start gap-12 sm:flex-row sm:items-center">
              <a
                href="#nexo"
                className="rounded-full bg-white px-12 py-6 font-black uppercase tracking-widest text-black transition-all hover:scale-110 hover:bg-[#1de0b1]"
              >
                AGENDAR NEXO
              </a>
              <div className="flex gap-6">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white/10"
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#protocolos"
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white/10"
                  aria-label="Compartir"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 border-l border-white/10 pl-8 text-left md:pl-20">
            <div className="space-y-6">
              <h4 className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#1de0b1]">
                Directorio
              </h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <li>
                  <a href="#sistemas" className="transition-colors hover:text-white">
                    Infraestructura
                  </a>
                </li>
                <li>
                  <a href="#protocolos" className="transition-colors hover:text-white">
                    Laboratorio
                  </a>
                </li>
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Open Source
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#1de0b1]">
                Localidad
              </h4>
              <p className="text-sm font-bold uppercase leading-relaxed tracking-widest text-zinc-500">
                Córdoba, Argentina
                <br />
                Lat: -31.4201
                <br />
                Long: -64.1888
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-40 flex max-w-7xl flex-col items-center justify-between gap-10 border-t border-white/5 pt-10 opacity-30 md:flex-row">
          <div className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.5em]">
            Madsjeez Design Engine © 2026
          </div>
          <div className="flex items-center gap-4 font-[family-name:var(--font-jetbrains)] text-[10px]">
            <span className="text-[#1de0b1]">●</span>
            SYSTEM STATUS: 100% OPERATIONAL
          </div>
        </div>
      </footer>
    </div>
  );
}
