"use client";

import Image from "next/image";
import { Leaf, Package, Sparkles } from "lucide-react";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Selección de materiales",
    text: "Trabajamos con hilanderías certificadas en Egipto, Portugal y el norte de Italia. Cada lote se prueba por tacto, caída y resistencia al lavado antes de integrarse a nuestra colección.",
  },
  {
    icon: Package,
    title: "Empaque de lujo",
    text: "Cada pieza viaja en caja rígida forrada en algodón crudo, con papel de seda acid-free y tarjeta de autenticidad numerada. Un ritual de unboxing digno de regalo.",
  },
  {
    icon: Leaf,
    title: "Durabilidad consciente",
    text: "Diseñamos para décadas, no temporadas. Fibras de larga vida, tintes de bajo impacto y garantía de integridad textil por un año completo.",
  },
];

export function NidoLinajeEditorial() {
  return (
    <section id="filosofia" className="scroll-mt-28 border-t border-stone-100 bg-stone-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-stone-400">Editorial</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-snug text-stone-900 sm:text-4xl">
              Filosofía de marca y sostenibilidad
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-stone-600">
              Nido & Linaje nace del deseo de transformar el dormitorio en un refugio sensorial. No vendemos
              textiles: curamos experiencias de descanso con el mismo rigor que una maison de alta costura.
            </p>
            <div className="mt-12 space-y-10">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500">
                    <Icon className="h-5 w-5" strokeWidth={1.25} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-light text-stone-900">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1200&auto=format&fit=crop"
              alt="Texturas premium"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <p className="absolute bottom-8 left-8 right-8 font-serif text-2xl font-light text-white">
              &ldquo;El lujo verdadero es dormir bien, todas las noches.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
