"use client";

import { ArrowRight, Infinity, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { whatsappGeneralUrl } from "@/lib/fashion-whatsapp";
import { getRetailFashionConfig } from "@/lib/retail-fashion-demos";
import { DemoLeadForm } from "../demo-lead-form";
import { FashionHeroVideo } from "./fashion-hero-video";
import { FashionPhoto } from "./fashion-photo";
import { FashionInstagramGallery } from "./fashion-instagram-gallery";
import { FashionShop } from "./fashion-shop";
import { InfinitaFashionMarketing } from "./infinita-fashion-marketing";
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
    <span className={`font-serif text-2xl font-light tracking-[0.04em] ${className ?? ""}`}>
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

  const wa = whatsappGeneralUrl(config);
  const navMuted = isScrolled ? "text-black" : "text-white";
  const isInfinita = slug === "moda-infinita";
  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Colección", href: isInfinita ? "#coleccion" : "#collections" },
    { label: "Tienda", href: "#shop" },
    { label: "Instagram", href: "#instagram" },
    { label: "Boutique", href: "#boutique" },
  ];

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
              {navItems.slice(0, 3).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative text-[11px] font-medium uppercase tracking-[0.04em] transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 ease-out group-hover:w-full" />
                </a>
              ))}
            </div>

            <div
              className={`flex w-1/3 items-center justify-center gap-4 transition-colors duration-700 ${navMuted}`}
            >
              <BrandMark monogram={config.monogram} className="hidden md:block" />
              <span className="font-serif text-2xl font-light uppercase tracking-[0.04em] md:text-3xl">
                {config.brand}
              </span>
            </div>

            <div className={`hidden w-1/3 items-center justify-end space-x-10 md:flex ${navMuted}`}>
              <a
                href="#boutique"
                className="group relative text-[11px] font-medium uppercase tracking-[0.04em]"
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
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-serif text-xl uppercase tracking-[0.1em] text-black transition-colors hover:text-gray-500"
              >
                {item.label}
              </a>
            ))}
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block font-serif text-xl uppercase tracking-[0.1em] text-black"
            >
              Instagram
            </a>
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
          <div className="absolute inset-0 z-10 bg-black/45" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/25 to-black/85" />
          {config.heroVideo ? (
            <FashionHeroVideo
              src={config.heroVideo}
              poster={config.heroImage}
              className="opacity-90"
            />
          ) : (
            <FashionPhoto
              src={config.heroImage}
              alt={`Editorial ${config.brand}`}
              fill
              priority
              className="object-cover object-center opacity-90"
              sizes="100vw"
            />
          )}
        </div>

        <div className="relative z-20 mx-auto mt-16 max-w-[95vw] px-4 text-center">
          <p className="rf-hero-kicker mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-white md:text-base">
            {config.heroKicker}
          </p>
          <h1
            className="rf-hero-title font-serif font-normal leading-[0.88] tracking-tighter text-white"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 18rem)",
              textShadow:
                "0 4px 40px rgba(0,0,0,0.85), 0 2px 12px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)",
            }}
          >
            {config.heroTitle} <br />
            <span className="pr-2 font-light italic text-white">{config.heroHighlight}</span>
          </h1>
          <div className="rf-hero-kicker mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.04em] text-black transition-transform hover:scale-[1.02]"
            >
              Comprar ahora <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={isInfinita ? "#coleccion" : "#collections"}
              className="inline-flex items-center gap-2 border border-white/80 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Ver colección
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white/60">
          <span className="mb-4 text-[9px] uppercase tracking-[0.04em]">Découvrir</span>
          <div className="h-16 w-px overflow-hidden bg-white/30">
            <div className="rf-scroll-line-inner h-full w-full bg-white" />
          </div>
        </div>
      </section>

      <div className="flex overflow-hidden whitespace-nowrap border-b border-white/10 bg-black py-6 text-white">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="rf-marquee-track flex shrink-0 items-center text-xs font-light uppercase tracking-[0.04em]"
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

      {isInfinita ? (
        <InfinitaFashionMarketing config={config} />
      ) : (
        <section id="collections" className="bg-white py-32">
          <div className="mx-auto max-w-[90%]">
            <div className="rf-reveal flex flex-col items-center text-center">
              <BrandMark monogram={config.monogram} className="mb-6 text-black" />
              <h2 className="mb-6 font-serif text-5xl tracking-tighter text-black md:text-7xl">
                {config.collectionTitle}
              </h2>
              <p className="max-w-xl text-sm font-light text-gray-600">{config.collectionSubtitle}</p>
            </div>
          </div>
        </section>
      )}

      <FashionShop config={config} />
      <FashionInstagramGallery config={config} />

      <section id="boutique" className="bg-black text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="rf-reveal flex flex-col justify-center p-16 md:p-24 lg:p-32">
            <BrandMark monogram={config.monogram} className="mb-12 text-white/50" />
            <h2 className="mb-16 font-serif text-5xl tracking-tighter md:text-6xl">La Boutique</h2>

            <div className="space-y-12">
              <div className="group">
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.04em] text-white/50">
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
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.04em] text-white/50">
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

            <div className="mt-16 flex flex-col gap-3 sm:flex-row">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#25D366] bg-[#25D366] px-10 py-5 text-center text-[11px] font-bold uppercase tracking-[0.04em] text-white transition-opacity hover:opacity-90"
              >
                WhatsApp · Comprar
              </a>
              <a
                href="#shop"
                className="inline-block border border-white px-10 py-5 text-center text-[11px] font-bold uppercase tracking-[0.04em] transition-colors hover:bg-white hover:text-black"
              >
                Ver tienda
              </a>
            </div>
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
          label: "text-[10px] font-bold uppercase tracking-[0.04em] text-gray-500",
          input:
            "mt-2 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-sm text-black outline-none",
          focus: "focus:border-black",
          card: "border border-black/10 bg-[#fafafa] p-8 md:p-10",
          button: "bg-black px-6 py-3 text-[11px] uppercase tracking-[0.04em] text-white hover:bg-zinc-800",
        }}
      />

      <footer className="border-t border-black/5 bg-white py-16">
        <div className="mx-auto flex max-w-[90%] flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <BrandMark monogram={config.monogram} />
            <span className="font-serif text-xl uppercase tracking-[0.04em]">{config.brand}</span>
          </div>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.04em] text-gray-400">
            <span>Mentions Légales</span>
            <span>Confidentialité</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-gray-400">
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
        <span className="-translate-x-4 border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.04em] text-black opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          Service Client
        </span>
        <div className="bg-[#25D366] p-4 text-white shadow-2xl transition-transform duration-500 hover:scale-110">
          <MessageCircle size={24} strokeWidth={1} />
        </div>
      </a>
    </div>
  );
}
