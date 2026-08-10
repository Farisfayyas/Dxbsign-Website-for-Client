// Structured-data helpers (JSON-LD). Serves both classic SEO and GEO
// (generative-engine optimization) — LLM-powered answer engines lean on
// structured data and direct Q&A pairs at least as heavily as traditional
// search crawlers do.

import { faqs, site } from "./site-config";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone.landline,
    email: site.email,
    foundingDate: site.founded,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    areaServed: ["Abu Dhabi", "Dubai", "United Arab Emirates"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hoursSpecification.dayOfWeek,
      opens: site.hoursSpecification.opens,
      closes: site.hoursSpecification.closes,
    },
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "ISO 9001:2015 Certified" },
    ],
    makesOffer: [
      "Flagpoles, Flags & Banners",
      "Signboards & 3D Signs",
      "Indoor Signs",
      "Outdoor Signs",
      "Traffic & Safety Signs",
      "Wayfinding Signs",
      "Window Graphics & Displays",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
