"use client";

// Concise, directly-citable Q&A — serves classic SEO (FAQPage rich
// results) and GEO alike. Accordion uses the CSS grid-template-rows
// 0fr->1fr technique so it animates to the answer's real height (no
// guessed max-height), which reads as a proper premium expand rather
// than an instant snap.

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
        <div className="mx-auto flex max-w-[820px] flex-col divide-y divide-border overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 ${
                    isOpen ? "bg-blue/[0.04]" : "hover:bg-mist/60"
                  }`}
                >
                  <span className={`text-[15px] font-semibold transition-colors duration-300 ${isOpen ? "text-blue" : "text-ink"}`}>
                    {f.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-all duration-[400ms] ${isOpen ? "text-blue" : "text-ink/50"}`}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-6 pb-6 text-sm leading-relaxed text-ink/70 transition-[opacity,transform] duration-300"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                        transitionDelay: isOpen ? "0.1s" : "0s",
                      }}
                    >
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
