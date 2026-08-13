"use client";

// Site-wide inertial smooth scroll (Lenis), per build-spec.md's curated
// Hajster-inspired recommendation — subtle, low-risk, makes every other
// scroll-triggered reveal feel more polished. Disabled entirely when the
// user prefers reduced motion.
//
// duration is the "scroll wheel delay" -- how many seconds Lenis takes to
// ease to a wheel tick's target position. Was 1.05s; halved to 0.525s per
// direct feedback that it should feel less delayed -- still enough easing
// to read as smooth/inertial rather than a raw native scroll, just a
// tighter follow.

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.525,
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
