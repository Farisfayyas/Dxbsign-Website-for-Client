"use client";

// Hajster-style effect: words go from muted gray to full ink color
// continuously tied to scroll position (not a one-shot on-enter reveal —
// genuinely scroll-linked, like a progress readout). Framer Motion's
// useScroll/useTransform, one motion value shared across per-word spans.
//
// Only activates after mount (see ScrollProgressBar.tsx for why:
// framer-motion's scroll-linked motion.div ownership of style during SSR
// has already caused a real hydration warning elsewhere in this build).
// Renders plain, fully-readable text before that and for
// prefers-reduced-motion — this is a progressive enhancement, the actual
// words are always present and readable regardless.

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// MUTED must stay readable at rest, not just contrast with FULL at the end
// of the scroll -- #b7bbc4 (previous value) was ~1.7:1 against bg-mist,
// which read as "blank" rather than "muted." #4b5563 (Tailwind gray-600)
// clears WCAG AA's 4.5:1 normal-text threshold with real margin (~6.7:1).
const MUTED = "#4b5563";
const FULL = "#1c2333";

function Word({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, [MUTED, FULL]);
  return (
    <motion.span style={{ color }} className="inline-block">
      {text}&nbsp;
    </motion.span>
  );
}

function AnimatedWords({ text, containerRef }: { text: string; containerRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.85", "start 0.35"] });
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Word key={i} text={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </>
  );
}

export function ScrollColorText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setActive(true);
  }, []);

  return (
    <p ref={ref} className={className}>
      {active ? <AnimatedWords text={text} containerRef={ref} /> : text}
    </p>
  );
}
