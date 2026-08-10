import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { ProcessBand } from "@/components/ui/ProcessBand";
import { NumberedCard } from "@/components/ui/NumberedCard";
import { services } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Flagpoles, signboards, 3D signs, indoor and outdoor signage, traffic and safety signs, wayfinding, window graphics, and displays, manufactured in Abu Dhabi.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])),
        }}
      />
      <SiteHeader />
      <main>
        <div className="section-x container-wide max-w-[820px] pb-0 pt-[clamp(40px,6vw,72px)]">
          <div className="mb-4 font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            Services
          </div>
          <h1 className="mb-5 text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Full-scope flagpole and signage manufacturing.
          </h1>
          <p className="text-[17px] leading-relaxed text-ink/80">
            Eight product lines, one accountable team, from initial specification through installation and maintenance.
          </p>
        </div>

        <Reveal>
          <div className="section-x section-y">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-px bg-border">
              {services.map((s) => (
                <NumberedCard
                  key={s.key}
                  num={s.num}
                  title={s.title}
                  desc={s.desc}
                  footer={
                    <Link href="/projects" className="mt-1 text-[13px] font-semibold text-blue hover:underline">
                      See related projects →
                    </Link>
                  }
                />
              ))}
            </div>
          </div>
        </Reveal>

        <ProcessBand />

        <CTABand heading="Need a specification-matched quote?" variant="plain" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
