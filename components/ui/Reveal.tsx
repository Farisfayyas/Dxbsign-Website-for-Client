"use client";

// Scroll-reveal wrapper — fade + translateY on first intersection, matching
// scrollReveal.js's timing (0.7s cubic-bezier(.16,1,.3,1)) exactly. Plain
// CSS transition rather than framer-motion here: see use-in-view.ts for why.

import type { ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.7s var(--ease-reveal) ${delay}s, transform 0.7s var(--ease-reveal) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
