"use client";

// Hajster-style effect: words go from muted gray to full ink color
// continuously tied to scroll position (not a one-shot on-enter reveal —
// genuinely scroll-linked, like a progress readout). Framer Motion's
// useScroll/useTransform, one motion value shared across per-word spans.
//
// Covers a heading + a paragraph as ONE continuous reveal (a single
// shared scroll progress, word ranges computed against their combined
// count) rather than two disconnected effects — scrolling through the
// section reveals the heading first and the paragraph picks up the same
// motion right after, instead of resetting. Semantic tags stay correct
// (a real <h2> and a real <p>, not a flattened span soup); only the
// word-indexing is shared between them.
//
// Only activates after mount (see ScrollProgressBar.tsx for why:
// framer-motion's scroll-linked motion.div ownership of style during SSR
// has already caused a real hydration warning elsewhere in this build).
// Renders plain, fully-readable text before that and for
// prefers-reduced-motion — this is a progressive enhancement, the actual
// words are always present and readable regardless.
//
// Debugged live last round with the reduced-motion gate forced open: the
// mechanics were already correct, but the reveal window was too short
// (~50% of one viewport height) and the WCAG-legible MUTED color (a
// necessary fix, see below) made the muted-to-full swing subtler than
// the original illegible version, so the effect was easy to miss. Widened
// the window and added a paired opacity ramp; verified live it now shows
// a real multi-word gradient across a natural scroll distance.

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// MUTED must stay readable at rest, not just contrast with FULL at the end
// of the scroll -- #b7bbc4 (original value) was ~1.7:1 against bg-mist,
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

// Renders one run of words (a heading's or a paragraph's) against a
// shared progress value, offset by `startIndex` into the combined word
// count so multiple runs read as one continuous reveal.
function AnimatedRun({
  text,
  progress,
  startIndex,
  totalWords,
}: {
  text: string;
  progress: MotionValue<number>;
  startIndex: number;
  totalWords: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => {
        const globalIndex = startIndex + i;
        return <Word key={globalIndex} text={w} progress={progress} range={[globalIndex / totalWords, (globalIndex + 1) / totalWords]} />;
      })}
    </>
  );
}

export function ScrollColorText({
  heading,
  headingClassName,
  paragraph,
  paragraphClassName,
}: {
  heading: string;
  headingClassName?: string;
  paragraph: string;
  paragraphClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setActive(true);
  }, []);

  // Wide window -- target's top edge crossing from just-below-viewport
  // (100%) to near-the-top (15%) -- so the reveal spans most of a
  // natural scroll through the section instead of finishing in a blink.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });

  const headingWordCount = heading.split(" ").length;
  const totalWords = headingWordCount + paragraph.split(" ").length;

  return (
    <div ref={ref}>
      <h2 className={headingClassName}>
        {active ? (
          <AnimatedRun text={heading} progress={scrollYProgress} startIndex={0} totalWords={totalWords} />
        ) : (
          heading
        )}
      </h2>
      <p className={paragraphClassName}>
        {active ? (
          <AnimatedRun text={paragraph} progress={scrollYProgress} startIndex={headingWordCount} totalWords={totalWords} />
        ) : (
          paragraph
        )}
      </p>
    </div>
  );
}
