"use client";

import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/the-barber-club";

export function TheBarberClubGallery() {
  return (
    <section id="galeria" className="border-t border-zinc-800 bg-zinc-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-amber-500">Portfolio</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-white">Estilos del club</h2>
        </div>
        <div className="columns-2 gap-4 md:columns-3">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl"
              style={{ aspectRatio: i % 2 === 0 ? "3/4" : "4/3" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="33vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">{item.tag}</span>
                <p className="font-bold text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
