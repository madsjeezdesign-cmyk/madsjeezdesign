"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AK_CATEGORIES,
  AK_FAMILIES,
  AK_PRODUCTS,
  formatAKPrice,
  type AKAromaFamily,
  type AKCategoryId,
  type AKProduct,
} from "@/lib/aromas-kym";

type Props = {
  onAdd: (p: AKProduct) => void;
  externalCategory?: AKCategoryId | "all";
};

const CAT_FILTERS: { id: AKCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Toda la colección" },
  ...AK_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

export function AromasKymColeccion({ onAdd, externalCategory }: Props) {
  const [category, setCategory] = useState<AKCategoryId | "all">("all");
  const [family, setFamily] = useState<AKAromaFamily | "all">("all");
  const [isChanging, setIsChanging] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // sync external category trigger (from navbar)
  useEffect(() => {
    if (externalCategory && externalCategory !== category) {
      setIsChanging(true);
      window.setTimeout(() => {
        setCategory(externalCategory);
        setIsChanging(false);
      }, 220);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalCategory]);

  const filtered = useMemo(() => {
    return AK_PRODUCTS.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (family === "all" || p.family === family)
    );
  }, [category, family]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.querySelectorAll(".ak-reveal").forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.06 }
    );
    el.querySelectorAll(".ak-reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [filtered.length]);

  const changeCategory = (id: AKCategoryId | "all") => {
    if (id === category) return;
    setIsChanging(true);
    window.setTimeout(() => {
      setCategory(id);
      setIsChanging(false);
    }, 220);
  };

  const changeFamily = (id: AKAromaFamily | "all") => {
    if (id === family) return;
    setIsChanging(true);
    window.setTimeout(() => {
      setFamily(id);
      setIsChanging(false);
    }, 220);
  };

  return (
    <section
      id="coleccion"
      ref={ref}
      className="relative scroll-mt-28 bg-[#fbf8f1] py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]">
              IV — Colección
            </p>
            <h2
              className="mt-4 text-balance text-[#1c1814]"
              style={{
                fontFamily: "var(--ak-serif)",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.018em",
              }}
            >
              Todo el catálogo,{" "}
              <em className="text-[#b85a3c]">listo para tu mesa.</em>
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]">
            {filtered.length} {filtered.length === 1 ? "pieza" : "piezas"}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 space-y-5">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CAT_FILTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => changeCategory(c.id)}
                className={`relative rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.04em] transition-all duration-300 ${
                  category === c.id
                    ? "border-[#1c1814] bg-[#1c1814] text-[#fbf8f1]"
                    : "border-[#e8e1d4] text-[#5a4e44] hover:border-[#b85a3c]/60 hover:text-[#1c1814]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Aroma families — secondary */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#e8e1d4] pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]">
              Familia
            </span>
            {AK_FAMILIES.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => changeFamily(f.id)}
                className={`relative font-mono text-[10px] uppercase tracking-[0.04em] transition ${
                  family === f.id
                    ? "text-[#b85a3c] underline underline-offset-[6px]"
                    : "text-[#5a4e44] hover:text-[#1c1814]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className={`ak-filter-grid grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${
            isChanging ? "is-changing" : ""
          }`}
        >
          {filtered.length === 0 ? (
            <div className="col-span-full py-24 text-center">
              <p
                className="text-[#1c1814]"
                style={{
                  fontFamily: "var(--ak-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                }}
              >
                No encontramos piezas con ese filtro.
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]">
                Probá con otra familia aromática.
              </p>
            </div>
          ) : (
            filtered.map((p, i) => (
              <article
                key={p.id}
                className="ak-reveal ak-card group"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f1ebdd]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="ak-card-img object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  {p.badge ? (
                    <span className="absolute left-3 top-3 rounded-full border border-[#fbf8f1]/40 bg-[#fbf8f1]/85 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.04em] text-[#1c1814] backdrop-blur-md">
                      {p.badge}
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => onAdd(p)}
                    className="absolute bottom-3 right-3 flex h-11 items-center gap-2 rounded-full bg-[#1c1814] px-4 font-mono text-[10px] uppercase tracking-[0.04em] text-[#fbf8f1] opacity-0 transition-all duration-500 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#b85a3c]"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    Agregar
                  </button>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] uppercase tracking-[0.04em] text-[#8d8074]">
                      {p.notesShort}
                    </p>
                    <h3
                      className="mt-2 text-balance text-[#1c1814]"
                      style={{
                        fontFamily:
                          "var(--ak-serif)",
                        fontSize: "1.35rem",
                        lineHeight: 1.15,
                        fontStyle: "italic",
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5a4e44]">
                      {p.note}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-sm tracking-tight text-[#1c1814]">
                    {formatAKPrice(p.price)}
                  </span>
                </div>

                {/* Mobile add */}
                <button
                  type="button"
                  onClick={() => onAdd(p)}
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.04em] text-[#b85a3c] hover:text-[#1c1814] md:hidden"
                >
                  <Plus className="h-3 w-3" strokeWidth={2} />
                  Agregar al carrito
                </button>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
