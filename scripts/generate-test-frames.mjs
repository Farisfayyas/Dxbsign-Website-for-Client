// Placeholder-frame generator for public/images/flagpole-frames/ --
// numbered, colored circles standing in for the real Blender turntable
// render (scripts/render-flagpole-frames.py) until those 90 WebP frames
// exist. Lets FlagpoleFrameSequence.tsx's scrubber mechanism (preloading,
// frame selection, contain-fit drawing) be built and verified without
// waiting on the real render, same "build against a placeholder" pattern
// used for the pole model itself. Re-run any time (e.g. after changing
// FRAME_COUNT) to regenerate; overwritten wholesale once the real frames
// are dropped in.
import sharp from "sharp";
import { mkdirSync } from "fs";

const OUT_DIR = "public/images/flagpole-frames";
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 1500;
const COUNT = 90;

for (let i = 1; i <= COUNT; i++) {
  const hue = Math.round((i / COUNT) * 360);
  const svg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="hsl(${hue},70%,55%)" fill-opacity="0.35"/>
      <circle cx="${W / 2}" cy="${H * 0.4}" r="260" fill="hsl(${hue},80%,50%)"/>
      <text x="50%" y="42%" font-size="140" font-family="sans-serif" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${String(i).padStart(2, "0")}</text>
      <rect x="0" y="${H - 220}" width="${W}" height="220" fill="#00000022"/>
    </svg>`;
  await sharp(Buffer.from(svg))
    .webp({ quality: 80 })
    .toFile(`${OUT_DIR}/frame-${String(i).padStart(3, "0")}.webp`);
}

console.log(`Wrote ${COUNT} test frames to ${OUT_DIR}`);
