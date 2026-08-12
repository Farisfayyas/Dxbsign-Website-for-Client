// Callout content for the scroll-driven 3D flagpole showcase
// (components/home/FlagpoleShowcase.tsx). Same four facts already used as
// static cards in EngineeredSection.tsx -- deliberately not expanded with
// new, more specific claims here. Every one of those four is already
// flagged in EngineeredSection.tsx's own comment as an industry-typical
// figure, not yet client-confirmed; adding sharper new facts (exact height
// range, anchor/foundation type, etc.) would only grow that pre-launch
// confirmation debt. Once real manufacturing data comes in from Dubai
// Sign, expanding this list is a good v2 item, not a v1 one.
//
// Copy is reworded from EngineeredSection.tsx's plain "Up to 150 km/h"
// style into fuller phrases -- this section sits directly below those
// static cards on the Home page, so word-for-word duplication would read
// as a repeat rather than an escalation.
//
// rotationDeg is chosen deliberately, not evenly spaced by default: each
// callout lands where the pole reads best at that point in the turn, and
// left/right/vAlign are varied so no two callouts stack in the same
// screen quadrant back to back.

import type { LucideIcon } from "lucide-react";
import { Wind, Layers, Palette, ShieldCheck } from "lucide-react";

export type FlagpoleCallout = {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  rotationDeg: number;
  side: "left" | "right";
  vAlign: "top" | "middle" | "bottom";
};

export const flagpoleCallouts: FlagpoleCallout[] = [
  {
    id: "material",
    icon: Layers,
    label: "Material",
    value: "Aluminum or GRP construction",
    rotationDeg: 70,
    side: "left",
    vAlign: "top",
  },
  {
    id: "wind",
    icon: Wind,
    label: "Wind Rating",
    value: "Engineered for 150 km/h Gulf winds",
    rotationDeg: 160,
    side: "right",
    vAlign: "middle",
  },
  {
    id: "finish",
    icon: Palette,
    label: "Finish",
    value: "Resists UV and salt-air corrosion",
    rotationDeg: 250,
    side: "left",
    vAlign: "bottom",
  },
  {
    id: "cert",
    icon: ShieldCheck,
    label: "Certified",
    value: "ISO 9001:2015 certified manufacturing",
    rotationDeg: 340,
    side: "right",
    vAlign: "top",
  },
];
