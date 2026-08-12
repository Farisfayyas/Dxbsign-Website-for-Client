"use client";

// One floating spec card for the flagpole showcase. Plain absolutely-
// positioned HTML, a sibling of the <Canvas>, not drei's <Html> anchored
// to a 3D point -- <Html> recomputes a screen-space projection of a 3D
// point every frame (a real per-frame cost), only worth paying if a label
// needs to visually track a specific point on the mesh. These are generic
// spec facts, not pointing at a particular feature, and Apple's own
// AirPods callouts anchor to fixed screen quadrants the same way, not to
// tracked 3D points.
//
// Each callout gets a 4-stop window on the shared scroll progress,
// centered on its rotationDeg (as a fraction of the full 0-360 sweep):
// fade in, hold visible, hold visible, fade out. Reversal on scroll-up
// needs no special handling -- opacity/y are pure functions of the same
// bidirectional progress value already driving the rotation itself.

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { FlagpoleCallout as FlagpoleCalloutData } from "@/lib/flagpole-showcase-content";

const WINDOW = 0.07;

const SIDE_CLASS: Record<FlagpoleCalloutData["side"], string> = {
  left: "left-5 sm:left-8 md:left-14",
  right: "right-5 sm:right-8 md:right-14",
};

const V_ALIGN_CLASS: Record<FlagpoleCalloutData["vAlign"], string> = {
  top: "top-[20%]",
  middle: "top-1/2 -translate-y-1/2",
  bottom: "bottom-[20%]",
};

export function FlagpoleCallout({
  callout,
  progress,
}: {
  callout: FlagpoleCalloutData;
  progress: MotionValue<number>;
}) {
  const center = callout.rotationDeg / 360;
  const range: [number, number, number, number] = [
    Math.max(0, center - WINDOW * 1.5),
    center - WINDOW * 0.5,
    center + WINDOW * 0.5,
    Math.min(1, center + WINDOW * 1.5),
  ];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [16, 0, 0, -16]);

  const Icon = callout.icon;

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute z-10 w-[220px] max-w-[46vw] rounded-xl border border-black/[0.06] bg-white/90 p-4 shadow-[0_12px_32px_rgba(20,25,40,0.12)] backdrop-blur-sm sm:w-[240px] ${SIDE_CLASS[callout.side]} ${V_ALIGN_CLASS[callout.vAlign]}`}
    >
      <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue/[0.08] text-blue">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div className="font-serif text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink/50">
        {callout.label}
      </div>
      <div className="mt-0.5 text-[14px] font-medium leading-snug text-ink">{callout.value}</div>
    </motion.div>
  );
}
