"use client";

import { useState } from "react";
import Image from "next/image";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { useFilteredGrid } from "@/lib/use-filtered-grid";
import { galleryItems, type GalleryCategory } from "@/lib/site-images";

const tabs: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "flagpole", label: "Flagpoles" },
  { key: "signboard", label: "Signboards" },
  { key: "indoor", label: "Indoor" },
  { key: "outdoor", label: "Outdoor" },
  { key: "traffic", label: "Traffic & Safety" },
  { key: "wayfinding", label: "Wayfinding" },
  { key: "window", label: "Window Graphics" },
  { key: "rollup", label: "Displays" },
];

export function GalleryGrid() {
  const { filter, transitioning, selectFilter, filtered } = useFilteredGrid(
    galleryItems,
    (g) => g.category
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <FilterTabs tabs={tabs} active={filter} onChange={selectFilter} />

      <div className="section-x section-y">
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 transition-all duration-300"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(10px)" : "translateY(0)",
          }}
        >
          {filtered.map((g, i) => (
            <button
              key={g.image.src + i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square overflow-hidden bg-mist transition-transform duration-250 hover:scale-[1.03]"
            >
              <Image
                src={g.image.src}
                alt={g.image.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
              />
              <span className="absolute left-2.5 top-2.5 bg-black/40 px-[7px] py-1 font-serif text-[9px] font-semibold uppercase tracking-[0.04em] text-white">
                {g.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      <PhotoLightbox
        slides={filtered.map((g) => ({ image: g.image, tag: g.tag }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) =>
          setLightboxIndex((cur) => (cur === null ? null : (cur + dir + filtered.length) % filtered.length))
        }
      />
    </>
  );
}
