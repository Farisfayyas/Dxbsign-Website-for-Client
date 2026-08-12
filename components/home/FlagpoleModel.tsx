"use client";

// The swap seam for the flagpole showcase's 3D asset (FlagpoleShowcase.tsx
// / FlagpoleShowcaseScene.tsx). FLAGPOLE_MODEL_PATH now points at the
// real asset (public/models/flagpole.glb, generated via
// scripts/generate-placeholder-flagpole.py and run in Blender -- a plain
// tapered-cylinder-and-sphere shaft, no flag baked in). Setting it back
// to null falls through to the procedural PlaceholderPole below, which
// stays in the codebase as the no-asset-yet fallback.
//
// TOP_Y and FLAG_POSITION are shared between both branches -- "roughly
// the finial/flag area sits at local (0, 0, 0)" is the framing contract
// FlagpoleShowcaseScene.tsx's camera is built around (aimed at world
// origin, close and narrow so the flag fills the frame and the shaft
// crops out of view below), so both the real asset and the placeholder
// need to honor the same convention for the framing to look identical
// either way.
//
// The real asset's offset (TOP_Y - 6) is exact, not a guess: this GLB's
// own dimensions are known precisely because the generator script that
// made it is right here in the repo -- POLE_HEIGHT = 6.0, base at world
// Y 0, top at world Y 6.0, verified directly against the exported file's
// accessor min/max values. Shifting by (TOP_Y - 6) puts that same top
// edge at local Y = TOP_Y, exactly matching the placeholder's own
// TOP_Y-referenced range. If a future asset comes from somewhere else
// (AI-generated, a different CAD export) with unknown dimensions, this
// offset -- and possibly FLAG_POSITION's x value, which assumes a top
// radius close to the placeholder's -- will need re-tuning by eye; that
// was already flagged as expected when this seam was designed.
//
// rotationY is read inside useFrame via a direct ref mutation rather than
// React state -- avoids a re-render (and an extra motion-value
// subscription) on every scroll tick, R3F's own recommended pattern for
// driving continuous animation from external state.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import type { Group } from "three";
import { WavingFlag } from "./WavingFlag";

export const FLAGPOLE_MODEL_PATH: string | null = "/models/flagpole.glb";

const TOP_Y = 0.42;
const FLAG_POSITION: [number, number, number] = [0.045, TOP_Y - 0.37, 0];

export function FlagpoleModel({
  rotationY,
  modelPath = FLAGPOLE_MODEL_PATH,
}: {
  rotationY: MotionValue<number>;
  modelPath?: string | null;
}) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = (rotationY.get() * Math.PI) / 180;
    }
  });

  return (
    <group ref={groupRef}>
      {modelPath ? (
        <>
          <group position={[0, TOP_Y - 6, 0]}>
            <GltfPole path={modelPath} />
          </group>
          <WavingFlag position={FLAG_POSITION} />
        </>
      ) : (
        <PlaceholderPole />
      )}
    </group>
  );
}

function GltfPole({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

// Procedural fallback -- renders whenever FLAGPOLE_MODEL_PATH is null
// (e.g. testing without the asset present). Kept in the same top-heavy
// framing convention as the real asset above: TOP_Y sits at local
// (0, 0, 0) on purpose, with the shaft extending down into negative y,
// out of frame.
function PlaceholderPole() {
  return (
    <group>
      <mesh position={[0, TOP_Y - 3, 0]}>
        <cylinderGeometry args={[0.045, 0.12, 6, 20]} />
        <meshStandardMaterial color="#c9cdd4" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, TOP_Y + 0.08, 0]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      <WavingFlag position={FLAG_POSITION} />
    </group>
  );
}
