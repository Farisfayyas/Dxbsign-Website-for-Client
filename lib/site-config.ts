// Single source of truth for business facts used across the site.
// Keep phone numbers, address, and credentials here so they're never
// retyped (and never drift) across pages, metadata, and structured data.

export const site = {
  name: "Dubai Sign LLC",
  legalName: "Dubai Sign LLC",
  tagline: "Flagpole and signage manufacturing, built to specification.",
  url: "https://www.dubaisign.ae",
  description:
    "Dubai Sign LLC manufactures and installs flagpoles, signboards, and safety signage across Abu Dhabi and the UAE. ISO 9001 certified, 18+ years, end-to-end service.",

  phone: {
    mobile: "+971 50 617 7346",
    mobileHref: "tel:+971506177346",
    mobileIntl: "971506177346",
    landline: "+971 2 551 3511",
    landlineHref: "tel:+97125513511",
    fax: "+971 2 551 3522",
  },
  email: "info@dubaisign.ae",

  address: {
    line1: "Plot 29, Warehouse C208, First Floor",
    line2: "ICAD 3, Mussafah, Abu Dhabi, UAE",
    locality: "Abu Dhabi",
    country: "AE",
    full: "Plot 29, Warehouse C208, First Floor, ICAD 3, Mussafah, Abu Dhabi, UAE",
    mapsQuery: "ICAD 3 Mussafah Abu Dhabi",
  },

  hours: "Monday to Saturday, 8:00 AM to 6:00 PM",
  hoursSpecification: {
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "18:00",
  },

  founded: "2008", // back-calculated from "18 years in business" — not independently confirmed by the client
  yearsInBusiness: "18+",

  credentials: [
    "ISO 9001:2015 Certified",
    "18+ Years in Business",
    "Approved Government & Enterprise Vendor",
  ],

  clients: [
    "Etisalat",
    "ADNOC",
    "Crowne Plaza",
    "Capital Hotel",
    "Souk",
    "Abu Dhabi Police",
    "Abu Dhabi Civil Defense",
    "National Guard Command",
    "Private Office of H.H. Sheikh Mohamed Bin Zayed Al Nahyan",
  ],
} as const;

export const whatsapp = {
  number: site.phone.mobileIntl,
  message: "Hi, I'd like to enquire about flagpoles for my project.",
  get href() {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
  },
};

// Builds a wa.me link carrying whatever the visitor already typed into the
// quote form, so the "send via WhatsApp instead" fallback doesn't lose
// their details — WhatsApp has no API for a website to submit a message on
// a visitor's behalf, so this still requires one tap to actually send, but
// nothing has to be retyped.
export function buildQuoteWhatsAppLink(values: {
  name?: string;
  company?: string;
  projectType?: string;
  message?: string;
}) {
  const lines = [
    "Hi, I'd like to request a quote.",
    "",
    values.name && `Name: ${values.name}`,
    values.company && `Company: ${values.company}`,
    values.projectType && `Project type: ${values.projectType}`,
    "",
    values.message || "Hi, I'd like to enquire about flagpoles for my project.",
  ].filter((line): line is string => Boolean(line) || line === "");
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const navItems = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "services", label: "Services", href: "/services" },
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "gallery", label: "Gallery", href: "/gallery" },
  { key: "contact", label: "Contact", href: "/contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];

export const navLabelsAr: Record<NavKey, string> = {
  home: "الرئيسية",
  about: "من نحن",
  services: "خدماتنا",
  projects: "مشاريعنا",
  gallery: "معرض الصور",
  contact: "تواصل معنا",
};

export const services = [
  {
    num: "01",
    key: "flagpoles",
    title: "Flagpoles, Flags & Banners",
    desc: "Outdoor and ceremonial flagpoles, custom flags, and banner systems engineered for UAE wind loads and manufactured to client specification.",
  },
  {
    num: "02",
    key: "signboards",
    title: "Signboards & 3D Signs",
    desc: "Illuminated and non-illuminated signboards, dimensional lettering, and 3D branded signage for facades and interiors.",
  },
  {
    num: "03",
    key: "engraved",
    title: "Engraved & Project Signs",
    desc: "Engraved plaques, nameplates, and project identification signage for construction and development sites.",
  },
  {
    num: "04",
    key: "indoor",
    title: "Indoor Signs",
    desc: "Directional, directory, and branding signage for lobbies, offices, and commercial interiors.",
  },
  {
    num: "05",
    key: "outdoor",
    title: "Outdoor Signs",
    desc: "Weather-rated exterior signage for facades, entrances, and site perimeters.",
  },
  {
    num: "06",
    key: "traffic",
    title: "Traffic & Safety Signs",
    desc: "Regulatory, warning, and safety signage manufactured to municipal and civil defense standards.",
  },
  {
    num: "07",
    key: "wayfinding",
    title: "Wayfinding Signs",
    desc: "Coordinated wayfinding systems for campuses, business parks, and mixed-use developments.",
  },
  {
    num: "08",
    key: "window",
    title: "Window Graphics & Displays",
    desc: "Window graphics, roll-up banners, and pop-up display systems for retail and event use.",
  },
] as const;

export const processSteps = [
  { num: "01", title: "Design", desc: "Specification review and technical drawings." },
  { num: "02", title: "Manufacture", desc: "In-house fabrication to spec and standard." },
  { num: "03", title: "Install", desc: "Site installation by our own crews." },
  { num: "04", title: "Maintain", desc: "Ongoing maintenance and support contracts." },
] as const;

export const whyChooseUsFull = [
  { num: "01", title: "18 Years of Experience", desc: "Serving Abu Dhabi and the UAE since 2008 across government, hospitality, and industrial sectors." },
  { num: "02", title: "ISO 9001 Certified", desc: "Quality managed manufacturing processes audited to international standard." },
  { num: "03", title: "In-House Manufacturing", desc: "Full production capability at our ICAD 3, Mussafah facility with no subcontracted fabrication." },
  { num: "04", title: "End-to-End Service", desc: "Design, manufacture, installation, and maintenance handled by a single accountable team." },
  { num: "05", title: "Government & Enterprise Approved", desc: "Vendor of record for government, semi-government, and enterprise clients across the UAE." },
  { num: "06", title: "Specification-Led Pricing", desc: "International-standard materials and workmanship at costs benchmarked to the regional market." },
] as const;

export const faqs = [
  {
    q: "What does Dubai Sign LLC manufacture?",
    a: "Dubai Sign LLC manufactures and installs flagpoles, flags and banners, signboards and 3D signs, indoor and outdoor signage, traffic and safety signs, wayfinding systems, and window graphics. Flagpoles are our primary focus today; the remaining product lines are produced on request.",
  },
  {
    q: "Where is Dubai Sign LLC based, and which areas do you serve?",
    a: "We are based in ICAD 3, Mussafah, Abu Dhabi, and serve clients across Abu Dhabi, Dubai, and the wider United Arab Emirates.",
  },
  {
    q: "Is Dubai Sign LLC certified?",
    a: "Yes. Dubai Sign LLC is ISO 9001:2015 certified and is an approved vendor for government, semi-government, and enterprise clients across the UAE.",
  },
  {
    q: "How long has Dubai Sign LLC been in business?",
    a: "Dubai Sign LLC has 18+ years of experience manufacturing flagpoles and signage for government, hospitality, and industrial clients in the UAE.",
  },
  {
    q: "Does Dubai Sign LLC handle installation and maintenance, or manufacturing only?",
    a: "Design, manufacture, installation, and maintenance are all handled in-house by Dubai Sign LLC, so a single accountable team manages the project from specification through to ongoing support.",
  },
  {
    q: "How do I request a quote for a flagpole or signage project?",
    a: `Call ${site.phone.mobile}, message us on WhatsApp, email ${site.email}, or submit the quote request form on our Contact page. Our team responds with a specification and quotation.`,
  },
] as const;
