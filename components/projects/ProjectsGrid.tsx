"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { useFilteredGrid } from "@/lib/use-filtered-grid";
import { projects, type ProjectCategory } from "@/lib/site-images";
import { site, whatsapp } from "@/lib/site-config";

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

                <div className="mt-3.5 flex gap-2.5">
                  <a
                    href={whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 border border-whatsapp/30 bg-whatsapp/[0.06] px-3 py-2 text-xs font-semibold text-whatsapp transition-colors duration-200 hover:bg-whatsapp/[0.12]"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    Enquire
                  </a>
                  <a
                    href={site.phone.mobileHref}
                    className="flex items-center justify-center gap-1.5 border border-border-soft px-3 py-2 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:border-ink/30 hover:bg-mist"
                  >
                    <Phone size={12} strokeWidth={2} />
                    Call
                  </a>
                </div>
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
