import Image from "next/image";
import { clientLogos } from "@/lib/site-images";

// Auto-scrolling infinite loop, real client logos (see build-spec.md's
// arabesco-inspired "logo carousel" pattern). Pure-CSS animation (not
// framer-motion / not JS-driven) — cheap, smooth, and pauses cleanly on
// hover via group-hover without any client-side state.
export function ClientLogoCarousel() {
  const track = [...clientLogos, ...clientLogos];

  return (
    <div className="border-y border-border-soft bg-white py-8">
      <div className="section-x mb-5 text-center font-serif text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45">
        Trusted By
      </div>
      <div
        className="group overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max items-center gap-16 [animation:logo-scroll_36s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((logo, i) => (
            <div key={logo.src + i} className="flex h-12 w-[130px] flex-shrink-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={48}
                className="h-auto max-h-12 w-auto max-w-[130px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
