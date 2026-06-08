"use client";

/**
 * CSS-composed "ferretería" preview.
 * Industrial palette, typographic + iconographic.
 */
export function MockupFerreteria() {
  const items = [
    { sku: "TRN-068", name: "Tornillos M6 × 25", price: "$420", stock: "78" },
    { sku: "MRT-104", name: "Martillo carpintero", price: "$3.800", stock: "12" },
    { sku: "LLI-220", name: "Llave inglesa 10\"", price: "$2.150", stock: "34" },
  ];

  return (
    <div
      className="relative w-full overflow-hidden hairline"
      style={{
        borderRadius: "var(--radius-lg)",
        background: "linear-gradient(165deg, #1a1410 0%, #0a0807 100%)",
        aspectRatio: "4 / 3",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 10%, rgba(217,119,6,0.18), transparent 55%)",
        }}
      />
      <div
        className="relative flex items-center gap-1.5 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a2a18" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a2a18" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a2a18" }} />
        <span
          className="ml-3 text-micro font-[family-name:var(--font-jetbrains)]"
          style={{ color: "#a8a29e" }}
        >
          ferreteriaeltornillo.com.ar
        </span>
      </div>

      <div className="relative grid grid-cols-5 gap-4 px-5 py-5 md:px-6 md:py-6">
        <div className="col-span-3 space-y-3">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              background: "rgba(217,119,6,0.12)",
              border: "1px solid rgba(217,119,6,0.3)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#fbbf24" }}
            />
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: "#fde68a" }}
            >
              Stock en vivo
            </span>
          </div>
          <p
            className="font-[family-name:var(--font-instrument)]"
            style={{
              color: "#fafaf9",
              fontSize: "clamp(1rem, 2.4vw, 1.7rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            Herramientas y bulonería{" "}
            <span className="italic" style={{ color: "#fbbf24" }}>
              en el día
            </span>
            .
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span
              className="rounded-md px-3 py-1.5 text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ background: "#fbbf24", color: "#1a1410" }}
            >
              Pedir por WhatsApp
            </span>
            <span
              className="rounded-md px-3 py-1.5 text-micro font-[family-name:var(--font-jetbrains)]"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e7e5e4",
              }}
            >
              Ver catálogo
            </span>
          </div>
        </div>

        <div
          className="col-span-2 flex flex-col gap-2 rounded-md p-3"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {items.map((p) => (
            <div
              key={p.sku}
              className="flex items-center justify-between gap-2 rounded-sm px-2 py-1.5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="min-w-0">
                <p
                  className="truncate text-[0.625rem] font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "#a8a29e" }}
                >
                  {p.sku}
                </p>
                <p
                  className="truncate text-[0.7rem]"
                  style={{ color: "#fafaf9", lineHeight: 1.2 }}
                >
                  {p.name}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-[0.7rem] font-[family-name:var(--font-instrument)]"
                  style={{ color: "#fbbf24" }}
                >
                  {p.price}
                </p>
                <p
                  className="text-[0.55rem] font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "#a8a29e" }}
                >
                  {p.stock} u.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          background: "#16a34a",
          boxShadow: "0 8px 24px -8px rgba(22,163,74,0.5)",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: "#f0fdf4",
            animation: "pulse-ring 1.6s var(--ease-ui) infinite",
          }}
        />
        <span
          className="text-micro font-[family-name:var(--font-jetbrains)]"
          style={{ color: "#f0fdf4" }}
        >
          Consulta en línea
        </span>
      </div>
    </div>
  );
}
