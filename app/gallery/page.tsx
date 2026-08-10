import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CTABand } from "@/components/ui/CTABand";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse flagpole, signboard, and safety signage product photography from Dubai Sign LLC.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])),
        }}
      />
      <SiteHeader />
      <main>
        <div className="section-x max-w-[820px] pb-0 pt-[clamp(40px,6vw,72px)]">
          <div className="mb-4 font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            Gallery
          </div>
          <h1 className="mb-5 text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Product photography, by category.
          </h1>
          <p className="text-[17px] leading-relaxed text-ink/80">
            Flagpoles remain our primary focus, reflected below. Select an image to view it larger.
          </p>
        </div>

        <GalleryGrid />

        <CTABand heading="Want to see more of our work?" variant="dark" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
