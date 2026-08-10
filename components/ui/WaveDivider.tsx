// Organic section transition — an SVG wave instead of a hard rectangular
// edge, per arabesco.ae's pattern for breaking up a dark photo band (see
// build-spec.md). `fill` should be the color of the section BELOW this
// divider, since the wave visually "flows into" it.
export function WaveDivider({ fill = "var(--color-paper)" }: { fill?: string }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-[48px] w-full sm:h-[72px]"
    >
      <path
        d="M0,45 C 240,90 480,0 720,35 C 960,70 1200,10 1440,48 L1440,90 L0,90 Z"
        fill={fill}
      />
    </svg>
  );
}
