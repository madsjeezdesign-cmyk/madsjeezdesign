"use client";

import Image from "next/image";
import { ArrowRight, Infinity, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getRetailFashionConfig,
  whatsappUrl,
} from "@/lib/retail-fashion-demos";
import { DemoLeadForm } from "../demo-lead-form";
import "./demo-retail-fashion-premium.css";

type Props = { slug: string };

function IgIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BrandMark({ monogram, className }: { monogram: string; className?: string }) {
  if (monogram === "∞") {
    return <Infinity size={36} strokeWidth={1} className={className} aria-hidden />;
  }
  return (
    <span className={`font-serif text-2xl font-light tracking-widest ${className ?? ""}`}>
      {monogram}
    </span>
  );
}

export function RetailFashionLanding({ slug }: Props) {
  const config = getRetailFashionConfig(slug);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rf-visible");
        });
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    const root = rootRef.current;
    const hiddenElements = root?.querySelectorAll(".rf-reveal") ?? [];
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  if (!config) return null;

  const wa = whatsappUrl(config);
  const navMuted = isScrolled ? "text-black" : "text-white";
  const navItems = ["La Maison", "Collections", "Boutique"];

  return (
    <div
      ref={rootRef}
      className="rf-fashion-demo min-h-screen scroll-smooth overflow-x-hidden bg-white font-sans text-black selection:bg-black selection:text-white"
    >
      <nav
        className={`fixed z-50 w-full transition-all duration-700 ease-in-out ${
          isScrolled
            ? "bg-white/90 py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] backdrop-blur-xl"
            : "bg-transparent py-8"
        }`}
      >
        <div className="mx-auto max-w-[90%]">
          <div className="flex items-center justify-between">
            <div className={`hidden w-1/3 space-x-10 md:flex ${navMuted}`}>
              {navItems.slice(0, 2).map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="group relative text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 ease-out group-hover:w-full" />
                </a>
              ))}
            </div>

            <div
              className={`flex w-1/3 items-center justify-center gap-4 transition-colors duration-700 ${navMuted}`}
            >
              <BrandMark monogram={config.monogram} className="hidden md:block" />
              <span className="font-serif text-2xl font-light uppercase tracking-[0.3em] md:text-3xl">
                {config.brand}
              </span>
            </div>

            <div className={`hidden w-1/3 items-center justify-end space-x-10 md:flex ${navMuted}`}>
              <a
                href="#boutique"
                className="group relative text-[11px] font-medium uppercase tracking-[0.2em]"
              >
                Boutique
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 ease-out group-hover:w-full" />
              </a>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <IgIcon className="h-5 w-5" />
              </a>
            </div>

            <div className="flex w-1/3 justify-end md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen((o) => !o)}
                className={`transition-colors duration-500 ${navMuted}`}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute left-0 top-full w-full overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden ${
            isMenuOpen ? "max-h-screen border-t border-black/10 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center space-y-8 px-6 py-12 text-center">
            {[...navItems, "Instagram"].map((item) => (
              <a
                key={item}
                href={item === "Instagram" ? config.instagramUrl : `#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block font-serif text-xl uppercase tracking-[0.1em] text-black transition-colors hover:text-gray-500"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="inicio"
        className="relative flex h-screen items-center justify-center overflow-hidden bg-black"
      >
        <div
          className="absolute inset-0 -top-[10%] h-[120%] w-full"
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
        >
          <div className="absolute inset-0 z-10 bg-black/30" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          <Image
            src={config.heroImage}
            alt={`Editorial ${config.brand}`}
            fill
            priority
            className="object-cover object-center opacity-90"
            sizes="100vw"
          />
        </div>

        <div className="relative z-20 mx-auto mt-20 max-w-5xl px-4 text-center">
          <div className="mb-6 overflow-hidden">
            <p className="rf-animate-slide-up translate-y-full text-xs font-medium uppercase tracking-[0.4em] text-white/80">
              {config.heroKicker}
            </p>
          </div>
          <div className="overflow-hidden">
            <h1 className="rf-animate-slide-up-delay translate-y-full font-serif text-6xl leading-[0.85] tracking-tighter text-white md:text-8xl lg:text-[10rem]">
              {config.heroTitle} <br />
              <span className="pr-4 font-light italic text-white/90">{config.heroHighlight}</span>
            </h1>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white/60">
          <span className="mb-4 text-[9px] uppercase tracking-[0.3em]">Découvrir</span>
          <div className="h-16 w-px overflow-hidden bg-white/30">
            <div className="rf-scroll-line-inner h-full w-full bg-white" />
          </div>
        </div>
      </section>

      <div className="flex overflow-hidden whitespace-nowrap border-b border-white/10 bg-black py-6 text-white">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="rf-marquee-track flex shrink-0 items-center text-xs font-light uppercase tracking-[0.3em]"
            aria-hidden={dup === 1}
          >
            {config.marqueeItems.map((label) => (
              <span key={`${dup}-${label}`} className="mx-12 inline-flex items-center gap-3">
                {label}
                {config.monogram === "∞" ? <Infinity size={16} strokeWidth={1} aria-hidden /> : null}
              </span>
            ))}
          </div>
        ))}
      </div>

      <section id="collections" className="bg-white py-32">
        <div className="mx-auto max-w-[90%]">
          <div className="rf-reveal mb-24 flex flex-col items-center text-center">
            <BrandMark monogram={config.monogram} className="mb-6 text-black" />
            <h2 className="mb-6 font-serif text-5xl tracking-tighter text-black md:text-7xl">
              {config.collectionTitle}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
              {config.collectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {config.products.map((producto, index) => (
              <a
                key={producto.id}
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rf-reveal group relative cursor-pointer"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={producto.image}
                    alt={producto.name}
                    fill
                    className="object-cover object-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <div className="absolute bottom-0 left-0 w-full translate-y-4 p-6 text-center opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="mb-1 font-serif text-lg italic tracking-wide text-white drop-shadow-md">
                    {producto.name}
                  </h3>
                  <span className="border-b border-white pb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                    {producto.price} · WhatsApp
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="instagram" className="bg-[#fafafa] py-32">
        <div className="mx-auto max-w-[90%]">
          <div className="rf-reveal mb-16 flex flex-col items-end justify-between md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-4 font-serif text-4xl leading-tight tracking-tighter text-black md:text-5xl">
                Vu sur <br />
                <span className="italic">Instagram</span>
              </h2>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-black"
              >
                @{config.instagramHandle} <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {config.instagramFeed.map((img, index) => (
              <a
                key={img}
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="rf-reveal group relative block aspect-square overflow-hidden"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Image
                  src={img}
                  alt="Look Instagram"
                  fill
                  className="object-cover grayscale-[20%] transition-all duration-1000 ease-out group-hover:grayscale-0"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 hover:opacity-100">
                  <IgIcon className="h-8 w-8 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="boutique" className="bg-black text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="rf-reveal flex flex-col justify-center p-16 md:p-24 lg:p-32">
            <BrandMark monogram={config.monogram} className="mb-12 text-white/50" />
            <h2 className="mb-16 font-serif text-5xl tracking-tighter md:text-6xl">La Boutique</h2>

            <div className="space-y-12">
              <div className="group">
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Adresse
                </h4>
                <p className="flex items-start gap-4 text-lg font-light tracking-wide">
                  <MapPin size={20} strokeWidth={1} className="mt-1 opacity-50 transition-opacity group-hover:opacity-100" />
                  <span>
                    {config.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
              </div>

              <div className="group">
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Contact
                </h4>
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-lg font-light tracking-wide transition-colors hover:text-gray-300"
                >
                  <IgIcon className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100" />
                  @{config.instagramHandle}
                </a>
              </div>
            </div>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-16 inline-block border border-white px-10 py-5 text-center text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
            >
              Prendre Rendez-vous (Cita)
            </a>
          </div>

          <div className="relative min-h-[500px] grayscale contrast-125 opacity-80 transition-all duration-[2s] hover:opacity-100 hover:grayscale-0 lg:min-h-full">
            <iframe
              src={config.mapsEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación ${config.brand}`}
            />
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={slug}
        brandLabel={config.brand}
        kicker="Consultá esta demo"
        title="¿Te gusta este modelo para tu tienda?"
        sub="Dejanos tu consulta: adaptamos marca, fotos, Instagram y WhatsApp de tu comercio."
        theme={{
          section: "bg-white text-black",
          invert: true,
          label: "text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500",
          input:
            "mt-2 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-sm text-black outline-none",
          focus: "focus:border-black",
          card: "border border-black/10 bg-[#fafafa] p-8 md:p-10",
          button: "bg-black px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white hover:bg-zinc-800",
        }}
      />

      <footer className="border-t border-black/5 bg-white py-16">
        <div className="mx-auto flex max-w-[90%] flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <BrandMark monogram={config.monogram} />
            <span className="font-serif text-xl uppercase tracking-[0.2em]">{config.brand}</span>
          </div>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
            <span>Mentions Légales</span>
            <span>Confidentialité</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
            &copy; 2026 {config.footerLocation}
          </div>
        </div>
      </footer>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-8 right-8 z-50 flex items-center gap-4"
      >
        <span className="-translate-x-4 border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          Service Client
        </span>
        <div className="bg-black p-4 text-white shadow-2xl transition-transform duration-500 hover:scale-110">
          <MessageCircle size={24} strokeWidth={1} />
        </div>
      </a>
    </div>
  );
}
