import type { Metadata } from "next";
import { HomeContent } from "@/components/home/HomeContent";
import { site } from "@/lib/site-config";
import { faqJsonLd } from "@/lib/seo";

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
      <HomeContent />
    </>
  );
}
