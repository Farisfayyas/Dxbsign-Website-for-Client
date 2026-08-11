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

// About page hero band background — Downtown Dubai aerial at dusk
// (orange/pink sky, Burj Khalifa, illuminated highways). This was the
// photo on About for most of the engagement; got swapped out briefly
// when "the old skyline picture" was first requested (that turned out
// to mean the wide panoramic hero-page-header photo, now on Contact
// instead), then swapped back once Faris confirmed by description
// ("orange skyline with burj khalifa") which one he actually meant.
export const skylineImage: SiteImage = {
  src: "/images/stock/dubai-downtown-dusk-skyline.jpg",
  alt: "Aerial view of Downtown Dubai at dusk with illuminated highways",
  width: 2400,
  height: 1602,
};

// Contact page hero band background — poster/fallback for the video
// that lives there (mobile and reduced-motion visitors get this static
// frame instead of the autoplay loop). The wide panoramic client-site
// photo that used to be About's skylineImage -- kept as a distinct
// photo from About's so the two hero bands don't show the same image.
export const contactHeroPoster: SiteImage = {
  src: "/images/hero/hero-page-header-bg-dubai-skyline.png",
  alt: "Wide panoramic view of the Dubai skyline at night with the Burj Khalifa illuminated",
  width: 1600,
  height: 280,
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
  | "indoor"
  | "outdoor"
  | "traffic"
  | "safety"
  | "signboard"
  | "vehicle"
  | "canopy"
  | "window"
  | "aluminium"
  | "rollup";

export type GalleryItem = {
  category: GalleryCategory;
  tag: string;
  image: SiteImage;
};

export const galleryItems: GalleryItem[] = [
  // Flagpoles -- real installation photos plus 4 more found among the
  // generic client-photo scrape (gallery-02/04/09/10).
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-01.png", alt: "UAE and corporate flagpoles outside a government complex", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-02.png", alt: "Corporate flagpole set outside a headquarters building", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-03.png", alt: "Flagpole with custom flag at a hotel entrance", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-04.png", alt: "Flagpole installation outside a municipal building", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-06.png", alt: "Refurbished flagpole at an industrial facility", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-07.png", alt: "Flagpole entrance package at a residential community", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-08.png", alt: "Flagpole installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-09.png", alt: "Flagpole installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/flagpoles/flagpole-05.jpg", alt: "UAE flagpole at a government office entrance", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/gallery/gallery-02.jpg", alt: "UAE flag flying on a pole in front of a glass office tower, Abu Dhabi", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/gallery/gallery-04.jpg", alt: "UAE flag on a flagpole outside a corporate office building at dusk", width: 500, height: 500 } },
  { category: "flagpole", tag: "Flagpole", image: { src: "/images/gallery/gallery-09.jpg", alt: "UAE flag on a rooftop terrace flagpole with a city skyline backdrop", width: 500, height: 500 } },
  { category: "flagpole", tag: "Indoor Flagpole", image: { src: "/images/gallery/gallery-10.jpg", alt: "UAE flag mounted on an ornamental indoor flagpole stand in an office lobby", width: 500, height: 500 } },

  // Signboards -- the 8 large illuminated fascia signs found in the
  // scrape's "mega-sign" set are a real boost to this category.
  { category: "signboard", tag: "Signboard", image: { src: "/images/signboards/signboard-01.jpg", alt: "Illuminated backlit reception signboard", width: 500, height: 500 } },
  { category: "signboard", tag: "Signboard", image: { src: "/images/signboards/signboard-02.jpg", alt: "Illuminated signboard on a commercial building facade", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-01.png", alt: "Large illuminated fascia signboard on a retail building", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-02.png", alt: "Large illuminated fascia signboard, Abu Dhabi", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-03.png", alt: "Large illuminated fascia signboard, Abu Dhabi", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-04.png", alt: "Large illuminated fascia signboard on a commercial building", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-05.png", alt: "Large illuminated fascia signboard, Abu Dhabi", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-06.png", alt: "Large illuminated fascia signboard on a commercial building", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-07.png", alt: "Large illuminated fascia signboard, Abu Dhabi", width: 500, height: 500 } },
  { category: "signboard", tag: "Illuminated Signboard", image: { src: "/images/projects/mega-sign-08.png", alt: "Large illuminated fascia signboard on a retail building", width: 500, height: 500 } },

  // Indoor Signs -- reception, wayfinding, directory, door, floor,
  // notice board, restaurant/menu, snap-frame, 3D letters, plus the
  // internal-signs/led-signs/directory-signs/gallery scrape folders
  // folded in (same product type, no separate real category for them).
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-01.png", alt: "Illuminated reception backdrop signage in a corporate lobby", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-02.png", alt: "Dimensional reception signage in an office lobby", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-03.png", alt: "Illuminated reception backdrop signage, Abu Dhabi", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-04.png", alt: "Reception desk signage in a corporate lobby", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-05.png", alt: "Illuminated reception backdrop signage, Abu Dhabi", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-06.png", alt: "Dimensional reception signage in an office lobby", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-07.png", alt: "Illuminated reception backdrop signage, Abu Dhabi", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-08.png", alt: "Reception desk signage in a corporate lobby", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-09.png", alt: "Illuminated reception backdrop signage, Abu Dhabi", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/indoor-signs/reception/reception-10.png", alt: "Dimensional reception signage in an office lobby", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-01.png", alt: "Indoor wayfinding directional signage", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-02.png", alt: "Indoor wayfinding directional signage, corridor mount", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-03.png", alt: "Indoor wayfinding directional signage, ceiling mount", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-04.png", alt: "Indoor wayfinding directional signage", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-05.png", alt: "Indoor wayfinding directional signage, corridor mount", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-06.png", alt: "Indoor wayfinding directional signage", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-07.png", alt: "Indoor wayfinding directional signage, ceiling mount", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-08.png", alt: "Indoor wayfinding directional signage", width: 500, height: 500 } },
  { category: "indoor", tag: "Wayfinding", image: { src: "/images/indoor-signs/wayfinding/wayfinding-09.png", alt: "Indoor wayfinding directional signage, corridor mount", width: 500, height: 500 } },
  { category: "indoor", tag: "Directory", image: { src: "/images/indoor-signs/directory/directory-01.png", alt: "Wall-mounted directory sign listing floor and department names", width: 500, height: 500 } },
  { category: "indoor", tag: "Directory", image: { src: "/images/indoor-signs/directory/directory-02.png", alt: "Wall-mounted directory sign, Abu Dhabi facility", width: 500, height: 500 } },
  { category: "indoor", tag: "Directory", image: { src: "/images/indoor-signs/directory/directory-03.png", alt: "Wall-mounted directory sign listing floor and department names", width: 500, height: 500 } },
  { category: "indoor", tag: "Directory", image: { src: "/images/indoor-signs/directory/directory-04.png", alt: "Wall-mounted directory sign, Abu Dhabi facility", width: 500, height: 500 } },
  { category: "indoor", tag: "Directory", image: { src: "/images/directory-signs/directory-sign-05.png", alt: "Wall-mounted directory board listing department names", width: 500, height: 500 } },
  { category: "indoor", tag: "Door Signs", image: { src: "/images/indoor-signs/door-signs/door-sign-01.png", alt: "Door title sign outside an office or meeting room", width: 500, height: 500 } },
  { category: "indoor", tag: "Door Signs", image: { src: "/images/indoor-signs/door-signs/door-sign-02.png", alt: "Door title sign outside an office or meeting room", width: 500, height: 500 } },
  { category: "indoor", tag: "Door Signs", image: { src: "/images/indoor-signs/door-signs/door-sign-03.png", alt: "Door title sign outside an office or meeting room", width: 500, height: 500 } },
  { category: "indoor", tag: "Door Signs", image: { src: "/images/indoor-signs/door-signs/door-sign-04.png", alt: "Door title sign outside an office or meeting room", width: 500, height: 500 } },
  { category: "indoor", tag: "Door Signs", image: { src: "/images/indoor-signs/door-signs/door-sign-05.png", alt: "Door title sign outside an office or meeting room", width: 500, height: 500 } },
  { category: "indoor", tag: "Door Signs", image: { src: "/images/indoor-signs/door-signs/door-sign-06.png", alt: "Door title sign outside an office or meeting room", width: 500, height: 500 } },
  { category: "indoor", tag: "Door Signs", image: { src: "/images/indoor-signs/door-signs/door-sign-07.png", alt: "Door title sign outside an office or meeting room", width: 500, height: 500 } },
  { category: "indoor", tag: "Floor Signs", image: { src: "/images/indoor-signs/floor-graphics/floor-graphics-01.png", alt: "Engraved floor-level room number sign", width: 500, height: 500 } },
  { category: "indoor", tag: "Slim Light Box", image: { src: "/images/indoor-signs/floor-graphics/floor-graphics-lightbox-01.png", alt: "Illuminated indoor lightbox signage", width: 500, height: 500 } },
  { category: "indoor", tag: "Slim Light Box", image: { src: "/images/indoor-signs/floor-graphics/floor-graphics-lightbox-02.png", alt: "Illuminated indoor lightbox signage", width: 500, height: 500 } },
  { category: "indoor", tag: "Notice Board", image: { src: "/images/indoor-signs/notice-boards/notice-board-01.png", alt: "Glass-fronted notice board for posted announcements", width: 500, height: 500 } },
  { category: "indoor", tag: "Notice Board", image: { src: "/images/indoor-signs/notice-boards/notice-board-02.png", alt: "Glass-fronted notice board for posted announcements", width: 500, height: 500 } },
  { category: "indoor", tag: "Restaurant Signage", image: { src: "/images/indoor-signs/restaurant-menu/restaurant-menu-01.png", alt: "Illuminated menu board signage for a restaurant or cafe", width: 500, height: 500 } },
  { category: "indoor", tag: "Restaurant Signage", image: { src: "/images/indoor-signs/restaurant-menu/restaurant-menu-02.png", alt: "Illuminated menu board signage for a restaurant or cafe", width: 500, height: 500 } },
  { category: "indoor", tag: "Restaurant Signage", image: { src: "/images/indoor-signs/restaurant-menu/restaurant-menu-03.png", alt: "Illuminated menu board signage for a restaurant or cafe", width: 500, height: 500 } },
  { category: "indoor", tag: "Restaurant Signage", image: { src: "/images/indoor-signs/restaurant-menu/restaurant-menu-04.png", alt: "Illuminated menu board signage for a restaurant or cafe", width: 500, height: 500 } },
  { category: "indoor", tag: "Restaurant Signage", image: { src: "/images/projects/projects-client-work-algusto-restaurant.png", alt: "Illuminated restaurant signage installation", width: 500, height: 500 } },
  { category: "indoor", tag: "Restaurant Signage", image: { src: "/images/projects/projects-client-work-algusto-restaurant-02.png", alt: "Illuminated restaurant signage installation, detail view", width: 500, height: 500 } },
  { category: "indoor", tag: "Snap Frames", image: { src: "/images/indoor-signs/snap-frames/snap-frame-01.png", alt: "Wall-mounted snap-frame poster display", width: 500, height: 500 } },
  { category: "indoor", tag: "3D Letters", image: { src: "/images/indoor-signs/3d-letters/3d-letters-01.png", alt: "Backlit dimensional letter signage in a reception area", width: 500, height: 500 } },
  { category: "indoor", tag: "Indoor Signage", image: { src: "/images/indoor-signs/misc/misc-01.png", alt: "Indoor signage installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "indoor", tag: "Indoor Signage", image: { src: "/images/indoor-signs/misc/misc-02.png", alt: "Indoor signage installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "indoor", tag: "Indoor Signage", image: { src: "/images/indoor-signs/misc/misc-03.png", alt: "Indoor signage installation, Abu Dhabi", width: 500, height: 500 } },
  { category: "indoor", tag: "Reception", image: { src: "/images/projects/projects-client-work-rimond-reception.jpg", alt: "Illuminated dimensional reception signage in a corporate lobby", width: 500, height: 500 } },
  { category: "indoor", tag: "Nameplate Signage", image: { src: "/images/gallery/gallery-01.jpg", alt: "Set of wall-mounted company nameplate signs", width: 500, height: 500 } },
  { category: "indoor", tag: "3D LED Signs", image: { src: "/images/led-signs/led-sign-01.png", alt: "Backlit 3D LED letter signage on an interior wall", width: 500, height: 500 } },
  { category: "indoor", tag: "3D LED Signs", image: { src: "/images/led-signs/led-sign-02.png", alt: "Backlit 3D LED letter signage on an interior wall", width: 500, height: 500 } },
  { category: "indoor", tag: "3D LED Signs", image: { src: "/images/led-signs/led-sign-03.png", alt: "Backlit 3D LED letter signage on an interior wall", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-02.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-04.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-05.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-06.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-07.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-08.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-09.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-10.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-11.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-12.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-13.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-14.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-15.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },
  { category: "indoor", tag: "Internal Signage", image: { src: "/images/internal-signs/internal-sign-16.png", alt: "Dimensional wall-mounted branding sign in an office interior", width: 500, height: 500 } },

  // Outdoor Signs -- 3D signs, entrances, totems, carparks, company
  // signage, prismatic, project signs, wayfinding, plus external-signs
  // (same product type, no separate real category) folded in.
  { category: "outdoor", tag: "Outdoor", image: { src: "/images/projects/projects-client-work-souk-entrance.png", alt: "Dimensional entrance signage reading Souk", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-01.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-02.png", alt: "Dimensional 3D branded signage on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-03.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-04.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-05.png", alt: "Dimensional 3D sign on a storefront", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-06.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-07.png", alt: "Dimensional 3D sign on a storefront", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-08.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-09.png", alt: "Dimensional 3D sign on a storefront", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-10.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-11.png", alt: "Dimensional 3D sign on a storefront", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-12.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-13.png", alt: "Dimensional 3D sign on a storefront", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-14.png", alt: "Dimensional 3D sign on a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "3D Signs", image: { src: "/images/outdoor-signs/3d-signs/3d-sign-15.png", alt: "Dimensional 3D sign on a storefront", width: 500, height: 500 } },
  { category: "outdoor", tag: "Entrance Signs", image: { src: "/images/outdoor-signs/entrance/entrance-01.png", alt: "Dimensional entrance signage at a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "Entrance Signs", image: { src: "/images/outdoor-signs/entrance/entrance-02.png", alt: "Dimensional entrance signage at a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "Entrance Signs", image: { src: "/images/outdoor-signs/entrance/entrance-03.png", alt: "Dimensional entrance signage at a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "Entrance Signs", image: { src: "/images/outdoor-signs/entrance/entrance-04.png", alt: "Dimensional entrance signage at a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "Entrance Signs", image: { src: "/images/outdoor-signs/entrance/entrance-05.png", alt: "Dimensional entrance signage at a building facade", width: 500, height: 500 } },
  { category: "outdoor", tag: "Totem Signs", image: { src: "/images/outdoor-signs/totem/totem-01.png", alt: "Outdoor totem directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Totem Signs", image: { src: "/images/outdoor-signs/totem/totem-02.png", alt: "Outdoor totem directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Totem Signs", image: { src: "/images/outdoor-signs/totem/totem-03.png", alt: "Outdoor totem directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Totem Signs", image: { src: "/images/outdoor-signs/totem/totem-04.png", alt: "Outdoor totem directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Totem Signs", image: { src: "/images/outdoor-signs/totem/totem-05.png", alt: "Outdoor totem directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Totem Signs", image: { src: "/images/outdoor-signs/totem/totem-06.png", alt: "Outdoor totem directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Totem Signs", image: { src: "/images/outdoor-signs/totem/totem-07.png", alt: "Outdoor totem directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Car Park Signs", image: { src: "/images/outdoor-signs/carpark/carpark-01.png", alt: "Car park directional and level signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Car Park Signs", image: { src: "/images/outdoor-signs/carpark/carpark-02.png", alt: "Car park directional and level signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Car Park Signs", image: { src: "/images/outdoor-signs/carpark/carpark-03.png", alt: "Car park directional and level signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Car Park Signs", image: { src: "/images/outdoor-signs/carpark/carpark-04.png", alt: "Car park directional and level signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/outdoor-signs/company-signs/company-sign-01.png", alt: "Illuminated company signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/outdoor-signs/company-signs/company-sign-02.png", alt: "Illuminated company signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/outdoor-signs/company-signs/company-sign-03.png", alt: "Illuminated company signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/outdoor-signs/company-signs/company-sign-04.png", alt: "Illuminated company signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/outdoor-signs/company-signs/company-sign-05.png", alt: "Illuminated company signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-01.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-02.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-03.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-04.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-05.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-06.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-07.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/external-signs/external-sign-08.png", alt: "Company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/gallery/gallery-08.jpg", alt: "G4S company signage on a building exterior, Abu Dhabi", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/projects/projects-client-work-nails-couture.png", alt: "Illuminated storefront signage installation", width: 500, height: 500 } },
  { category: "outdoor", tag: "Company Signage", image: { src: "/images/projects/projects-client-work-paolobongia.png", alt: "Illuminated storefront signage installation", width: 500, height: 500 } },
  { category: "outdoor", tag: "Prismatic Signs", image: { src: "/images/outdoor-signs/prism/prism-01.png", alt: "Prismatic aluminium dimensional signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Prismatic Signs", image: { src: "/images/outdoor-signs/prism/prism-02.png", alt: "Prismatic aluminium dimensional signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Prismatic Signs", image: { src: "/images/outdoor-signs/prism/prism-03.png", alt: "Prismatic aluminium dimensional signage on a building exterior", width: 500, height: 500 } },
  { category: "outdoor", tag: "Project Signage", image: { src: "/images/outdoor-signs/project-signs/project-sign-01.png", alt: "Construction project identification signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Project Signage", image: { src: "/images/outdoor-signs/project-signs/project-sign-02.png", alt: "Construction project identification signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Information Signs", image: { src: "/images/outdoor-signs/information/information-01.png", alt: "Outdoor information and signage panel", width: 500, height: 500 } },
  { category: "outdoor", tag: "Information Signs", image: { src: "/images/outdoor-signs/information/information-02.png", alt: "Outdoor information and signage panel", width: 500, height: 500 } },
  { category: "outdoor", tag: "Flex Face Signs", image: { src: "/images/outdoor-signs/flex-banner/flex-banner-01.png", alt: "Illuminated flex-face banner signage on a storefront", width: 500, height: 500 } },
  { category: "outdoor", tag: "Warehouse Signs", image: { src: "/images/outdoor-signs/warehouse/warehouse-01.png", alt: "Exterior warehouse facility signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Pool Signs", image: { src: "/images/outdoor-signs/pool-signs/pool-sign-01.png", alt: "Outdoor pool regulation signage panel", width: 500, height: 500 } },
  { category: "outdoor", tag: "Wayfinding", image: { src: "/images/outdoor-signs/wayfinding/wayfinding-01.png", alt: "Outdoor wayfinding directional signage", width: 500, height: 500 } },
  { category: "outdoor", tag: "Wayfinding", image: { src: "/images/outdoor-signs/wayfinding/wayfinding-02.png", alt: "Outdoor wayfinding directional signage", width: 500, height: 500 } },

  // Traffic Signs
  { category: "traffic", tag: "Traffic Signs", image: { src: "/images/traffic-signs/traffic-sign-01.png", alt: "Traffic and regulatory signage installation", width: 500, height: 500 } },
  { category: "traffic", tag: "Traffic Signs", image: { src: "/images/traffic-signs/traffic-sign-02.png", alt: "Traffic and safety signage installation", width: 500, height: 500 } },
  { category: "traffic", tag: "Traffic Signs", image: { src: "/images/traffic-signs/traffic-sign-03.png", alt: "Traffic and regulatory signage installation", width: 500, height: 500 } },
  { category: "traffic", tag: "Traffic Signs", image: { src: "/images/traffic-signs/traffic-sign-04.png", alt: "Traffic and regulatory signage installation", width: 500, height: 500 } },
  { category: "traffic", tag: "Traffic Signs", image: { src: "/images/gallery/gallery-03.jpg", alt: "Yellow lane-direction traffic sign on a portable stand", width: 500, height: 500 } },
  { category: "traffic", tag: "Traffic Signs", image: { src: "/images/gallery/gallery-11.jpg", alt: "No entry, private road traffic sign on a roadside post", width: 500, height: 500 } },

  // Safety Signs (new real category)
  { category: "safety", tag: "Safety Signs", image: { src: "/images/safety-signs/safety-sign-01.png", alt: "Safety and regulatory signage installation", width: 500, height: 500 } },
  { category: "safety", tag: "Safety Signs", image: { src: "/images/safety-signs/safety-sign-02.png", alt: "Safety and regulatory signage installation", width: 500, height: 500 } },
  { category: "safety", tag: "Safety Signs", image: { src: "/images/safety-signs/safety-sign-03.png", alt: "Safety and regulatory signage installation", width: 500, height: 500 } },
  { category: "safety", tag: "Safety Signs", image: { src: "/images/safety-signs/safety-sign-06.png", alt: "Safety and regulatory signage installation", width: 500, height: 500 } },
  { category: "safety", tag: "Safety Signs", image: { src: "/images/safety-signs/safety-sign-main.png", alt: "Safety and regulatory signage panel", width: 500, height: 500 } },
  { category: "safety", tag: "Safety Signs", image: { src: "/images/gallery/gallery-05.jpg", alt: "Men-at-work road safety warning sign on a portable stand", width: 500, height: 500 } },
  { category: "safety", tag: "Safety Signs", image: { src: "/images/gallery/gallery-07.jpg", alt: "No mooring regulatory safety sign on a post", width: 500, height: 500 } },
  { category: "safety", tag: "Safety Signs", image: { src: "/images/gallery/gallery-12.jpg", alt: "No smoking safety sign mounted on a building wall", width: 500, height: 500 } },

  // Vehicle Graphics (new real category)
  { category: "vehicle", tag: "Vehicle Graphics", image: { src: "/images/vehicle-graphics/vehicle-graphics-01.jpg", alt: "Vehicle graphics and branding wrap installation", width: 500, height: 500 } },
  { category: "vehicle", tag: "Vehicle Graphics", image: { src: "/images/vehicle-graphics/vehicle-graphics-02.png", alt: "Vehicle graphics and branding wrap installation", width: 500, height: 500 } },
  { category: "vehicle", tag: "Vehicle Graphics", image: { src: "/images/vehicle-graphics/vehicle-graphics-03.png", alt: "Vehicle graphics and branding wrap installation", width: 500, height: 500 } },

  // Canopies (new real category -- only one usable photo in the whole
  // scrape; shown honestly at 1 item rather than padded, see plan notes)
  { category: "canopy", tag: "Canopies", image: { src: "/images/canopies/canopy-01.png", alt: "Outdoor canopy structure installation, Abu Dhabi", width: 500, height: 500 } },

  // Window Graphics
  { category: "window", tag: "Window Graphics", image: { src: "/images/window-graphics/window-graphics-01.png", alt: "Window graphics on a storefront", width: 500, height: 500 } },
  { category: "window", tag: "Window Graphics", image: { src: "/images/window-graphics/window-graphics-02.png", alt: "Window graphics on a storefront", width: 500, height: 500 } },

  // Aluminium & Glass (new real category)
  { category: "aluminium", tag: "Aluminium & Glass", image: { src: "/images/aluminium-glass/aluminium-glass-01.png", alt: "Aluminium and glass fabrication installation", width: 500, height: 500 } },
  { category: "aluminium", tag: "Aluminium & Glass", image: { src: "/images/aluminium-glass/aluminium-glass-02.png", alt: "Aluminium and glass fabrication installation", width: 500, height: 500 } },
  { category: "aluminium", tag: "Aluminium & Glass", image: { src: "/images/aluminium-glass/aluminium-glass-main.png", alt: "Aluminium and glass fabrication detail", width: 500, height: 500 } },

  // Displays
  { category: "rollup", tag: "Displays", image: { src: "/images/displays/display-01.png", alt: "Roll-up display stand", width: 500, height: 500 } },
  { category: "rollup", tag: "Displays", image: { src: "/images/displays/display-02.jpg", alt: "Promotional display stand", width: 500, height: 500 } },
  { category: "rollup", tag: "Displays", image: { src: "/images/displays/display-03.png", alt: "Promotional display stand", width: 500, height: 500 } },
  { category: "rollup", tag: "Displays", image: { src: "/images/displays/display-04.png", alt: "Promotional display signage", width: 500, height: 500 } },
  { category: "rollup", tag: "Displays", image: { src: "/images/displays/display-05.png", alt: "Promotional display signage", width: 500, height: 500 } },
];
