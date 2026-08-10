"use client";

// Auto-rotating hero photo slider, arabesco-style (cross-fade + pagination
// dots). The headline/copy stays put and animates in once on load (see
// app/page.tsx) rather than replaying per slide — these three photos
// share one message, so re-triggering identical text on every rotation
// would read as a glitch rather than a feature.

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteImage } from "@/lib/site-images";

const INTERVAL_MS = 5500;

export function HeroSlider({ slides }: { slides: SiteImage[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div
      className="relative min-h-[340px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1 }, scale: { duration: INTERVAL_MS / 1000 + 1, ease: "linear" } }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className="h-2 rounded-full bg-white/60 transition-all duration-300"
            style={{ width: i === index ? "22px" : "8px", backgroundColor: i === index ? "#fff" : "rgba(255,255,255,0.5)" }}
          />
        ))}
      </div>
    </div>
  );
}
