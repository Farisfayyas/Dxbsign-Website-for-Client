"use client";

// Real customer testimonials (see testimonials array, lib/site-config.ts)
// migrated from the client's live site. Static 3-up grid rather than an
// auto-rotating carousel -- three items don't need a carousel mechanism,
// and a static grid reads calmer and more premium for a B2B audience.
// Same hairline-grid visual language already used for "Why Choose Us"
// (app/about/page.tsx) for consistency across the site.

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <Reveal>
      <div className="section-x section-y">
        <div className="mb-10 max-w-[640px]">
          <div className="mb-3 font-serif text-xs font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            Client Feedback
          </div>
          <h2 className="text-[28px] font-bold text-ink">What Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 bg-white px-7 py-8"
            >
              <Quote size={26} strokeWidth={1.75} className="text-blue/30" aria-hidden />
              <p className="flex-1 font-serif text-[15px] italic leading-relaxed text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-border-soft pt-4 text-sm font-semibold text-ink">
                {t.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
