"use client";

// Filter-tab state for Projects/Gallery. The actual transition (fade +
// scale + stagger per card) is handled declaratively by Framer Motion's
// AnimatePresence in the grid components — this hook just tracks which
// category is active and derives the filtered list.

import { useState } from "react";

export function useFilteredGrid<T, K extends string>(
  items: T[],
  getCategory: (item: T) => K
) {
  const [filter, setFilter] = useState<K | "all">("all");
  const filtered = filter === "all" ? items : items.filter((i) => getCategory(i) === filter);
  return { filter, selectFilter: setFilter, filtered };
}
