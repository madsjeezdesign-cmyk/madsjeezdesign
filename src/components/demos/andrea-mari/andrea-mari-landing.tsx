"use client";

import Image from "next/image";
import { Montserrat, Playfair_Display } from "next/font/google";
import {
  Flame,
  Menu,
  MessageCircle,
  Ruler,
  Search,
  ShoppingBag,
  Star,
  Truck,
  User,
  X,
} from "lucide-react";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ANDREA_MARI_CONFIG,
  ANDREA_MARI_INSTAGRAM,
  andreaWhatsAppLink,
} from "@/lib/andrea-mari";
import { DemoLeadForm } from "../demo-lead-form";
import { AndreaMariShop } from "./andrea-mari-shop";
import "./andrea-mari.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-am-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-am-sans",
  display: "swap",
});

const pillars = [
  {
    icon: Ruler,
    title: "Curva completa",
    desc: "No escondas tus curvas, vístelas. Especialistas en talles grandes con calces perfectos.",
  },
  {
    icon: Truck,
    title: "Envíos rápidos",
    desc: "Llevamos moda, color y estilo a la puerta de tu casa, estés donde estés en el país.",
  },
  {
    icon: Star,
    title: "Diseños únicos",
    desc: "Olvidate de la ropa aburrida. Tendencias actuales en telas de alta calidad.",
  },
];

export function AndreaMariLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const cfg = ANDREA_MARI_CONFIG;
  const wa = andreaWhatsAppLink(cfg.whatsappMessage);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const header = headerRef.current;
      if (!header) return;
      if (window.scrollY > 50) header.classList.add("am-nav-scrolled");
      else header.classList.remove("am-nav-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("am-visible");
        });
      },
      { threshold: 0.08, rootMargin: "-40px" },
    );
    rootRef.current?.querySelectorAll(".am-reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const nav = [
    { label: "Inicio", href: "#inicio" },
    { label: "Colección", href: "#nueva-coleccion" },
    { label: "Categorías", href: "#categorias" },
    { label: "Nosotros", href: "#sobre-nosotros" },
  ];

  return (
    <div
      ref={rootRef}
      className={`am-demo ${playfair.variable} ${montserrat.variable} min-h-screen scroll-smooth bg-white antialiased selection:bg-[var(--am-primary)] selection:text-white`}
    >
      <div className="bg-gradient-to-r from-[var(--am-primary)] via-[var(--am-accent)] to-[var(--am-primary)] py-2.5 text-center text-xs font-bold uppercase tracking-widest text-white md:text-sm">
        🔥 Envíos a todo el país · Celebramos tus curvas con estilo 🔥
      </div>

      <header
        ref={headerRef}
        className="fixed z-50 w-full bg-transparent py-2 transition-all duration-500"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between rounded-full border border-white/50 bg-white/95 px-6 shadow-md backdrop-blur-md md:px-10 am-shadow-card">
            <button
              type="button"
              className="text-[var(--am-dark)] lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Menú"
            >
              <Menu className="h-7 w-7" />
            </button>

            <a
              href="#inicio"
              className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center leading-none lg:static lg:translate-x-0 lg:flex-row lg:gap-2"
            >
              <span className="font-serif text-xl font-black tracking-tighter text-[var(--am-dark)] md:text-2xl">
                {cfg.brandLine1}
              </span>
              <span className="font-serif text-lg italic text-[var(--am-primary)] md:text-xl">
                {cfg.brandLine2}
              </span>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--am-dark)] transition-colors hover:text-[var(--am-primary)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <motion.div className="flex items-center gap-4 lg:gap-5">
              <button type="button" className="hidden text-[var(--am-dark)] md:block" aria-label="Buscar">
                <Search className="h-5 w-5" />
              </button>
              <button type="button" className="hidden text-[var(--am-dark)] md:block" aria-label="Cuenta">
                <User className="h-5 w-5" />
              </button>
              <a
                href={cfg.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden text-[var(--am-dark)] hover:text-[var(--am-primary)] lg:block"
                aria-label="Instagram"
              >
                <IgIcon className="h-5 w-5" />
              </a>
              <a href="#nueva-coleccion" className="text-[var(--am-dark)]" aria-label="Carrito">
                <ShoppingBag className="h-6 w-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      <motion.div
        className={`fixed inset-0 z-40 bg-[var(--am-dark)] transition-transform duration-500 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          className="absolute right-8 top-8 text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar"
        >
          <X className="h-8 w-8" />
        </button>
        <nav className="flex flex-col gap-6 px-8 pt-28">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl font-bold text-white hover:text-[var(--am-primary)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-white"
          >
            <MessageCircle className="h-6 w-6 text-green-400" /> WhatsApp
          </a>
        </nav>
      </motion.div>

      <section
        id="inicio"
        className="relative flex min-h-[90vh] items-center overflow-hidden md:min-h-screen"
      >
        <Image
          src={cfg.heroImage}
          alt="Moda vibrante Showroom Andrea Mari"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="am-hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block -rotate-2 rounded-full bg-[var(--am-secondary)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--am-dark)] shadow-lg">
              Moda sin límite de edad
            </span>
            <h1 className="font-serif text-5xl font-black leading-[1.1] text-white drop-shadow-xl md:text-7xl lg:text-8xl">
              Tu cuerpo, <br />
              <span className="font-normal italic text-[var(--am-primary)]">tus reglas.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium text-gray-100 drop-shadow-md md:text-2xl">
              Colores vivos, diseños espectaculares y la curva completa de talles que te merecés.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#nueva-coleccion"
                className="rounded-full bg-[var(--am-primary)] px-10 py-4 text-center text-sm font-bold uppercase tracking-widest text-white am-shadow-glow transition-transform hover:-translate-y-1 hover:scale-105 hover:bg-[var(--am-accent)]"
              >
                Ver nueva colección
              </a>
              <a
                href={cfg.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/20 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[var(--am-dark)]"
              >
                <IgIcon className="h-5 w-5" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y-4 border-[var(--am-primary)] bg-[var(--am-dark)] py-4 text-white">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="am-marquee-track inline-flex whitespace-nowrap font-serif text-2xl italic tracking-wide md:text-3xl"
            aria-hidden={dup === 1}
          >
            {cfg.marqueeItems.map((label) => (
              <span key={`${dup}-${label}`} className="mx-8 inline-flex items-center gap-3">
                <span className="text-[var(--am-secondary)]">✦</span> {label}
              </span>
            ))}
          </div>
        ))}
      </div>

      <section ref={pillarsRef} className="relative overflow-hidden bg-[var(--am-soft)] py-16">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--am-primary)]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="rounded-3xl bg-white p-8 am-shadow-card transition-transform hover:-translate-y-2"
              >
                <div
                  className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow-lg ${
                    i === 0
                      ? "bg-gradient-to-tr from-[var(--am-primary)] to-[var(--am-accent)] am-shadow-glow"
                      : i === 1
                        ? "bg-gradient-to-tr from-[var(--am-secondary)] to-yellow-400 text-[var(--am-dark)]"
                        : "bg-gradient-to-tr from-[var(--am-dark)] to-blue-800"
                  }`}
                >
                  <p.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-center font-serif text-2xl font-black text-[var(--am-dark)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-center text-sm font-medium leading-relaxed text-gray-600">
                  {p.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AndreaMariShop onToast={showToast} />

      <section id="categorias" className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <a
              href="#nueva-coleccion"
              className="group relative h-[500px] overflow-hidden rounded-3xl"
            >
              <Image
                src={cfg.categoryColores}
                alt="Colores vivos"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--am-dark)]/90 via-[var(--am-dark)]/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 w-max rounded-full bg-[var(--am-primary)] px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  Temporada
                </span>
                <h3 className="font-serif text-4xl font-black">Colores vivos</h3>
                <p className="mt-2 max-w-sm font-medium text-gray-200">
                  Blusas y remeras que iluminan tu rostro.
                </p>
              </div>
            </a>
            <a
              href="#nueva-coleccion"
              className="group relative h-[500px] overflow-hidden rounded-3xl"
            >
              <Image
                src={cfg.categoryComodidad}
                alt="Comodidad total"
                fill
                className="object-cover object-[center_20%] transition-transform duration-1000 group-hover:scale-110"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--am-dark)]/90 via-[var(--am-dark)]/40 to-transparent opacity-80" />
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 w-max rounded-full bg-[var(--am-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--am-dark)]">
                  Básicos premium
                </span>
                <h3 className="font-serif text-4xl font-black">Comodidad total</h3>
                <p className="mt-2 max-w-sm font-medium text-gray-200">
                  Pantalones y abrigos diseñados para moverte con vos.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="instagram-feed" className="bg-[var(--am-soft)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="am-reveal mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[var(--am-accent)]">
              @{cfg.instagramHandle}
            </span>
            <h2 className="mt-2 font-serif text-4xl font-black text-[var(--am-dark)] md:text-5xl">
              Del feed a tu guardarropa
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              Looks reales del showroom — cada foto abre su publicación en Instagram.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {ANDREA_MARI_INSTAGRAM.map((post, i) => (
              <a
                key={post.code}
                href={post.postUrl}
                target="_blank"
                rel="noreferrer"
                className="am-reveal group relative aspect-square overflow-hidden rounded-2xl bg-white"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="20vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
                  <IgIcon className="h-8 w-8" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre-nosotros" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[3rem] bg-[var(--am-dark)] shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              <div className="relative lg:w-1/2">
                <Image
                  src={cfg.aboutImage}
                  alt="Showroom Andrea Mari"
                  width={800}
                  height={600}
                  className="min-h-[500px] w-full object-cover"
                />
                <div className="absolute left-8 top-8 flex h-24 w-24 -rotate-12 items-center justify-center rounded-full bg-[var(--am-primary)] text-center text-white am-shadow-glow">
                  <span className="font-serif text-xl font-black leading-none">
                    +10
                    <br />
                    <span className="font-sans text-xs font-bold uppercase">años</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-10 md:p-16 lg:w-1/2">
                <span className="text-sm font-bold uppercase tracking-widest text-[var(--am-secondary)]">
                  Nuestra esencia
                </span>
                <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
                  Nos cansamos de la ropa aburrida para talles grandes.
                </h2>
                <p className="mt-6 text-lg font-medium leading-relaxed text-gray-300">
                  En{" "}
                  <span className="font-bold text-[var(--am-primary)]">Showroom Andrea Mari</span>, la
                  moda vibrante no tiene límite de talle ni de edad.
                </p>
                <p className="mt-4 leading-relaxed text-gray-400">
                  Curamos cada prenda para realzar tu figura, darte comodidad y hacerte sentir
                  empoderada. Diseños que marcan tendencia, ahora en tu talle.
                </p>
                <a
                  href={cfg.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex w-max items-center gap-3 rounded-full bg-white px-6 py-3 font-bold text-[var(--am-dark)] transition-transform hover:scale-105"
                >
                  <IgIcon className="h-6 w-6 text-[var(--am-primary)]" />
                  @{cfg.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-12 md:p-16">
            <h2 className="font-serif text-4xl font-black">Visitá el showroom</h2>
            <p className="mt-4 text-gray-400">
              {cfg.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-widest"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
          </div>
          <div className="relative min-h-[400px] lg:min-h-[480px]">
            <iframe
              src={cfg.mapsEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Showroom Andrea Mari"
            />
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brandLine2}
        kicker="Consultá esta demo"
        title="¿Te gusta este modelo para tu tienda?"
        sub="Adaptamos colores, talles, Instagram, carrito WhatsApp y mapa de tu local."
        theme={{
          section: "bg-[var(--am-soft)] text-[var(--am-dark)]",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500",
          input:
            "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--am-primary)]",
          focus: "focus:border-[var(--am-primary)]",
          card: "rounded-3xl border border-gray-100 bg-white p-8 am-shadow-card md:p-10",
          button:
            "rounded-full bg-[var(--am-primary)] px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[var(--am-accent)]",
        }}
      />

      <footer className="border-t-8 border-[var(--am-primary)] bg-[#0a0a0a] pt-16 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center md:text-left">
          <p className="font-serif text-2xl font-black">
            {cfg.brandLine1}{" "}
            <span className="italic text-[var(--am-primary)]">{cfg.brandLine2}</span>
          </p>
          <p className="mt-4 text-sm text-gray-400">{cfg.tagline}</p>
          <p className="mt-8 text-xs text-gray-600">
            © {new Date().getFullYear()} Showroom Andrea Mari · Brilla sin límites.
          </p>
        </div>
      </footer>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {toast ? (
        <div className="fixed bottom-24 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-full px-6 py-4 text-sm font-semibold text-white am-toast am-shadow-glow">
          <Flame className="h-5 w-5 text-[var(--am-secondary)]" />
          {toast}
        </div>
      ) : null}
    </div>
  );
}

export function DemoModaAndreaMari() {
  return <AndreaMariLanding />;
}
