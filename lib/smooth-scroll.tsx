"use client";

// Site-wide inertial smooth scroll (Lenis), per build-spec.md's curated
// Hajster-inspired recommendation — subtle, low-risk, makes every other
// scroll-triggered reveal feel more polished. Disabled entirely when the
// user prefers reduced motion.

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
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
