"use client";

// Canvas-based frame-sequence scrubber -- draws one of 90 pre-rendered
// WebP frames (public/images/flagpole-frames/, generated in Blender via
// scripts/render-flagpole-frames.py) per scroll tick, replacing the
// earlier real-time three.js scene entirely.
//
// Switched from real-time WebGL to baked frames after direct feedback:
// the live version couldn't match Blender's rendered quality (no
// environment reflections, flat/plastic look under just two directional
// lights) without real engineering investment, and it still wouldn't
// have matched a proper offline render even after that. Framing was also
// a live FOV/aspect-ratio calculation that broke on some screens (the
// flag getting cropped) -- a baked sequence sidesteps that structurally:
// whatever the camera frames in Blender is exactly, permanently what
// ships, no live math to get wrong per viewport.
//
// object-fit: contain math, not cover -- guarantees the whole rendered
// frame (the entire flag) is always visible regardless of viewport
// aspect ratio, directly fixing the cropping bug this replaces.
// Letterboxing is intentional: it matches how the sticky viewport's own
// background (bg-mist2) already shows around the subject today.
//
// Preloading: all frames start loading the moment this component mounts
// (which itself only happens once the section is in-view and reduced-
// motion is off -- see FlagpoleShowcase.tsx). draw() picks the frame
// nearest the current target that has actually finished loading
// (img.complete is a native, synchronously-readable property, so no
// separate loading-state bookkeeping is needed), walking backward if the
// exact target isn't ready yet -- avoids a blank canvas during the brief
// window before every frame has arrived.
//
// rotationY keeps the exact same MotionValue<number> (0-360 degrees)
// interface the old real-time scene used, so FlagpoleShowcase.tsx's
// scroll/pin math needed zero changes -- only which component gets
// dynamically imported changed.

import { useCallback, useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

const FRAME_COUNT = 90;
const framePath = (n: number) => `/images/flagpole-frames/frame-${String(n).padStart(3, "0")}.webp`;

export function FlagpoleFrameSequence({ rotationY }: { rotationY: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef(0);

  const draw = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    ctx.drawImage(img, (cssW - drawW) / 2, (cssH - drawH) / 2, drawW, drawH);
  }, []);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => draw(lastDrawnFrame.current);
      img.src = framePath(i);
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
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round((latest / 360) * (FRAME_COUNT - 1))));
    if (frameIndex === lastDrawnFrame.current) return;
    lastDrawnFrame.current = frameIndex;
    draw(frameIndex);
  });

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
