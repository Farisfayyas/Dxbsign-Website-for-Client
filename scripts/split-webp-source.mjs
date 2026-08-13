// One-time (re-runnable) split: extracts all pages from the animated
// WebP turntable export into individually numbered PNGs, matching the
// frame-NNN.png naming process-flagpole-frames.mjs's SOURCE_DIR expects.
// Not part of the regular build -- run manually when a new source
// export needs splitting, then point process-flagpole-frames.mjs's
// SOURCE_DIR at the output directory it prints.
import sharp from "sharp";
import { mkdirSync } from "fs";

const WEBP_PATH =
  "C:/Users/Faris/Downloads/Flagpole_rotating_on_turntable_202608122035-ezgif.com-video-to-webp-converter.webp";
const OUT_DIR =
  "C:/Users/Faris/AppData/Local/Temp/claude/C--Users-Faris-Downloads-uni-data-structures/5f8ec50f-1fff-4358-9650-55c06f57379a/scratchpad/source-frames-v2";

mkdirSync(OUT_DIR, { recursive: true });

const meta = await sharp(WEBP_PATH, { pages: -1 }).metadata();
const pageCount = meta.pages;
console.log(`Splitting ${pageCount} pages (${meta.width}x${meta.pageHeight}) ...`);

for (let n = 0; n < pageCount; n++) {
  const outPath = `${OUT_DIR}/frame-${String(n + 1).padStart(3, "0")}.png`;
  await sharp(WEBP_PATH, { page: n }).png().toFile(outPath);
  if ((n + 1) % 40 === 0) console.log(`  ${n + 1}/${pageCount}`);
}

console.log(`Done -- ${pageCount} frames written to ${OUT_DIR}`);
