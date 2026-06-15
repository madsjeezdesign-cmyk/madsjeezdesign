"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { formatLunaPrice, type LunaProduct } from "@/lib/luna-petit-co";
import { useMousePosition } from "../hooks/use-mouse-position";

type Props = {
  product: LunaProduct;
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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-neutral-200/40 bg-white/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] backdrop-blur-sm ${className}`}
    >
      <div
        ref={ref}
        className="relative aspect-[3/4] overflow-hidden bg-[#F8F6F2]"
        onClick={onQuickView}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onQuickView()}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        <Image
          src={product.imageHover}
          alt=""
          fill
          className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at ${x}px ${y}px, rgba(255,255,255,0.35), transparent 65%)`,
          }}
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/80 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.04em] text-neutral-700 backdrop-blur-md">
            {product.badge === "new" ? "Nuevo" : "Best seller"}
          </span>
        ) : null}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onWishlist();
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/70 backdrop-blur-md transition hover:scale-105"
          aria-label="Favoritos"
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-rose-400 text-rose-400" : "text-neutral-600"}`} />
        </button>
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ scale: 1.02 }}
          className="absolute bottom-3 left-3 right-3 rounded-full bg-neutral-900/90 py-2.5 text-[10px] font-medium uppercase tracking-[0.04em] text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView();
          }}
        >
          Vista rápida
        </motion.button>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg tracking-wide text-neutral-800">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-medium text-neutral-900">{formatLunaPrice(product.price)}</span>
          {product.compareAt ? (
            <span className="text-xs text-neutral-400 line-through">{formatLunaPrice(product.compareAt)}</span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200/80 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar
        </button>
      </div>
    </motion.article>
  );
}
