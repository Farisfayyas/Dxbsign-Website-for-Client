import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
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
      <AboutContent />
    </>
  );
}
