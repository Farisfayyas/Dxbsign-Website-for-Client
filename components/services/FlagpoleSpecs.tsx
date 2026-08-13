"use client";

// Real spec-sheet treatment for flagpoles specifically — the one arabesco/
// hajster idea build-spec.md flagged as highest-value and flagpole-only
// (the other 7 categories deliberately stay lighter). Values below are
// industry-typical for tapered aluminum/GRP flagpoles in a Gulf climate,
// not client-confirmed figures — see project README before launch.

import { Ruler, Layers, Wind, ShieldCheck, Clock, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { whatsapp } from "@/lib/site-config";
import { useDirection } from "@/lib/direction-context";

const specs = [
  { icon: Ruler, label: "Height Options", labelAr: "خيارات الارتفاع", value: "6m · 9m · 12m · 15m · 20m", valueAr: "6م · 9م · 12م · 15م · 20م" },
  { icon: Layers, label: "Material", labelAr: "المادة", value: "Tapered aluminum or fiberglass (GRP)", valueAr: "ألمنيوم مدرّج أو ألياف زجاجية (GRP)" },
  { icon: Wind, label: "Wind Rating", labelAr: "تحمّل الرياح", value: "Engineered up to 150 km/h sustained loads", valueAr: "مصممة هندسيًا لتحمّل رياح مستمرة تصل إلى 150 كم/س" },
  { icon: Palette, label: "Finish", labelAr: "التشطيب", value: "Powder-coated or anodized, UV & salt-air resistant", valueAr: "طلاء بودرة أو أنودة، مقاوم للأشعة فوق البنفسجية والهواء المالح" },
  { icon: ShieldCheck, label: "Warranty", labelAr: "الضمان", value: "5-year structural warranty", valueAr: "ضمان إنشائي لمدة 5 سنوات" },
  { icon: Clock, label: "Installation", labelAr: "التركيب", value: "1–2 days per site, foundation-dependent", valueAr: "من 1 إلى 2 يوم لكل موقع، حسب نوع الأساس" },
];

export function FlagpoleSpecs() {
  const { dir } = useDirection();
  const isAr = dir === "rtl";

  return (
    <Reveal>
      <div className="section-x section-y bg-ink">
        <div className="mb-10 max-w-[640px]">
          <div className="mb-3 font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(68%_0.09_250)]">
            {isAr ? "منتجنا الأساسي" : "Our Primary Product"}
          </div>
          <h2 className="mb-4 text-[28px] font-bold text-white">
            {isAr ? "مواصفات سواري الأعلام" : "Flagpole Specifications"}
          </h2>
          <p className="text-[15px] leading-relaxed text-[oklch(75%_0.01_250)]">
            {isAr
              ? "تُصمَّم سواري الأعلام وتُصنَّع وتُركَّب داخليًا وفق المواصفات القياسية أدناه، إذ تُصنَّع كل سارية حسب الطلب وفقًا للارتفاع وتحمّل الرياح ونوع التشطيب الذي يحدده العميل."
              : "Flagpoles are engineered, manufactured, and installed in-house to the specification below as standard - every pole is built to order against a client’s exact height, wind-load, and finish requirement."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[oklch(30%_0.01_250)] sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 bg-ink px-6 py-7"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[oklch(70%_0.1_250)]">
                <s.icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <div className="font-serif text-[11px] font-semibold uppercase tracking-[0.06em] text-[oklch(65%_0.08_250)]">
                  {isAr ? s.labelAr : s.label}
                </div>
                <div className="mt-1.5 text-[15px] font-medium leading-snug text-white">{isAr ? s.valueAr : s.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp px-7 py-[15px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
          >
            {isAr ? "صمّم ساريتك" : "Configure Your Flagpole"}
          </a>
          <span className="text-sm text-[oklch(70%_0.01_250)]">
            {isAr
              ? "أرسل لنا الارتفاع والكمية وتفاصيل الموقع، وسنؤكد لك المواصفات والعرض السعري."
              : "Send your height, quantity, and site details - we’ll confirm a specification and quote."}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
