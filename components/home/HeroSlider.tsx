"use client";

// Auto-rotating hero photo slider, arabesco-style (cross-fade + pagination
// dots), plus drag-to-navigate: dragging the photo past a small offset or
// flick-velocity threshold advances/retreats a slide, same as clicking a
// dot; a gentler drag snaps back to center with no change. The headline/
// copy stays put and animates in once on load (see app/page.tsx) rather
// than replaying per slide — these three photos share one message, so
// re-triggering identical text on every rotation would read as a glitch
// rather than a feature.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { SiteImage } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";

const INTERVAL_MS = 5500;
const DRAG_OFFSET_THRESHOLD = 80;
const DRAG_VELOCITY_THRESHOLD = 500;

export function HeroSlider({ slides }: { slides: SiteImage[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  // Starts true (the hero is the first thing on the page, visible on
  // load in the overwhelming majority of cases) so autoplay doesn't
  // wait a tick for the observer to confirm what's already obvious.
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Deliberately NOT lib/use-in-view.ts here -- that hook is a one-shot
  // reveal trigger (fires once, then disconnects, inView never goes back
  // to false), built for "animate in and stay revealed" consumers like
  // Reveal/StaggerReveal/FlagpoleShowcase. This needs the opposite: a
  // continuously toggling visibility signal, so autoplay actually stops
  // once scrolled away and resumes on scrolling back, not just fires
  // once on initial load and then runs forever regardless.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "600px 0px 600px 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || dragging || !visible) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(t);
    // `index` is included so any manual change (dot click or drag-swipe)
    // clears and restarts the countdown, instead of risking a near-
    // immediate auto-advance right after a manual pick.
  }, [paused, dragging, visible, index, slides.length]);

  function goTo(dir: 1 | -1) {
    // The "+ slides.length" matters for dir === -1 specifically: JS's %
    // can return a negative result (-1 % 3 === -1, not 2), so a naive
    // (i - 1) % slides.length would break at i === 0.
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    setDragging(false);
    if (info.offset.x < -DRAG_OFFSET_THRESHOLD || info.velocity.x < -DRAG_VELOCITY_THRESHOLD) {
      goTo(1);
    } else if (info.offset.x > DRAG_OFFSET_THRESHOLD || info.velocity.x > DRAG_VELOCITY_THRESHOLD) {
      goTo(-1);
    }
    // Otherwise: below both thresholds, dragConstraints already animates
    // the photo back to center, no slide change.
  }

  return (
    <div
      ref={containerRef}
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
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="pointer-events-none object-cover"
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
