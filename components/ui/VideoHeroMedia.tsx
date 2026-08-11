"use client";

// Muted looping video hero background (Hajster's pattern, see
// build-spec.md), falling back to a static photo on mobile/slow
// connections (per build-spec.md's own mobile-adaptation note: "don't
// serve the same full-size loop blindly on mobile data") and always as
// the base layer for reduced-motion users and the brief moment before
// the video is ready. Originally About-page-specific; now shared with
// Contact's hero too, so it lives here rather than under components/about.
//
// The video element used to pop in abruptly the instant it had a frame
// ready (visible as a jarring flash of the poster photo, then a sudden
// switch to a different-looking scene from the video) -- it now starts
// fully transparent and only fades in once onCanPlay fires, so the
// poster-to-video handoff is a smooth crossfade instead of a snap.
// preload bumped from "none" to "auto" too, so that fade starts sooner
// once a visitor has already qualified for video (desktop, motion ok).
//
// Video: "Time-lapse Dubai 1" by Abid Ali, free Pexels License.
// public/videos/about-hero-dubai-timelapse.mp4 (1920x1080, ~18MB) — only
// requested on viewports 768px and up.

import { useEffect, useState } from "react";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";

const VIDEO_SRC = "/videos/about-hero-dubai-timelapse.mp4";

export function VideoHeroMedia({ posterSrc, posterAlt }: { posterSrc: string; posterAlt: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setShowVideo(!reduced && wide);
  }, []);

  return (
    <>
      {/* Always present as the base layer: mobile, reduced-motion, and
          what shows while/if the video hasn't taken over yet. */}
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        className="object-cover"
      />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          aria-label={posterAlt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </>
  );
}
