"use client";

// Canvas-based frame-sequence scrubber -- draws one of N pre-rendered
// WebP frames (public/images/flagpole-frames/) per scroll tick, replacing
// the earlier real-time three.js scene entirely.
//
// Switched from real-time WebGL to baked frames after direct feedback:
// the live version couldn't match a proper offline render's quality (no
// environment reflections, flat/plastic look under just two directional
// lights) without real engineering investment. Framing was also a live
// FOV/aspect-ratio calculation that broke on some screens (the flag
// getting cropped) -- a baked sequence sidesteps that structurally:
// whatever's framed in each source frame is exactly, permanently what
// ships, no live math to get wrong per viewport.
//
// The frames themselves are AI-generated (a single reference still fed
// to a video model with a full-360-degree-turntable prompt, frames
// extracted from the resulting clip) rather than 3D-rendered -- a
// Blender render pipeline was tried first and produced a technically
// correct but visually flat/plastic result even after fixing lighting
// and shading bugs; the video-generation route reads as more genuinely
// photoreal for this. Nothing here cares how the frames were made,
// though -- this component just draws whatever sequentially-numbered
// images exist at the resolved path below (see
// scripts/process-flagpole-frames.mjs for how they're produced: cropped
// to a data-scanned safe bounding box, background chroma-keyed to
// transparent).
//
// object-fit: contain math, not cover -- guarantees the whole rendered
// frame (the entire flag) is always visible regardless of viewport
// aspect ratio, directly fixing the cropping bug this replaces.
// Letterboxing is intentional: it matches how the sticky viewport's own
// background (bg-mist2) already shows around the subject today.
//
// CONTENT_SCALE (~0.85) deliberately keeps the drawn image short of
// fully filling whichever axis contain constrains, and VERTICAL_ANCHOR
// biases the resulting letterbox space toward the top (8% of it above,
// not a centered 50%). An earlier version anchored at 18% with no
// CONTENT_SCALE at all -- looked right in principle but did nothing
// measurable in practice: the crop's aspect ratio (~1.16:1) is much
// taller-relative-to-width than a typical wide desktop viewport, so
// contain ends up height-constrained there, and confirmed live via
// direct canvas pixel inspection, the image was filling ~94% of the
// canvas height edge to edge -- only ~50px of spare vertical space
// existed for that anchor to redistribute, regardless of which fraction
// was chosen. CONTENT_SCALE creates real letterbox room on every
// viewport shape instead of only when the crop happens to be narrower
// than the screen, which is what actually makes the anchor effective.
//
// imageSmoothingQuality is set explicitly to "high" -- canvas image
// scaling otherwise defaults to whatever interpolation mode the browser
// picks (often the cheapest one). That plus the source-asset-quality
// fixes in scripts/process-flagpole-frames.mjs (WebP quality, a lanczos3
// upscale + sharpen done once at processing time) addressed compression
// artifacts and interpolation cheapness, but not a resolution gap that
// only shows up on real HiDPI screens: this dev environment's browser
// reports devicePixelRatio 1, but on an actual 2x display (dpr capped
// at 2 below) the canvas backing buffer at a typical pinned-viewport
// height can reach ~1800-2000 physical px -- well past what a 1.5x
// buildtime upscale covers, forcing a further runtime stretch neither
// WebP quality nor imageSmoothingQuality touches. Fixed by raising the
// buildtime upscale itself (see DESKTOP_UPSCALE in the processing
// script) rather than anything in this file -- paid for by roughly
// halving frame count below, per direct feedback that a lower framerate
// is an acceptable trade for real sharpness.
//
// Device tier: resolved synchronously on mount via matchMedia, same
// min-width:768px breakpoint VideoHeroMedia.tsx already uses for its own
// heavy-asset-on-desktop-only split. No deferred "safe default, resolve
// later" render pass is needed here the way FlagpoleShowcase.tsx needs
// one for its reduced-motion check -- this component only ever mounts
// client-side at all (gated behind that parent's reduced-motion + in-
// view checks), so there's no SSR/hydration mismatch to guard against,
// just a synchronous read of the real viewport before deciding which
// frame set to fetch. Mobile gets a lighter set (see the processing
// script -- fewer frames, smaller resolution) rather than no interactive
// experience at all, unlike a "hide entirely under 768px" approach.
//
// Preloading: all frames for the resolved tier start loading the moment
// this component mounts. draw() picks the frame nearest the current
// target that has actually finished loading (img.complete is a native,
// synchronously-readable property, so no separate loading-state
// bookkeeping is needed for the draw path itself), walking backward if
// the exact target isn't ready yet. A small loading label covers the
// brief window before the very first frame has arrived; it clears on the
// first successful load, not after every frame -- the canvas already
// reads correctly with a partially-loaded set via that same walk-back.
//
// rotationY keeps the exact same MotionValue<number> (0-360 degrees)
// interface the old real-time scene used, so FlagpoleShowcase.tsx's
// scroll/pin math needed zero changes -- only which component gets
// dynamically imported changed.

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

const DESKTOP_FRAME_COUNT = 120;
const MOBILE_FRAME_COUNT = 30;

function framePath(n: number, isDesktop: boolean) {
  const prefix = isDesktop ? "" : "mobile/";
  return `/images/flagpole-frames/${prefix}frame-${String(n).padStart(3, "0")}.webp`;
}

export function FlagpoleFrameSequence({ rotationY }: { rotationY: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCountRef = useRef(DESKTOP_FRAME_COUNT);
  const lastDrawnFrame = useRef(0);
  const [loaded, setLoaded] = useState(false);

  const draw = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let idx = frameIndex;
    while (idx > 0 && !(images[idx]?.complete && images[idx].naturalWidth > 0)) idx--;
    const img = images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    // CONTENT_SCALE deliberately stops the image short of fully filling
    // whichever axis object-fit:contain constrains -- the crop's aspect
    // ratio (~1.16:1) is much taller-relative-to-width than a typical wide
    // desktop viewport, so contain is height-constrained there, and without
    // this the image fills ~94% of the canvas height edge to edge, leaving
    // almost no letterbox room for VERTICAL_ANCHOR to redistribute (measured
    // live: only ~50px of spare vertical space total on a 900px-tall
    // canvas). This trades a little size for guaranteed real breathing room
    // above the finial on every viewport shape, not just ones where the
    // crop happens to be narrower than the screen.
    const CONTENT_SCALE = 0.85;
    const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight) * CONTENT_SCALE;
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const VERTICAL_ANCHOR = 0.08; // fraction of the letterbox space above the image; 0.5 would be dead-centered
    ctx.drawImage(img, (cssW - drawW) / 2, (cssH - drawH) * VERTICAL_ANCHOR, drawW, drawH);
  }, []);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const frameCount = isDesktop ? DESKTOP_FRAME_COUNT : MOBILE_FRAME_COUNT;
    frameCountRef.current = frameCount;

    let firstLoadFired = false;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        if (!firstLoadFired) {
          firstLoadFired = true;
          setLoaded(true);
        }
        draw(lastDrawnFrame.current);
      };
      img.src = framePath(i, isDesktop);
      images.push(img);
    }
    imagesRef.current = images;

    function onResize() {
      draw(lastDrawnFrame.current);
    }
    window.addEventListener("resize", onResize);
    draw(0);

    return () => {
      window.removeEventListener("resize", onResize);
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [draw]);

  useMotionValueEvent(rotationY, "change", (latest) => {
    const frameCount = frameCountRef.current;
    const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.round((latest / 360) * (frameCount - 1))));
    if (frameIndex === lastDrawnFrame.current) return;
    lastDrawnFrame.current = frameIndex;
    draw(frameIndex);
  });

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-xs font-semibold uppercase tracking-[0.14em] text-ink/35">Loading</span>
        </div>
      )}
    </>
  );
}
