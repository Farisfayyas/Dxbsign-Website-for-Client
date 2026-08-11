"use client";

// Counts a leading integer up from 0 to its target on mount (e.g.
// site.yearsInBusiness = "18+" animates the "18" over ~1.4s, then appends
// "+" unanimated). Driven off the actual site-config value rather than a
// hardcoded number, so it can't drift if that fact ever changes.
// Respects prefers-reduced-motion, same pattern as VideoHeroMedia.

import { useEffect, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  text,
  duration = 1.4,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const match = text.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [value, setValue] = useState(target === null ? 0 : 0);

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
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  if (target === null) return <span className={className}>{text}</span>;

  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      {value}
      {suffix}
    </span>
  );
}
