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

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  company: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  projectType: z.enum(projectTypeOptions),
  message: z.string().trim().min(1, "Add a few details about your project"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
