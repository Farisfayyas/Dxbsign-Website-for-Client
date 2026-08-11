import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Workflow } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { ClientHonorRoll } from "@/components/ui/ClientHonorRoll";
import { NumberedCard } from "@/components/ui/NumberedCard";
import { FAQSection } from "@/components/ui/FAQSection";
import { ScrollColorText } from "@/components/ui/ScrollColorText";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { HeroSlider } from "@/components/home/HeroSlider";
import { EngineeredSection } from "@/components/home/EngineeredSection";
import { services, site } from "@/lib/site-config";
import { heroSlides, engineeredImages, featuredProjects } from "@/lib/site-images";
import { faqJsonLd } from "@/lib/seo";

// Credentials beside "Why Clients Choose Dubai Sign" -- same three facts
// as whyChooseUsShort (site-config.ts), but with the fuller descriptions
// already written for whyChooseUsFull (About page), and paired with an
// icon since a bare title+one-liner read as too sparse next to the
// taller ScrollColorText column beside it.
const whyClientsChooseCredentials = [
  {
    icon: Award,
    title: "18 Years of Experience",
    desc: "Serving Abu Dhabi and the UAE since 2008 across government, hospitality, and industrial sectors.",
  },
  {
    icon: ShieldCheck,
    title: "ISO 9001 Certified",
    desc: "Quality managed manufacturing processes audited to international standard.",
  },
  {
    icon: Workflow,
    title: "End-to-End Service",
    desc: "Design, manufacture, installation, and maintenance handled by a single accountable team.",
  },
];

export const metadata: Metadata = {
  title: "Flagpole & Signage Manufacturer, Abu Dhabi",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <SiteHeader />
      <main>
        {/* Hero — staggered load-in text, auto-rotating photo slider */}
        <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          <div className="section-x flex flex-col justify-center gap-6 py-[clamp(32px,6vw,80px)]">
            <Reveal y={14}>
              <div className="font-display text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
                Est. {site.founded} · ICAD 3, Mussafah, Abu Dhabi
              </div>
            </Reveal>
            <Reveal y={18} delay={0.08}>
              <h1 className="text-[clamp(34px,4.2vw,54px)] font-bold leading-[1.05] text-ink font-display">
                {site.tagline}
              </h1>
            </Reveal>
            <Reveal y={16} delay={0.16}>
              <p className="max-w-[480px] text-[17px] leading-relaxed text-ink/80">
                Eighteen years supplying flagpoles, signboards, and safety signage to government, hospitality, and industrial clients across Abu Dhabi and the UAE. Design, manufacture, and installation under one roof.
              </p>
            </Reveal>
            <Reveal y={14} delay={0.24}>
              <div className="mt-1.5 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className="bg-ink px-7 py-[15px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-soft"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/projects"
                  className="border border-ink/30 px-7 py-[15px] text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/60"
                >
                  View Projects
                </Link>
              </div>
            </Reveal>
            <Reveal y={12} delay={0.32}>
              <div className="mt-4 flex flex-wrap gap-14 border-t border-border-soft pt-6">
                <div>
                  <div className="text-[34px] font-bold text-ink">{site.yearsInBusiness}</div>
                  <div className="text-sm text-ink/60">Years in Business</div>
                </div>
                <div>
                  <div className="text-[34px] font-bold text-ink">ISO 9001</div>
                  <div className="text-sm text-ink/60">Certified</div>
                </div>
              </div>
            </Reveal>
          </div>
          <HeroSlider slides={heroSlides} />
        </div>

        <ClientLogoCarousel />

        {/* Credentials / clients band */}
        <Reveal>
          <div className="bg-ink">
            <div className="section-x grid grid-cols-1 items-start gap-12 py-[clamp(32px,5vw,56px)] lg:grid-cols-[auto_1fr]">
              <div className="flex max-w-[280px] min-w-[220px] flex-col gap-4 border-[oklch(32%_0.01_250)] pr-10 lg:border-r">
                <div className="font-serif text-2xl font-semibold leading-tight text-white">
                  Flagpoles and signage for the UAE&rsquo;s most demanding organizations.
                </div>
                <div className="text-sm leading-relaxed text-[oklch(70%_0.01_250)]">
                  From government ministries to national hospitality brands, our work is specified where compliance and finish matter most.
                </div>
              </div>
              <div>
                <div className="mb-4 font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(68%_0.09_250)]">
                  Trusted by Government &amp; Industry Leaders
                </div>
                <ClientHonorRoll />
              </div>
            </div>
          </div>
        </Reveal>

        {/* What We Manufacture — hover-highlight selector grid */}
        <Reveal>
          <div className="section-x section-y">
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[28px] font-bold text-ink">What We Manufacture</h2>
              <Link href="/services" className="text-sm font-semibold text-blue hover:underline">
                All services →
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px bg-border">
              {services.map((s) => (
                <NumberedCard key={s.key} num={s.num} title={s.title} highlight />
              ))}
            </div>
          </div>
        </Reveal>

        <EngineeredSection images={engineeredImages} />

        {/* Why Clients Choose — scroll-linked progressive color text on the
            left; the credentials column on the right is from the original
            approved design (whyChooseUsShort was already written in
            site-config.ts but never wired up to a page -- restored here,
            not new content). */}
        <Reveal>
          <div className="section-x section-y bg-mist">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <ScrollColorText
                  heading="Why Clients Choose Dubai Sign"
                  headingClassName="mb-4 text-[28px] font-bold"
                  paragraph="Eighteen years of specification-led manufacturing for the UAE's most demanding clients, delivered by one accountable team from first drawing to ongoing maintenance."
                  paragraphClassName="max-w-[560px] text-[22px] font-medium leading-relaxed"
                />
                <Link href="/about" className="mt-5 inline-block text-sm font-semibold text-blue hover:underline">
                  Learn more about us →
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-border">
                {whyClientsChooseCredentials.map((w) => (
                  <div key={w.title} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue/[0.08] text-blue">
                      <w.icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="mb-1 text-[15px] font-semibold text-ink">{w.title}</div>
                      <div className="text-sm leading-relaxed text-ink/65">{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Featured Projects — rounded cards */}
        <Reveal>
          <div className="section-x section-y">
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[28px] font-bold text-ink">Featured Projects</h2>
              <Link href="/projects" className="text-sm font-semibold text-blue hover:underline">
                All projects →
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
              {featuredProjects.map((p) => (
                <Link
                  key={p.title + p.location}
                  href="/projects"
                  className="group block overflow-hidden rounded-xl border border-border-soft bg-white text-inherit no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="font-serif text-[11px] font-semibold uppercase tracking-[0.06em] text-[oklch(55%_0.08_250)]">
                      {p.tag}
                    </div>
                    <div className="mt-1.5 text-base font-semibold text-ink">{p.title}</div>
                    <div className="mt-1 text-[13px] text-ink/60">{p.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <FAQSection />

        <CTABand heading="Need signage or flagpoles to specification?" variant="dark" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
