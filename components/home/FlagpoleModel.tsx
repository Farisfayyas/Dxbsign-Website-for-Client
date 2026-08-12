"use client";

// The swap seam for the flagpole showcase's 3D asset (FlagpoleShowcase.tsx
// / FlagpoleShowcaseScene.tsx). Until a real scan/render is sourced (see
// Meshy AI / Tripo AI -- image-to-3D, or a CAD conversion if Dubai Sign
// has manufacturing drawings), FLAGPOLE_MODEL_PATH stays null and a
// procedural placeholder pole renders instead, so the scroll mechanics,
// callout choreography, and performance can all be built and tuned now.
//
// Swapping in the real asset later is exactly two steps: drop the file at
// public/models/flagpole.glb, then change FLAGPOLE_MODEL_PATH below to
// that path. Nothing in FlagpoleShowcase.tsx (scroll math),
// FlagpoleShowcaseScene.tsx (camera/lights), or FlagpoleCallout.tsx
// (choreography) needs to change -- the seam is fully contained here.
// The real-asset branch is wrapped in drei's <Center> as a sensible
// default since we don't know its pivot yet -- once it's in, re-check the
// framing against the same "flag fills the frame, pole crops below" goal
// the placeholder is tuned for below, and adjust if the real model's
// proportions call for it (also worth asking whoever sources the model
// to build/render only the pole's top portion in the first place, not the
// full length down to the ground -- see the Luma/Meshy prompt notes).
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
      {modelPath ? (
        <Center>
          <GltfPole path={modelPath} />
        </Center>
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

// Deliberately top-heavy framing: the flag is the subject, not the pole's
// full length -- FlagpoleShowcaseScene.tsx's camera is aimed at world
// origin, so TOP_Y (roughly the finial/flag area) is placed right at
// local (0, 0, 0) on purpose, with the shaft extending straight down into
// negative y, out of frame, rather than the whole assembly being visually
// centered top-to-bottom. NOT wrapped in <Center> (unlike the real-asset
// branch above) -- Center would recompute a bounding-box center dominated
// by the long, mostly off-screen shaft and undo this framing entirely.
const TOP_Y = 0.42;

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
      <WavingFlag position={[0.045, TOP_Y - 0.37, 0]} />
    </group>
  );
}
