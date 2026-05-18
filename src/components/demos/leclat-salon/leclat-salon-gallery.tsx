"use client";

import Image from "next/image";
import { useState } from "react";
import { SALON_GALLERY } from "@/lib/leclat-salon";

export function LeclatSalonGallery() {
  const [active, setActive] = useState(0);
  const item = SALON_GALLERY[active];

  return (
    <section id="galeria" className="scroll-mt-20 border-t border-rose-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-rose-400">Portafolio</p>
          <h2 className="mt-2 font-serif text-3xl font-light text-stone-900">Antes & después · Tendencias</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="leclat-gallery-hover relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 shadow-lg">
            <Image
              key={item.id}
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition duration-700"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-medium uppercase tracking-widest text-rose-200">{item.tag}</span>
              <p className="mt-1 font-serif text-2xl">{item.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
            {SALON_GALLERY.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(i)}
                className={`leclat-gallery-hover relative aspect-square overflow-hidden rounded-xl transition ring-offset-2 ${
                  active === i ? "ring-2 ring-rose-400" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={g.image} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
