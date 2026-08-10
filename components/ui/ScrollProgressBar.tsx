"use client";

// Thin bar pinned to the top of the viewport, fills as the page scrolls.
// Subtle, reads as premium (arabesco.ae pattern, see build-spec.md).
//
// Only rendered after mount: framer-motion's `motion.div` applies scroll-
// driven styles by taking direct DOM ownership on mount, which — even
// though the value itself (0) matches between server and client here —
// has already caused a real hydration-mismatch warning elsewhere in this
// build (see Reveal.tsx / lib/use-in-view.ts). This is a purely
// decorative, scroll-dependent element with nothing meaningful to show
// before JS runs anyway, so skipping SSR for it entirely is the simplest
// way to guarantee no repeat of that warning.

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function ProgressBarInner() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-blue motion-reduce:hidden"
      aria-hidden="true"
    />
  );
}

export function ScrollProgressBar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <ProgressBarInner />;
}
