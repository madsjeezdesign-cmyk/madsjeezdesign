"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Gem, Globe, Search, Share2, Sparkles, X } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-veterinaria-premium.css";

const SLUG = "veterinaria" as const;
const BRAND = "Patitas Sanas";

const ATELIER = [
  {
    title: "Marroquinería",
    subtitle: "Pieles exóticas & latón macido",
    imageKey: "a" as const,
  },
  {
    title: "Alta joyería",
    subtitle: "Diamantes & oro certificado",
    imageKey: "b" as const,
  },
  {
    title: "Maison design",
    subtitle: "Mobiliario de autor & confort",
    imageKey: "c" as const,
  },
] as const;

const BOUTIQUE = [
  {
    name: 'Correa "Vendôme" en avestruz',
    description:
      "Cuero de avestruz africano con detalles en oro rosa. Una pieza de declaración para el paseo urbano.",
    price: 1250,
    imageKey: "d" as const,
  },
  {
    name: 'Cofre gastronómico "Royal"',
    description:
      "Selección wagyu y trufa negra, formulada por nutricionistas veterinarios de élite para el paladar más exigente.",
    price: 320,
    imageKey: "e" as const,
  },
  {
    name: 'Sofá "Elysium" ortopédico',
    description:
      "Estructura de ébano y terciopelo italiano anti-manchas. Tecnología de descanso aeroespacial.",
    price: 4800,
    imageKey: "cover" as const,
  },
] as const;

const CONCIERGE = [
  {
    title: "Guardia 24 h",
    desc: "Internación premium con monitoreo continuo y suites climatizadas.",
  },
  {
    title: "Spa & grooming",
    desc: "Baños terapéuticos, ozonoterapia y estilismo de pasarela.",
  },
  {
    title: "Nutrición bespoke",
    desc: "Planes por raza, edad y metabolismo con seguimiento mensual.",
  },
  {
    title: "Transporte VIP",
    desc: "Traslados en vehículo climatizado con handler certificado.",
  },
] as const;

const MEMBERSHIP = [
  "Acceso prioritario a colecciones cápsula",
  "Eventos en Madrid, París y Londres",
  "Concierge global para viajes con mascota",
  "10% en boutique y atelier a medida",
] as const;

function formatUsd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

function useLuxCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const onEnterInteractive = useCallback(() => setHovering(true), []);
  const onLeaveInteractive = useCallback(() => setHovering(false), []);

  return { dotRef, ringRef, hovering, onEnterInteractive, onLeaveInteractive };
}

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".paw-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

export function DemoVeterinariaLanding() {
  const v = getDemoVisuals(SLUG);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  const { dotRef, ringRef, hovering, onEnterInteractive, onLeaveInteractive } = useLuxCursor();

  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [heroMask, setHeroMask] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const imageMap = {
    cover: v.cover,
    a: v.a,
    b: v.b,
    c: v.c,
    d: v.d ?? v.a,
    e: v.e ?? v.b,
  };

  const toggleBooking = useCallback(() => setBookingOpen((o) => !o), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroMask(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  const interactiveProps = {
    onMouseEnter: onEnterInteractive,
    onMouseLeave: onLeaveInteractive,
  };

  return (
    <div
      ref={rootRef}
      className="paw-premium relative min-h-screen overflow-x-hidden bg-[#080808] font-[family-name:var(--font-demo-b-veterinaria)] text-white antialiased selection:bg-[#c5a059]/30"
    >
      <div ref={dotRef} className="paw-cursor-dot hidden md:block" aria-hidden />
      <div
        ref={ringRef}
        className={`paw-cursor-ring hidden md:block ${hovering ? "is-hover" : ""}`}
        aria-hidden
      />

      {/* Header */}
      <header
        className={`fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-6 transition-all duration-500 md:px-10 ${
          headerScrolled ? "bg-black/80 py-4 backdrop-blur-xl" : "md:py-8"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center border border-[#c5a059]/40">
            <Gem className="h-6 w-6 text-[#c5a059]" strokeWidth={1.25} />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-demo-h-veterinaria)] text-xl leading-none tracking-[0.2em] md:text-3xl">
              PATITAS
            </span>
            <span className="mt-1 text-[8px] uppercase tracking-[0.6em] text-[#c5a059]">
              L&apos;excellence absolue
            </span>
          </div>
        </div>

        <nav className="hidden gap-12 text-[10px] font-light tracking-[0.4em] lg:flex xl:gap-16">
          <a href="#atelier" className="transition-colors hover:text-[#c5a059]" {...interactiveProps}>
            ATELIER
          </a>
          <a href="#boutique" className="transition-colors hover:text-[#c5a059]" {...interactiveProps}>
            BOUTIQUE
          </a>
          <a href="#concierge" className="transition-colors hover:text-[#c5a059]" {...interactiveProps}>
            CONCIERGE
          </a>
          <a href="#membership" className="transition-colors hover:text-[#c5a059]" {...interactiveProps}>
            CLUB PRIVÉ
          </a>
        </nav>

        <div className="flex items-center gap-6 md:gap-10">
          <button type="button" className="text-white/60 hover:text-[#c5a059]" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={toggleBooking}
            className="paw-btn-gold hidden rounded-sm px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] sm:block md:px-8 md:py-3"
            {...interactiveProps}
          >
            RESERVAR CITA
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h5 className="mb-8 text-[9px] font-bold uppercase tracking-[0.8em] text-[#c5a059]">
              Establecido en 1992 · Madrid — París — Londres
            </h5>
            <h1 className="mb-12 font-[family-name:var(--font-demo-h-veterinaria)] text-5xl italic leading-[0.85] md:text-7xl lg:text-[7rem]">
              La nobleza <br />
              <span className="paw-gold-gradient not-italic">reimaginada.</span>
            </h1>
            <p className="mb-16 max-w-lg text-lg font-light leading-relaxed text-[#888888] md:text-xl">
              Dedicados a los compañeros más leales de la humanidad, ofreciendo una curaduría donde
              cada detalle es una declaración de amor y estatus.
            </p>
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              <button
                type="button"
                className="paw-btn-outline px-10 py-5 text-xs font-bold tracking-[0.3em]"
                onClick={() =>
                  document.getElementById("atelier")?.scrollIntoView({ behavior: "smooth" })
                }
                {...interactiveProps}
              >
                <span>DESCUBRIR LA MAISON</span>
              </button>
              <div className="flex items-center gap-4 text-xs tracking-widest text-white/40">
                <span className="h-px w-12 bg-white/20" />
                EXPLORAR EL FILM
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[550px]">
              <div
                className={`paw-reveal-mask relative aspect-[4/5] overflow-hidden bg-[#111111] ${heroMask ? "is-active" : ""}`}
              >
                <Image
                  src={imageMap.cover}
                  alt="Mascota de lujo"
                  fill
                  priority
                  className="scale-110 object-cover transition-transform duration-[2000ms] ease-out"
                  style={{ transform: heroMask ? "scale(1)" : "scale(1.25)" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden bg-[#c5a059] p-8 text-black lg:block lg:p-10">
                <p className="font-[family-name:var(--font-demo-h-veterinaria)] text-2xl italic md:text-3xl">
                  Colección 2024
                </p>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em]">L&apos;art de vivre</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-10">
          {[
            { v: "32+", l: "Años de maison" },
            { v: "3", l: "Capitales de moda" },
            { v: "18k", l: "Familias miembro" },
            { v: "24/7", l: "Concierge clínico" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="paw-gold-gradient font-[family-name:var(--font-demo-h-veterinaria)] text-3xl md:text-4xl">
                {s.v}
              </p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier */}
      <section id="atelier" className="overflow-hidden bg-white/[0.02] py-24 text-center md:py-40">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <h5 className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]">
            La artesanía detrás del lujo
          </h5>
          <h2 className="mb-10 font-[family-name:var(--font-demo-h-veterinaria)] text-4xl italic md:text-6xl">
            El atelier de {BRAND}.
          </h2>
          <div className="paw-title-line" />
          <p className="mb-16 text-lg font-light leading-relaxed text-[#888888] md:mb-20 md:text-xl">
            Cada accesorio es el resultado de cientos de horas de trabajo artesanal: cueros de
            curtido vegetal toscano, herrajes de oro de 18 quilates y seda natural. No fabricamos
            productos; creamos herencia.
          </p>
        </div>

        <div className="mt-12 grid gap-1 px-1 md:mt-20 md:grid-cols-3">
          {ATELIER.map((item) => (
            <article key={item.title} className="group relative h-[420px] overflow-hidden md:h-[600px]">
              <Image
                src={imageMap[item.imageKey]}
                alt={item.title}
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                sizes="33vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-8 text-left opacity-80 transition-opacity group-hover:opacity-100 md:p-12">
                <h3 className="font-[family-name:var(--font-demo-h-veterinaria)] text-2xl md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-xs uppercase tracking-widest text-white/50">
                  {item.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Boutique */}
      <section id="boutique" className="py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-20 flex flex-col items-start justify-between gap-10 md:mb-32 md:flex-row md:items-end">
            <div>
              <h2 className="paw-gold-gradient mb-6 font-[family-name:var(--font-demo-h-veterinaria)] text-5xl italic md:text-7xl">
                La boutique.
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#888888]">
                Objetos de deseo inigualables.
              </p>
              {wishlist.length > 0 ? (
                <p className="mt-4 text-[10px] tracking-widest text-[#c5a059]">
                  {wishlist.length} pieza{wishlist.length > 1 ? "s" : ""} en tu lista privada
                </p>
              ) : null}
            </div>
            <Link
              href="#lead-veterinaria"
              className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-[#c5a059] transition-all hover:gap-6"
              {...interactiveProps}
            >
              VER TODO EL CATÁLOGO <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-16">
            {BOUTIQUE.map((item, i) => (
              <article
                key={item.name}
                className="paw-luxe-card paw-scroll-reveal p-6"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="relative mb-10 aspect-[4/5] overflow-hidden bg-[#080808]">
                  <Image
                    src={imageMap[item.imageKey]}
                    alt={item.name}
                    fill
                    className="object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h4 className="mb-4 font-[family-name:var(--font-demo-h-veterinaria)] text-xl md:text-2xl">
                  {item.name}
                </h4>
                <p className="mb-8 text-sm font-light leading-relaxed text-[#888888]">
                  {item.description}
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="font-bold tracking-widest text-[#c5a059]">
                    {formatUsd(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item.name)}
                    className={`text-[9px] font-extrabold tracking-widest transition-colors ${
                      wishlist.includes(item.name) ? "text-[#c5a059]" : "text-white/40 hover:text-white"
                    }`}
                    {...interactiveProps}
                  >
                    {wishlist.includes(item.name) ? "EN LISTA ✓" : "AÑADIR A LA LISTA"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge */}
      <section id="concierge" className="border-y border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 max-w-2xl md:mb-20">
            <h5 className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]">Concierge</h5>
            <h2 className="font-[family-name:var(--font-demo-h-veterinaria)] text-4xl italic md:text-5xl">
              Servicios para la élite canina y felina.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONCIERGE.map((s, i) => (
              <div
                key={s.title}
                className="paw-scroll-reveal border border-white/5 bg-[#111111] p-8"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <Sparkles className="mb-6 h-5 w-5 text-[#c5a059]" />
                <h4 className="mb-3 text-sm font-bold uppercase tracking-widest">{s.title}</h4>
                <p className="text-sm font-light leading-relaxed text-[#888888]">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden md:h-80">
              <Image
                src={imageMap.a}
                alt="Clínica veterinaria premium"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative h-64 overflow-hidden md:h-80">
              <Image
                src={imageMap.b}
                alt="Cuidado personalizado"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Club Privé */}
      <section id="membership" className="py-24 md:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={imageMap.c}
              alt="Club privé mascotas"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="paw-scroll-reveal">
            <h5 className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]">
              Club privé
            </h5>
            <h2 className="mb-10 font-[family-name:var(--font-demo-h-veterinaria)] text-4xl italic leading-tight md:text-6xl">
              Membresía <span className="paw-gold-gradient not-italic">Patitas Elite.</span>
            </h2>
            <ul className="mb-12 space-y-5">
              {MEMBERSHIP.map((perk) => (
                <li key={perk} className="flex items-start gap-4 text-sm font-light text-[#888888]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c5a059]" />
                  {perk}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={toggleBooking}
              className="paw-btn-gold rounded-sm px-10 py-4 text-[10px] font-bold tracking-[0.2em]"
              {...interactiveProps}
            >
              SOLICITAR INVITACIÓN
            </button>
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Contacto boutique & clínica"
        title="Consultá disponibilidad o piezas a medida"
        sub="Coordinamos cita en atelier, envíos globales y servicios de concierge clínico."
      />

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[#050505] pb-16 pt-24 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-24 grid gap-16 lg:grid-cols-2 lg:gap-40 md:mb-40">
            <div>
              <h4 className="paw-gold-gradient mb-10 font-[family-name:var(--font-demo-h-veterinaria)] text-5xl italic leading-tight md:mb-12 md:text-7xl">
                Únase a la <br /> élite de {BRAND}.
              </h4>
              <p className="mb-12 max-w-sm text-lg text-[#888888] md:mb-16">
                Acceso prioritario a colecciones cápsula, eventos exclusivos y servicios de concierge
                global.
              </p>
              <div className="flex flex-col gap-6">
                <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">
                  Inscripción privada
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="SU DIRECCIÓN DE EMAIL"
                    className="w-full border-b border-white/10 bg-transparent py-5 text-xs tracking-widest outline-none transition-colors placeholder:text-white/10 focus:border-[#c5a059]"
                  />
                  <ArrowRight className="absolute right-0 h-5 w-5 text-[#c5a059]" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12 md:gap-20">
              <div>
                <h5 className="mb-8 text-[10px] uppercase tracking-[0.4em] text-[#c5a059]">
                  Explorar
                </h5>
                <ul className="space-y-5 text-xs font-light tracking-[0.2em]">
                  <li>
                    <a href="#atelier" className="transition-colors hover:text-white">
                      NUESTRA HISTORIA
                    </a>
                  </li>
                  <li>
                    <a href="#boutique" className="transition-colors hover:text-white">
                      BOUTIQUE
                    </a>
                  </li>
                  <li>
                    <a href="#concierge" className="transition-colors hover:text-white">
                      SOSTENIBILIDAD
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="mb-8 text-[10px] uppercase tracking-[0.4em] text-[#c5a059]">
                  Servicios VIP
                </h5>
                <ul className="space-y-5 text-xs font-light tracking-[0.2em]">
                  <li>
                    <a href="#concierge" className="transition-colors hover:text-white">
                      CONCIERGE
                    </a>
                  </li>
                  <li>
                    <a href="#membership" className="transition-colors hover:text-white">
                      CLUB PRIVÉ
                    </a>
                  </li>
                  <li>
                    <Link href="#lead-veterinaria" className="transition-colors hover:text-white">
                      GARANTÍA DE VIDA
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row md:pt-16">
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/20">
              © {new Date().getFullYear()} {BRAND.toUpperCase()} INTERNATIONAL · DEMO
            </span>
            <div className="flex items-center gap-10">
              <Share2 className="h-4 w-4 cursor-pointer text-white/20 transition-colors hover:text-[#c5a059]" />
              <Globe className="h-4 w-4 cursor-pointer text-white/20 transition-colors hover:text-[#c5a059]" />
            </div>
          </div>
        </div>
      </footer>

      {/* Modal cita */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${bookingOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!bookingOpen}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={closeBooking}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />
        <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col justify-center overflow-y-auto border-l border-white/5 bg-[#080808] p-10 md:p-14">
          <button
            type="button"
            onClick={closeBooking}
            className="absolute right-6 top-6 text-white/30 hover:text-[#c5a059]"
            aria-label="Cerrar panel"
          >
            <X className="h-8 w-8" />
          </button>
          <h3 className="mb-4 font-[family-name:var(--font-demo-h-veterinaria)] text-4xl italic">
            Reservar <span className="paw-gold-gradient not-italic">cita</span>
          </h3>
          <p className="mb-10 text-sm text-[#888888]">
            Atelier, consulta clínica o visita boutique — confirmamos en menos de 2 horas hábiles.
          </p>
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              closeBooking();
              document.getElementById("lead-veterinaria")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="border-b border-white/10 pb-4 focus-within:border-[#c5a059]">
              <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.4em] text-[#c5a059]">
                Nombre y mascota
              </label>
              <input
                type="text"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Ej. María — Luna (Golden)"
              />
            </div>
            <div className="border-b border-white/10 pb-4 focus-within:border-[#c5a059]">
              <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.4em] text-[#c5a059]">
                Motivo
              </label>
              <select className="w-full bg-transparent text-sm outline-none">
                <option className="bg-black">Consulta clínica</option>
                <option className="bg-black">Spa & grooming</option>
                <option className="bg-black">Pieza a medida atelier</option>
                <option className="bg-black">Club privé</option>
              </select>
            </div>
            <button
              type="submit"
              className="paw-btn-gold w-full rounded-sm py-5 text-[10px] font-bold tracking-[0.2em]"
            >
              CONFIRMAR SOLICITUD
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export { DemoVeterinariaLanding as DemoVeterinaria };
