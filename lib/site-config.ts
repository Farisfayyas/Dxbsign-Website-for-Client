// Single source of truth for business facts used across the site.
// Keep phone numbers, address, and credentials here so they're never
// retyped (and never drift) across pages, metadata, and structured data.

export const site = {
  name: "Dubai Sign LLC",
  nameAr: "شركة دبي ساين ذ.م.م",
  legalName: "Dubai Sign LLC",
  tagline: "Flagpole and signage manufacturing, built to specification.",
  taglineAr: "تصنيع سواري الأعلام واللافتات، وفق المواصفات المطلوبة.",
  url: "https://www.dubaisign.ae",
  description:
    "Dubai Sign LLC manufactures and installs flagpoles, signboards, and safety signage across Abu Dhabi and the UAE. ISO 9001 certified, 18+ years, end-to-end service.",
  descriptionAr:
    "تُصنّع شركة دبي ساين ذ.م.م وتُركّب سواري الأعلام واللوحات الإعلانية ولافتات السلامة في أبوظبي ودولة الإمارات العربية المتحدة. حاصلة على شهادة الأيزو 9001، وبخبرة تفوق 18 عامًا، وخدمة متكاملة من التصميم إلى التركيب.",

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
    line1Ar: "قطعة 29، مستودع C208، الطابق الأول",
    line2: "ICAD 3, Mussafah, Abu Dhabi, UAE",
    line2Ar: "المنطقة الصناعية آيكاد 3، مصفح، أبوظبي، الإمارات العربية المتحدة",
    locality: "Abu Dhabi",
    country: "AE",
    full: "Plot 29, Warehouse C208, First Floor, ICAD 3, Mussafah, Abu Dhabi, UAE",
    fullAr: "قطعة 29، مستودع C208، الطابق الأول، آيكاد 3، مصفح، أبوظبي، الإمارات العربية المتحدة",
    // mapsQuery stays Latin-script on purpose -- it feeds a Google Maps
    // lookup URL, not display text, and the Latin form resolves reliably
    // regardless of which language the page is showing.
    mapsQuery: "ICAD 3 Mussafah Abu Dhabi",
  },

  hours: "Monday to Saturday, 8:00 AM to 6:00 PM",
  hoursAr: "من الإثنين إلى السبت، من الساعة 8:00 صباحًا حتى 6:00 مساءً",
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
  credentialsAr: [
    "حاصلة على شهادة الأيزو 9001:2015",
    "أكثر من 18 عامًا من الخبرة",
    "مورّد معتمد لدى الجهات الحكومية والشركات",
  ],

  // Client names are proper nouns/brand names -- kept in their own
  // official form rather than transliterated, same convention Arabic
  // corporate sites generally use for brand names.
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
    titleAr: "سواري الأعلام والأعلام واللافتات القماشية",
    desc: "Outdoor and ceremonial flagpoles, custom flags, and banner systems engineered for UAE wind loads and manufactured to client specification.",
    descAr: "سوارٍ أعلام خارجية واحتفالية، وأعلام مخصصة، وأنظمة لافتات قماشية مصممة هندسيًا لتحمّل أحمال الرياح في دولة الإمارات، ومُصنّعة وفق مواصفات العميل.",
  },
  {
    num: "02",
    key: "signboards",
    title: "Signboards & 3D Signs",
    titleAr: "اللوحات الإعلانية واللافتات ثلاثية الأبعاد",
    desc: "Illuminated and non-illuminated signboards, dimensional lettering, and 3D branded signage for facades and interiors.",
    descAr: "لوحات إعلانية مضاءة وغير مضاءة، وحروف بارزة، ولافتات ثلاثية الأبعاد للهوية التجارية، للواجهات والمساحات الداخلية.",
  },
  {
    num: "03",
    key: "engraved",
    title: "Engraved & Project Signs",
    titleAr: "اللافتات المحفورة ولافتات المشاريع",
    desc: "Engraved plaques, nameplates, and project identification signage for construction and development sites.",
    descAr: "لوحات تذكارية محفورة، ولافتات أسماء، ولافتات تعريف بالمشاريع لمواقع الإنشاء والتطوير.",
  },
  {
    num: "04",
    key: "indoor",
    title: "Indoor Signs",
    titleAr: "اللافتات الداخلية",
    desc: "Directional, directory, and branding signage for lobbies, offices, and commercial interiors.",
    descAr: "لافتات إرشادية ودليلية وتعريفية بالهوية التجارية للردهات والمكاتب والمساحات التجارية الداخلية.",
  },
  {
    num: "05",
    key: "outdoor",
    title: "Outdoor Signs",
    titleAr: "اللافتات الخارجية",
    desc: "Weather-rated exterior signage for facades, entrances, and site perimeters.",
    descAr: "لافتات خارجية مقاومة للعوامل الجوية للواجهات والمداخل ومحيط المواقع.",
  },
  {
    num: "06",
    key: "traffic",
    title: "Traffic & Safety Signs",
    titleAr: "لافتات المرور والسلامة",
    desc: "Regulatory, warning, and safety signage manufactured to municipal and civil defense standards.",
    descAr: "لافتات تنظيمية وتحذيرية وإرشادات سلامة، مُصنّعة وفق معايير البلدية والدفاع المدني.",
  },
  {
    num: "07",
    key: "wayfinding",
    title: "Wayfinding Signs",
    titleAr: "لافتات الإرشاد والتوجيه",
    desc: "Coordinated wayfinding systems for campuses, business parks, and mixed-use developments.",
    descAr: "أنظمة إرشاد وتوجيه متكاملة للمجمعات الجامعية والمناطق التجارية والمشاريع متعددة الاستخدامات.",
  },
  {
    num: "08",
    key: "window",
    title: "Window Graphics & Displays",
    titleAr: "رسومات النوافذ وأنظمة العرض",
    desc: "Window graphics, roll-up banners, and pop-up display systems for retail and event use.",
    descAr: "رسومات للنوافذ، وبانرات قابلة للطي، وأنظمة عرض متنقلة للاستخدام في المتاجر والفعاليات.",
  },
] as const;

export const processSteps = [
  { num: "01", title: "Design", titleAr: "التصميم", desc: "Specification review and technical drawings.", descAr: "مراجعة المواصفات وإعداد المخططات الفنية." },
  { num: "02", title: "Manufacture", titleAr: "التصنيع", desc: "In-house fabrication to spec and standard.", descAr: "تصنيع داخلي وفق المواصفات والمعايير المعتمدة." },
  { num: "03", title: "Install", titleAr: "التركيب", desc: "Site installation by our own crews.", descAr: "تركيب في الموقع بواسطة فرق العمل الخاصة بنا." },
  { num: "04", title: "Maintain", titleAr: "الصيانة", desc: "Ongoing maintenance and support contracts.", descAr: "عقود صيانة ودعم مستمرة." },
] as const;

export const whyChooseUsFull = [
  { num: "01", title: "18 Years of Experience", titleAr: "18 عامًا من الخبرة", desc: "Serving Abu Dhabi and the UAE since 2008 across government, hospitality, and industrial sectors.", descAr: "نخدم أبوظبي ودولة الإمارات منذ عام 2008 في القطاعات الحكومية والفندقية والصناعية." },
  { num: "02", title: "ISO 9001 Certified", titleAr: "حاصلة على شهادة الأيزو 9001", desc: "Quality managed manufacturing processes audited to international standard.", descAr: "عمليات تصنيع مدارة بالجودة ومدققة وفق المعايير الدولية." },
  { num: "03", title: "In-House Manufacturing", titleAr: "تصنيع داخلي بالكامل", desc: "Full production capability at our ICAD 3, Mussafah facility with no subcontracted fabrication.", descAr: "قدرة إنتاجية متكاملة في منشأتنا بآيكاد 3، مصفح، دون أي تصنيع من الباطن." },
  { num: "04", title: "End-to-End Service", titleAr: "خدمة متكاملة من الألف إلى الياء", desc: "Design, manufacture, installation, and maintenance handled by a single accountable team.", descAr: "التصميم والتصنيع والتركيب والصيانة، يتولاها فريق واحد مسؤول عن كل مرحلة." },
  { num: "05", title: "Government & Enterprise Approved", titleAr: "معتمدون لدى الجهات الحكومية والشركات", desc: "Vendor of record for government, semi-government, and enterprise clients across the UAE.", descAr: "مورّد رسمي معتمد للجهات الحكومية وشبه الحكومية والشركات في دولة الإمارات." },
  { num: "06", title: "Specification-Led Pricing", titleAr: "تسعير قائم على المواصفات", desc: "International-standard materials and workmanship at costs benchmarked to the regional market.", descAr: "مواد وحِرفية بمعايير عالمية، وبأسعار متوافقة مع السوق الإقليمي." },
] as const;

// Real customer testimonials, migrated from the client's own live site
// (dxbsign.com's "Our Testimonials" section) rather than written fresh --
// same pattern as this project's photography/credentials/FAQ content.
// No company/title/photo accompanies any of them on the source site, so
// none is invented here either.
export const testimonials = [
  {
    name: "Muhammed Shakir",
    quote:
      "Wall graphics and floor graphics Dubai sign perform very well. The quality of work is outstanding. Product delivery is very fast. Dubai Sign is one of the best creative companies in Dubai.",
    quoteAr:
      "الرسومات الجدارية والأرضية من دبي ساين ذات أداء ممتاز. جودة العمل متميزة، والتسليم سريع جدًا. دبي ساين من أفضل الشركات الإبداعية في دبي.",
  },
  {
    name: "Imran Khan",
    quote:
      "Dubai Sign has been a great business partner for the past 6 months. They not only care about our success, but actively play a part in it by thoughtfully designing boards that coincide perfectly with our sales and promotional events.",
    quoteAr:
      "كانت دبي ساين شريكًا تجاريًا ممتازًا خلال الأشهر الستة الماضية. فهم لا يهتمون بنجاحنا فحسب، بل يساهمون فيه فعليًا من خلال تصميم لوحات مدروسة تتوافق تمامًا مع فعالياتنا الترويجية والبيعية.",
  },
  {
    name: "Niazmin Zada",
    quote:
      "Dubai Sign team is very professional and easy to communicate with and they make the ever changing task of marketing our business much easier. Our advertising portfolio wouldn't be complete without Dubai Sign.",
    quoteAr:
      "فريق دبي ساين محترف جدًا وسهل التواصل معه، ويجعلون مهمة تسويق أعمالنا المتغيرة باستمرار أسهل بكثير. لا تكتمل محفظتنا الإعلانية دون دبي ساين.",
  },
] as const;

export const faqs = [
  {
    q: "What does Dubai Sign LLC manufacture?",
    qAr: "ماذا تُصنّع شركة دبي ساين ذ.م.م؟",
    a: "Dubai Sign LLC manufactures and installs flagpoles, flags and banners, signboards and 3D signs, indoor and outdoor signage, traffic and safety signs, wayfinding systems, and window graphics. Flagpoles are our primary focus today; the remaining product lines are produced on request.",
    aAr: "تُصنّع شركة دبي ساين ذ.م.م وتُركّب سواري الأعلام والأعلام واللافتات القماشية، واللوحات الإعلانية واللافتات ثلاثية الأبعاد، واللافتات الداخلية والخارجية، ولافتات المرور والسلامة، وأنظمة الإرشاد والتوجيه، ورسومات النوافذ. تُعد سواري الأعلام محور تركيزنا الرئيسي حاليًا، بينما تُصنّع بقية المنتجات عند الطلب.",
  },
  {
    q: "Where is Dubai Sign LLC based, and which areas do you serve?",
    qAr: "أين يقع مقر شركة دبي ساين ذ.م.م، وما هي المناطق التي تخدمونها؟",
    a: "We are based in ICAD 3, Mussafah, Abu Dhabi, and serve clients across Abu Dhabi, Dubai, and the wider United Arab Emirates.",
    aAr: "يقع مقرنا في آيكاد 3، مصفح، أبوظبي، ونخدم العملاء في أبوظبي ودبي وسائر أنحاء دولة الإمارات العربية المتحدة.",
  },
  {
    q: "Is Dubai Sign LLC certified?",
    qAr: "هل شركة دبي ساين ذ.م.م حاصلة على شهادات معتمدة؟",
    a: "Yes. Dubai Sign LLC is ISO 9001:2015 certified and is an approved vendor for government, semi-government, and enterprise clients across the UAE.",
    aAr: "نعم. شركة دبي ساين ذ.م.م حاصلة على شهادة الأيزو 9001:2015، وهي مورّد معتمد للجهات الحكومية وشبه الحكومية والشركات في جميع أنحاء دولة الإمارات.",
  },
  {
    q: "How long has Dubai Sign LLC been in business?",
    qAr: "منذ متى تعمل شركة دبي ساين ذ.م.م في هذا المجال؟",
    a: "Dubai Sign LLC has 18+ years of experience manufacturing flagpoles and signage for government, hospitality, and industrial clients in the UAE.",
    aAr: "تتمتع شركة دبي ساين ذ.م.م بخبرة تفوق 18 عامًا في تصنيع سواري الأعلام واللافتات لعملاء من القطاعات الحكومية والفندقية والصناعية في دولة الإمارات.",
  },
  {
    q: "Does Dubai Sign LLC handle installation and maintenance, or manufacturing only?",
    qAr: "هل تتولى شركة دبي ساين ذ.م.م التركيب والصيانة أم التصنيع فقط؟",
    a: "Design, manufacture, installation, and maintenance are all handled in-house by Dubai Sign LLC, so a single accountable team manages the project from specification through to ongoing support.",
    aAr: "يتم التصميم والتصنيع والتركيب والصيانة بالكامل داخل شركة دبي ساين ذ.م.م، بحيث يتولى فريق واحد مسؤول إدارة المشروع من مرحلة المواصفات وحتى الدعم المستمر.",
  },
  {
    q: "How do I request a quote for a flagpole or signage project?",
    qAr: "كيف يمكنني طلب عرض سعر لمشروع سارية أعلام أو لافتات؟",
    a: `Call ${site.phone.mobile}, message us on WhatsApp, email ${site.email}, or submit the quote request form on our Contact page. Our team responds with a specification and quotation.`,
    aAr: `اتصل بنا على ${site.phone.mobile}، أو راسلنا عبر واتساب، أو راسلنا عبر البريد الإلكتروني على ${site.email}، أو املأ نموذج طلب عرض السعر في صفحة التواصل. سيتواصل معك فريقنا بالمواصفات والعرض السعري.`,
  },
] as const;
