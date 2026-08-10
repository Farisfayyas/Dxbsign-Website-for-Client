import Image from "next/image";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import type { SiteImage } from "@/lib/site-images";

// arabesco's "text reveal + two offset photo cards" pattern (docx
// "second pic"): copy on one side, a stacked/offset image pair on the
// other, everything staggering in together.
export function EngineeredSection({ images }: { images: [SiteImage, SiteImage] }) {
  return (
    <div className="section-x section-y bg-mist2">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <StaggerReveal className="flex flex-col gap-5" stagger={0.15}>
          <div className="font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            Built For This Climate
          </div>
          <h2 className="max-w-[440px] text-[30px] font-bold leading-[1.15] text-ink">
            Engineered for the UAE&rsquo;s Climate
          </h2>
          <p className="max-w-[440px] text-[15px] leading-relaxed text-ink/75">
            Every flagpole and structure we manufacture is built to withstand sustained desert heat, coastal humidity, and high wind loads, using materials and finishes specified for long-term outdoor performance in the Gulf. It is not general-purpose equipment adapted for local conditions. It is designed for them from the start.
          </p>
          <div />
        </StaggerReveal>

        <div className="relative mx-auto h-[380px] w-full max-w-[440px] sm:h-[440px]">
          <div className="absolute left-0 top-0 h-[70%] w-[72%] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <Image src={images[0].src} alt={images[0].alt} fill sizes="320px" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[58%] w-[58%] overflow-hidden border-4 border-paper shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <Image src={images[1].src} alt={images[1].alt} fill sizes="260px" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
