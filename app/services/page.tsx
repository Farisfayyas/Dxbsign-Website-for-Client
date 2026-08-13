import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/ServicesContent";
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
      <ServicesContent />
    </>
  );
}
