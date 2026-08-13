"use client";

// Reduced-motion fallback for FlagpoleShowcase.tsx -- a static photo plus
// the same four spec rows, laid out plainly instead of as an interactive
// 3D rotation. Same spirit as VideoHeroMedia.tsx's poster-image fallback:
// the content is always present, just not animated. Reuses the same
// flagpoleCallouts content as the animated version -- one source of
// truth for the four facts, not two copies.

import Image from "next/image";
import { heroImage } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { flagpoleCallouts } from "@/lib/flagpole-showcase-content";
import { useDirection } from "@/lib/direction-context";

export function FlagpoleShowcaseStatic() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";

  return (
    <div className="section-x section-y bg-mist2">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] w-full max-w-[440px] flex-shrink-0 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="440px"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            {isAr ? "مصممة لتدوم" : "Built To Last"}
          </div>
          <h2 className="text-[28px] font-bold leading-[1.15] text-ink">
            {isAr ? "كل تفصيل، مدروس هندسيًا" : "Every Detail, Engineered"}
          </h2>
          <div className="flex flex-col divide-y divide-border">
            {flagpoleCallouts.map((c) => (
              <div key={c.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue/[0.08] text-blue">
                  <c.icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <div className="mb-1 text-[15px] font-semibold text-ink">{isAr ? c.statAr : c.stat}</div>
                  <div className="text-sm leading-relaxed text-ink/65">{isAr ? c.descriptionAr : c.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
