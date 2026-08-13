"use client";

// Services page body, split out of app/services/page.tsx so it can read
// useDirection() for the Arabic toggle -- same reasoning as
// components/home/HomeContent.tsx.

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileFloatingActions } from "@/components/layout/MobileFloatingActions";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { ProcessBand } from "@/components/ui/ProcessBand";
import { FlagpoleSpecs } from "@/components/services/FlagpoleSpecs";
import { services } from "@/lib/site-config";
import { serviceImages } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { useDirection } from "@/lib/direction-context";

export function ServicesContent() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";

  return (
    <>
      <SiteHeader />
      <main>
        <div className="section-x max-w-[820px] pb-0 pt-[clamp(40px,6vw,72px)]">
          <div className="mb-4 font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            {isAr ? "خدماتنا" : "Services"}
          </div>
          <h1 className="mb-5 text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-ink">
            {isAr ? "تصنيع متكامل لسواري الأعلام واللافتات." : "Full-scope flagpole and signage manufacturing."}
          </h1>
          <p className="text-[17px] leading-relaxed text-ink/80">
            {isAr
              ? "ثماني خطوط إنتاج، وفريق واحد مسؤول عن كل مرحلة، من المواصفات الأولية وحتى التركيب والصيانة."
              : "Eight product lines, one accountable team, from initial specification through installation and maintenance."}
          </p>
        </div>

        <Reveal>
          <div className="section-x section-y">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
              {services.map((s) => {
                const img = serviceImages[s.key];
                return (
                  <div
                    key={s.key}
                    className="group overflow-hidden rounded-xl border border-border-soft bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                      {img && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        />
                      )}
                      <div className="absolute left-3 top-3 bg-ink/85 px-2.5 py-1 font-serif text-[11px] font-semibold text-white backdrop-blur-sm">
                        {s.num}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5 p-6">
                      <div className="text-lg font-semibold text-ink">{isAr ? s.titleAr : s.title}</div>
                      <div className="text-sm leading-relaxed text-ink/70">{isAr ? s.descAr : s.desc}</div>
                      <Link href="/projects" className="mt-1 text-[13px] font-semibold text-blue hover:underline">
                        {isAr ? "مشاريع ذات صلة ←" : "See related projects →"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <FlagpoleSpecs />

        <ProcessBand />

        <CTABand heading={isAr ? "بحاجة إلى عرض سعر وفق مواصفاتك؟" : "Need a specification-matched quote?"} variant="plain" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileFloatingActions />
    </>
  );
}
