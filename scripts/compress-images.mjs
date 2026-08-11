// Batch-recompresses everything in public/images/ over a size threshold,
// in place -- same filenames/paths, so no code elsewhere needs to change.
// JPEGs get re-encoded at a visually-lossless quality; PNGs get maximum
// lossless PNG compression (format/extension is kept as-is on purpose --
// swapping a photographic PNG to JPEG bytes under a ".png" name would
// save more but leaves a mismatched, fragile file on disk).
//
// Rerun any time more source photos are added -- see README/plan history
// for why this exists.
//
// Usage: node scripts/compress-images.mjs

import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..", "public", "images");
const MIN_SIZE = 250 * 1024; // only touch files over ~250KB

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function compressOne(path) {
  const before = (await stat(path)).size;
  if (before < MIN_SIZE) return null;

  const ext = extname(path).toLowerCase();
  const original = await readFile(path);
  let output;

  if (ext === ".jpg" || ext === ".jpeg") {
    output = await sharp(original).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  } else if (ext === ".png") {
    output = await sharp(original).png({ compressionLevel: 9, effort: 10 }).toBuffer();
  } else {
    return null; // leave anything else (svg, etc.) untouched
  }

  if (output.length >= before) return { path, before, after: before, skipped: true };

  await writeFile(path, output);
  return { path, before, after: output.length, skipped: false };
}

const files = await walk(ROOT);
let totalBefore = 0;
let totalAfter = 0;
let touched = 0;

const failed = [];

for (const file of files) {
  let result;
  try {
    result = await compressOne(file);
  } catch (err) {
    failed.push({ path: file, message: err.message });
    continue;
  }
  if (!result) continue;
  totalBefore += result.before;
  totalAfter += result.after;
  if (!result.skipped) {
    touched++;
    const pct = (100 * (1 - result.after / result.before)).toFixed(0);
    console.log(`${result.path.replace(ROOT, "images")}  ${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB  (-${pct}%)`);
  }
}

if (failed.length) {
  console.log(`\n${failed.length} file(s) skipped due to a decode/encode error (left untouched):`);
  for (const f of failed) console.log(`  ${f.path.replace(ROOT, "images")}: ${f.message.split("\n")[0]}`);
}

console.log(`\n${touched} files recompressed.`);
console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
