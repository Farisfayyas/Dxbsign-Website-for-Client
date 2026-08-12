"use client";

// The actual <Canvas>/WebGL tree for the flagpole showcase -- kept in its
// own file so FlagpoleShowcase.tsx can next/dynamic-import it with
// ssr:false, splitting the three.js/@react-three bundle into its own
// chunk that reduced-motion visitors and any SSR/crawl pass never fetch
// (see FlagpoleShowcase.tsx for the gating).
//
// Camera is static; only the model's own rotation moves (the pole turns,
// not an orbiting camera) -- no OrbitControls, this is a locked cinematic,
// not a user-explorable viewer.
//
// dpr capped at [1, 1.75]: R3F's default uses the raw devicePixelRatio,
// which hits 3 on many phones -- full-res 3x WebGL fill-rate on a phone
// GPU is the single biggest avoidable mobile cost here. Materials are
// kept simple (meshStandardMaterial, no HDR <Environment>) -- a matte
// pole doesn't need that extra download/per-pixel cost.

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { FlagpoleModel } from "./FlagpoleModel";

export function FlagpoleShowcaseScene({ rotationY }: { rotationY: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.2, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />
      <Suspense fallback={null}>
        <FlagpoleModel rotationY={rotationY} />
      </Suspense>
    </Canvas>
  );
}
