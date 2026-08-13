// Arabic renderings for the small, finite set of distinct `tag` strings
// used across galleryItems/projects/featuredProjects (lib/site-images.ts).
// Translated by lookup here rather than adding an `tagAr` field to every
// one of the ~190 individual gallery/project entries -- the tag values
// themselves only span this fixed vocabulary, repeated across many
// photos, so a single dictionary covers all of them.

export const tagAr: Record<string, string> = {
  "3D LED Signs": "لافتات LED ثلاثية الأبعاد",
  "3D Letters": "حروف ثلاثية الأبعاد",
  "3D Signs": "لافتات ثلاثية الأبعاد",
  "Aluminium & Glass": "الألمنيوم والزجاج",
  Canopies: "المظلات",
  "Car Park Signs": "لافتات مواقف السيارات",
  "Company Signage": "لافتات الشركات",
  Directory: "لوحة الدليل",
  Displays: "أنظمة العرض",
  "Door Signs": "لافتات الأبواب",
  "Entrance Signs": "لافتات المداخل",
  Flagpole: "سارية علم",
  Flagpoles: "سواري الأعلام",
  "Flex Face Signs": "لافتات الفينيل المشدود",
  "Floor Signs": "لافتات الأرضية",
  "Illuminated Signboard": "لوحة إعلانية مضاءة",
  "Indoor Flagpole": "سارية علم داخلية",
  "Indoor Signage": "لافتات داخلية",
  "Information Signs": "لافتات معلومات",
  "Internal Signage": "لافتات داخلية",
  "Nameplate Signage": "لافتات أسماء",
  "Notice Board": "لوحة إعلانات",
  Outdoor: "خارجي",
  "Pool Signs": "لافتات المسبح",
  "Prismatic Signs": "لافتات منشورية",
  "Project Signage": "لافتات المشاريع",
  Reception: "الاستقبال",
  "Restaurant Signage": "لافتات المطاعم",
  "Safety Signs": "لافتات السلامة",
  Signboard: "لوحة إعلانية",
  Signboards: "لوحات إعلانية",
  "Slim Light Box": "صندوق إضاءة رفيع",
  "Snap Frames": "إطارات عرض قابلة للفتح",
  "Totem Signs": "أعمدة إعلانية",
  "Traffic & Safety": "المرور والسلامة",
  "Traffic Signs": "لافتات المرور",
  "Vehicle Graphics": "رسومات المركبات",
  "Warehouse Signs": "لافتات المستودعات",
  Wayfinding: "الإرشاد والتوجيه",
  "Window Graphics": "رسومات النوافذ",
};

export function translateTag(tag: string, isAr: boolean) {
  if (!isAr) return tag;
  return tagAr[tag] ?? tag;
}
