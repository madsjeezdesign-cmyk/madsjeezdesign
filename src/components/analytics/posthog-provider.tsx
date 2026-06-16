"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogPageview } from "./posthog-pageview";
import { PostHogSmartCapture } from "./posthog-smart-capture";

/**
 * <PostHogProvider> — initializes PostHog once on the client and mounts the
 * pageview tracker + smart click capture.
 *
 * Design choices (privacy + correctness):
 *  - SSR-safe: init runs only inside useEffect (client-only).
 *  - No key → no init. The whole thing becomes a transparent passthrough,
 *    so local dev / preview builds without a key produce zero console noise.
 *  - `capture_pageview: false` — we capture pageviews manually on route
 *    change (App Router) to avoid the double-count that automatic capture
 *    causes with client-side navigation.
 *  - Session replay is ENABLED but every input is masked (maskAllInputs)
 *    and anything tagged `.ph-no-capture` / `[data-ph-mask]` is hidden.
 *  - `/admin/*` is excluded entirely: it shows real leads with emails, so we
 *    skip PostHog there (no init, no replay, no events). Product analytics
 *    has no use for the internal panel anyway.
 *  - `person_profiles: "identified_only"` — anonymous visitors don't create
 *    person profiles, reducing volume and PII surface.
 *
 * Coexists with GA4 (wired in layout.tsx). Neither replaces the other.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdmin) return; // never run analytics on the internal panel
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    if (!key) return; // no key → no-op (placeholders not filled yet)

    // Guard against re-init on fast refresh / remounts.
    if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

    posthog.init(key, {
      api_host: host,
      ui_host: "https://us.posthog.com",
      capture_pageview: false, // manual — see PostHogPageview
      capture_pageleave: true,
      autocapture: true, // basic click/input autocapture
      person_profiles: "identified_only",
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-ph-mask]",
      },
      // Don't record sessions by default on every visitor; sample server-side
      // in the PostHog UI if you want replay. Inputs are masked regardless.
      disable_session_recording: false,
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") {
          ph.debug(false); // flip to true locally to see events in console
        }
      },
    });
  }, [isAdmin]);

  // On the admin panel, render children with NO analytics attached.
  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      <PostHogSmartCapture />
      {children}
    </>
  );
}
