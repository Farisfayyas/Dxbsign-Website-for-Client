"use client";

// Scroll-driven 3D flagpole showcase (Apple AirPods-style): a tall
// h-[400vh] wrapper with a sticky inner viewport, scroll progress across
// that wrapper mapped to a 0-360 rotationY on the pole, and four floating
// spec callouts fading in/out at rotation-angle windows.
//
// Pin technique is plain CSS (h-[400vh] wrapper + position:sticky inner
// viewport), not GSAP ScrollTrigger's pin:true -- GSAP isn't installed,
// and this matches the same Framer Motion useScroll/useTransform
// convention every other scroll-linked effect in this codebase already
// uses (see ScrollColorText.tsx). Reversal on scroll-up needs no special
// handling: rotationY is a pure function of the live bidirectional
// scrollYProgress value.
//
// FlagpoleFrameSequence (the baked-WebP canvas scrubber, see that file
// for why it replaced an earlier real-time three.js scene) is still
// dynamically imported with ssr:false and only ever rendered once
// !prefersReducedMotion AND the section is near the viewport -- reduced-
// motion visitors and any SSR/crawl pass never fetch a single frame,
// since the import() is never reached, not just visually hidden.
//
// The in-view gate is a LOCAL, continuously-toggling IntersectionObserver
// here, not lib/use-in-view.ts's shared hook -- that hook was used
// originally, but it's deliberately one-shot (fires once, disconnects,
// never reports false again), which meant FlagpoleFrameSequence -- and
// everything it holds (up to ~31 resident decoded WebP ImageBitmaps at
// desktop resolution, plus its own canvas backing buffer) -- stayed
// mounted for the rest of the page's life the first time it was ever
// triggered, even scrolled to the complete opposite end of the site.
// Confirmed live: after scrolling through this section once and then all
// the way to the footer, the <canvas> was still in the DOM. Redraws were
// already correctly guarded to zero while off-screen (see
// FlagpoleFrameSequence.tsx's frame-index-change check), so this wasn't
// costing CPU in a loop, but it was permanently pinning that memory for
// no reason. A real toggling observer actually unmounts the component
// (running its existing, already-correct cleanup that .close()s every
// held bitmap) once scrolled meaningfully past it, and remounts if
// scrolled back -- same pattern as HeroSlider.tsx's visibility gate, for
// the same reason lib/use-in-view.ts wasn't reused there either.
//
// Reduced-motion default starts true (the safe/static branch) and only
// flips after a mount effect confirms the real media query -- same
// pattern as VideoHeroMedia.tsx/ScrollProgressBar.tsx elsewhere in this
// codebase, avoiding an SSR/client hydration mismatch.
//
// h-dvh (not h-screen) for the sticky inner viewport -- 100vh on mobile
// Safari/Chrome includes space the address bar later reclaims, which can
// make a position:sticky pin visibly jump as the browser chrome
// collapses/expands mid-scroll; dvh tracks the actual visible viewport.

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { flagpoleCallouts } from "@/lib/flagpole-showcase-content";
import { FlagpoleCallout } from "./FlagpoleCallout";
import { FlagpoleShowcaseStatic } from "./FlagpoleShowcaseStatic";

const FlagpoleFrameSequence = dynamic(
  () => import("./FlagpoleFrameSequence").then((m) => m.FlagpoleFrameSequence),
  { ssr: false }
);

export function FlagpoleShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setChecked(true);
  }, []);

  // Depends on [checked, prefersReducedMotion], not []: this component
  // returns null for one tick before the effect above resolves, so the
  // ref'd div below doesn't exist in the tree yet on the very first
  // render -- a [] effect would find mountRef.current still null and,
  // since its deps never change again, never attach anything. Waiting for
  // checked/prefersReducedMotion to settle guarantees the div has actually
  // rendered by the time this runs (or, if reduced motion, that it never
  // will -- the effect then just no-ops, which is correct).
  useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "800px 0px 800px 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [checked, prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // SSR and the pre-effect client render both show nothing, so there's no
  // hydration mismatch -- the real branch (animated vs. static) resolves
  // one tick later once the actual media query is known.
  if (!checked) return null;
  if (prefersReducedMotion) return <FlagpoleShowcaseStatic />;

  return (
    <section ref={wrapperRef} className="relative h-[400vh]">
      <div ref={mountRef} className="sticky top-0 h-dvh overflow-hidden bg-mist2">
        {inView && <FlagpoleFrameSequence rotationY={rotationY} />}
        {flagpoleCallouts.map((c) => (
          <FlagpoleCallout key={c.id} callout={c} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
