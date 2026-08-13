"use client";

// Projects page body, split out of app/projects/page.tsx so it can read
// useDirection() for the Arabic toggle -- same reasoning as
// components/home/HomeContent.tsx.

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileFloatingActions } from "@/components/layout/MobileFloatingActions";
import { CTABand } from "@/components/ui/CTABand";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { useDirection } from "@/lib/direction-context";

export function ProjectsContent() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";

  return (
    <>
      <SiteHeader />
      <main>
        <div className="section-x max-w-[820px] pb-0 pt-[clamp(40px,6vw,72px)]">
          <div className="mb-4 font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            {isAr ? "مشاريعنا" : "Projects"}
          </div>
          <h1 className="mb-5 text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-ink">
            {isAr ? "أُنجزت في أبوظبي ودولة الإمارات." : "Delivered across Abu Dhabi and the UAE."}
          </h1>
          <p className="text-[17px] leading-relaxed text-ink/80">
            {isAr
              ? "مجموعة مختارة من مشاريع سواري الأعلام واللافتات والإرشاد والتوجيه، أُنجزت لعملاء من القطاعات الحكومية والفندقية والتجارية. اختر صورة لعرضها بحجم أكبر."
              : "A selection of flagpole, signage, and wayfinding projects completed for government, hospitality, and commercial clients. Select an image to view it larger."}
          </p>
        </div>

        <ProjectsGrid />

        <CTABand heading={isAr ? "هل لديك مشروع مشابه؟" : "Have a similar project in mind?"} variant="dark" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileFloatingActions />
    </>
  );
}
