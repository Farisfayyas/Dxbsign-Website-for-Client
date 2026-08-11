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
//
// Debugged live with the reduced-motion gate forced open (this session's
// test browser had prefers-reduced-motion stuck on the whole engagement,
// so the animated path itself had never actually been watched render).
// It was rendering correctly -- 22 real word spans, correct color -- but
// the *effect* was easy to miss for two compounding reasons: (1) the old
// offset window ("start 0.85" -> "start 0.35") is only ~50% of one
// viewport height, so for this short a paragraph the whole reveal could
// complete in a quick flick of the wheel, and (2) with MUTED fixed to a
// WCAG-legible gray (see below), the muted-to-full swing is subtler than
// the original illegible-but-dramatic version was, so at rest the block
// reads as flatly gray rather than "mid-transition." Widened the scroll
// window substantially so the transition plays out across most of a
// natural scroll through the section, and added a paired opacity ramp
// so the words visibly gain solidity as they darken, not just hue.
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// MUTED must stay readable at rest, not just contrast with FULL at the end
// of the scroll -- #b7bbc4 (previous value) was ~1.7:1 against bg-mist,
// which read as "blank" rather than "muted." #4b5563 (Tailwind gray-600)
// clears WCAG AA's 4.5:1 normal-text threshold with real margin (~6.7:1).
const MUTED = "#4b5563";
const FULL = "#1c2333";
const MUTED_OPACITY = 0.72;

function Word({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, [MUTED, FULL]);
  const opacity = useTransform(progress, range, [MUTED_OPACITY, 1]);
  return (
    <motion.span style={{ color, opacity }} className="inline-block">
      {text}&nbsp;
    </motion.span>
  );
}

function AnimatedWords({ text, containerRef }: { text: string; containerRef: React.RefObject<HTMLElement | null> }) {
  // Wide window -- target's top edge crossing from just-below-viewport
  // (100%) to near-the-top (15%) -- so the reveal spans most of a
  // natural scroll through the section instead of finishing in a blink.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 1", "start 0.15"] });
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
