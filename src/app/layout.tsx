import type { Metadata } from "next";
import Script from "next/script";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import { SiteEffects } from "@/components/site-effects";
import { SitePageTransition } from "@/components/site-page-transition";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    languages: {
      "es-AR": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: titleBase,
    description,
    type: "website",
    locale: "es_AR",
    url: site.siteUrl,
    siteName: site.name,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "MadsJeez Design — Estudio de diseño y desarrollo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleBase,
    description,
    images: ["/og-image.svg"],
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description,
  url: site.siteUrl,
  email: site.email,
  telephone: site.phoneTel,
  foundingDate: String(site.foundedYear),
  priceRange: "$$",
  image: `${site.siteUrl}/og-image.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.province,
    addressCountry: "AR",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: site.address.partido },
    { "@type": "AdministrativeArea", name: site.address.province },
    { "@type": "Country", name: "Argentina" },
  ],
  openingHours: "Mo-Sa 10:00-20:00",
  sameAs: [site.whatsapp],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = `${plusJakarta.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable}`;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es" className={fontVars} suppressHydrationWarning>
      <body className="antialiased transition-colors duration-200">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Script
          id="ld-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Saltar al contenido
        </a>
        <ThemeProvider>
          <PostHogProvider>
            <SiteEffects />
            <main id="main" tabIndex={-1} className="focus:outline-none">
              <SitePageTransition>{children}</SitePageTransition>
            </main>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
