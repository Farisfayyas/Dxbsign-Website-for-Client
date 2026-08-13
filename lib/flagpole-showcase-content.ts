// Callout content for the scroll-driven 3D flagpole showcase
// (components/home/FlagpoleShowcase.tsx). Same four facts already used as
// static cards in EngineeredSection.tsx -- deliberately not expanded with
// new, more specific claims here. Every one of those four is already
// flagged in EngineeredSection.tsx's own comment as an industry-typical
// figure, not yet client-confirmed; adding sharper new facts (exact height
// range, anchor/foundation type, etc.) would only grow that pre-launch
// confirmation debt. Once real manufacturing data comes in from Dubai
// Sign, updating this file is the ONLY change needed -- eyebrow/stat/
// description are the sole inputs to FlagpoleCallout.tsx's animation and
// FlagpoleShowcaseStatic.tsx's fallback list; neither has any hardcoded
// copy of its own.
//
// Each fact is split into a short eyebrow label, one bold "headline" stat
// (a word or short phrase, not a full sentence -- this is what actually
// reads at a glance while scrolling, same idea as Apple's own product
// callouts), and a supporting description line with the fuller context.
// This is reworded from EngineeredSection.tsx's flatter "Up to 150 km/h"
// style for two reasons: it sits directly below those static cards on the
// Home page, so word-for-word duplication would read as a repeat rather
// than an escalation, and the stat/description split needs slightly
// different phrasing shapes than a single label+value pair did.
//
// rotationDeg is chosen deliberately, not evenly spaced: each callout
// lands where the flag reads best at that point in the turn, and
// left/right/vAlign are varied so no two land in the same screen
// quadrant back to back.

import type { LucideIcon } from "lucide-react";
import { Wind, Layers, Palette, ShieldCheck } from "lucide-react";

export type FlagpoleCallout = {
  id: string;
  // Used by FlagpoleShowcaseStatic.tsx's reduced-motion fallback list
  // only -- the animated callouts (FlagpoleCallout.tsx) are purely
  // typographic, no icon, per direct feedback that the earlier
  // icon-in-circle card treatment didn't read as premium enough.
  icon: LucideIcon;
  eyebrow: string;
  eyebrowAr: string;
  stat: string;
  statAr: string;
  description: string;
  descriptionAr: string;
  rotationDeg: number;
  side: "left" | "right";
  vAlign: "top" | "middle" | "bottom";
};

export const flagpoleCallouts: FlagpoleCallout[] = [
  {
    id: "material",
    icon: Layers,
    eyebrow: "Material",
    eyebrowAr: "المادة",
    stat: "Aluminum or GRP",
    statAr: "ألمنيوم أو ألياف زجاجية",
    description: "Selected per project for the ideal balance of strength and weight.",
    descriptionAr: "تُختار لكل مشروع لتحقيق التوازن الأمثل بين القوة والوزن.",
    rotationDeg: 65,
    side: "left",
    vAlign: "top",
  },
  {
    id: "wind",
    icon: Wind,
    eyebrow: "Wind Rating",
    eyebrowAr: "تحمّل الرياح",
    stat: "150 km/h",
    statAr: "150 كم/س",
    description: "Engineered to withstand sustained Gulf-force winds without compromise.",
    descriptionAr: "مصممة هندسيًا لتحمّل رياح الخليج المستمرة دون أي تنازل عن الجودة.",
    rotationDeg: 155,
    side: "right",
    vAlign: "middle",
  },
  {
    id: "finish",
    icon: Palette,
    eyebrow: "Finish",
    eyebrowAr: "التشطيب",
    stat: "UV & Salt-Air Resistant",
    statAr: "مقاوم للأشعة فوق البنفسجية والهواء المالح",
    description: "A coating built to endure the Gulf's heat, humidity, and coastal air.",
    descriptionAr: "طلاء مصمم لتحمّل حرارة الخليج ورطوبته وهواءه الساحلي.",
    rotationDeg: 245,
    side: "left",
    vAlign: "bottom",
  },
  {
    id: "cert",
    icon: ShieldCheck,
    eyebrow: "Certified",
    eyebrowAr: "معتمدة",
    stat: "ISO 9001:2015",
    statAr: "الأيزو 9001:2015",
    description: "Every pole manufactured under an internationally audited quality system.",
    descriptionAr: "تُصنَّع كل سارية وفق نظام جودة مدقَّق دوليًا.",
    rotationDeg: 335,
    side: "right",
    vAlign: "top",
  },
];
