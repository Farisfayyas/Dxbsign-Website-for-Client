import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
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
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | Why Choose Us",
  description:
    "18+ years manufacturing flagpoles and signage in Abu Dhabi. ISO 9001 certified, end-to-end service, government and enterprise approved.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])),
        }}
      />
      <SiteHeader />
      <main>
        {/* Hero — real Dubai night skyline (the panoramic photo restored by
            request; the looping video moved to Contact's hero instead). */}
        <div className="relative overflow-hidden">
          <Image src={skylineImage.src} alt={skylineImage.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/48 to-ink/78" />
          <div className="section-x relative py-[clamp(56px,9vw,108px)] pb-[calc(clamp(56px,9vw,108px)+48px)] sm:pb-[calc(clamp(56px,9vw,108px)+72px)]">
            <StaggerReveal className="flex flex-col gap-4" stagger={0.18} y={22}>
              <div className="font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(78%_0.1_250)]">
                About Us
              </div>
              <h1 className="max-w-[720px] text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
                Eighteen years manufacturing to international standard.
              </h1>
              <p className="max-w-[720px] text-[17px] leading-relaxed text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                Dubai Sign LLC is a flagpole and signage manufacturer based in ICAD 3, Mussafah, Abu Dhabi. Since 2008 we have delivered design, manufacture, installation, and maintenance for flagpoles, signboards, and safety signage to government, hospitality, retail, and industrial clients across Abu Dhabi, Dubai, and the wider UAE. Every project is produced in-house to international-standard quality and specification, at prices benchmarked to the regional market.
              </p>
            </StaggerReveal>
          </div>
          <WaveDivider animated={false} />
        </div>

        {/* Company timeline */}
        <Reveal>
          <div className="section-x section-y bg-mist2">
            <div className="mb-2 font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
              Our History
            </div>
            <h2 className="mb-12 text-[26px] font-bold text-ink">Our Timeline</h2>
            <CompanyTimeline />
          </div>
        </Reveal>

        {/* Why Choose Us */}
        <Reveal>
          <div className="section-x section-y">
            <h2 className="mb-8 text-[26px] font-bold text-ink">Why Choose Us</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px bg-border">
              {whyChooseUsFull.map((w) => (
                <NumberedCard key={w.num} num={w.num} title={w.title} desc={w.desc} />
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
                Clients &amp; Credentials
              </div>
              <h2 className="mb-7 text-[26px] font-bold text-ink">Trusted by Government &amp; Industry Leaders</h2>
              <ClientHonorRoll boxed />
            </StaggerReveal>
          </div>
        </Reveal>

        <CTABand heading="Ready to start your project?" variant="light" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
