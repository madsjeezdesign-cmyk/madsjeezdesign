"use client";

/**
 * E-commerce browser frame for Boutique Alma.
 */
export function MockupBoutique() {
  const products = [
    { name: "Vestido lino crudo", price: "$24.500", tag: "Nuevo" },
    { name: "Camisa oversize", price: "$19.800", tag: "" },
    { name: "Pantalón sastre", price: "$28.200", tag: "" },
  ];

  return (
    <div
      className="relative w-full overflow-hidden hairline"
      style={{
        borderRadius: "var(--radius-lg)",
        background: "linear-gradient(170deg, #FAF6F4 0%, #F1E8E5 100%)",
        aspectRatio: "4 / 3",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(232,213,208,0.55), transparent 60%)",
        }}
      />

      <div
        className="relative flex items-center gap-1.5 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E8D5D0" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E8D5D0" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E8D5D0" }} />
        <span
          className="ml-3 text-micro font-[family-name:var(--font-jetbrains)]"
          style={{ color: "#78716c" }}
        >
          boutiquealma.com / coleccion
        </span>
      </div>

      <div
        className="relative flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}
      >
        <p
          className="font-[family-name:var(--font-instrument)] italic"
          style={{ color: "#1c1917", fontSize: "1.1rem", letterSpacing: "-0.02em" }}
        >
          alma
        </p>
        <div className="flex items-center gap-4">
          {["Mujer", "Hombre", "Accesorios"].map((l) => (
            <span key={l} className="text-[0.7rem]" style={{ color: "#57534e" }}>
              {l}
            </span>
          ))}
          <span
            className="ml-2 rounded-full px-2.5 py-1 text-[0.65rem] font-[family-name:var(--font-jetbrains)]"
            style={{ background: "#1c1917", color: "#FAF6F4" }}
          >
            Bolso · 3
          </span>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-3 px-5 py-4 md:px-6 md:py-5">
        {products.map((p, i) => (
          <div key={p.name} className="flex flex-col gap-2">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                borderRadius: "var(--radius-sm)",
                background:
                  i === 0
                    ? "linear-gradient(160deg, #d6c2b0 0%, #9c8268 100%)"
                    : i === 1
                      ? "linear-gradient(160deg, #f3e7e1 0%, #c9a999 100%)"
                      : "linear-gradient(160deg, #2a2520 0%, #4a3f33 100%)",
              }}
            >
              {p.tag ? (
                <span
                  className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[0.55rem] font-[family-name:var(--font-jetbrains)]"
                  style={{ background: "#1c1917", color: "#FAF6F4" }}
                >
                  {p.tag}
                </span>
              ) : null}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.25) 100%)",
                }}
              />
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[0.7rem]" style={{ color: "#1c1917" }}>
                {p.name}
              </span>
              <span
                className="text-[0.7rem] font-[family-name:var(--font-instrument)] tabular-nums"
                style={{ color: "#1c1917" }}
              >
                {p.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
