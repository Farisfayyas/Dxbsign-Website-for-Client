"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function NumberedCard({
  num,
  title,
  desc,
  footer,
  compact = false,
}: {
  num: string;
  title: string;
  desc?: string;
  footer?: ReactNode;
  compact?: boolean;
}) {
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
