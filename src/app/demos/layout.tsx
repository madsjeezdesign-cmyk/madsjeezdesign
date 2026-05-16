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
      className={`${bebas.variable} ${playfair.variable} ${montserrat.variable} min-h-screen bg-[#0c0c0e] text-white`}
    >
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0c0e]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            href="/demos"
            className="font-[family-name:var(--font-demo-montserrat)] text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
          >
            Demos · {site.name}
          </Link>
          <Link
            href="/demos"
            className="text-xs font-semibold text-[#1de0b1] hover:underline"
          >
            Volver a demos
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
