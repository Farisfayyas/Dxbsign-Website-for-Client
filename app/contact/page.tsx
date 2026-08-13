import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";
import { site } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}. ${site.address.full}. Tel ${site.phone.landline}. Request a quote for flagpoles and signage.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])),
        }}
      />
      <ContactContent />
    </>
  );
}
