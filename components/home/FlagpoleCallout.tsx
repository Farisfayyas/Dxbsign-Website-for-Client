"use client";

// Floating spec callout for the flagpole showcase -- purely typographic,
// no card/border/shadow/icon-in-circle. Direct feedback on the first
// version was that a bordered card with an icon badge didn't read as
// premium; this instead follows the Apple product-page convention of a
// small eyebrow label, one bold "headline" stat, and a supporting
// description line floating directly over the scene. Plain absolutely-
// positioned HTML, a sibling of the <Canvas>, not drei's <Html> anchored
// to a 3D point -- these are generic facts, not pointing at a specific
// mesh feature, and Apple's own callouts anchor to fixed screen quadrants
// the same way, not to tracked 3D points (see FlagpoleShowcase.tsx).
//
// Entrance/exit is a materialize-then-dissolve: blur-to-focus, a slight
// upward drift, and a small scale-up combined, rather than a plain fade.
// The thin accent rule above the eyebrow draws in on ITS OWN, slightly
// earlier window (lineRange starts before range) -- reads as a small cue
// arriving a beat before the copy, instead of everything landing in one
// flat step. All of this is driven by the one shared scroll progress
// value already powering the rotation -- reversal on scroll-up needs no
// special handling, every motion value here is a pure function of it.
//
// Content lives entirely in lib/flagpole-showcase-content.ts -- nothing
// here needs to change when the real client-confirmed figures replace
// today's placeholder values.

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { FlagpoleCallout as FlagpoleCalloutData } from "@/lib/flagpole-showcase-content";
import { useDirection } from "@/lib/direction-context";

const WINDOW = 0.085;

const SIDE_CLASS: Record<FlagpoleCalloutData["side"], string> = {
  left: "left-6 sm:left-10 md:left-16 items-start text-left",
  right: "right-6 sm:right-10 md:right-16 items-end text-right",
};

const LINE_ORIGIN: Record<FlagpoleCalloutData["side"], string> = {
  left: "origin-left",
  right: "origin-right ml-auto",
};

const V_ALIGN_CLASS: Record<FlagpoleCalloutData["vAlign"], string> = {
  top: "top-[18%]",
  middle: "top-1/2 -translate-y-1/2",
  bottom: "bottom-[18%]",
};

export function FlagpoleCallout({
  callout,
  progress,
}: {
  callout: FlagpoleCalloutData;
  progress: MotionValue<number>;
}) {
  const { dir } = useDirection();
  const isAr = dir === "rtl";
  const center = callout.rotationDeg / 360;
  const range: [number, number, number, number] = [
    Math.max(0, center - WINDOW * 1.5),
    center - WINDOW * 0.5,
    center + WINDOW * 0.5,
    Math.min(1, center + WINDOW * 1.5),
  ];
  const lineRange: [number, number, number, number] = [
    Math.max(0, center - WINDOW * 1.65),
    center - WINDOW * 0.85,
    center + WINDOW * 0.5,
    Math.min(1, center + WINDOW * 1.5),
  ];

  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [24, 0, 0, -14]);
  const scale = useTransform(progress, range, [0.96, 1, 1, 0.985]);
  const blurAmount = useTransform(progress, range, [9, 0, 0, 5]);
  const filter = useTransform(blurAmount, (b) => `blur(${b}px)`);
  const lineScale = useTransform(progress, lineRange, [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className={`pointer-events-none absolute z-10 flex w-[240px] max-w-[44vw] flex-col sm:w-[300px] sm:max-w-[52vw] ${SIDE_CLASS[callout.side]} ${V_ALIGN_CLASS[callout.vAlign]}`}
    >
      <motion.div style={{ scaleX: lineScale }} className={`mb-3 h-px w-10 bg-blue ${LINE_ORIGIN[callout.side]}`} />
      <div className="font-serif text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">
        {isAr ? callout.eyebrowAr : callout.eyebrow}
      </div>
      <div className="mt-2 text-[clamp(24px,3.1vw,40px)] font-bold leading-[1.05] tracking-tight text-ink">
        {isAr ? callout.statAr : callout.stat}
      </div>
      <div className="mt-2.5 text-[14.5px] leading-relaxed text-ink/60">
        {isAr ? callout.descriptionAr : callout.description}
      </div>
    </motion.div>
  );
}
