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
//
// Each word's mask carries a bit of extra paddingBottom (cancelled by a
// matching negative marginBottom, so it doesn't add visible line-gap)
// -- without it, descenders (g/y/p/q) get clipped by the mask's
// overflow: hidden, since the box is sized tightly to the line's normal
// metrics with no room reserved below the baseline. Very visible at the
// H1's large size -- confirmed from a screenshot.

import type { ElementType } from "react";
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
  // Cast to `any` rather than ElementType here: TS infers a bare
  // ElementType-typed JSX tag's children/ref as `never` (it has to
  // intersect across every possible call/construct signature in the
  // union), a longstanding quirk of this exact polymorphic-`as`-prop
  // pattern -- surfaced by a transitive @types/react patch bump from
  // adding @react-three/fiber, not a real type-safety issue here.
  const Tag = (as ?? "p") as any;
  const { ref, inView } = useInView<HTMLElement>();
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.2em",
            marginBottom: "-0.2em",
          }}
        >
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
