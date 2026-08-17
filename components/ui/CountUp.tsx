"use client";

// Counts a leading integer up to its target on mount (e.g.
// site.yearsInBusiness = "18+" animates the "18" over ~2.3s, then appends
// "+" unanimated). Driven off the actual site-config value rather than a
// hardcoded number, so it can't drift if that fact ever changes.
// Respects prefers-reduced-motion, same pattern as VideoHeroMedia.
//
// Linear pacing, not eased -- over a small target like 18, an eased
// (decelerating) curve spends a disproportionate share of the total
// duration crawling through the last few numbers. A constant per-second
// rate reads as steadier for a short numeric count than the site's usual
// eased curve does elsewhere.
//
// `from` (default 0): the number the count starts at. Direct feedback on
// a big target like totalProjects ("400+") was that starting from 0 flew
// through hundreds of values in the same duration and read as an
// unreadable blur, not a count. Keeping the duration but starting from a
// number closer to the target (see the call site) shrinks the range
// covered per second without touching the animation's actual pacing.

import { useEffect, useState } from "react";

export function CountUp({
  text,
  duration = 2.3,
  from = 0,
  className,
}: {
  text: string;
  duration?: number;
  from?: number;
  className?: string;
}) {
  const match = text.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [value, setValue] = useState(target === null ? 0 : from);

  useEffect(() => {
    if (target === null) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(from + progress * (target - from)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, from]);

  if (target === null) return <span className={className}>{text}</span>;

  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      {value}
      {suffix}
    </span>
  );
}
