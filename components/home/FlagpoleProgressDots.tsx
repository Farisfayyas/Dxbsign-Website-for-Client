"use client";

// Small "chapter" indicator for the flagpole showcase -- one dot per
// callout, fixed at the bottom of the pinned viewport, growing and
// brightening as its callout becomes the active one. Purely a wayfinding
// touch (confirms to the visitor that scrolling here is progressing
// through a fixed sequence, not stuck), same reasoning Apple's own
// product pages use progress indicators for on longer scroll stories.
// Each dot reuses the identical rotation-angle window math as
// FlagpoleCallout.tsx so the two stay in lockstep without needing to
// share state beyond the one scroll progress value both already read.

import { motion, useTransform, type MotionValue } from "framer-motion";
import { flagpoleCallouts } from "@/lib/flagpole-showcase-content";

const WINDOW = 0.085;

export function FlagpoleProgressDots({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center gap-2.5 sm:bottom-9">
      {flagpoleCallouts.map((c) => (
        <Dot key={c.id} rotationDeg={c.rotationDeg} progress={progress} />
      ))}
    </div>
  );
}

function Dot({ rotationDeg, progress }: { rotationDeg: number; progress: MotionValue<number> }) {
  const center = rotationDeg / 360;
  const range: [number, number, number, number] = [
    Math.max(0, center - WINDOW * 1.5),
    center - WINDOW * 0.5,
    center + WINDOW * 0.5,
    Math.min(1, center + WINDOW * 1.5),
  ];
  const scale = useTransform(progress, range, [1, 1.7, 1.7, 1]);
  const opacity = useTransform(progress, range, [0.32, 1, 1, 0.32]);

  return <motion.span style={{ scale, opacity }} className="h-[5px] w-[5px] rounded-full bg-ink" />;
}
