import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileFloatingActions } from "@/components/layout/MobileFloatingActions";
import { CTABand } from "@/components/ui/CTABand";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed flagpole, signboard, wayfinding, and safety signage projects across Abu Dhabi and the UAE.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])),
        }}
      />
      <SiteHeader />
      <main>
        <div className="section-x max-w-[820px] pb-0 pt-[clamp(40px,6vw,72px)]">
          <div className="mb-4 font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            Projects
          </div>
          <h1 className="mb-5 text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Delivered across Abu Dhabi and the UAE.
          </h1>
          <p className="text-[17px] leading-relaxed text-ink/80">
            A selection of flagpole, signage, and wayfinding projects completed for government, hospitality, and commercial clients. Select an image to view it larger.
          </p>
        </div>

        <ProjectsGrid />

        <CTABand heading="Have a similar project in mind?" variant="dark" />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileFloatingActions />
    </>
  );
}
