"use client";

// Organic section transition — an animated SVG wave instead of a static
// shape or a hard rectangular edge, replicating arabesco.ae's actual
// technique (confirmed by reading its live DOM): a native SVG SMIL
// <animate> morphing the path's `d` through 3 states on a 5s indefinite
// loop. `fill` should be the color of the section BELOW this divider,
// since the wave visually "flows into" it.
//
// SMIL animations don't respect prefers-reduced-motion automatically, so
// this checks it explicitly and omits the <animate> tag entirely for
// those users (falls back to the first, static path shape).

import { useEffect, useState } from "react";

const D1 = "M0,45 C 240,90 480,0 720,35 C 960,70 1200,10 1440,48 L1440,90 L0,90 Z";
const D2 = "M0,45 C 240,0 480,90 720,45 C 960,0 1200,90 1440,45 L1440,90 L0,90 Z";

export function WaveDivider({ fill = "var(--color-paper)" }: { fill?: string }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-[48px] w-full sm:h-[72px]"
    >
      <path d={D1} fill={fill}>
        {animate && (
          <animate attributeName="d" dur="5s" repeatCount="indefinite" values={`${D1};${D2};${D1}`} />
        )}
      </path>
    </svg>
  );
}
