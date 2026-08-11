// Shared blur-up placeholder for next/image. Every photo in this project
// is referenced by a plain string path into public/ (see site-images.ts),
// not a static ES import, so Next can't auto-generate a per-image
// blurDataURL -- this is one small flat-color placeholder reused across
// every photo slot instead, so the gray-box pop-in is replaced with a
// soft fade regardless of network speed. URL-encoded (not base64) so it
// works identically whether imported into a server or client component.

const shimmerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="#e7e9ee"/></svg>`;

export const BLUR_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(shimmerSvg)}`;
