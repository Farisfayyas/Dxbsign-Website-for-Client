"use client";

// About page body, split out of app/about/page.tsx so it can read
// useDirection() for the Arabic toggle -- same reasoning as
// components/home/HomeContent.tsx (page.tsx must stay a server
// component to keep its `metadata` export).

import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileFloatingActions } from "@/components/layout/MobileFloatingActions";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { CTABand } from "@/components/ui/CTABand";
import { ProcessBand } from "@/components/ui/ProcessBand";
import { ClientHonorRoll } from "@/components/ui/ClientHonorRoll";
import { NumberedCard } from "@/components/ui/NumberedCard";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { CompanyTimeline } from "@/components/about/CompanyTimeline";
import { whyChooseUsFull } from "@/lib/site-config";
import { skylineImage } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { useDirection } from "@/lib/direction-context";

export function AboutContent() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero — real Dubai night skyline (the panoramic photo restored by
            request; the looping video moved to Contact's hero instead). */}
        <div className="relative overflow-hidden">
          <Image
            src={skylineImage.src}
            alt={skylineImage.alt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/48 to-ink/78" />
          <div className="section-x relative py-[clamp(56px,9vw,108px)] pb-[calc(clamp(56px,9vw,108px)+48px)] sm:pb-[calc(clamp(56px,9vw,108px)+72px)]">
            <StaggerReveal className="flex flex-col gap-4" stagger={0.18} y={22}>
              <div className="font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(78%_0.1_250)]">
                {isAr ? "من نحن" : "About Us"}
              </div>
              <h1 className="max-w-[720px] text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
                {isAr ? "ثمانية عشر عامًا من التصنيع وفق المعايير الدولية." : "Eighteen years manufacturing to international standard."}
              </h1>
              <p className="max-w-[720px] text-[17px] leading-relaxed text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                {isAr
                  ? "شركة دبي ساين ذ.م.م مُصنّعة سواري أعلام ولافتات، ومقرها في آيكاد 3، مصفح، أبوظبي. منذ عام 2008 ونحن نقدّم خدمات التصميم والتصنيع والتركيب والصيانة لسواري الأعلام واللوحات الإعلانية ولافتات السلامة، لعملاء من القطاعات الحكومية والفندقية والتجارية والصناعية في أبوظبي ودبي وسائر أنحاء دولة الإمارات. يُنتَج كل مشروع داخليًا وفق معايير ومواصفات عالمية الجودة، وبأسعار متوافقة مع السوق الإقليمي."
                  : "Dubai Sign LLC is a flagpole and signage manufacturer based in ICAD 3, Mussafah, Abu Dhabi. Since 2008 we have delivered design, manufacture, installation, and maintenance for flagpoles, signboards, and safety signage to government, hospitality, retail, and industrial clients across Abu Dhabi, Dubai, and the wider UAE. Every project is produced in-house to international-standard quality and specification, at prices benchmarked to the regional market."}
              </p>
            </StaggerReveal>
          </div>
          <WaveDivider animated={false} />
        </div>

        {/* Company timeline */}
        <Reveal>
          <div className="section-x section-y bg-mist2">
            <div className="mb-2 font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
              {isAr ? "تاريخنا" : "Our History"}
            </div>
            <h2 className="mb-12 text-[26px] font-bold text-ink">{isAr ? "مسيرتنا الزمنية" : "Our Timeline"}</h2>
            <CompanyTimeline />
          </div>
        </Reveal>

        {/* Why Choose Us */}
        <Reveal>
          <div className="section-x section-y">
            <h2 className="mb-8 text-[26px] font-bold text-ink">{isAr ? "لماذا نحن" : "Why Choose Us"}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px bg-border">
              {whyChooseUsFull.map((w) => (
                <NumberedCard
                  key={w.num}
                  num={w.num}
                  title={isAr ? w.titleAr : w.title}
                  desc={isAr ? w.descAr : w.desc}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <ProcessBand />

        {/* Clients & Credentials */}
        <Reveal>
          <div className="section-x section-y bg-mist2">
            <StaggerReveal stagger={0.15} y={18}>
              <div className="mb-2 font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
                {isAr ? "عملاؤنا واعتماداتنا" : "Clients & Credentials"}
              </div>
              <h2 className="mb-7 text-[26px] font-bold text-ink">
                {isAr ? "موثوقون لدى الجهات الحكومية وقادة الصناعة" : "Trusted by Government & Industry Leaders"}
              </h2>
              <ClientHonorRoll boxed />
            </StaggerReveal>
          </div>
        </Reveal>

        <CTABand heading={isAr ? "جاهزون لبدء مشروعك؟" : "Ready to start your project?"} variant="light" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileFloatingActions />
    </>
  );
}
