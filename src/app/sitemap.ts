import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// Demos are noindex (see src/app/demos/[slug]/page.tsx) so they must not
// appear in the sitemap — listing 93 dead URLs hurts crawl budget.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/demos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
