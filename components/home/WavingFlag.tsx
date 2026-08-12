"use client";

// Procedural UAE flag for the flagpole showcase's placeholder pole
// (FlagpoleModel.tsx). Built in code rather than sourced from an AI
// generator -- image-to-3D tools are unreliable at thin, flowing cloth
// geometry, and this needs to be the UAE flag specifically, which is
// easiest to guarantee exactly right by drawing it programmatically.
//
// Texture: drawn onto a <canvas> at mount and used as a CanvasTexture,
// not an image asset -- crisp at any size, zero extra network request,
// and the proportions/colors are exact rather than left to chance. Real
// UAE flag layout: a red vertical band on the hoist (pole) side covering
// 1/4 of the flag's length, with the remaining 3/4 split into three equal
// horizontal bands -- green (top), white (middle), black (bottom).
//
// Ripple: two overlapping sine waves displacing each vertex along z (one
// wave alone reads as mechanical, not cloth-like), amplitude tapered from
// zero at the hoist edge -- pinned, like a real flag attached to a pole
// -- up to full amplitude at the free trailing edge. Geometry is a
// subdivided plane, a few hundred vertices, cheap at 60fps. Normals are
// recomputed every frame so the ripples actually catch the scene's
// lighting instead of looking flat-shaded.

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WIDTH = 1.0;
const HEIGHT = 0.6;
const SEGMENTS_X = 24;
const SEGMENTS_Y = 16;
const RIPPLE_AMPLITUDE = 0.055;

function createUaeFlagTexture(): THREE.CanvasTexture | null {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  // Matches this plane's own ~1:0.6 aspect ratio rather than a real
  // flag's 1:2 fabric ratio -- the bands should land proportionally on
  // the geometry actually used here, not on an unrelated ratio.
  canvas.height = 307;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;
  const hoistWidth = w * 0.25;
  const stripeHeight = h / 3;

  ctx.fillStyle = "#ce1126"; // red, hoist-side vertical band
  ctx.fillRect(0, 0, hoistWidth, h);

  ctx.fillStyle = "#00732f"; // green, top
  ctx.fillRect(hoistWidth, 0, w - hoistWidth, stripeHeight);

  ctx.fillStyle = "#ffffff"; // white, middle
  ctx.fillRect(hoistWidth, stripeHeight, w - hoistWidth, stripeHeight);

  ctx.fillStyle = "#000000"; // black, bottom
  ctx.fillRect(hoistWidth, stripeHeight * 2, w - hoistWidth, h - stripeHeight * 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function WavingFlag({
  position = [0.09, 3.55, 0] as [number, number, number],
}: {
  position?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(0);
  const texture = useMemo(() => createUaeFlagTexture(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(WIDTH, HEIGHT, SEGMENTS_X, SEGMENTS_Y);
    // Shift so the hoist (pole-side) edge sits at local x=0 and the free
    // trailing edge at x=WIDTH, instead of the default centered -W/2..W/2
    // -- makes the taper math below (x / WIDTH) read directly as
    // "0 at the pin, 1 at the free edge."
    geo.translate(WIDTH / 2, 0, 0);
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      texture?.dispose();
      geometry.dispose();
    };
  }, [texture, geometry]);

  useFrame((_, delta) => {
    clockRef.current += delta;
    const t = clockRef.current;
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const taper = x / WIDTH;
      const wave1 = Math.sin(x * 6 - t * 3 + y * 1.5);
      const wave2 = Math.sin(x * 9 - t * 4.5 + y * 0.7) * 0.5;
      pos.setZ(i, (wave1 + wave2) * RIPPLE_AMPLITUDE * taper);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={0.65} metalness={0} />
    </mesh>
  );
}
