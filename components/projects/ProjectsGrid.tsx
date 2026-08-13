"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { useFilteredGrid } from "@/lib/use-filtered-grid";
import { projects, type ProjectCategory } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { useDirection } from "@/lib/direction-context";
import { translateTag } from "@/lib/tag-translations";

const tabs: { key: ProjectCategory | "all"; label: string; labelAr: string }[] = [
  { key: "all", label: "All", labelAr: "الكل" },
  { key: "flagpole", label: "Flagpoles", labelAr: "سواري الأعلام" },
  { key: "signboard", label: "Signboards", labelAr: "اللوحات الإعلانية" },
  { key: "wayfinding", label: "Wayfinding", labelAr: "الإرشاد والتوجيه" },
  { key: "traffic", label: "Traffic & Safety", labelAr: "المرور والسلامة" },
  { key: "window", label: "Window Graphics", labelAr: "رسومات النوافذ" },
];

export function ProjectsGrid() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";
  const { filter, selectFilter, filtered } = useFilteredGrid(projects, (p) => p.category);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <FilterTabs
        tabs={tabs.map((t) => ({ key: t.key, label: isAr ? t.labelAr : t.label }))}
        active={filter}
        onChange={selectFilter}
      />

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
                    {translateTag(p.tag, isAr)}
                  </div>
                  <div className="mt-1.5 text-base font-semibold text-ink">{isAr ? p.titleAr : p.title}</div>
                  <div className="mt-1 text-[13px] text-ink/60">{isAr ? p.locationAr : p.location}</div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <PhotoLightbox
        slides={filtered.map((p) => ({
          image: p.image,
          tag: translateTag(p.tag, isAr),
          title: isAr ? p.titleAr : p.title,
          location: isAr ? p.locationAr : p.location,
        }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) =>
          setLightboxIndex((cur) => (cur === null ? null : (cur + dir + filtered.length) % filtered.length))
        }
      />
    </>
  );
}
