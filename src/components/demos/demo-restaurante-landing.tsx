"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Flame, Globe, Quote, Share2, Sparkles, Users, Wine, X } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-restaurante-premium.css";

const SLUG = "restaurante" as const;
const BRAND = "La Mesa Norteña";

const MENU = [
  {
    name: "Pulpo al hierro",
    price: 18500,
    description:
      "Con crema de papas ahumadas, pimentón de la Vera y aceite de cenizas.",
  },
  {
    name: "Risotto de hongos silvestres",
    price: 14200,
    description:
      "Arroz Carnaroli, mix de hongos de pino, trufa negra y parmesano 24 meses.",
  },
  {
    name: "Ojo de bife 60 días",
    price: 22000,
    description:
      "Madurado en seco, con vegetales de nuestra huerta orgánica y sal marina.",
  },
  {
    name: "Texturas de chocolate",
    price: 8900,
    description:
      "70% cacao, mousse aireada, tierra de chocolate amargo y frutos rojos.",
  },
] as const;

const EXPERIENCE = [
  {
    icon: Flame,
    title: "Cocina de estación",
    text: "Fuego vivo, producto de estación y técnicas de maduración controlada.",
  },
  {
    icon: Users,
    title: "Salón íntimo",
    text: "40 cubiertos, mesas espaciadas y servicio que respeta el ritmo de la cena.",
  },
  {
    icon: Sparkles,
    title: "Maridaje guiado",
    text: "Sommelier en sala con más de 300 etiquetas boutique y clásicos argentinos.",
  },
] as const;

function formatPrice(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

export function DemoRestauranteLanding() {
  const v = getDemoVisuals(SLUG);
  const [resOpen, setResOpen] = useState(false);
  const menuImgRef = useRef<HTMLDivElement>(null);

  const toggleRes = useCallback(() => setResOpen((o) => !o), []);
  const closeRes = useCallback(() => setResOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      const el = menuImgRef.current?.querySelector("img");
      if (!el) return;
      const scroll = window.scrollY;
      el.style.transform = `scale(${1 + scroll / 10000}) translateY(${scroll / 50}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = resOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [resOpen]);

  return (
    <div className="lumina-premium relative min-h-screen overflow-x-hidden bg-[#080808] font-[family-name:var(--font-demo-b-restaurante)] text-neutral-200 antialiased selection:bg-[#c29d5f]/30">
      <div className="lumina-spotlight top-[-10%] left-[-10%]" aria-hidden />
      <div className="lumina-spotlight bottom-[-10%] right-[-10%]" aria-hidden />

      {/* Nav */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-black/50 px-6 py-5 backdrop-blur-md md:px-8 md:py-6">
        <div className="flex items-center gap-8 md:gap-12">
          <h1 className="font-[family-name:var(--font-demo-h-restaurante)] text-xl tracking-tighter text-white md:text-2xl lg:text-3xl">
            La Mesa <span className="text-[#c29d5f]">Norteña</span>
          </h1>
          <div className="hidden gap-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 md:flex">
            <a href="#menu" className="transition-colors hover:text-[#c29d5f]">
              La carta
            </a>
            <a href="#experiencia" className="transition-colors hover:text-[#c29d5f]">
              Experiencia
            </a>
            <a href="#cava" className="transition-colors hover:text-[#c29d5f]">
              Cava
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleRes}
          className="lumina-btn-signature px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] md:px-8 md:py-3"
        >
          Reservar mesa
        </button>
      </nav>

      {/* Hero */}
      <section className="relative flex h-screen items-center justify-center px-6 md:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-black/70" />
          <Image
            src={v.cover}
            alt="Ambiente del restaurante"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-5xl text-center">
          <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.6em] text-[#c29d5f]">
            Cocina de estación &amp; fuego
          </span>
          <h2 className="mb-12 font-[family-name:var(--font-demo-h-restaurante)] text-5xl italic leading-[0.9] text-white md:text-7xl lg:text-[7.5rem]">
            El arte de lo <br />
            <span className="text-white/40">esencial.</span>
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-[#c29d5f]/30 md:w-20" />
            <p className="text-sm font-light italic text-white/60">
              Ubicados en el corazón de Palermo · demo
            </p>
            <div className="h-px w-12 bg-[#c29d5f]/30 md:w-20" />
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section id="experiencia" className="relative z-10 border-b border-white/5 bg-[#0a0a0a] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {EXPERIENCE.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="border border-white/5 bg-[#121212] p-8 transition-colors hover:border-[#c29d5f]/30"
            >
              <Icon className="mb-6 h-8 w-8 text-[#c29d5f]" strokeWidth={1.25} />
              <h4 className="mb-3 font-[family-name:var(--font-demo-h-restaurante)] text-xl text-white">
                {title}
              </h4>
              <p className="text-sm font-light leading-relaxed text-white/40">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menú */}
      <section id="menu" className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-32">
          <div>
            <h3 className="mb-16 font-[family-name:var(--font-demo-h-restaurante)] text-4xl italic text-white md:text-5xl">
              La carta <span className="text-[#c29d5f]">.</span>
            </h3>
            <div className="space-y-12">
              {MENU.map((item) => (
                <article key={item.name} className="lumina-menu-item group pb-8">
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <h4 className="font-[family-name:var(--font-demo-h-restaurante)] text-xl transition-colors group-hover:text-[#c29d5f] md:text-2xl">
                      {item.name}
                    </h4>
                    <span className="shrink-0 font-light text-[#c29d5f]">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-white/40">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
            <Link
              href="#lead-restaurante"
              className="mt-16 inline-block border-b border-[#c29d5f]/20 pb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#c29d5f] transition-all hover:border-[#c29d5f]"
            >
              Ver menú completo
            </Link>
          </div>

          <div className="relative">
            <div ref={menuImgRef} className="lumina-image-reveal sticky top-32">
              <div className="relative h-[480px] w-full md:h-[700px]">
                <Image
                  src={v.c}
                  alt="Plato gourmet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 border-[12px] border-black/10 md:border-[20px]" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden bg-[#c29d5f] p-8 xl:block xl:p-12">
              <Quote className="mb-4 h-8 w-8 text-black" />
              <p className="max-w-xs font-[family-name:var(--font-demo-h-restaurante)] text-lg italic leading-tight text-black md:text-xl">
                &ldquo;La cocina es un lenguaje mediante el cual se puede expresar armonía.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cava */}
      <section
        id="cava"
        className="relative z-10 border-y border-white/5 bg-[#050505] py-24 md:py-40"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:gap-20 md:px-8 lg:grid-cols-12">
          <div className="relative order-2 h-[420px] lg:order-1 lg:col-span-5 lg:h-[600px]">
            <Image
              src={v.b}
              alt="Cava de vinos"
              fill
              className="rounded-sm object-cover grayscale transition-all duration-1000 hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.5em] text-[#c29d5f]">
              Nuestra cava
            </span>
            <h3 className="mb-10 font-[family-name:var(--font-demo-h-restaurante)] text-4xl italic text-white md:text-6xl">
              Vinos con <br /> alma.
            </h3>
            <p className="mb-12 text-base font-light leading-relaxed text-white/40 md:text-lg">
              Contamos con una selección de más de 300 etiquetas de bodegas boutique y grandes
              clásicos argentinos. Nuestro sommelier lo guiará en un maridaje perfecto para cada
              paso de su cena.
            </p>
            <div className="grid grid-cols-2 gap-8 md:gap-10">
              <div>
                <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                  Malbec selection
                </h5>
                <p className="text-xs text-white/30">
                  Las mejores expresiones del Valle de Uco.
                </p>
              </div>
              <div>
                <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                  Blancos de altura
                </h5>
                <p className="text-xs text-white/30">
                  Frescura y mineralidad del norte argentino.
                </p>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-3 text-[#c29d5f]">
              <Wine className="h-5 w-5" strokeWidth={1.25} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Cata guiada cada 15 días
              </span>
            </div>
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Reservas y eventos"
        title="Reservá tu mesa o consultá disponibilidad"
        sub="Mismo flujo de contacto del sitio: confirmamos cupo, alergias y opción de maridaje."
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3 md:gap-20">
          <div>
            <h4 className="mb-8 font-[family-name:var(--font-demo-h-restaurante)] text-2xl text-white">
              {BRAND}
            </h4>
            <p className="text-sm font-light leading-relaxed text-white/30">
              Una experiencia sensorial donde el producto es el protagonista. Cocina honesta,
              ambiente íntimo.
            </p>
          </div>
          <div>
            <h5 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#c29d5f]">
              Contacto
            </h5>
            <ul className="space-y-4 text-sm font-light text-white/50">
              <li>Palermo, CABA · demo</li>
              <li>+54 11 4822 9900</li>
              <li>reservas@lamesanortena.demo</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#c29d5f]">
              Horarios
            </h5>
            <ul className="space-y-4 text-sm font-light text-white/50">
              <li>Martes a sábado</li>
              <li>20:00 — 00:30</li>
              <li>Domingo y lunes: cerrado</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:mt-32 md:flex-row">
          <span className="text-[9px] uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} {BRAND} · demo MadsJeez
          </span>
          <div className="flex gap-6">
            <Share2 className="h-4 w-4 cursor-pointer text-white/20 transition-colors hover:text-[#c29d5f]" />
            <Globe className="h-4 w-4 cursor-pointer text-white/20 transition-colors hover:text-[#c29d5f]" />
          </div>
        </div>
      </footer>

      {/* Overlay reservas */}
      <button
        type="button"
        aria-label="Cerrar reservas"
        onClick={closeRes}
        className={`fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${
          resOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel reservas */}
      <aside
        className={`lumina-res-panel fixed bottom-0 left-0 z-[150] w-full p-8 md:p-24 ${
          resOpen ? "is-open" : ""
        }`}
        aria-hidden={!resOpen}
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center justify-between md:mb-16">
            <h2 className="font-[family-name:var(--font-demo-h-restaurante)] text-3xl italic text-white md:text-5xl">
              Reservá tu experiencia
            </h2>
            <button
              type="button"
              onClick={closeRes}
              className="text-white/20 transition-colors hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <form
            className="grid gap-10 md:grid-cols-2 md:gap-12"
            onSubmit={(e) => {
              e.preventDefault();
              closeRes();
              document.getElementById("lead-restaurante")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-[#c29d5f]">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full bg-transparent font-light text-white outline-none"
                />
              </div>
              <div className="border-b border-white/10 pb-4">
                <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-[#c29d5f]">
                  Comensales
                </label>
                <select className="w-full bg-transparent font-light text-white outline-none">
                  <option className="bg-black">2 personas</option>
                  <option className="bg-black">4 personas</option>
                  <option className="bg-black">6 personas</option>
                </select>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-[#c29d5f]">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre..."
                  className="w-full bg-transparent font-light text-white outline-none placeholder:text-white/10"
                />
              </div>
              <button
                type="submit"
                className="lumina-btn-signature mt-4 w-full py-6 text-[10px] font-black uppercase tracking-[0.4em]"
              >
                Confirmar disponibilidad
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-[9px] uppercase tracking-widest text-white/20 md:mt-12">
            Las reservas se mantienen por 15 minutos de tolerancia.
          </p>
        </div>
      </aside>
    </div>
  );
}

export { DemoRestauranteLanding as DemoRestaurante };
