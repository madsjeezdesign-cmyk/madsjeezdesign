"use client";

/**
 * Variant D — Bohemian Night.
 *
 * Visual identity:
 * - Warm dark: mauve / wine / midnight base + gold-copper accent.
 * - Serif italic nameplate, sans body.
 * - Hero: single garment right-aligned + poem-style copy left.
 * - Product showcase as horizontal scroll-snap (not grid).
 * - Mood section with handwritten-feel accent (font-serif italic).
 * - Warm fades, slow reveal — never snap.
 */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  type RetailFashionConfig,
  type RetailFashionProduct,
  getRetailFashionConfig,
} from "@/lib/retail-fashion-demos";
import {
  whatsappCartUrl,
  whatsappGeneralUrl,
  whatsappProductUrl,
} from "@/lib/fashion-whatsapp";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../../demo-lead-form";
import { FashionPhoto } from "../fashion-photo";

type Props = { slug: string };

function NightNav({ brand, monogram }: { brand: string; monogram: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#3a2436]/60 bg-[#1c0f1a]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/demos" className="text-[12px] tracking-[0.05em] text-[#c8a37a] hover:text-[#f3d8a8]">
          ← Volver
        </Link>
        <span className="flex items-center gap-2 font-serif text-[20px] italic text-[#f3e7d0]">
          <span className="text-[#d8b07e]">{monogram}</span>
          {brand}
        </span>
        <a
          href="#salon"
          className="text-[12px] tracking-[0.05em] text-[#c8a37a] hover:text-[#f3d8a8]"
        >
          Salón
        </a>
      </div>
    </header>
  );
}

function NightHero({ config }: { config: RetailFashionConfig }) {
  const reduce = useReducedMotion();
  const transition = useMotionTransition("display", "display");
  return (
    <section className="relative overflow-hidden bg-[#1c0f1a] pb-24 pt-32 md:pb-32 md:pt-40">
      {/* warm radial glow */}
      <div
        className="pointer-events-none absolute -right-32 top-20 h-[36rem] w-[36rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(216,176,126,0.35) 0%, rgba(28,15,26,0) 65%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="md:col-span-6"
        >
          <p className="text-[11px] tracking-[0.08em] text-[#d8b07e]">{config.heroKicker}</p>
          <h1 className="mt-6 font-serif text-[clamp(2.75rem,6.5vw,5.25rem)] font-light leading-[1.02] text-[#f3e7d0]">
            <span className="italic">{config.heroTitle}</span>
            <br />
            <span className="text-[#d8b07e]">{config.heroHighlight}</span>
          </h1>

          <div className="mt-10 max-w-md space-y-2 font-serif text-[15px] italic leading-[1.7] text-[#e8c9a4]">
            <p>Para cuando la luz baja.</p>
            <p>Para cuando lo demás termina.</p>
            <p className="text-[#a9805d]">— {config.brand}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#piezas"
              className="inline-flex items-center gap-2 bg-[#d8b07e] px-7 py-3 text-[11px] tracking-[0.06em] text-[#1c0f1a] transition-colors hover:bg-[#f3d8a8]"
            >
              Ver piezas <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={whatsappGeneralUrl(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#d8b07e]/40 px-7 py-3 text-[11px] tracking-[0.06em] text-[#f3e7d0] hover:border-[#d8b07e] hover:text-[#d8b07e]"
            >
              Conversar
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="md:col-span-6 md:pl-12"
        >
          <div className="relative ml-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#2a1426]">
              <FashionPhoto
                src={config.heroImage}
                alt={config.brand}
                fill
                priority
                className="object-cover"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c0f1a]/40 via-transparent to-transparent" />
            </div>
            <span className="absolute -bottom-3 left-3 bg-[#1c0f1a] px-3 py-1 font-serif text-[12px] italic text-[#d8b07e]">
              {config.seasonBadge}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NightProductCard({
  product,
  config,
  onAdd,
}: {
  product: RetailFashionProduct;
  config: RetailFashionConfig;
  onAdd: (p: RetailFashionProduct) => void;
}) {
  return (
    <article className="group w-[78vw] shrink-0 snap-start md:w-[22rem]">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#2a1426]">
        <FashionPhoto
          src={product.image}
          fallbackSrc={product.fallbackImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          sizes="(max-width:768px) 78vw, 22rem"
        />
      </div>
      <div className="mt-5 px-1">
        <h3 className="font-serif text-[18px] italic text-[#f3e7d0]">{product.name}</h3>
        <p className="mt-1 text-[12px] tracking-[0.04em] text-[#a9805d]">{product.price}</p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="border border-[#d8b07e]/50 px-4 py-2 text-[11px] tracking-[0.05em] text-[#f3e7d0] hover:border-[#d8b07e] hover:text-[#d8b07e]"
          >
            Reservar
          </button>
          <a
            href={whatsappProductUrl(config, product)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] italic text-[#c8a37a] underline-offset-4 hover:text-[#f3d8a8] hover:underline"
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}

function NightShowcase({
  config,
  cart,
  onAdd,
}: {
  config: RetailFashionConfig;
  cart: RetailFashionProduct[];
  onAdd: (p: RetailFashionProduct) => void;
}) {
  return (
    <section id="piezas" className="bg-[#150a14] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.08em] text-[#a9805d]">Selección</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] italic text-[#f3e7d0]">
              {config.collectionTitle}
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-[1.7] text-[#c8a37a]">
            {config.collectionSubtitle}. Carrusel horizontal —
            piezas elegidas a mano para esta temporada.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-6 [scrollbar-width:none] md:px-[max(1.5rem,calc((100vw-72rem)/2))] [&::-webkit-scrollbar]:hidden">
          {config.products.map((p) => (
            <NightProductCard key={p.id} product={p} config={config} onAdd={onAdd} />
          ))}
        </div>
      </div>

      {cart.length > 0 ? (
        <div className="mx-auto mt-12 max-w-6xl px-6 text-center">
          <p className="text-[12px] tracking-[0.05em] text-[#a9805d]">
            {cart.length} {cart.length === 1 ? "pieza" : "piezas"} en tu selección
          </p>
          <a
            href={whatsappCartUrl(config, cart)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-[#d8b07e] px-8 py-3 text-[11px] tracking-[0.06em] text-[#1c0f1a] hover:bg-[#f3d8a8]"
          >
            Cerrar reserva por WhatsApp
          </a>
        </div>
      ) : null}
    </section>
  );
}

function NightMood({ config }: { config: RetailFashionConfig }) {
  const reduce = useReducedMotion();
  const transition = useMotionTransition("display", "display");
  const looks = (config.instagramMedia ?? []).slice(0, 3);
  return (
    <section className="bg-[#1c0f1a] py-24 md:py-32">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
        className="mx-auto max-w-6xl px-6"
      >
        <p className="text-[11px] tracking-[0.08em] text-[#d8b07e]">Estado de ánimo</p>
        <h3 className="mt-4 max-w-3xl font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] italic leading-[1.35] text-[#f3e7d0]">
          La hora más larga del día.
          <br />
          La pieza que entra cuando se apaga el techo.
        </h3>

        {looks.length > 0 ? (
          <div className="mt-14 grid grid-cols-3 gap-3 md:gap-6">
            {looks.map((m) => (
              <a
                key={m.id}
                href={m.postUrl}
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-[3/4] overflow-hidden bg-[#2a1426]"
              >
                <FashionPhoto
                  src={m.image}
                  fallbackSrc={m.fallbackImage}
                  alt={m.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width:768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c0f1a]/55 to-transparent" />
              </a>
            ))}
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}

function NightSalon({ config }: { config: RetailFashionConfig }) {
  return (
    <section id="salon" className="bg-[#0f070d] py-24 text-[#f3e7d0] md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] tracking-[0.08em] text-[#d8b07e]">El salón</p>
          <h3 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] italic">
            Atención privada
          </h3>
          <p className="mt-6 max-w-md font-serif text-[15px] italic leading-[1.7] text-[#e8c9a4]">
            Tocá el timbre. Tomá un café. Probate la pieza sin apuro.
          </p>
          <p className="mt-6 text-[13px] leading-[1.7] text-[#c8a37a]">
            {config.addressLines.join(" · ")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsappGeneralUrl(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d8b07e] px-6 py-3 text-[11px] tracking-[0.06em] text-[#1c0f1a] hover:bg-[#f3d8a8]"
            >
              Agendar visita
            </a>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-3 text-[12px] italic text-[#c8a37a] underline-offset-4 hover:text-[#f3d8a8] hover:underline"
            >
              @{config.instagramHandle}
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <iframe
            src={config.mapsEmbedUrl}
            className="absolute inset-0 h-full w-full border-0 opacity-90 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Ubicación ${config.brand}`}
          />
        </div>
      </div>
    </section>
  );
}

export function BohemianNightLanding({ slug }: Props) {
  const config = getRetailFashionConfig(slug);
  const [cart, setCart] = useState<RetailFashionProduct[]>([]);
  const wa = useMemo(() => (config ? whatsappGeneralUrl(config) : "#"), [config]);

  const onAdd = (p: RetailFashionProduct) => {
    setCart((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, p]));
  };

  if (!config) return null;

  return (
    <div className="min-h-screen bg-[#1c0f1a] font-sans text-[#f3e7d0] antialiased">
      <NightNav brand={config.brand} monogram={config.monogram} />
      <NightHero config={config} />
      <NightShowcase config={config} cart={cart} onAdd={onAdd} />
      <NightMood config={config} />
      <NightSalon config={config} />

      <DemoLeadForm
        slug={slug}
        brandLabel={config.brand}
        kicker="Consultá esta demo"
        title="Lo nocturno, hecho marca."
        sub="Adaptamos clima, fotos y voz a tu boutique de noche."
        theme={{
          section: "bg-[#150a14] text-[#f3e7d0]",
          invert: false,
          label: "text-[11px] tracking-[0.06em] text-[#d8b07e]",
          input:
            "mt-2 w-full border-0 border-b border-[#d8b07e]/30 bg-transparent px-0 py-3 text-[14px] text-[#f3e7d0] outline-none",
          focus: "focus:border-[#d8b07e]",
          card: "border border-[#3a2436]/60 bg-[#1c0f1a] p-8 md:p-10",
          button:
            "bg-[#d8b07e] px-6 py-3 text-[11px] tracking-[0.06em] text-[#1c0f1a] hover:bg-[#f3d8a8]",
        }}
      />

      <footer className="border-t border-[#3a2436]/60 bg-[#0f070d] py-10 text-[#a9805d]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 md:flex-row md:items-center">
          <span className="font-serif text-[18px] italic text-[#f3e7d0]">{config.brand}</span>
          <span className="text-[11px]">© 2026 · {config.footerLocation}</span>
        </div>
      </footer>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center bg-[#d8b07e] text-[#1c0f1a] shadow-lg transition-transform hover:scale-[1.05]"
        aria-label={`WhatsApp ${config.brand}`}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
      </a>
    </div>
  );
}
