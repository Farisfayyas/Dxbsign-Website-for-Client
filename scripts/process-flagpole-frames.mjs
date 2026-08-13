// One-time (re-runnable) processor: takes the raw PNG frames split from
// the AI-generated turntable video (currently an animated WebP export,
// split via scripts/split-webp-source.mjs -- see the Round 6 note below
// for why this replaced the original ezgif MP4->PNG extraction) and
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
//   node scripts/process-flagpole-frames.mjs           (full 64 desktop
//     + 32 mobile frames -- strided down from the 192 source frames, see
//     the Round 3/6 notes below -- into the real public/images/ paths)
//
// Expects SOURCE_DIR below to contain frame-NNN.png files. Currently
// produced by scripts/split-webp-source.mjs from the animated WebP
// export -- re-run that first if SOURCE_DIR is empty/stale.
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
//
// Round 3: Round 2 still weren't enough on a real HiDPI screen -- this
// dev environment's browser reports devicePixelRatio 1, which is exactly
// why Round 2 tested clean here but not for the actual user. On a real
// 2x display the canvas backing buffer at a typical pinned-viewport
// height can reach ~1800-2000 physical px; a 1.5x buildtime upscale
// (1014px tall) still leaves the browser stretching close to 2x further
// at runtime, past what WebP quality or canvas smoothing can address --
// neither touches an actual resolution gap. Fix, matching the resolution
// for framerate trade the user asked for directly:
//   - DESKTOP_STRIDE processes every 2nd source frame instead of all 240
//     (120 output frames, renumbered sequentially like mobile already
//     was), freeing real budget to raise DESKTOP_UPSCALE 1.5 -> 2.5.
//   - MOBILE_STRIDE doubled (4 -> 8, 60 -> 30 frames) for the same
//     reason, and mobile switched from a plain half-crop downscale to a
//     mild upscale of its own (MOBILE_UPSCALE) -- mobile had the
//     identical runtime-stretch problem, just unnoticed until measured.
//   - CROP.top moved up (40 -> 5) and CROP.height grown to match (676 ->
//     711, same bottom edge at source y=716) -- adds real background
//     headroom above the topmost scanned content (the finial), which
//     FlagpoleFrameSequence.tsx's CONTENT_SCALE/VERTICAL_ANCHOR needs to
//     have real room to work with, confirmed live: without it the
//     subject was filling ~94% of the canvas height on a typical wide
//     desktop viewport regardless of anchor fraction.
//
// Round 6: the flag's rippling/diagonal edges (not the straight ones --
// those were always clean) showed a real, confirmed staircase with a
// color fringe at each step, zoomed in directly. Traced to the source:
// the identical stepping was already present in the raw ezgif-frame-*.png
// files at native 1280x720, before this script touches a single pixel --
// a textbook block-based video compression artifact, not something the
// crop/key/upscale steps introduced. No amount of retuning those levers
// fixes a defect that already exists in the source pixels.
//
// Source swapped entirely: SOURCE_DIR now points at frames split (via
// scripts/split-webp-source.mjs, sharp's native animated-WebP reading,
// no ffmpeg needed) from a directly-exported animated WebP turntable
// instead of ezgif's MP4->PNG extraction. Confirmed live before
// committing to the swap -- zoomed the exact same diagonal edge in the
// new source and it's a smooth anti-aliased gradient, no stepping.
// This is 192 frames (was 240), a different background color (darker
// navy, ~rgb(22,45,81) vs the old lighter blue) requiring re-derived
// KEY_LOW/KEY_HIGH, and a thin black letterbox bar at the very top/
// bottom few rows (excluded from the bounding-box scan below, and
// already outside the crop). Re-scanning the bounding box on this new
// source landed at x:[200,942] y:[60,712] -- close enough to the old
// source's [200,942]x[61,713] that the existing CROP box (with its
// Round-3 finial headroom already baked in) carries over unchanged.
// DESKTOP_STRIDE/MOBILE_STRIDE recomputed against the new 192-frame
// total to land near the same ~80/~30 output counts already proven
// reliable for the ImageBitmap loading fix's decode budget.

import sharp from "sharp";
import { readdirSync, mkdirSync, rmSync, existsSync } from "fs";
import path from "path";

const SOURCE_DIR =
  "C:/Users/Faris/AppData/Local/Temp/claude/C--Users-Faris-Downloads-uni-data-structures/5f8ec50f-1fff-4358-9650-55c06f57379a/scratchpad/source-frames-v2";

const TEST_MODE = process.argv.includes("--test");
const FRAME_COUNT = 192; // total source frames available (Round 6 source), not the output count for either tier
// Round 5: even with windowed, ImageBitmap-based loading in
// FlagpoleFrameSequence.tsx (bounded simultaneous memory, deterministic
// release via .close()), a real scroll-through still risked a permanent
// freeze once cumulative distinct-frame decodes crossed roughly 90-115
// at 2502x2275 -- confirmed live that this held regardless of loading
// strategy, pointing at a hard decode-resource ceiling for frames this
// large, not something fixable purely in how they're requested. Strides
// below are chosen to land near that same proven-safe ~80/~30 output
// count against the new 192-frame source (see Round 6 note above), not
// the original 240.
const DESKTOP_STRIDE = 3; // every 3rd source frame -> 64 frames on desktop
const MOBILE_STRIDE = 6; // every 6th frame -> 32 frames on mobile
const TEST_FRAMES = [1, 48, 96, 144, 192];

const DESKTOP_OUT = TEST_MODE ? "_test-frame-output/desktop" : "public/images/flagpole-frames";
const MOBILE_OUT = TEST_MODE ? "_test-frame-output/mobile" : "public/images/flagpole-frames/mobile";

// Crop box: scanned safe bounds [200,942] x [61,713] on the original
// source. Top extended well past the +/-20px margin used originally (5
// instead of 40) to give real background headroom above the topmost
// content (the finial) for FlagpoleFrameSequence.tsx's vertical anchor
// to work with -- height grown to match so the bottom edge (source
// y=716) is unchanged and no existing bottom content is lost. Re-scanned
// against the Round 6 source (excluding its thin top/bottom letterbox
// bars, see the header note) and landed at [200,942] x [60,712] -- close
// enough that these same values carry over unchanged rather than being
// re-tuned for a few pixels of difference. Clamped to the source's
// 1280x720.
const CROP = { left: 180, top: 5, width: 962 - 180, height: 716 - 5 };

// Both lanczos3, not left entirely to the browser's own runtime stretch.
// Desktop's target is sized for a real HiDPI pinned-viewport buffer;
// mobile's is sized for a real HiDPI phone buffer (~800-900px wide) --
// both derived and verified live, see the Round 3/4 notes above, not
// just picked to look reasonable.
//
// Round 4: 2.5x (Round 3's number) was sized against a moderate
// ~1425-1728 CSS-px-wide viewport and left little to no runtime
// upscale there, but a maximized browser on a large external/5K
// monitor (~2560 CSS px wide, dpr capped at 2) pushes the canvas
// backing buffer to ~2600px tall -- still a real, if modest (~1.1-1.3x),
// runtime stretch on top of the buildtime one. Raised to 3.2x
// (782 x 3.2 = ~2502px shipped height) to close that gap too. This is
// a genuine ceiling, not a bug fix, though: it improves interpolation
// quality up to the source crop's real captured-detail limit
// (782x711px, from a 720p-class source video) -- it cannot manufacture
// detail beyond that. Confirmed via direct sharp metadata + alpha-
// channel pixel sampling that DPR scaling, canvas smoothing, and edge-
// key anti-aliasing were all already correct before this change; this
// was the one concrete, unclosed gap found.
const DESKTOP_UPSCALE = 3.2;
const MOBILE_UPSCALE = 1.1;
const SHARPEN = { sigma: 0.8, m1: 0.5, m2: 0.3 }; // mild -- counteracts upscale softening, checked for edge haloing before shipping
const WEBP_QUALITY = 95;

// Round 6 source has a darker, more saturated navy background than the
// original (~rgb(22,45,81), sampled across corners/frames: diff 34-44,
// a tight consistent band) -- re-derived against real subject colors
// sampled directly (red -131, green -35, white/black 0, pole -3, gold
// -82 -- max real-subject value ~0 to -3), not reused from the old
// source's thresholds.
const KEY_LOW = 8; // (b - max(r,g)) at or below this: fully opaque (definitely subject)
const KEY_HIGH = 30; // (b - max(r,g)) at or above this: fully transparent (definitely background)

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
let sourceFramesProcessed = 0;

for (const i of frameNumbers) {
  const needsDesktop = TEST_MODE || (i - 1) % DESKTOP_STRIDE === 0;
  const needsMobile = TEST_MODE || (i - 1) % MOBILE_STRIDE === 0;
  // Every mobile-stride frame is also a desktop-stride frame (both
  // strides start at frame 1 and desktop's is a divisor of mobile's), so
  // this never skips a frame either tier actually needs -- it just
  // avoids the crop+chroma-key cost for the ~half of source frames
  // neither output uses anymore now that desktop itself is strided.
  if (!needsDesktop && !needsMobile) continue;

  const srcPath = path.join(SOURCE_DIR, `frame-${String(i).padStart(3, "0")}.png`);
  const img = await processFrame(srcPath);
  sourceFramesProcessed++;

  if (needsDesktop) {
    const desktopIndex = TEST_MODE ? i : Math.floor((i - 1) / DESKTOP_STRIDE) + 1;
    const desktopPath = path.join(DESKTOP_OUT, `frame-${String(desktopIndex).padStart(3, "0")}.webp`);
    await img
      .clone()
      .resize({ width: Math.round(CROP.width * DESKTOP_UPSCALE), kernel: "lanczos3" })
      .sharpen(SHARPEN)
      .webp({ quality: WEBP_QUALITY })
      .toFile(desktopPath);
    desktopWritten++;
  }

  if (needsMobile) {
    const mobileIndex = TEST_MODE ? i : Math.floor((i - 1) / MOBILE_STRIDE) + 1;
    const mobilePath = path.join(MOBILE_OUT, `frame-${String(mobileIndex).padStart(3, "0")}.webp`);
    await img
      .clone()
      .resize({ width: Math.round(CROP.width * MOBILE_UPSCALE), kernel: "lanczos3" })
      .sharpen(SHARPEN)
      .webp({ quality: WEBP_QUALITY })
      .toFile(mobilePath);
    mobileWritten++;
  }

  if (!TEST_MODE && sourceFramesProcessed % 20 === 0) {
    console.log(`processed source frame ${i}/${FRAME_COUNT} (desktop: ${desktopWritten}, mobile: ${mobileWritten})`);
  }
}

console.log(`Done -- desktop: ${desktopWritten} frames, mobile: ${mobileWritten} frames`);
if (TEST_MODE) console.log("Test output in _test-frame-output/ -- inspect before running without --test");
