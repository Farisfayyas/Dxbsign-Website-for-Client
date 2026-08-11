// Recompresses public/videos/about-hero-dubai-timelapse.mp4 in place --
// downscales 1080p -> 720p and re-encodes at a CRF that stays visually
// clean for a muted, blurred-behind-text background loop (this content
// is a smooth night timelapse, not fine detail, so it tolerates a fairly
// aggressive encode with no visible banding/blocking). Original export
// was ~18.6MB; this brings it to ~2MB.
//
// Rerun the same way if a new/longer hero video is ever swapped in.
//
// Usage: node scripts/compress-video.mjs

import { execFileSync } from "node:child_process";
import { existsSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";
import ffmpegPath from "ffmpeg-static";

const DIR = join(import.meta.dirname, "..", "public", "videos");
const SRC = join(DIR, "about-hero-dubai-timelapse.mp4");
const TMP = join(DIR, "about-hero-dubai-timelapse.compressed.mp4");

if (!existsSync(SRC)) {
  console.error(`Not found: ${SRC}`);
  process.exit(1);
}

const before = statSync(SRC).size;

execFileSync(ffmpegPath, [
  "-y",
  "-i", SRC,
  "-vf", "scale=1280:720",
  "-c:v", "libx264",
  "-preset", "medium",
  "-crf", "27",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  "-an",
  TMP,
], { stdio: "inherit" });

const after = statSync(TMP).size;
renameSync(TMP, SRC);

console.log(`\n${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`);
