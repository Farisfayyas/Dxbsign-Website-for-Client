"use client";

// Per-word "curtain lift" entrance: each word sits behind an overflow-
// hidden mask and slides up into view, rather than the whole block
// fading + rising together like Reveal does. Same plain-CSS-transition
// approach as Reveal/StaggerReveal (see lib/use-in-view.ts for why --
// SSR-hydration-safety) and the same one-shot-on-first-intersection
// mechanic. Reduced-motion needs no special handling here either: the
// global transition-duration: 150ms override in globals.css already
// covers it, exactly as it does for Reveal and StaggerReveal.

import { useInView } from "@/lib/use-in-view";

export function CurtainReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLParagraphElement>();
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <span
            style={{
              display: "inline-block",
              transform: inView ? "none" : "translateY(115%)",
              transition: `transform 0.6s var(--ease-reveal) ${delay + i * stagger}s`,
            }}
          >
            {w}&nbsp;
          </span>
        </span>
      ))}
    </p>
  );
}
