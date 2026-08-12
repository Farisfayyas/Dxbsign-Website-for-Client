"use client";

// Per-word "curtain lift" entrance: each word sits behind an overflow-
// hidden mask and slides up into view, rather than the whole block
// fading + rising together like Reveal does. Same plain-CSS-transition
// approach as Reveal/StaggerReveal (see lib/use-in-view.ts for why --
// SSR-hydration-safety) and the same one-shot-on-first-intersection
// mechanic. Reduced-motion needs no special handling here either: the
// global transition-duration: 150ms override in globals.css already
// covers it, exactly as it does for Reveal and StaggerReveal.
//
// `as` lets this render as a real <h1> (the hero heading needs to stay
// a real heading tag for SEO) as well as the default <p>. Duration/
// stagger are 30% slower than the first version -- too subtle to notice
// per direct feedback.

import type { ElementType, Ref } from "react";
import { useInView } from "@/lib/use-in-view";

export function CurtainReveal<T extends ElementType = "p">({
  text,
  className,
  delay = 0,
  stagger = 0.0455,
  duration = 0.78,
  as,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: T;
}) {
  const Tag = (as ?? "p") as ElementType;
  const { ref, inView } = useInView<HTMLElement>();
  const words = text.split(" ");

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={className}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <span
            style={{
              display: "inline-block",
              transform: inView ? "none" : "translateY(115%)",
              transition: `transform ${duration}s var(--ease-reveal) ${delay + i * stagger}s`,
            }}
          >
            {w}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  );
}
