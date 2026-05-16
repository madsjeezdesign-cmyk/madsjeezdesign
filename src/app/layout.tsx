import type { Metadata } from "next";
import Script from "next/script";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
import { site, yearsExperience } from "@/lib/data";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

const titleBase = `${site.name} · ${site.experienceLabel} · ${yearsExperience} años`;
const description = `${site.name} — ${site.foundedYear}–${site.activeYear}: páginas web, e-commerce y sistemas a medida. ${site.address.locality}, ${site.address.partido}, ${site.address.province}. ${site.hours}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: titleBase,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "desarrollo web",
    "páginas web",
    "Ezeiza",
    "Carlos Spegazzini",
    "Buenos Aires",
    "MadsJeez Design",
    "tienda online",
    "Next.js",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: titleBase,
    description,
    type: "website",
    locale: "es_AR",
    url: site.siteUrl,
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = `${plusJakarta.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`;

  return (
    <html lang="es" className={fontVars} suppressHydrationWarning>
      <body className="antialiased transition-colors duration-200">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
