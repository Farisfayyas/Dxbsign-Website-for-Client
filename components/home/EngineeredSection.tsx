import Image from "next/image";
import { Wind, Layers, Palette, ShieldCheck } from "lucide-react";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import type { SiteImage } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";

// arabesco's "text reveal + two offset photo cards" pattern (docx
// "second pic"): copy on one side, a stacked/offset image pair on the
// other, everything staggering in together. The whole row is wrapped in
// its own capped container (instead of stretching to the full section
// width) so the three blocks sit close together -- on a wide screen,
// two ~440px-capped blocks inside a full-bleed grid left a large dead
// zone between them.
//
// Wind Rating, Material, and Finish below are industry-typical figures
// for tapered aluminum/GRP flagpoles in a Gulf climate, the same
// not-yet-client-confirmed values used in FlagpoleSpecs.tsx -- see
// project README before launch. ISO 9001:2015 is a confirmed, live fact
// used elsewhere on the site (footer, FAQ).
const specs = [
  { icon: Wind, label: "Wind Rating", value: "Up to 150 km/h" },
  { icon: Layers, label: "Material", value: "Aluminum or GRP" },
  { icon: Palette, label: "Finish", value: "UV & salt-air resistant" },
  { icon: ShieldCheck, label: "Certified", value: "ISO 9001:2015" },
];

export function EngineeredSection({ images }: { images: [SiteImage, SiteImage] }) {
  return (
    <div className="section-x section-y bg-mist2">
      <div className="mx-auto flex max-w-[1220px] flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <StaggerReveal
          className="flex flex-col gap-5 lg:max-w-[440px]"
          stagger={0.15}
          threshold={0}
          rootMargin="0px 0px -45% 0px"
        >
          <div className="font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            Built For This Climate
          </div>
          <h2 className="max-w-[440px] text-[30px] font-bold leading-[1.15] text-ink">
            Engineered for the UAE&rsquo;s Climate
          </h2>
          <p className="max-w-[440px] text-[15px] leading-relaxed text-ink/75">
            Every flagpole and structure we manufacture is built to withstand sustained desert heat, coastal humidity, and high wind loads, using materials and finishes specified for long-term outdoor performance in the Gulf. It is not general-purpose equipment adapted for local conditions. It is designed for them from the start.
          </p>
        </StaggerReveal>

        <StaggerReveal
          className="flex w-full flex-col gap-5 sm:w-auto lg:w-[190px] lg:flex-shrink-0"
          stagger={0.1}
          threshold={0}
          rootMargin="0px 0px -45% 0px"
        >
          {specs.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue/[0.08] text-blue">
                <s.icon size={16} strokeWidth={1.75} />
              </span>
              <div>
                <div className="font-serif text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink/50">
                  {s.label}
                </div>
                <div className="mt-0.5 text-[13.5px] font-medium leading-snug text-ink">{s.value}</div>
              </div>
            </div>
          ))}
        </StaggerReveal>

        <div className="relative mx-auto h-[420px] w-full max-w-[485px] flex-shrink-0 sm:h-[485px]">
          <div className="absolute left-0 top-0 h-[70%] w-[72%] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              sizes="360px"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[58%] w-[58%] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              sizes="290px"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
