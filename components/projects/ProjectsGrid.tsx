"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { useFilteredGrid } from "@/lib/use-filtered-grid";
import { projects, type ProjectCategory } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";

const tabs: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "flagpole", label: "Flagpoles" },
  { key: "signboard", label: "Signboards" },
  { key: "wayfinding", label: "Wayfinding" },
  { key: "traffic", label: "Traffic & Safety" },
  { key: "window", label: "Window Graphics" },
];

export function ProjectsGrid() {
  const { filter, selectFilter, filtered } = useFilteredGrid(projects, (p) => p.category);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <FilterTabs tabs={tabs} active={filter} onChange={selectFilter} />

      <div className="section-x section-y">
        <motion.div layout className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title + p.location}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="mt-3.5 font-serif text-[11px] font-semibold uppercase tracking-[0.06em] text-[oklch(55%_0.08_250)]">
                    {p.tag}
                  </div>
                  <div className="mt-1.5 text-base font-semibold text-ink">{p.title}</div>
                  <div className="mt-1 text-[13px] text-ink/60">{p.location}</div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
