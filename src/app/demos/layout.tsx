import { Bebas_Neue, Montserrat, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import { demoFontsClassName } from "./demo-fonts";

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

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-demo-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Demos de landings por rubro",
  description:
    "Showroom interno de modelos de sitio para distintos comercios — MadsJeez Design.",
  robots: { index: false, follow: false },
};

/** Tipografías del índice + 20 pares únicos por rubro. */
export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${bebas.variable} ${playfair.variable} ${montserrat.variable} ${jakarta.variable} ${demoFontsClassName} min-h-screen bg-black text-white antialiased`}
    >
      {children}
    </div>
  );
}
