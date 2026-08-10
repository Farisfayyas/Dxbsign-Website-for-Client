"use client";

// Structural RTL readiness: flips document `dir` and mirrors layout on
// demand. English copy stays in place for long-form body text (no Arabic
// translation has been supplied yet); short chrome strings (nav, buttons,
// footer headings) do switch, so the toggle demonstrates real structural
// RTL support rather than a decorative button. See build-spec.md.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Direction = "ltr" | "rtl";

const DirectionContext = createContext<{
  dir: Direction;
  toggle: () => void;
} | null>(null);

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [dir, setDir] = useState<Direction>("ltr");

  useEffect(() => {
    const stored = window.localStorage.getItem("dxb-dir");
    if (stored === "rtl" || stored === "ltr") setDir(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === "rtl" ? "ar" : "en";
    window.localStorage.setItem("dxb-dir", dir);
  }, [dir]);

  return (
    <DirectionContext.Provider
      value={{
        dir,
        toggle: () => setDir((d) => (d === "ltr" ? "rtl" : "ltr")),
      }}
    >
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const ctx = useContext(DirectionContext);
  if (!ctx) throw new Error("useDirection must be used within DirectionProvider");
  return ctx;
}
