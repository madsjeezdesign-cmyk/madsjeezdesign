import { DEMOS } from "@/lib/demos-registry";
import { getShowcaseMeta } from "@/lib/demos-showcase-meta";
import { DemosIndexShowcase } from "@/components/demos/demos-index-showcase";

export default function DemosIndexPage() {
  const items = DEMOS.map((d) => {
    const m = getShowcaseMeta(d.slug);
    return {
      slug: d.slug,
      category: d.industry.toUpperCase(),
      title: d.title,
      tagline: d.tagline,
      pitch: m.pitch,
      features: m.features,
      accentHex: d.accent,
    };
  });

  return <DemosIndexShowcase items={items} />;
}
