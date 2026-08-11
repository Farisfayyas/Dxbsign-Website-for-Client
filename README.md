# Dubai Sign LLC — website

Next.js (App Router) + TypeScript + Tailwind v4 rebuild of dxbsign.com,
built from the approved Claude design handoff in `design-handoff/`
(kept locally, not committed — see `.gitignore`).

## Stack

Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion (interactions) ·
Lenis (smooth scroll) · React Hook Form + Zod (contact form) · Resend
(contact form email) · lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Opens on whatever port you pass, e.g. `npm run dev -- -p 3100`.

## Contact form email setup (not yet configured)

The quote request form on `/contact` posts to `app/api/contact/route.ts`,
which sends via [Resend](https://resend.com). Until it's configured, the
form shows a friendly fallback message pointing people to phone/WhatsApp
instead of failing silently. To enable email:

1. Create a free Resend account and verify the `dubaisign.ae` domain
   (Settings → Domains) — without a verified domain, Resend only delivers
   to the account owner's own inbox.
2. Create an API key and copy `.env.local.example` to `.env.local`, then
   paste the key in as `RESEND_API_KEY`.
3. Update the `from` address in `app/api/contact/route.ts` to use the
   verified domain (e.g. `quotes@dubaisign.ae`).
4. Add `RESEND_API_KEY` to the Vercel project's environment variables too.

## Content still marked as placeholder / needs client confirmation

Carried over from the design handoff's own notes — grep for these before
launch:

- **"Est. 2008"** — back-calculated from "18 years in business," not an
  independently confirmed founding year.
- **"1,200+ Projects Delivered"** stat (Home hero) — not sourced from
  real client data, needs a real number or should be removed.
- **Projects/Gallery item titles & locations** — real photography from
  the client's own site (see `lib/site-images.ts`), but the
  title/location/category text next to each photo is still the design
  handoff's placeholder copy (e.g. "Government Complex, Abu Dhabi") and
  should be replaced with the real project details where known.
- **"Why Choose Us" / "How We Work" copy** — drafted, not client-supplied;
  read fine as generic B2B copy but worth a client read-through.
- **Flagpole spec numbers** (`components/services/FlagpoleSpecs.tsx`,
  reused in `components/home/EngineeredSection.tsx`) — height options,
  wind rating, warranty term, and install time are industry-typical
  estimates for tapered aluminum/GRP flagpoles in a Gulf climate, not
  Dubai Sign's actual confirmed specs. Highest-priority item on this list
  to fix before launch — a wrong wind rating or warranty term is a real
  claim a customer could rely on, not just cosmetic copy.

## Structure

- `app/` — routes (one folder per page) + `layout.tsx`, `globals.css`,
  `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `api/contact/`
- `components/layout/` — SiteHeader, SiteFooter, WhatsAppFloat (every page)
- `components/ui/` — shared building blocks (Reveal, CTABand, ProcessBand,
  ClientHonorRoll, NumberedCard, FilterTabs, PhotoLightbox, FAQSection)
- `components/projects/`, `components/gallery/`, `components/contact/` —
  page-specific interactive pieces
- `lib/site-config.ts` — single source of truth for business facts, nav,
  services, credentials, FAQ copy
- `lib/site-images.ts` — real-photo manifest (source path + alt text) for
  every hero/project/gallery slot
- `lib/seo.ts` — JSON-LD builders (LocalBusiness, FAQPage, BreadcrumbList)
- `public/images/` — curated real photography copied in from the client's
  original site; `public/llms.txt` — GEO summary for AI answer engines

`build-spec.md` has the full research/decision trail from the design
phase (arabesco.ae / hajster.com feature research, brand colors, mobile
adaptation notes) if any of the "why" behind a choice isn't obvious from
the code.
