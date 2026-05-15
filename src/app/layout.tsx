import type { Metadata } from "next";
import Script from "next/script";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
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

export const metadata: Metadata = {
  title: "MadsJeez Hyperlabs | Sistemas web de alto rendimiento",
  description:
    "MadsJeez Design — desarrollo full stack, cloud y experiencias digitales. Córdoba, Argentina.",
  keywords: [
    "desarrollo web",
    "full stack",
    "MadsJeez Design",
    "Hyperlabs",
    "Córdoba Argentina",
  ],
  openGraph: {
    title: "MadsJeez Hyperlabs",
    description:
      "Sistemas web, rendimiento y diseño. Next.js, TypeScript, despliegue profesional.",
    type: "website",
    locale: "es_AR",
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
