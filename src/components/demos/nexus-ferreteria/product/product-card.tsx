"use client";

import { motion } from "framer-motion";
import { Heart, Plus, Zap } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import {
  STOCK_LABELS,
  formatNexusPrice,
  type NexusProduct,
} from "@/lib/nexus-ferreteria";
import { useMousePosition } from "../hooks/use-mouse-position";

type Props = {
  product: NexusProduct;
  wishlisted: boolean;
  onWishlist: () => void;
  onQuickView: () => void;
  onAdd: () => void;
  className?: string;
};

export function ProductCard({
  product,
  wishlisted,
  onWishlist,
  onQuickView,
  onAdd,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition(ref);
  const stock = STOCK_LABELS[product.stock];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div
        ref={ref}
        className="relative aspect-[4/5] cursor-pointer overflow-hidden bg-zinc-800"
        onClick={onQuickView}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onQuickView()}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 33vw"
        />
        <Image
          src={product.imageHover}
          alt=""
          fill
          className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
          sizes="(max-width:768px) 50vw, 33vw"
        />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(240px circle at ${x}px ${y}px, rgba(249,115,22,0.25), transparent 70%)`,
          }}
        />
        <span
          className={`absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase ${stock.className}`}
        >
          {stock.label}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onWishlist();
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950/80 backdrop-blur-md"
          aria-label="Favoritos"
        >
          <Heart
            className={`h-4 w-4 ${wishlisted ? "fill-orange-500 text-orange-500" : "text-zinc-400"}`}
          />
        </button>
      </div>
      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          {product.brand} · {product.sku}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white">{product.name}</h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.specs.slice(0, 2).map((s) => (
            <span
              key={s}
              className="rounded border border-white/5 bg-zinc-950 px-1.5 py-0.5 text-[10px] text-zinc-500"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-lg text-orange-400">{formatNexusPrice(product.price)}</span>
          <button
            type="button"
            onClick={onAdd}
            disabled={product.stock === "out"}
            className="flex items-center gap-1 rounded-lg bg-orange-600 px-3 py-2 text-xs font-bold uppercase text-black transition hover:bg-amber-500 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Agregar</span>
            <Zap className="h-3.5 w-3.5 sm:hidden" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
