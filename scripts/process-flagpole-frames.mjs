// One-time (re-runnable) processor: takes the raw PNG frames extracted
// from the AI-generated turntable video (ezgif frame-split output) and
// produces the two WebP sets FlagpoleFrameSequence.tsx actually serves --
// desktop (public/images/flagpole-frames/) and a lighter mobile set
// (public/images/flagpole-frames/mobile/), replacing the placeholder
// circles used to build and verify the scrubber mechanism.
//
// Crop box and background-key thresholds below were derived by directly
// scanning pixel data across all 240 source frames, not guessed from a
// few sample images. The subject's on-screen bounding box varies a lot
// by rotation angle -- front-view frames extend the flag rightward from
// the pole, rear-view frames swing it to the LEFT instead (same pole,
// opposite side, since we're now looking at its back) -- so the crop has
// to be wide enough to safely contain both extremes, not just whichever
// angle looks most "typical." Full-scan result: x in [200,942], y in
// [61,713] out of the source's 1280x720, with a small margin added below.
//
// Background removal: the source video was generated on a solid blue
// backdrop. First attempt keyed on (blue - red), which looked clean on
// red/white/black/pole/gold but produced a blotchy, partially-see-
// through green stripe -- lit green flag pixels turned out to have
// blue-minus-red in the 20-31 range (e.g. rgb(60,149,89)), overlapping
// the same threshold band used for the background, because green isn't
// primarily a red/blue relationship, it's blue vs GREEN.
// Fixed metric: blue minus the max of (red, green) -- i.e. is blue the
// dominant channel, not just ahead of red specifically. Background
// samples land at +36 to +48 across the frame's vignette (checked
// corners vs center). Every real subject color sampled directly --
// red, green (including its lit highlights), white, black, silver, gold
// -- lands at -145 to 0, a wide and consistent margin below that.
// Soft-thresholded (not a hard cutoff) so masked edges don't look
// jagged.
//
// Usage:
//   node scripts/process-flagpole-frames.mjs --test   (5 sample frames,
//     written to a throwaway folder for a visual check before committing
//     to the full run)
//   node scripts/process-flagpole-frames.mjs           (full 240 desktop
//     + 60 mobile frames, into the real public/images/ paths)
//
// Expects SOURCE_DIR below to contain the raw ezgif-frame-NNN.png files
// extracted from the sender's zip.
//
// Round 2 quality fix: the live result read as visibly pixelated even
// though the raw source PNGs looked clean -- pointing at this pipeline,
// not an inherent source-resolution ceiling. Three independent levers,
// all real:
//   1. WebP quality was under-tuned (82/78) purely out of unnecessary
//      file-size caution -- actual output landed near 10KB/frame, nowhere
//      close to a real constraint. Compression artifacts show up as
//      blockiness exactly in flat-color hard-edged regions, which is
//      what the flag's stripes are. Bumped to 95 for both sets.
//   2. Added a real pre-upscale (sharp's lanczos3 kernel, ~1.5x on the
//      desktop set) instead of leaving 100% of the scale-to-viewport work
//      to the browser's own canvas stretch at render time.
//   3. A light unsharp-mask pass afterward counteracts the softening
//      upscaling naturally introduces.
// (FlagpoleFrameSequence.tsx also got a matching canvas-side fix:
// imageSmoothingQuality explicitly set to "high".)

import sharp from "sharp";
import { readdirSync, mkdirSync, rmSync, existsSync } from "fs";
import path from "path";

const SOURCE_DIR =
  "C:/Users/Faris/AppData/Local/Temp/claude/C--Users-Faris-Downloads-uni-data-structures/5f8ec50f-1fff-4358-9650-55c06f57379a/scratchpad/source-frames";

const TEST_MODE = process.argv.includes("--test");
const FRAME_COUNT = 240;
const MOBILE_STRIDE = 4; // every 4th frame -> 60 frames on mobile
const TEST_FRAMES = [1, 60, 120, 180, 240];

const DESKTOP_OUT = TEST_MODE ? "_test-frame-output/desktop" : "public/images/flagpole-frames";
const MOBILE_OUT = TEST_MODE ? "_test-frame-output/mobile" : "public/images/flagpole-frames/mobile";

// Crop box: scanned safe bounds [200,942] x [61,713], +/-20px margin,
// clamped to the source's 1280x720.
const CROP = { left: 180, top: 40, width: 962 - 180, height: 716 - 40 };

const DESKTOP_UPSCALE = 1.5; // lanczos3, not left entirely to the browser's own runtime stretch
const SHARPEN = { sigma: 0.8, m1: 0.5, m2: 0.3 }; // mild -- counteracts upscale softening, checked for edge haloing before shipping
const WEBP_QUALITY = 95;

const KEY_LOW = 5; // (b - max(r,g)) at or below this: fully opaque (definitely subject)
const KEY_HIGH = 25; // (b - max(r,g)) at or above this: fully transparent (definitely background)

if (TEST_MODE && existsSync("_test-frame-output")) rmSync("_test-frame-output", { recursive: true });
mkdirSync(DESKTOP_OUT, { recursive: true });
mkdirSync(MOBILE_OUT, { recursive: true });

if (!TEST_MODE) {
  // Clear old placeholder frames so nothing stale lingers.
  for (const dir of [DESKTOP_OUT, MOBILE_OUT]) {
    for (const f of readdirSync(dir)) {
      if (f.endsWith(".webp")) rmSync(path.join(dir, f));
    }
  }
}

function keyBackground(data, width, height, channels) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, p = 0; i < data.length; i += channels, p += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const diff = b - Math.max(r, g);
    let alpha;
    if (diff <= KEY_LOW) alpha = 255;
    else if (diff >= KEY_HIGH) alpha = 0;
    else alpha = Math.round(255 * (1 - (diff - KEY_LOW) / (KEY_HIGH - KEY_LOW)));
    out[p] = r;
    out[p + 1] = g;
    out[p + 2] = b;
    out[p + 3] = alpha;
  }
  return out;
}

async function processFrame(srcPath) {
  const { data, info } = await sharp(srcPath).extract(CROP).raw().toBuffer({ resolveWithObject: true });
  const keyed = keyBackground(data, info.width, info.height, info.channels);
  return sharp(keyed, { raw: { width: info.width, height: info.height, channels: 4 } });
}

const frameNumbers = TEST_MODE ? TEST_FRAMES : Array.from({ length: FRAME_COUNT }, (_, i) => i + 1);
let desktopWritten = 0;
let mobileWritten = 0;

for (const i of frameNumbers) {
  const srcPath = path.join(SOURCE_DIR, `ezgif-frame-${String(i).padStart(3, "0")}.png`);
  const img = await processFrame(srcPath);

  const desktopPath = path.join(DESKTOP_OUT, `frame-${String(i).padStart(3, "0")}.webp`);
  await img
    .clone()
    .resize({ width: Math.round(CROP.width * DESKTOP_UPSCALE), kernel: "lanczos3" })
    .sharpen(SHARPEN)
    .webp({ quality: WEBP_QUALITY })
    .toFile(desktopPath);
  desktopWritten++;

  if ((i - 1) % MOBILE_STRIDE === 0 || TEST_MODE) {
    const mobileIndex = TEST_MODE ? i : Math.floor((i - 1) / MOBILE_STRIDE) + 1;
    const mobilePath = path.join(MOBILE_OUT, `frame-${String(mobileIndex).padStart(3, "0")}.webp`);
    await img
      .clone()
      .resize({ width: Math.round(CROP.width / 2), kernel: "lanczos3" })
      .sharpen(SHARPEN)
      .webp({ quality: WEBP_QUALITY })
      .toFile(mobilePath);
    mobileWritten++;
  }

  if (!TEST_MODE && i % 20 === 0) console.log(`processed ${i}/${FRAME_COUNT}`);
}

console.log(`Done -- desktop: ${desktopWritten} frames, mobile: ${mobileWritten} frames`);
if (TEST_MODE) console.log("Test output in _test-frame-output/ -- inspect before running without --test");
