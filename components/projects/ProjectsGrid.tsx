"use client";

import { useState } from "react";
import Image from "next/image";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { useFilteredGrid } from "@/lib/use-filtered-grid";
import { projects, type ProjectCategory } from "@/lib/site-images";

const tabs: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "flagpole", label: "Flagpoles" },
  { key: "signboard", label: "Signboards" },
  { key: "wayfinding", label: "Wayfinding" },
  { key: "traffic", label: "Traffic & Safety" },
  { key: "window", label: "Window Graphics" },
];

export function ProjectsGrid() {
  const { filter, transitioning, selectFilter, filtered } = useFilteredGrid(
    projects,
    (p) => p.category
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <FilterTabs tabs={tabs} active={filter} onChange={selectFilter} />

      <div className="section-x section-y">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7 transition-all duration-300"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(10px)" : "translateY(0)",
          }}
        >
          {filtered.map((p, i) => (
            <button
              key={p.title + p.location}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group block text-left transition-transform duration-250 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3.5 font-serif text-[11px] font-semibold uppercase tracking-[0.06em] text-[oklch(55%_0.08_250)]">
                {p.tag}
              </div>
              <div className="mt-1.5 text-base font-semibold text-ink">{p.title}</div>
              <div className="mt-1 text-[13px] text-ink/60">{p.location}</div>
            </button>
          ))}
        </div>
      </div>

      <PhotoLightbox
        slides={filtered.map((p) => ({ image: p.image, tag: p.tag, title: p.title, location: p.location }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) =>
          setLightboxIndex((cur) => (cur === null ? null : (cur + dir + filtered.length) % filtered.length))
        }
      />
    </>
  );
}
