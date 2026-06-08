"use client";

import { usePathname } from "next/navigation";
import { SiteAmbientBg } from "@/components/site-ambient-bg";
import { SiteCursor } from "@/components/site-cursor";

/**
 * Mounts the global "polish layer" — ambient background + cursor ring.
 * Skipped on /admin/* routes so the admin UI stays utilitarian.
 */
export function SiteEffects() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <SiteAmbientBg />
      <SiteCursor />
    </>
  );
}

export default SiteEffects;
