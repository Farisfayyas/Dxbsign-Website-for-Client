"use client";

// Site-wide inertial smooth scroll (Lenis), per build-spec.md's curated
// Hajster-inspired recommendation — subtle, low-risk, makes every other
// scroll-triggered reveal feel more polished. Disabled entirely when the
// user prefers reduced motion.
//
// duration is the "scroll wheel delay" -- how many seconds Lenis takes to
// ease to a wheel tick's target position. Was 1.05s, then halved to
// 0.525s, then dropped further to 0.2s per direct feedback -- still
// enough easing to read as smooth/inertial rather than a raw native
// scroll, just a much tighter follow. This component was removed
// entirely for one round (client asked to cut Lenis outright) and
// reinstated here at the lower duration per a later, separate request.

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const raf1 = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf1);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
