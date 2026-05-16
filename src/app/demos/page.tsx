import { DEMOS } from "@/lib/demos-registry";
import { getDemoVisuals } from "@/lib/demo-assets";
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
      image: getDemoVisuals(d.slug).cover,
      features: m.features,
      color: m.color,
      accent: m.accent,
      border: m.border,
    };
  });

  return <DemosIndexShowcase items={items} />;
}
