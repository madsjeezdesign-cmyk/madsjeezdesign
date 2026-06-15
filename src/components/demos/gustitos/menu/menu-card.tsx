"use client";

import { motion } from "framer-motion";
import { Flame, Plus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { formatGustitosPrice, type GustitosProduct } from "@/lib/gustitos";
import { useMousePosition } from "../hooks/use-mouse-position";

type Props = {
  product: GustitosProduct;
  onQuick: () => void;
  onAdd: () => void;
  className?: string;
};

export function MenuCard({ product, onQuick, onAdd, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition(ref);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 ${className}`}
    >
      <div
        ref={ref}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden"
        onClick={onQuick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onQuick()}
      >
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(max-width:768px) 50vw, 33vw" />
        <Image src={product.imageHover} alt="" fill className="object-cover opacity-0 transition duration-700 group-hover:opacity-100" sizes="(max-width:768px) 50vw, 33vw" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
          style={{
            background: `radial-gradient(260px circle at ${x}px ${y}px, rgba(239,68,68,0.35), transparent 65%)`,
          }}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
            {product.badge}
          </span>
        )}
        {product.spicy && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/90">
            <Flame className="h-4 w-4 text-white" aria-label="Picante" />
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-[color:var(--muted-body)]">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-lg text-amber-400">{formatGustitosPrice(product.price)}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-500/30 transition hover:scale-105"
            aria-label={`Agregar ${product.name}`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
