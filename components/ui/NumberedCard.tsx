"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function NumberedCard({
  num,
  title,
  desc,
  footer,
  compact = false,
  highlight = false,
}: {
  num: string;
  title: string;
  desc?: string;
  footer?: ReactNode;
  compact?: boolean;
  /** Stronger "hover-highlight selector" treatment (arabesco's service
   * grid pattern) — background + left-accent shift, not just a lift. */
  highlight?: boolean;
}) {
  if (highlight) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative flex cursor-default flex-col gap-2.5 overflow-hidden bg-white p-6"
      >
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-blue"
        />
        <motion.div
          variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originY: 0 }}
          className="absolute inset-y-0 left-0 w-[3px] bg-white"
        />
        <motion.div
          variants={{ rest: { x: 0 }, hover: { x: 6 } }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col gap-2.5"
        >
          <motion.div
            variants={{ rest: { color: "oklch(55% 0.08 250)" }, hover: { color: "#ffffff" } }}
            className="font-serif text-xs font-semibold"
          >
            {num}
          </motion.div>
          <motion.div
            variants={{ rest: { color: "var(--color-ink)" }, hover: { color: "#ffffff" } }}
            className="mt-1 text-[15px] font-semibold"
          >
            {title}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 14px 26px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col gap-2.5 bg-white ${compact ? "p-6" : "p-7"}`}
    >
      <div className="font-serif text-xs font-semibold text-[oklch(55%_0.08_250)]">{num}</div>
      <div className={`font-semibold text-ink ${compact ? "text-[15px] mt-1" : "text-base"}`}>{title}</div>
      {desc && <div className="flex-1 text-sm leading-relaxed text-ink/70">{desc}</div>}
      {footer}
    </motion.div>
  );
}
