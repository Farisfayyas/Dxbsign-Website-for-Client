"use client";

// "Why Clients Choose Dubai Sign" -- ScrollColorText on the left, a
// credentials column on the right. The credentials column's icon
// highlights based on cursor height, not just direct hover on the icon
// itself (arabesco-style row-band pattern Faris pointed at directly) --
// the trigger area is the section's own full-width wrapper (.section-x
// has no max-width, see globals.css), so hovering anywhere at a given
// row's vertical band -- including over the ScrollColorText prose on the
// left -- highlights that row's icon on the right.
//
// Also recomputes on scroll, not just on mousemove: if the cursor sits
// still while the page scrolls under it (wheel/trackpad with no mouse
// movement), a different row ends up under the cursor and the highlight
// needs to follow. Caches the last known cursor Y and re-runs the same
// hit-test on scroll -- a plain window scroll listener is enough since
// scrolling is native (no virtual scroll container in this codebase).
//
// Cursor tracking is a window-level listener, not a container-scoped
// onMouseMove -- on a fresh page load, if the very first mouse movement
// happens to land outside this section (anywhere else on the page),
// a container-scoped handler would never fire, leaving lastY null and
// the scroll listener above permanently skipped until the cursor
// eventually crosses into the section. hitTest already only matches
// inside the three row rects, so listening globally is safe -- cursor
// movement elsewhere on the page just won't match any row.
//
// Both listeners are gated behind a local, continuously-toggling
// IntersectionObserver (`visible`) -- without it they're attached
// unconditionally for the whole life of the Home page, and each call
// forces up to 3 getBoundingClientRect() reads (one per row) regardless
// of whether this section is anywhere near the viewport. Confirmed live:
// after one mousemove ever crossed this section, scrolling all the way
// down to the footer still fired 200+ forced layout reads purely from
// scroll events, nowhere near this section. Gating on visibility -- same
// pattern as HeroSlider.tsx's autoplay gate -- stops both listeners from
// doing any work at all while scrolled away.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Award, ShieldCheck, Workflow } from "lucide-react";
import { ScrollColorText } from "@/components/ui/ScrollColorText";
import { useDirection } from "@/lib/direction-context";

// Same three facts as whyChooseUsShort (site-config.ts), but with the
// fuller descriptions already written for whyChooseUsFull (About page),
// paired with an icon since a bare title+one-liner read as too sparse
// next to the taller ScrollColorText column beside it.
const credentials = [
  {
    icon: Award,
    title: "18 Years of Experience",
    titleAr: "18 عامًا من الخبرة",
    desc: "Serving Abu Dhabi and the UAE since 2008 across government, hospitality, and industrial sectors.",
    descAr: "نخدم أبوظبي ودولة الإمارات منذ عام 2008 في القطاعات الحكومية والفندقية والصناعية.",
  },
  {
    icon: ShieldCheck,
    title: "ISO 9001 Certified",
    titleAr: "حاصلة على شهادة الأيزو 9001",
    desc: "Quality managed manufacturing processes audited to international standard.",
    descAr: "عمليات تصنيع مدارة بالجودة ومدققة وفق المعايير الدولية.",
  },
  {
    icon: Workflow,
    title: "End-to-End Service",
    titleAr: "خدمة متكاملة من الألف إلى الياء",
    desc: "Design, manufacture, installation, and maintenance handled by a single accountable team.",
    descAr: "التصميم والتصنيع والتركيب والصيانة، يتولاها فريق واحد مسؤول عن كل مرحلة.",
  },
];

export function WhyClientsChoose() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  function hitTest(y: number) {
    return rowRefs.current.findIndex((row) => {
      if (!row) return false;
      const rect = row.getBoundingClientRect();
      return y >= rect.top && y <= rect.bottom;
    });
  }

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "600px 0px 600px 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) {
      // Scrolled away: a cached cursor Y from before doesn't mean anything
      // for this section's rows anymore, and any leftover highlight should
      // clear rather than sit lit until the cursor happens to move again.
      lastY.current = null;
      setActiveIndex(null);
      return;
    }
    function onMouseMove(e: globalThis.MouseEvent) {
      lastY.current = e.clientY;
      const hit = hitTest(e.clientY);
      setActiveIndex(hit === -1 ? null : hit);
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    function onScroll() {
      if (lastY.current == null) return;
      const hit = hitTest(lastY.current);
      setActiveIndex(hit === -1 ? null : hit);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  return (
    <div ref={containerRef} className="section-x section-y bg-mist" onMouseLeave={() => setActiveIndex(null)}>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <ScrollColorText
            heading={isAr ? "لماذا يختار العملاء دبي ساين" : "Why Clients Choose Dubai Sign"}
            headingClassName="mb-4 text-[28px] font-bold"
            paragraph={
              isAr
                ? "ثمانية عشر عامًا من التصنيع القائم على المواصفات لأكثر عملاء دولة الإمارات تطلبًا، ينفذها فريق واحد مسؤول من أول رسم وحتى الصيانة المستمرة."
                : "Eighteen years of specification-led manufacturing for the UAE's most demanding clients, delivered by one accountable team from first drawing to ongoing maintenance."
            }
            paragraphClassName="max-w-[560px] text-[22px] font-medium leading-relaxed"
          />
          <Link href="/about" className="mt-5 inline-block text-sm font-semibold text-blue hover:underline">
            {isAr ? "اعرف المزيد عنا ←" : "Learn more about us →"}
          </Link>
        </div>
        <div className="flex flex-col divide-y divide-border">
          {credentials.map((w, i) => (
            <div
              key={w.title}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
            >
              <span
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out ${
                  activeIndex === i ? "scale-110 bg-blue text-white" : "bg-blue/[0.08] text-blue"
                }`}
              >
                <w.icon size={20} strokeWidth={1.75} />
              </span>
              <div>
                <div className="mb-1 text-[15px] font-semibold text-ink">{isAr ? w.titleAr : w.title}</div>
                <div className="text-sm leading-relaxed text-ink/65">{isAr ? w.descAr : w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
