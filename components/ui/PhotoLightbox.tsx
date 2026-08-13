"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteImage } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { useDirection } from "@/lib/direction-context";

export type LightboxSlide = {
  image: SiteImage;
  tag: string;
  title?: string;
  location?: string;
};

export function PhotoLightbox({
  slides,
  index,
  onClose,
  onNavigate,
}: {
  slides: LightboxSlide[];
  index: number | null;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}) {
  const { dir } = useDirection();
  const isAr = dir === "rtl";
  const [entered, setEntered] = useState(false);
  const open = index !== null;

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
      return () => cancelAnimationFrame(raf);
    }
    setEntered(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, onNavigate]);

  if (!open || index === null) return null;
  const item = slides[index];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 transition-opacity duration-200"
      style={{ background: "rgba(10,12,16,0.86)", opacity: entered ? 1 : 0 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[600px] overflow-auto bg-white shadow-[0_30px_70px_rgba(0,0,0,0.45)] transition-transform duration-200"
        style={{ transform: entered ? "scale(1)" : "scale(0.96)", maxHeight: "90vh" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={isAr ? "إغلاق" : "Close"}
          className="absolute right-3 top-3 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <X size={16} />
        </button>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="600px"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <div className="font-serif text-[11px] font-semibold uppercase tracking-[0.06em] text-[oklch(55%_0.08_250)]">
              {item.tag}
            </div>
            {item.title && <div className="mt-1 text-[17px] font-semibold text-ink">{item.title}</div>}
            {item.location && <div className="mt-0.5 text-[13px] text-ink/60">{item.location}</div>}
          </div>
          <div className="flex flex-shrink-0 gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label={isAr ? "الصورة السابقة" : "Previous photo"}
              className="flex h-[38px] w-[38px] items-center justify-center border border-border-soft bg-white text-ink-soft transition-colors hover:bg-mist"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label={isAr ? "الصورة التالية" : "Next photo"}
              className="flex h-[38px] w-[38px] items-center justify-center border border-border-soft bg-white text-ink-soft transition-colors hover:bg-mist"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
