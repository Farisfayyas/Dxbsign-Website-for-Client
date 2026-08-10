import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { site, whatsapp } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}. ${site.address.full}. Tel ${site.phone.landline}. Request a quote for flagpoles and signage.`,
  alternates: { canonical: "/contact" },
};

const tileClass =
  "flex items-center gap-4 border border-border-soft bg-white px-5 py-[22px] no-underline transition-all duration-200 hover:-translate-y-[3px] hover:border-blue hover:shadow-[0_14px_28px_rgba(0,0,0,0.08)]";

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])),
        }}
      />
      <SiteHeader />
      <main>
        <div className="section-x max-w-[820px] pb-0 pt-[clamp(40px,6vw,72px)]">
          <div className="mb-4 font-serif text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[oklch(55%_0.08_250)]">
            Contact
          </div>
          <h1 className="mb-5 text-[clamp(32px,4vw,46px)] font-bold leading-[1.1] text-ink">
            Request a quote.
          </h1>
          <p className="text-[17px] leading-relaxed text-ink/80">
            Tell us about your flagpole or signage requirement and our team will respond with a specification and quotation. Prefer to talk directly? Call or message us below.
          </p>
        </div>

        <Reveal>
          <div className="section-x grid grid-cols-1 gap-4 pt-10 sm:grid-cols-3">
            <a href={site.phone.mobileHref} className={tileClass}>
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ink">
                <Phone size={20} strokeWidth={1.6} className="text-white" />
              </span>
              <span>
                <span className="mb-1 block font-serif text-xs font-semibold uppercase tracking-[0.06em] text-ink/55">
                  Call Us
                </span>
                <span className="block text-lg font-bold text-ink">{site.phone.mobile}</span>
              </span>
            </a>

            <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={tileClass}>
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-whatsapp">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="#fff" aria-hidden="true">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </span>
              <span>
                <span className="mb-1 block font-serif text-xs font-semibold uppercase tracking-[0.06em] text-ink/55">
                  WhatsApp
                </span>
                <span className="block text-lg font-bold text-ink">Chat Now</span>
              </span>
            </a>

            <a href={`mailto:${site.email}`} className={tileClass}>
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ink">
                <Mail size={20} strokeWidth={1.6} className="text-white" />
              </span>
              <span>
                <span className="mb-1 block font-serif text-xs font-semibold uppercase tracking-[0.06em] text-ink/55">
                  Email Us
                </span>
                <span className="block text-base font-bold text-ink">{site.email}</span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="section-x grid grid-cols-1 gap-12 py-10 pb-[clamp(40px,6vw,64px)] lg:grid-cols-[1.3fr_1fr]">
            <ContactForm />

            <div className="flex flex-col gap-5">
              <div className="bg-ink p-8 text-white">
                <div className="mb-4 font-serif text-[11px] font-semibold uppercase tracking-[0.1em] text-[oklch(65%_0.08_250)]">
                  Address &amp; Hours
                </div>
                <div className="text-sm leading-[1.9] text-[oklch(85%_0.005_250)]">
                  <div>{site.address.line1}</div>
                  <div>{site.address.line2}</div>
                  <div className="mt-2.5">{site.hours}</div>
                </div>
              </div>
              <iframe
                title={`${site.name} location map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0, filter: "grayscale(0.15)" }}
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
