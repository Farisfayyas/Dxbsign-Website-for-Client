"use client";

// Minimal one-shot IntersectionObserver hook. Kept dependency-free (no
// framer-motion) specifically so the hidden/visible state never depends on
// a client-only value during the initial render — framer-motion's own
// motion.div takes ownership of the style attribute on mount in a way that
// trips React's SSR hydration comparison for this exact "reveal on scroll"
// pattern. A plain ref + CSS transition sidesteps that entirely while
// matching scrollReveal.js's original threshold/margin behavior exactly.

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
