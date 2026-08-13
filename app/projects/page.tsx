import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects/ProjectsContent";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed flagpole, signboard, wayfinding, and safety signage projects across Abu Dhabi and the UAE.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])),
        }}
      />
      <ProjectsContent />
    </>
  );
}
