"use client";

// Minimal one-shot IntersectionObserver hook. Kept dependency-free (no
// framer-motion) specifically so the hidden/visible state never depends on
// a client-only value during the initial render — framer-motion's own
// motion.div takes ownership of the style attribute on mount in a way that
// trips React's SSR hydration comparison for this exact "reveal on scroll"
// pattern. A plain ref + CSS transition sidesteps that entirely while
// matching scrollReveal.js's original threshold/margin behavior exactly.
//
// `ref` is a callback ref (backed by state), not a plain useRef object.
// The observer-setup effect depends on the actual attached node, not just
// on threshold/rootMargin -- with a plain useRef, a consumer that doesn't
// render its ref'd element on its very first render (FlagpoleShowcase.tsx:
// the whole section returns null for one tick before a mount-effect
// resolves prefers-reduced-motion) would have ref.current still null the
// one time the effect ran, and never observe anything, since the effect's
// own deps never change again afterward. Keying off the node itself fixes
// that case while behaving identically for every existing always-rendered
// consumer (Reveal, StaggerReveal, CurtainReveal, CompanyTimeline) -- the
// node is set on the first render there too, so nothing changes for them.

import { useCallback, useEffect, useState } from "react";

export function useInView<T extends HTMLElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
}: { threshold?: number; rootMargin?: string } = {}) {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useCallback((el: T | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, rootMargin]);

  return { ref, inView };
}
