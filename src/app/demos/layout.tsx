import {
  Bebas_Neue,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/data";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-demo-bebas",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-demo-playfair",
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-demo-montserrat",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Demos de landings por rubro",
  description:
    "Showroom interno de modelos de sitio para distintos comercios — MadsJeez Design.",
  robots: { index: false, follow: false },
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bebas.variable} ${playfair.variable} ${montserrat.variable} min-h-screen bg-black text-white`}
    >
      <header className="sticky top-0 z-[60] border-b border-white/5 bg-black/75 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8 lg:px-12">
          <Link
            href="/demos"
            className="font-[family-name:var(--font-demo-montserrat)] text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-white md:text-[11px]"
          >
            Demos · {site.name}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#nexo"
              className="hidden text-[10px] font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#1de0b1] sm:inline"
            >
              Contacto
            </Link>
            <Link
              href="/demos"
              className="text-[10px] font-semibold text-[#1de0b1] hover:underline md:text-xs"
            >
              Índice
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
