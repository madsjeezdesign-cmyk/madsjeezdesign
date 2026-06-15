"use client";

/**
 * Hero product mockup — a stylized, content-rich preview of Luna Petit & Co.
 * (one of the studio's top demos). Rendered as a realistic browser frame
 * with traffic-light buttons, an URL bar, and a CSS-only editorial composition.
 *
 * NOT an iframe (perf) and NOT a placeholder card — real composition.
 */
export function HeroMockup() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px] border"
      style={{
        background: "linear-gradient(180deg, #faf8f4 0%, #f1ece2 100%)",
        borderColor: "color-mix(in srgb, var(--foreground) 14%, transparent)",
        boxShadow:
          "0 30px 60px -30px rgba(0,0,0,0.45), 0 50px 120px -40px color-mix(in srgb, var(--accent) 30%, transparent), 0 0 0 1px color-mix(in srgb, var(--foreground) 6%, transparent) inset",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: "rgba(248, 246, 242, 0.85)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div
          className="ml-3 flex-1 rounded-md px-3 py-1 text-[10px] font-medium tracking-wide text-neutral-500"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.05)",
            fontFamily: "var(--font-jetbrains), monospace",
          }}
        >
          lunapetit.co/coleccion
        </div>
        <span className="hidden h-2 w-2 rounded-full sm:inline-block" style={{ background: "#0d9488" }} />
      </div>

      {/* Mock site nav */}
      <div className="flex items-center justify-between px-7 py-4">
        <span
          className="text-[15px] font-medium tracking-tight text-neutral-900"
          style={{ fontFamily: "var(--font-instrument), serif" }}
        >
          Luna Petit <span className="italic text-neutral-500">& co.</span>
        </span>
        <div className="hidden gap-5 text-[10px] uppercase tracking-[0.18em] text-neutral-500 md:flex">
          <span>Colección</span>
          <span>Niñas</span>
          <span>Niños</span>
          <span>Diario</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-neutral-500">ES · ARS</span>
          <span
            className="rounded-full px-3 py-1 text-[10px] text-white"
            style={{ background: "#1a1a1a" }}
          >
            Bolsa · 2
          </span>
        </div>
      </div>

      {/* Hero composition inside the mockup */}
      <div className="grid grid-cols-12 gap-4 px-7 pt-2 pb-7">
        {/* Editorial copy column */}
        <div className="col-span-7 flex flex-col justify-between pr-2 pt-5">
          <div>
            <p className="text-[10px] tracking-[0.04em] text-neutral-300">
              SS · 2025
            </p>
            <h2
              className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.02] text-neutral-900"
              style={{ fontFamily: "var(--font-instrument), serif" }}
            >
              Moda infantil <span className="italic text-neutral-500">premium</span>,
              hecha despacio.
            </h2>
            <p className="mt-3 max-w-[28ch] text-[11px] leading-relaxed text-neutral-600">
              Algodón orgánico, cortes pensados para jugar, paleta cálida. Diseñado
              en Buenos Aires.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="rounded-full bg-neutral-900 px-4 py-2 text-[10px] font-medium text-white">
              Ver colección
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Envíos a todo el país
            </span>
          </div>
        </div>

        {/* Product imagery column — CSS-only painterly tiles */}
        <div className="col-span-5 grid grid-cols-2 grid-rows-2 gap-2">
          <div
            className="row-span-2 overflow-hidden rounded-xl"
            style={{
              background:
                "linear-gradient(160deg, #f3d3b8 0%, #e6a47a 55%, #c97a52 100%)",
            }}
          >
            <div className="flex h-full items-end p-3">
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/90">
                Vestidos
              </span>
            </div>
          </div>
          <div
            className="overflow-hidden rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, #cfe1d0 0%, #98bda1 100%)",
            }}
          />
          <div
            className="overflow-hidden rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, #f6e8d3 0%, #e5cfa5 100%)",
            }}
          />
        </div>
      </div>

      {/* Footer strip — product chips */}
      <div
        className="flex items-center justify-between px-7 py-3"
        style={{
          background: "rgba(0,0,0,0.04)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-600">
            Nuevos
          </span>
          <span className="text-[9px] text-neutral-400">·</span>
          <span className="text-[9px] text-neutral-500">12 productos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1 w-6 rounded-full bg-neutral-900" />
          <span className="h-1 w-1.5 rounded-full bg-neutral-300" />
          <span className="h-1 w-1.5 rounded-full bg-neutral-300" />
        </div>
      </div>
    </div>
  );
}
