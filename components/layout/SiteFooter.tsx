import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site-config";

const serviceLines = [
  "Flagpoles, Flags & Banners",
  "Signboards & 3D Signs",
  "Indoor & Outdoor Signs",
  "Traffic & Safety Signs",
  "Wayfinding Signs",
  "Window Graphics & Displays",
];

export function SiteFooter() {
  return (
    <footer className="bg-ink font-sans text-[oklch(78%_0.005_250)]">
      <div className="mx-auto grid max-w-[1680px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-[clamp(20px,4vw,48px)] pb-10 pt-14">
        <div className="flex flex-col gap-3">
          <Image
            src="/logo.png"
            alt={site.name}
            width={250}
            height={90}
            className="h-[38px] w-auto self-start rounded-sm bg-white px-3 py-2"
          />
          <p className="max-w-[260px] text-[13px] leading-relaxed text-[oklch(65%_0.005_250)]">
            Flagpole and signage manufacturing, Abu Dhabi. Design, manufacture, installation, and maintenance under one roof.
          </p>
          <div className="mt-1.5 text-[13px] leading-[1.8] text-[oklch(70%_0.005_250)]">
            <div>{site.address.line1}</div>
            <div>{site.address.line2}</div>
            <div className="mt-1.5">
              Tel:{" "}
              <a href={site.phone.landlineHref} className="text-[oklch(78%_0.005_250)] hover:text-white">
                {site.phone.landline}
              </a>
            </div>
            <div>Fax: {site.phone.fax}</div>
            <div>
              Email:{" "}
              <a href={`mailto:${site.email}`} className="text-[oklch(78%_0.005_250)] hover:text-white">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 font-serif text-[11px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.005_250)]">
            Quick Links
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="text-[oklch(80%_0.005_250)] hover:text-white">
                {item.key === "about" ? "About / Why Choose Us" : item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 font-serif text-[11px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.005_250)]">
            Services
          </div>
          <div className="flex flex-col gap-2.5 text-sm text-[oklch(80%_0.005_250)]">
            {serviceLines.map((s) => (
              <div key={s}>{s}</div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 font-serif text-[11px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.005_250)]">
            Credentials
          </div>
          <div className="flex flex-col gap-2.5 text-sm text-[oklch(80%_0.005_250)]">
            {site.credentials.map((c) => (
              <div key={c}>{c}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-2.5 border-t border-[oklch(30%_0.005_250)] px-[clamp(20px,4vw,48px)] py-5 font-serif text-xs text-[oklch(55%_0.005_250)]">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>{site.address.line2}</span>
      </div>
    </footer>
  );
}
