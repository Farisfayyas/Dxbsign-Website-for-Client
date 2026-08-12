"use client";

// The swap seam for the flagpole showcase's 3D asset (FlagpoleShowcase.tsx
// / FlagpoleShowcaseScene.tsx). Until a real scan/render is sourced (see
// the plan doc -- Meshy/Tripo/Luma AI Genie, or a CAD conversion if Dubai
// Sign has manufacturing drawings), FLAGPOLE_MODEL_PATH stays null and a
// procedural placeholder pole renders instead, so the scroll mechanics,
// callout choreography, and performance can all be built and tuned now.
//
// Swapping in the real asset later is exactly two steps: drop the file at
// public/models/flagpole.glb, then change FLAGPOLE_MODEL_PATH below to
// that path. Nothing in FlagpoleShowcase.tsx (scroll math),
// FlagpoleShowcaseScene.tsx (camera/lights), or FlagpoleCallout.tsx
// (choreography) needs to change -- the seam is fully contained here.
// Both branches are wrapped in drei's <Center> so the real asset doesn't
// need a pre-centered pivot to behave the same as the placeholder.
//
// rotationY is read inside useFrame via a direct ref mutation rather than
// React state -- avoids a re-render (and an extra motion-value
// subscription) on every scroll tick, R3F's own recommended pattern for
// driving continuous animation from external state.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import type { Group } from "three";
import { WavingFlag } from "./WavingFlag";

// TODO(asset): set to "/models/flagpole.glb" once the real glTF/GLB is
// sourced and dropped into public/models/.
export const FLAGPOLE_MODEL_PATH: string | null = null;

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
      <Center>{modelPath ? <GltfPole path={modelPath} /> : <PlaceholderPole />}</Center>
    </group>
  );
}

function GltfPole({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

// Simple tapered pole + finial + waving UAE flag, standing in for the
// real asset. Deliberately basic geometry (a two-radius cylinder reads as
// "tapered" close enough for tuning purposes) -- this is scaffolding for
// the interaction, not a design deliverable.
function PlaceholderPole() {
  return (
    <group>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.045, 0.12, 4, 20]} />
        <meshStandardMaterial color="#c9cdd4" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 4.08, 0]}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      <WavingFlag position={[0.045, 3.55, 0]} />
    </group>
  );
}
