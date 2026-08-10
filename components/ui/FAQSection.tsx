"use client";

// Concise, directly-citable Q&A — serves classic SEO (FAQPage rich
// results) and GEO alike: AI answer engines lean heavily on clear,
// self-contained question/answer pairs when deciding what to quote.

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { faqs } from "@/lib/site-config";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Reveal>
      <div className="section-x section-y bg-mist">
        <h2 className="mb-8 text-[28px] font-bold text-ink">Frequently Asked Questions</h2>
        <div className="mx-auto flex max-w-[820px] flex-col divide-y divide-border bg-white">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold text-ink">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-ink/50 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>
                <div
                  className="overflow-hidden px-6 text-sm leading-relaxed text-ink/70 transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "240px" : "0px",
                    paddingBottom: isOpen ? "20px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
