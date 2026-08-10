"use client";

// Per-child staggered entrance (arabesco's actual pattern: fade +
// translateY(30px->0), ~600ms, easeOutQuad-equivalent, ~150-300ms stagger
// between children) — a more granular alternative to Reveal, which
// animates its whole subtree as one block. Same CSS-transition approach
// as Reveal (see lib/use-in-view.ts) rather than framer-motion, for the
// same SSR-hydration-safety reason.

import { Children, type ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";

export function StaggerReveal({
  children,
  stagger = 0.12,
  y = 26,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : `translateY(${y}px)`,
            transition: `opacity 0.65s var(--ease-reveal) ${i * stagger}s, transform 0.65s var(--ease-reveal) ${i * stagger}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
