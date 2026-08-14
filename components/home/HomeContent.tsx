"use client";

// Home page body, split out of app/page.tsx as a client component so it
// can read useDirection() for the Arabic toggle -- app/page.tsx itself
// must stay a server component (it exports `metadata`, which Next.js
// disallows in a "use client" file), so all the actual translated markup
// lives here instead, with the server page just rendering this and the
// JSON-LD script tag around it.

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileFloatingActions } from "@/components/layout/MobileFloatingActions";
import { Reveal } from "@/components/ui/Reveal";
import { CurtainReveal } from "@/components/ui/CurtainReveal";
import { CTABand } from "@/components/ui/CTABand";
import { ClientHonorRoll } from "@/components/ui/ClientHonorRoll";
import { NumberedCard } from "@/components/ui/NumberedCard";
import { FAQSection } from "@/components/ui/FAQSection";
import { CountUp } from "@/components/ui/CountUp";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { HeroSlider } from "@/components/home/HeroSlider";
import { EngineeredSection } from "@/components/home/EngineeredSection";
import { FlagpoleShowcase } from "@/components/home/FlagpoleShowcase";
import { WhyClientsChoose } from "@/components/home/WhyClientsChoose";
import { Testimonials } from "@/components/home/Testimonials";
import { services, site } from "@/lib/site-config";
import { heroSlides, engineeredImages, featuredProjects } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { useDirection } from "@/lib/direction-context";
import { translateTag } from "@/lib/tag-translations";

export function HomeContent() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero — staggered load-in text, auto-rotating photo slider */}
        <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          <div className="section-x flex flex-col justify-center gap-6 py-[clamp(32px,6vw,80px)]">
            <Reveal y={14}>
              <div className="font-display text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
                {isAr
                  ? `تأسست ${site.founded} · آيكاد 3، مصفح، أبوظبي`
                  : `Est. ${site.founded} · ICAD 3, Mussafah, Abu Dhabi`}
              </div>
            </Reveal>
            <CurtainReveal
              as="h1"
              className="text-[clamp(34px,4.2vw,54px)] font-bold leading-[1.05] text-ink font-display"
              text={isAr ? site.taglineAr : site.tagline}
              delay={0.08}
            />
            <CurtainReveal
              className="max-w-[480px] text-[17px] leading-relaxed text-ink/80"
              text={
                isAr
                  ? "ثمانية عشر عامًا في توريد سواري الأعلام واللوحات الإعلانية ولافتات السلامة للجهات الحكومية وقطاعي الضيافة والصناعة في أبوظبي ودولة الإمارات. التصميم والتصنيع والتركيب تحت سقف واحد."
                  : "Eighteen years supplying flagpoles, signboards, and safety signage to government, hospitality, and industrial clients across Abu Dhabi and the UAE. Design, manufacture, and installation under one roof."
              }
              delay={0.16}
            />
            <Reveal y={14} delay={0.24}>
              <div className="mt-1.5 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className="bg-ink px-7 py-[15px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-soft"
                >
                  {isAr ? "اطلب عرض سعر" : "Request a Quote"}
                </Link>
                <Link
                  href="/projects"
                  className="border border-ink/30 px-7 py-[15px] text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/60"
                >
                  {isAr ? "استعرض المشاريع" : "View Projects"}
                </Link>
              </div>
            </Reveal>
            <Reveal y={12} delay={0.32}>
              <div className="mt-4 flex flex-wrap gap-14 border-t border-border-soft pt-6">
                <div>
                  <div className="text-[34px] font-bold text-ink">
                    <CountUp text={site.yearsInBusiness} />
                  </div>
                  <div className="text-sm text-ink/60">{isAr ? "سنوات من الخبرة" : "Years in Business"}</div>
                </div>
                <div>
                  <div className="text-[34px] font-bold text-ink">
                    <CountUp text={site.totalProjects} />
                  </div>
                  <div className="text-sm text-ink/60">{isAr ? "إجمالي المشاريع" : "Total Projects"}</div>
                </div>
                <div>
                  <div className="text-[34px] font-bold text-ink">ISO 9001</div>
                  <div className="text-sm text-ink/60">{isAr ? "معتمدة" : "Certified"}</div>
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
                  {isAr
                    ? "سواري أعلام ولافتات لأكثر المؤسسات تطلبًا في دولة الإمارات."
                    : "Flagpoles and signage for the UAE’s most demanding organizations."}
                </div>
                <div className="text-sm leading-relaxed text-[oklch(70%_0.01_250)]">
                  {isAr
                    ? "من الوزارات الحكومية إلى العلامات الفندقية الوطنية، تُنفَّذ أعمالنا حيث يكون الالتزام بالمواصفات وجودة التشطيب هما الأهم."
                    : "From government ministries to national hospitality brands, our work is specified where compliance and finish matter most."}
                </div>
              </div>
              <div>
                <div className="mb-4 font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(68%_0.09_250)]">
                  {isAr ? "موثوقون لدى الجهات الحكومية وقادة الصناعة" : "Trusted by Government & Industry Leaders"}
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
              <h2 className="text-[28px] font-bold text-ink">{isAr ? "ماذا نصنّع" : "What We Manufacture"}</h2>
              <Link href="/services" className="text-sm font-semibold text-blue hover:underline">
                {isAr ? "جميع الخدمات ←" : "All services →"}
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px bg-border">
              {services.map((s) => (
                <NumberedCard key={s.key} num={s.num} title={isAr ? s.titleAr : s.title} highlight />
              ))}
            </div>
          </div>
        </Reveal>

        <EngineeredSection images={engineeredImages} />

        {/* Scroll-driven 3D flagpole showcase — Apple AirPods-style: the
            pole rotates 360° across a pinned scroll section and four spec
            callouts (the same facts as EngineeredSection above, reworded)
            fade in at specific points in the turn. Runs on a procedural
            placeholder pole until a real glTF/GLB asset is sourced — see
            FlagpoleModel.tsx's swap seam. */}
        <FlagpoleShowcase />

        {/* Why Clients Choose — scroll-linked progressive color text on the
            left; the credentials column on the right highlights per-row
            based on cursor height, not just direct icon hover (see
            WhyClientsChoose.tsx). */}
        <Reveal>
          <WhyClientsChoose />
        </Reveal>

        {/* Featured Projects — rounded cards */}
        <Reveal>
          <div className="section-x section-y">
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[28px] font-bold text-ink">{isAr ? "مشاريع مختارة" : "Featured Projects"}</h2>
              <Link href="/projects" className="text-sm font-semibold text-blue hover:underline">
                {isAr ? "جميع المشاريع ←" : "All projects →"}
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
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="font-serif text-[11px] font-semibold uppercase tracking-[0.06em] text-[oklch(55%_0.08_250)]">
                      {translateTag(p.tag, isAr)}
                    </div>
                    <div className="mt-1.5 text-base font-semibold text-ink">{isAr ? p.titleAr : p.title}</div>
                    <div className="mt-1 text-[13px] text-ink/60">{isAr ? p.locationAr : p.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Testimonials />

        <FAQSection />

        <CTABand
          heading={isAr ? "بحاجة إلى لافتات أو سواري أعلام وفق مواصفاتك؟" : "Need signage or flagpoles to specification?"}
          variant="dark"
        />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileFloatingActions />
    </>
  );
}
