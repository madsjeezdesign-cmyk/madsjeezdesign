"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { getPageType, isAnalyticsReady } from "@/lib/analytics";

/**
 * Manual pageview capture for the App Router.
 *
 * Next.js client-side navigation does not trigger a full page load, so
 * PostHog's automatic `capture_pageview` would miss route changes (or, if
 * enabled, double-count). We disable it in init and capture `$pageview`
 * here whenever the pathname or query string changes.
 *
 * `useSearchParams` requires a Suspense boundary (provided by the parent),
 * which is why this lives in its own component.
 */
export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !isAnalyticsReady()) return;
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    posthog.capture("$pageview", {
      $current_url: window.location.origin + url,
      page_type: getPageType(pathname),
    });
  }, [pathname, searchParams]);

  return null;
}
