import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MadsJeez Design | Desarrollo web para comercios y empresas",
  description:
    "Landing pages, e-commerce, portfolios y aplicaciones web. Estudio de desarrollo en Córdoba, Argentina. Sitios rápidos, profesionales y orientados a ventas.",
  keywords: [
    "desarrollo web",
    "landing page",
    "e-commerce",
    "MadsJeez Design",
    "Córdoba Argentina",
  ],
  openGraph: {
    title: "MadsJeez Design — Sitios web que venden",
    description:
      "Desarrollo web profesional para comercios y empresas. Proyectos con Next.js, Supabase y deploy en Railway.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
