"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * <SitePageTransition> — subtle fade-up on route changes.
 *
 * Wraps {children} inside the root layout's <main>. Re-keys on every
 * pathname change so the entry animation plays for each navigation.
 *
 * Honors prefers-reduced-motion by returning a passthrough.
 *
 * NOTE: Next.js App Router does not pause unmounted routes for exit
 * animations, so this is enter-only. AnimatePresence not needed.
 */
export function SitePageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
