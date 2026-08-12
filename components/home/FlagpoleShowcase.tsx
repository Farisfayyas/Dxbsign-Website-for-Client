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
// uses (see ScrollColorText.tsx), which stays in sync with Lenis
// automatically since Lenis runs in native (non-virtual) scroll mode.
// Reversal on scroll-up needs no special handling: rotationY is a pure
// function of the live bidirectional scrollYProgress value.
//
// FlagpoleFrameSequence (the baked-WebP canvas scrubber, see that file
// for why it replaced an earlier real-time three.js scene) is still
// dynamically imported with ssr:false and only ever rendered once
// !prefersReducedMotion AND the section is near the viewport
// (lib/use-in-view.ts, large rootMargin so the 90 frames have time to
// start loading before the section is actually reached) -- reduced-
// motion visitors and any SSR/crawl pass never fetch a single frame,
// since the import() is never reached, not just visually hidden.
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
import { useInView } from "@/lib/use-in-view";
import { flagpoleCallouts } from "@/lib/flagpole-showcase-content";
import { FlagpoleCallout } from "./FlagpoleCallout";
import { FlagpoleShowcaseStatic } from "./FlagpoleShowcaseStatic";

const FlagpoleFrameSequence = dynamic(
  () => import("./FlagpoleFrameSequence").then((m) => m.FlagpoleFrameSequence),
  { ssr: false }
);

export function FlagpoleShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const { ref: mountRef, inView } = useInView<HTMLDivElement>({ rootMargin: "800px 0px 800px 0px" });

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setChecked(true);
  }, []);

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
