"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { navItems, navLabelsAr, site } from "@/lib/site-config";
import { useDirection } from "@/lib/direction-context";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dir, toggle } = useDirection();
  const isAr = dir === "rtl";

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1080);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-[0_1px_0_rgba(12,77,162,0.03)] font-display">
      <nav className="relative mx-auto flex max-w-[1680px] items-center justify-between gap-16 px-[clamp(20px,4vw,72px)] py-[22px]">
        <div className="flex items-center gap-[clamp(20px,3vw,44px)]">
          <Link href="/" className="flex flex-shrink-0 items-center" aria-label={`${site.name} home`}>
            <Image src="/logo.png" alt={site.name} width={250} height={90} className="h-[58px] w-auto" priority />
          </Link>
          <div className="h-[17px] w-px flex-shrink-0 bg-border-soft" aria-hidden />

          {!isMobile && (
            <div className="flex items-center gap-[26px]">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-[14.5px] transition-colors duration-200 ${
                    isActive(item.href)
                      ? "font-semibold text-blue"
                      : "font-medium text-ink-soft hover:text-blue"
                  }`}
                >
                  {isAr ? navLabelsAr[item.key] : item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={toggle}
                className="ml-1.5 rounded-md border border-border-soft px-2.5 py-1.5 font-display text-[12.5px] font-semibold text-ink-soft/80 transition-colors duration-200 hover:border-blue hover:text-blue"
                aria-pressed={isAr}
                aria-label="Toggle Arabic layout direction"
              >
                EN / عربي
              </button>
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="flex flex-shrink-0 items-center gap-8">
            <a
              href={site.phone.mobileHref}
              className="flex items-center gap-2 text-[15px] font-semibold text-ink transition-colors duration-200 hover:text-blue"
            >
              <Phone size={17} strokeWidth={2} className="text-blue" aria-hidden />
              {site.phone.mobile}
            </a>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-blue px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_2px_6px_rgba(12,77,162,0.22)] transition-all duration-200 hover:bg-blue-deep hover:shadow-[0_6px_16px_rgba(12,77,162,0.3)] hover:-translate-y-px"
              >
                {isAr ? "اطلب عرض سعر" : "Request a Quote"}
                <ArrowRight size={14} strokeWidth={2.4} aria-hidden />
              </Link>
            </MagneticButton>
          </div>
        )}

        {isMobile && (
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-[18px] w-[26px] flex-col justify-between p-2"
            style={{ padding: 0 }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="block h-0.5 rounded-full bg-ink"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 rounded-full bg-ink"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="block h-0.5 rounded-full bg-ink"
            />
          </button>
        )}

        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-x-0 top-full z-[60] flex flex-col border-b border-border-soft bg-white px-[clamp(20px,4vw,48px)] pb-5 pt-1 shadow-[0_16px_28px_rgba(0,0,0,0.1)]"
            >
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`border-b border-border-soft py-3.5 text-[15px] ${
                    isActive(item.href) ? "font-semibold text-blue" : "font-medium text-ink-soft"
                  }`}
                >
                  {isAr ? navLabelsAr[item.key] : item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={toggle}
                aria-pressed={isAr}
                aria-label="Toggle Arabic layout direction"
                className="border-b border-border-soft py-3.5 text-left text-[15px] font-medium text-ink-soft"
              >
                EN / عربي
              </button>
              <a href={site.phone.mobileHref} className="flex items-center gap-2 border-b border-border-soft py-3.5 text-[15px] font-semibold text-blue">
                {site.phone.mobile}
              </a>
              <Link
                href="/contact"
                className="mt-3 rounded-[3px] bg-blue py-3.5 text-center text-[15px] font-semibold text-white"
              >
                {isAr ? "اطلب عرض سعر" : "Request a Quote"}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
