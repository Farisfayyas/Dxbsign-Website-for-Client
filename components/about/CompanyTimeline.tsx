"use client";

// Company history as a real timeline device, kept honest: only the
// confirmed founding year and present-day status get dates. No invented
// intermediate-year milestones (see build-spec.md's placeholder-data
// caution). The connecting line draws itself in on scroll for a bit of
// genuine "premium" motion, not just a fade.

import { motion } from "framer-motion";
import { useInView } from "@/lib/use-in-view";
import { site } from "@/lib/site-config";

const milestones = [
  {
    marker: "2008",
    title: "Founded",
    desc: "Dubai Sign LLC established in ICAD 3, Mussafah, Abu Dhabi.",
  },
  {
    marker: `${site.yearsInBusiness}`,
    title: "Years in Continuous Operation",
    desc: "Serving government, hospitality, and industrial clients across Abu Dhabi, Dubai, and the UAE.",
  },
  {
    marker: "Today",
    title: "Flagpole-First Manufacturing",
    desc: "ISO 9001:2015 certified. Approved government and enterprise vendor.",
  },
];

export function CompanyTimeline() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div ref={ref} className="relative">
      {/* connecting line */}
      <div className="absolute left-0 right-0 top-[13px] hidden h-px bg-border md:block" />
      <motion.div
        className="absolute left-0 top-[13px] hidden h-px bg-blue md:block"
        initial={{ width: "0%" }}
        animate={{ width: inView ? "100%" : "0%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {milestones.map((m, i) => (
          <motion.div
            key={m.title}
            className="relative flex gap-4 md:flex-col md:gap-0"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.15 * i + 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative z-10 flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full border-2 border-blue bg-paper">
              <span className="h-2 w-2 rounded-full bg-blue" />
            </span>
            <div className="md:mt-5">
              <div className="font-serif text-lg font-semibold text-blue">{m.marker}</div>
              <div className="mt-1 text-base font-semibold text-ink">{m.title}</div>
              <div className="mt-1.5 max-w-[280px] text-sm leading-relaxed text-ink/70">{m.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
