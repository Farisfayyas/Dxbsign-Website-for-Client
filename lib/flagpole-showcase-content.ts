// Callout content for the scroll-driven 3D flagpole showcase
// (components/home/FlagpoleShowcase.tsx). Same facts used as static cards
// in EngineeredSection.tsx. Material, sizes, and finish below are real
// client-confirmed figures now; the old "wind" callout (a Wind-Rating
// stat with no confirmed number behind it) was dropped per direct
// feedback and replaced with "sizes" rather than left as a 3-callout
// rotation. Cert is unchanged. Installation time and total project count
// aren't shown in these four callouts at all (see EngineeredSection.tsx
// and FlagpoleSpecs.tsx for those) -- eyebrow/stat/description are the
// sole inputs to FlagpoleCallout.tsx's animation and
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
import { Ruler, Layers, Palette, ShieldCheck } from "lucide-react";

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
    stat: "Tapered Aluminum",
    statAr: "ألمنيوم مدرّج",
    description: "Stainless steel also available, built to order.",
    descriptionAr: "يتوفر أيضًا الستانلس ستيل حسب الطلب.",
    rotationDeg: 65,
    side: "left",
    vAlign: "top",
  },
  {
    id: "sizes",
    icon: Ruler,
    eyebrow: "Available Sizes",
    eyebrowAr: "المقاسات المتاحة",
    stat: "6m – 12m",
    statAr: "6م – 12م",
    description: "Four standard heights, built to order to your site's exact requirement.",
    descriptionAr: "أربعة ارتفاعات قياسية، تُصنَّع حسب الطلب وفق متطلبات موقعك بدقة.",
    rotationDeg: 155,
    side: "right",
    vAlign: "middle",
  },
  {
    id: "finish",
    icon: Palette,
    eyebrow: "Finish",
    eyebrowAr: "التشطيب",
    stat: "Alloy 6063-T6",
    statAr: "سبيكة 6063-T6",
    description: "Polished satin brush finish, built to endure the Gulf's heat, humidity, and coastal air.",
    descriptionAr: "تشطيب ساتان مصقول بالفرشاة، مصمم لتحمّل حرارة الخليج ورطوبته وهواءه الساحلي.",
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
