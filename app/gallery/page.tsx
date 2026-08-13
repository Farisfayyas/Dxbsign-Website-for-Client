import type { Metadata } from "next";
import { GalleryContent } from "@/components/gallery/GalleryContent";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse flagpole, signboard, indoor, outdoor, traffic, safety, vehicle graphics, and display product photography from Dubai Sign LLC.",
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
      <GalleryContent />
    </>
  );
}
