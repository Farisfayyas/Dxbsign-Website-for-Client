"use client";

// Muted looping video hero background (Hajster's pattern, see
// build-spec.md), falling back to a static photo on mobile/slow
// connections (per build-spec.md's own mobile-adaptation note: "don't
// serve the same full-size loop blindly on mobile data") and always as
// the base layer for reduced-motion users and the brief moment before
// the video is ready. Originally About-page-specific; now shared with
// Contact's hero too, so it lives here rather than under components/about.
//
// Video: "Time-lapse Dubai 1" by Abid Ali, free Pexels License.
// public/videos/about-hero-dubai-timelapse.mp4 (1920x1080, ~18MB) — only
// requested on viewports 768px and up.

import { useEffect, useState } from "react";
import Image from "next/image";

const VIDEO_SRC = "/videos/about-hero-dubai-timelapse.mp4";

export function VideoHeroMedia({ posterSrc, posterAlt }: { posterSrc: string; posterAlt: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setShowVideo(!reduced && wide);
  }, []);

  return (
    <>
      {/* Always present as the base layer: mobile, reduced-motion, and
          what shows while/if the video hasn't taken over yet. */}
      <Image src={posterSrc} alt={posterAlt} fill priority sizes="100vw" className="object-cover" />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={posterAlt}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </>
  );
}
