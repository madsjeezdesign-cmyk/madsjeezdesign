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
  twitter: {
    card: "summary_large_image",
    title: titleBase,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = `${plusJakarta.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es" className={fontVars} suppressHydrationWarning>
      <body className="antialiased transition-colors duration-200">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
