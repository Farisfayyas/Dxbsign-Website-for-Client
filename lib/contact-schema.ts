import { z } from "zod";

export const projectTypeOptions = [
  "Flagpoles, Flags & Banners",
  "Signboards & 3D Signs",
  "Indoor Signs",
  "Outdoor Signs",
  "Traffic & Safety Signs",
  "Wayfinding Signs",
  "Window Graphics & Displays",
  "Other",
] as const;

// Arabic labels for the same options, same order/index -- the underlying
// form VALUE stays the English string (matches the z.enum below and
// what the API route / email notification expects), only the visible
// <option> text swaps for the Arabic toggle.
export const projectTypeOptionsAr: Record<(typeof projectTypeOptions)[number], string> = {
  "Flagpoles, Flags & Banners": "سواري الأعلام والأعلام واللافتات القماشية",
  "Signboards & 3D Signs": "اللوحات الإعلانية واللافتات ثلاثية الأبعاد",
  "Indoor Signs": "اللافتات الداخلية",
  "Outdoor Signs": "اللافتات الخارجية",
  "Traffic & Safety Signs": "لافتات المرور والسلامة",
  "Wayfinding Signs": "لافتات الإرشاد والتوجيه",
  "Window Graphics & Displays": "رسومات النوافذ وأنظمة العرض",
  Other: "أخرى",
};

// Factory, not a static schema, so validation messages can match whichever
// language the form is currently shown in -- ContactForm.tsx re-derives
// this via useMemo(() => getContactSchema(isAr), [isAr]).
export function getContactSchema(isAr: boolean) {
  return z.object({
    name: z.string().trim().min(1, isAr ? "أدخل اسمك" : "Enter your name"),
    company: z.string().trim().optional(),
    email: z.string().trim().email(isAr ? "أدخل بريدًا إلكترونيًا صحيحًا" : "Enter a valid email address"),
    phone: z.string().trim().optional(),
    projectType: z.enum(projectTypeOptions),
    message: z.string().trim().min(1, isAr ? "أضف بعض التفاصيل عن مشروعك" : "Add a few details about your project"),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;
