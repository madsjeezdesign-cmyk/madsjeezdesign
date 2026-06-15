/**
 * Primitives barrel — 12 reusable building blocks for premium layouts.
 *
 * Etapa 3 del rediseño global. Each primitive is:
 *  - opt-in (no implicit injection),
 *  - token-driven (no hardcoded colors),
 *  - SSR-safe,
 *  - prefers-reduced-motion aware,
 *  - mobile-first.
 *
 * Importer pattern:
 *   import { SectionWrapper, ScrollReveal, BentoGrid, BentoItem } from "@/components/primitives";
 */

export { SectionWrapper } from "./section-wrapper";
export type { SectionWrapperProps } from "./section-wrapper";

export { PageHeader } from "./page-header";
export type { PageHeaderProps } from "./page-header";

export { ScrollReveal } from "./scroll-reveal";
export type { ScrollRevealProps } from "./scroll-reveal";

export { MagneticButton } from "./magnetic-button";
export type { MagneticButtonProps } from "./magnetic-button";

export { SpotlightCard } from "./spotlight-card";
export type { SpotlightCardProps } from "./spotlight-card";

export { BentoGrid, BentoItem } from "./bento-grid";
export type { BentoGridProps, BentoItemProps } from "./bento-grid";

export { AnimatedStats } from "./animated-stats";
export type { AnimatedStatsProps, StatItem } from "./animated-stats";

export { GlowBackground } from "./glow-background";
export type { GlowBackgroundProps } from "./glow-background";

export { FloatingElements, FloatingItem } from "./floating-elements";
export type { FloatingElementsProps, FloatingItemProps } from "./floating-elements";

export { LiveActivityPanel } from "./live-activity-panel";
export type { LiveActivityPanelProps, LiveActivityItem } from "./live-activity-panel";

export { EmptyState } from "./empty-state";
export type { EmptyStateProps } from "./empty-state";

export { Skeleton, LoadingState } from "./loading-state";
export type { SkeletonProps, LoadingStateProps } from "./loading-state";
