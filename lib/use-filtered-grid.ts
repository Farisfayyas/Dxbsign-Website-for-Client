"use client";

// Shared filter-tab behavior for Projects/Gallery: 260ms fade-out before
// swapping the active category, matching the approved design's timing.

import { useRef, useState } from "react";

export function useFilteredGrid<T, K extends string>(
  items: T[],
  getCategory: (item: T) => K
) {
  const [filter, setFilter] = useState<K | "all">("all");
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function selectFilter(key: K | "all") {
    if (key === filter) return;
    setTransitioning(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setFilter(key);
      setTransitioning(false);
    }, 260);
  }

  const filtered = filter === "all" ? items : items.filter((i) => getCategory(i) === filter);

  return { filter, transitioning, selectFilter, filtered };
}
