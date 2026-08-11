"use client";

// Wraps a primary CTA so it subtly follows the cursor within its own
// bounds on hover, then springs back on leave -- a restrained version of
// the "magnetic button" pattern (more so than the full-page cursor-follow
// effect Faris rejected earlier in this build). No-ops harmlessly on
// touch: without mousemove events the spring never gets a target, so the
// button just sits still, same as before this component existed.

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const STRENGTH = 0.35;
const MAX_OFFSET = 8;

export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * STRENGTH)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * STRENGTH)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
