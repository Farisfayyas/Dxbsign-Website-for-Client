import Image from "next/image";

// About hero background: muted looping video when one is configured
// (Hajster's pattern — see build-spec.md), falling back to the real
// skyline photo otherwise/always as the poster and for reduced-data or
// reduced-motion cases. Video source intentionally left unset until
// Faris picks a candidate (sent separately for review — video content
// can't be previewed from this environment the way photos can).
const VIDEO_SRC: string | null = null;

export function AboutHeroMedia({ posterSrc, posterAlt }: { posterSrc: string; posterAlt: string }) {
  return (
    <>
      {/* Always present as the base layer: reduced-motion fallback, and
          what shows while/if the video never loads. */}
      <Image src={posterSrc} alt={posterAlt} fill priority sizes="100vw" className="object-cover" />
      {VIDEO_SRC && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={posterAlt}
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </>
  );
}
