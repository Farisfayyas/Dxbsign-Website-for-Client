"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { useFilteredGrid } from "@/lib/use-filtered-grid";
import { galleryItems, type GalleryCategory } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { useDirection } from "@/lib/direction-context";
import { translateTag } from "@/lib/tag-translations";

const tabs: { key: GalleryCategory | "all"; label: string; labelAr: string }[] = [
  { key: "all", label: "All", labelAr: "الكل" },
  { key: "flagpole", label: "Flagpoles", labelAr: "سواري الأعلام" },
  { key: "indoor", label: "Indoor Signs", labelAr: "اللافتات الداخلية" },
  { key: "outdoor", label: "Outdoor Signs", labelAr: "اللافتات الخارجية" },
  { key: "traffic", label: "Traffic Signs", labelAr: "لافتات المرور" },
  { key: "safety", label: "Safety Signs", labelAr: "لافتات السلامة" },
  { key: "signboard", label: "Signboards", labelAr: "اللوحات الإعلانية" },
  { key: "vehicle", label: "Vehicle Graphics", labelAr: "رسومات المركبات" },
  { key: "canopy", label: "Canopies", labelAr: "المظلات" },
  { key: "window", label: "Window Graphics", labelAr: "رسومات النوافذ" },
  { key: "aluminium", label: "Aluminium & Glass", labelAr: "الألمنيوم والزجاج" },
  { key: "rollup", label: "Displays", labelAr: "أنظمة العرض" },
];

export function GalleryGrid() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";
  const { filter, selectFilter, filtered } = useFilteredGrid(galleryItems, (g) => g.category);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <FilterTabs
        tabs={tabs.map((t) => ({ key: t.key, label: isAr ? t.labelAr : t.label }))}
        active={filter}
        onChange={selectFilter}
      />

      <div className="section-x section-y">
        <motion.div layout className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((g, i) => (
              <motion.button
                key={g.image.src + i}
                layout
                type="button"
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04 }}
                className="group relative aspect-square overflow-hidden bg-mist"
              >
                <Image
                  src={g.image.src}
                  alt={g.image.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute left-2.5 top-2.5 bg-black/40 px-[7px] py-1 font-serif text-[9px] font-semibold uppercase tracking-[0.04em] text-white">
                  {translateTag(g.tag, isAr)}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <PhotoLightbox
        slides={filtered.map((g) => ({ image: g.image, tag: translateTag(g.tag, isAr) }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) =>
          setLightboxIndex((cur) => (cur === null ? null : (cur + dir + filtered.length) % filtered.length))
        }
      />
    </>
  );
}
