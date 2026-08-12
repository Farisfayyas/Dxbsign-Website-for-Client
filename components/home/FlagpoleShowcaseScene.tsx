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
// Framed close and narrow (fov 32, ~2.7 units out) on purpose -- per
// direct art direction, the flag is the subject here, not the whole pole:
// it should fill most of the screen, the pole doesn't need to reach the
// ground. R3F's camera looks at world origin by default, and
// FlagpoleModel.tsx's placeholder deliberately places the flag/finial
// area (not the pole's midpoint) right at that origin -- so this framing
// and that positioning have to move together. A tighter fov than a wider
// one also reads as more "product shot" (less fisheye splay at the
// edges), closer to how the reference AirPods-style pages are actually
// shot.
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
      camera={{ position: [0, 0.05, 2.7], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[2.2, 2.5, 2]} intensity={1.3} />
      <directionalLight position={[-2.5, 1, -1.5]} intensity={0.4} />
      <Suspense fallback={null}>
        <FlagpoleModel rotationY={rotationY} />
      </Suspense>
    </Canvas>
  );
}
