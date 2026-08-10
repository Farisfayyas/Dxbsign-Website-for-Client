import Link from "next/link";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site-config";

type Variant = "dark" | "light" | "plain";

const variantStyles: Record<Variant, { section: string; heading: string; sub: string; btn: string }> = {
  dark: {
    section: "bg-ink",
    heading: "text-white",
    sub: "text-[oklch(70%_0.01_250)]",
    btn: "bg-[oklch(55%_0.08_250)] text-white hover:bg-[oklch(60%_0.09_250)]",
  },
  light: {
    section: "bg-mist",
    heading: "text-ink",
    sub: "text-ink/70",
    btn: "bg-ink text-white hover:bg-ink-soft",
  },
  plain: {
    section: "border-b border-border-soft",
    heading: "text-ink",
    sub: "text-ink/70",
    btn: "bg-ink text-white hover:bg-ink-soft",
  },
};

export function CTABand({
  heading,
  variant = "dark",
}: {
  heading: string;
  variant?: Variant;
}) {
  const s = variantStyles[variant];
  return (
    <Reveal y={20}>
      <div className={`flex flex-wrap items-center justify-between gap-6 px-[clamp(24px,5vw,56px)] py-14 ${s.section}`}>
        <div>
          <h2 className={`mb-2 text-[26px] font-bold ${s.heading}`}>{heading}</h2>
          <div className={`text-sm ${s.sub}`}>
            Speak with our team.{" "}
            <a href={site.phone.mobileHref} className="font-medium text-blue hover:underline">
              {site.phone.mobile}
            </a>
          </div>
        </div>
        <Link
          href="/contact"
          className={`whitespace-nowrap px-8 py-4 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${s.btn}`}
        >
          Request a Quote
        </Link>
      </div>
    </Reveal>
  );
}
