// Curated real photography, sourced from the client's own site
// (projects/dxbsign/images/, catalogued by category during the original
// scrape). Every slot below replaces a "PHOTO: ..." placeholder from the
// approved design handoff with a specific real file + real alt text.

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Home hero — real flagpole installation at a named client's premises
// (Private Office of H.H. Sheikh Mohamed Bin Zayed Al Nahyan).
export const heroImage: SiteImage = {
  src: "/images/flagpoles/flagpole-05.jpg",
  alt: "UAE flagpole installation at the entrance of a government office building in Abu Dhabi",
  width: 1600,
  height: 1067,
};

// Reused in both the hero slider and the Engineered section below --
// one source of truth instead of two copies of the same file's metadata
// (the width/height here is the real on-disk size, 600x400; both
// consuming components use `fill` so it's descriptive, not load-bearing).
const flagpole02Image: SiteImage = {
  src: "/images/flagpoles/flagpole-02.png",
  alt: "Corporate flagpole set outside a headquarters building",
  width: 600,
  height: 400,
};

// Home hero slider — 3 real flagpole photos, auto-rotating. Faris's own
// pick: Dubai Sign's own work only, no stock photography.
export const heroSlides: SiteImage[] = [
  heroImage,
  {
    src: "/images/flagpoles/flagpole-01.png",
    alt: "UAE and another national flag on poles overlooking a city street in Abu Dhabi",
    width: 600,
    height: 400,
  },
  flagpole02Image,
];

// "Engineered for the UAE's Climate" section — two offset photos.
export const engineeredImages: [SiteImage, SiteImage] = [
  flagpole02Image,
  {
    src: "/images/flagpoles/flagpole-09.png",
    alt: "Row of UAE flagpoles outside a building with a Union heritage mural, Abu Dhabi",
    width: 600,
    height: 400,
  },
];

// Services page — one representative real photo per product line.
export const serviceImages: Record<string, SiteImage> = {
  flagpoles: {
    src: "/images/flagpoles/flagpole-03.png",
    alt: "Flagpole with corporate flag lined with palm trees",
    width: 600,
    height: 450,
  },
  signboards: {
    src: "/images/outdoor-signs/3d-signs/3d-sign-02.png",
    alt: "Dimensional 3D branded signage on a building facade",
    width: 600,
    height: 450,
  },
  engraved: {
    src: "/images/outdoor-signs/project-signs/project-sign-01.png",
    alt: "Project identification signage at a development site",
    width: 600,
    height: 450,
  },
  indoor: {
    src: "/images/indoor-signs/reception/reception-01.png",
    alt: "Indoor reception signage",
    width: 600,
    height: 450,
  },
  outdoor: {
    src: "/images/outdoor-signs/entrance/entrance-01.png",
    alt: "Exterior entrance signage on a building facade",
    width: 600,
    height: 450,
  },
  traffic: {
    src: "/images/traffic-signs/traffic-sign-01.png",
    alt: "Traffic and regulatory signage installation",
    width: 600,
    height: 450,
  },
  wayfinding: {
    src: "/images/indoor-signs/wayfinding/wayfinding-01.png",
    alt: "Indoor wayfinding directional signage",
    width: 600,
    height: 450,
  },
  window: {
    src: "/images/window-graphics/window-graphics-01.png",
    alt: "Window graphics on a storefront",
    width: 600,
    height: 450,
  },
};

// About page hero band background — Downtown Dubai aerial at dusk, free
// Unsplash-licensed photo (see stock-photo-candidates/SOURCES.md, kept
// locally, not in the repo, for the source link and other options).
export const skylineImage: SiteImage = {
  src: "/images/stock/dubai-downtown-dusk-skyline.jpg",
  alt: "Aerial view of Downtown Dubai at dusk with illuminated highways",
  width: 2400,
  height: 1602,
};

// Real client logos, scraped from the original site's homepage strip.
// Overlaps partly with the confirmed named-client list (Etisalat, Crowne
// Plaza) plus additional real past clients not previously surfaced.
export const clientLogos: SiteImage[] = [
  { src: "/images/clients/client-logo-01.png", alt: "Abu Dhabi Aircraft Technologies", width: 160, height: 80 },
  { src: "/images/clients/client-logo-02.png", alt: "Abu Dhabi Farmers' Services Centre", width: 160, height: 80 },
  { src: "/images/clients/client-logo-03.png", alt: "GAC", width: 160, height: 80 },
  { src: "/images/clients/client-logo-04.png", alt: "Crowne Plaza Hotels & Resorts", width: 160, height: 80 },
  { src: "/images/clients/client-logo-05.png", alt: "Etisalat", width: 160, height: 80 },
  { src: "/images/clients/client-logo-06.png", alt: "Fast Rent a Car", width: 160, height: 80 },
  { src: "/images/clients/client-logo-07.png", alt: "G4S", width: 160, height: 80 },
  { src: "/images/clients/client-logo-08.png", alt: "Hyundai Engineering & Construction", width: 160, height: 80 },
  { src: "/images/clients/client-logo-09.png", alt: "Jumeirah at Etihad Towers", width: 160, height: 80 },
  { src: "/images/clients/client-logo-10.png", alt: "Zayed Higher Organization", width: 160, height: 80 },
  { src: "/images/clients/client-logo-11.png", alt: "Omeir Travel Agency", width: 160, height: 80 },
];

export type ProjectCategory =
  | "flagpole"
  | "signboard"
  | "wayfinding"
  | "traffic"
  | "window";

export type ProjectItem = {
  category: ProjectCategory;
  tag: string;
  title: string;
  location: string;
  image: SiteImage;
};

export const featuredProjects: ProjectItem[] = [
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole Installation",
    location: "Government Complex, Abu Dhabi",
    image: {
      src: "/images/flagpoles/flagpole-01.png",
      alt: "UAE and corporate flagpoles installed outside a government complex in Abu Dhabi",
      width: 600,
      height: 400,
    },
  },
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole & Flag Package",
    location: "Hotel Entrance, Abu Dhabi",
    image: {
      src: "/images/flagpoles/flagpole-03.png",
      alt: "Corporate flagpole with custom flag at a hotel entrance, lined with palm trees",
      width: 600,
      height: 400,
    },
  },
  {
    category: "signboard",
    tag: "Signboards",
    title: "Illuminated 3D Signboard",
    location: "Retail Plaza, Mussafah",
    image: {
      src: "/images/outdoor-signs/3d-signs/3d-sign-01.png",
      alt: "Illuminated dimensional 3D signboard on a retail facade",
      width: 600,
      height: 400,
    },
  },
];

export const projects: ProjectItem[] = [
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole Installation",
    location: "Government Complex, Abu Dhabi",
    image: {
      src: "/images/flagpoles/flagpole-01.png",
      alt: "UAE and corporate flagpoles installed outside a government complex in Abu Dhabi",
      width: 600,
      height: 400,
    },
  },
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole Set",
    location: "Corporate Headquarters, Abu Dhabi",
    image: {
      src: "/images/flagpoles/flagpole-02.png",
      alt: "Set of corporate flagpoles outside a headquarters building",
      width: 600,
      height: 400,
    },
  },
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole & Flag Package",
    location: "Hotel Entrance, Abu Dhabi",
    image: {
      src: "/images/flagpoles/flagpole-03.png",
      alt: "Corporate flagpole with custom flag at a hotel entrance, lined with palm trees",
      width: 600,
      height: 400,
    },
  },
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole Installation",
    location: "Municipal Building, Mussafah",
    image: {
      src: "/images/flagpoles/flagpole-04.png",
      alt: "Flagpole installation outside a municipal building in Mussafah",
      width: 600,
      height: 400,
    },
  },
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole Refurbishment",
    location: "Industrial Facility, ICAD",
    image: {
      src: "/images/flagpoles/flagpole-06.png",
      alt: "Refurbished flagpole at an industrial facility in ICAD",
      width: 600,
      height: 400,
    },
  },
  {
    category: "flagpole",
    tag: "Flagpoles",
    title: "Flagpole Entrance Package",
    location: "Residential Community, Abu Dhabi",
    image: {
      src: "/images/flagpoles/flagpole-07.png",
      alt: "Flagpole entrance package at a residential community in Abu Dhabi",
      width: 600,
      height: 400,
    },
  },
  {
    category: "signboard",
    tag: "Signboards",
    title: "Illuminated 3D Signboard",
    location: "Retail Plaza, Mussafah",
    image: {
      src: "/images/outdoor-signs/3d-signs/3d-sign-01.png",
      alt: "Illuminated dimensional 3D signboard on a retail facade",
      width: 600,
      height: 400,
    },
  },
  {
    category: "wayfinding",
    tag: "Wayfinding",
    title: "Wayfinding System",
    location: "Hotel Complex, Abu Dhabi",
    image: {
      src: "/images/projects/projects-client-work-crowne-plaza-wayfinding.png",
      alt: "Directional wayfinding sign for Crowne Plaza and Staybridge Suites parking",
      width: 600,
      height: 600,
    },
  },
  {
    category: "traffic",
    tag: "Traffic & Safety",
    title: "Traffic Signage Package",
    location: "Residential Community, Abu Dhabi",
    image: {
      src: "/images/traffic-signs/traffic-sign-01.png",
      alt: "Traffic and regulatory signage installed in a residential community",
      width: 600,
      height: 400,
    },
  },
  {
    category: "window",
    tag: "Window Graphics",
    title: "Window Graphics Installation",
    location: "Corporate Office, Abu Dhabi",
    image: {
      src: "/images/window-graphics/window-graphics-01.png",
      alt: "Window graphics installed on a corporate office storefront",
      width: 600,
      height: 400,
    },
  },
];

export type GalleryCategory =
  | "flagpole"
  | "signboard"
  | "indoor"
  | "outdoor"
  | "traffic"
  | "wayfinding"
  | "window"
  | "rollup";

export type GalleryItem = {
  category: GalleryCategory;
  tag: string;
  image: SiteImage;
};

export const galleryItems: GalleryItem[] = [
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-01.png", alt: "UAE and corporate flagpoles outside a government complex", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-02.png", alt: "Corporate flagpole set outside a headquarters building", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-03.png", alt: "Flagpole with custom flag at a hotel entrance", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-04.png", alt: "Flagpole installation outside a municipal building", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-06.png", alt: "Refurbished flagpole at an industrial facility", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-07.png", alt: "Flagpole entrance package at a residential community", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-08.png", alt: "Flagpole installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-09.png", alt: "Flagpole installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-05.jpg", alt: "UAE flagpole at a government office entrance", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/hero/hero-bg-01.png", alt: "Flagpoles flying against the Abu Dhabi skyline", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/hero/hero-bg-02.png", alt: "Flagpole installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "signboard", tag: "Signboard", image: { src: "/images/signboards/signboard-01.jpg", alt: "Illuminated backlit reception signboard", width: 500, height: 500 } },
  { category: "signboard", tag: "3D Sign", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-02.png", alt: "Dimensional 3D branded signage on a building facade", width: 500, height: 500 } },
  { category: "indoor", tag: "Indoor", image: { src: "/images/indoor-signs/reception/reception-01.png", alt: "Indoor reception signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Outdoor", image: { src: "/images/projects/projects-client-work-souk-entrance.png", alt: "Dimensional entrance signage reading Souk", width: 500, height: 500 } },
  { category: "traffic", tag: "Traffic & Safety", image: { src: "/images/traffic-signs/traffic-sign-02.png", alt: "Traffic and safety signage installation", width: 500, height: 500 } },
  { category: "wayfinding", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-01.png", alt: "Indoor wayfinding directional signage", width: 500, height: 500 } },
  { category: "window", tag: "Window Graphics", image: { src: "/images/window-graphics/window-graphics-02.png", alt: "Window graphics on a storefront", width: 500, height: 500 } },
  { category: "rollup", tag: "Displays", image: { src: "/images/displays/display-01.png", alt: "Roll-up display stand", width: 500, height: 500 } },
];
