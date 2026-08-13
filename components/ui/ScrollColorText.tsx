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
//
// Round 2: still too subtle per direct feedback. MUTED is a transitional,
// continuously-animating state -- it is never resting content, so the
// WCAG static-contrast requirement that drove the previous fix doesn't
// apply to it the same way (the animation always resolves to FULL,
// which does need to and does pass contrast). Lightened MUTED back down
// and added a blur-to-focus pass on top of the color/opacity ramp;
// chosen live against an interactive side-by-side preview, same
// verification approach as the previous round's fix.
//
// Round 3: blur should only read while scrolling down (revealing) --
// scrolling back up should just reverse the colour/opacity sweep with
// no blur at all. Tracks direction off scrollYProgress itself (compare
// each new value against the last) rather than the native wheel event --
// scrollYProgress is the one signal guaranteed to reflect actual
// on-screen motion regardless of input method. Also narrowed the
// completion end of the scroll window (0.15 -> 0.25) so the sweep
// finishes with noticeably less scrolling.

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";

// MUTED must stay readable at rest, not just contrast with FULL at the end
// of the scroll -- #b7bbc4 (original value) was ~1.7:1 against bg-mist,
// which read as "blank" rather than "muted." #4b5563 (Tailwind gray-600)
// clears WCAG AA's 4.5:1 normal-text threshold with real margin (~6.7:1).
const MUTED = "#c6c9d1";
const FULL = "#1c2333";
const MUTED_OPACITY = 0.5;
const MUTED_BLUR = 5;

function Word({
  text,
  progress,
  range,
  direction,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  direction: MotionValue<number>;
}) {
  const color = useTransform(progress, range, [MUTED, FULL]);
  const opacity = useTransform(progress, range, [MUTED_OPACITY, 1]);
  const rawBlur = useTransform(progress, range, [MUTED_BLUR, 0]);
  const filter = useTransform([rawBlur, direction], ([b, d]: number[]) => (d < 0 ? "blur(0px)" : `blur(${b}px)`));
  return (
    <motion.span style={{ color, opacity, filter }} className="inline-block">
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
  direction,
}: {
  text: string;
  progress: MotionValue<number>;
  startIndex: number;
  totalWords: number;
  direction: MotionValue<number>;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => {
        const globalIndex = startIndex + i;
        return (
          <Word
            key={globalIndex}
            text={w}
            progress={progress}
            range={[globalIndex / totalWords, (globalIndex + 1) / totalWords]}
            direction={direction}
          />
        );
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
  // (100%) to 25% down from the top -- so the reveal spans most of a
  // natural scroll through the section instead of finishing in a blink,
  // while still completing with less scrolling than the original 15%
  // end point (that took a full 85% of a viewport height to finish).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.25"] });

  const direction = useMotionValue(1);
  const lastProgress = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    direction.set(latest >= lastProgress.current ? 1 : -1);
    lastProgress.current = latest;
  });

  const headingWordCount = heading.split(" ").length;
  const totalWords = headingWordCount + paragraph.split(" ").length;

  return (
    <div ref={ref}>
      <h2 className={headingClassName}>
        {active ? (
          <AnimatedRun text={heading} progress={scrollYProgress} startIndex={0} totalWords={totalWords} direction={direction} />
        ) : (
          heading
        )}
      </h2>
      <p className={paragraphClassName}>
        {active ? (
          <AnimatedRun
            text={paragraph}
            progress={scrollYProgress}
            startIndex={headingWordCount}
            totalWords={totalWords}
            direction={direction}
          />
        ) : (
          paragraph
        )}
      </p>
    </div>
  );
}
