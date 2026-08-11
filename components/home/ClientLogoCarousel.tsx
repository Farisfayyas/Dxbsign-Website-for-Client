import Image from "next/image";
import { clientLogos } from "@/lib/site-images";

// Auto-scrolling infinite loop, real client logos (see build-spec.md's
// arabesco-inspired "logo carousel" pattern). Pure-CSS animation (not
// framer-motion / not JS-driven) — cheap, smooth, and pauses cleanly on
// hover via group-hover without any client-side state. Sized to match
// arabesco's own treatment: a centered column, not edge-to-edge, with
// larger, full-color logos (not grayscale-by-default).
export function ClientLogoCarousel() {
  const track = [...clientLogos, ...clientLogos];

  return (
    <div className="border-y border-border-soft bg-white py-12">
      <div className="section-x mb-7 text-center font-serif text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45">
        Trusted By
      </div>
      <div
        className="mx-auto w-full max-w-[92%] overflow-hidden md:max-w-[62%]"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max items-center gap-20 [animation:logo-scroll_34s_linear_infinite] motion-reduce:animate-none">
          {track.map((logo, i) => (
            <div key={logo.src + i} className="flex h-[72px] w-[160px] flex-shrink-0 items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={72}
                className="h-auto max-h-[72px] w-auto max-w-[160px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
