# dxbsign.com rebuild — consolidated build spec

Living reference for the actual code build. Supersedes/consolidates the
original brief and every revision sent to "Claude design" — this is what
gets built here, in Claude Code, once the base design from that
conversation is in hand.

## Status

Waiting on: the finished design output from the "Claude design"
conversation (base layout/direction, chosen from the 2-3 options it
proposed). Once that's pasted in, build starts here, incorporating
everything below on top of it.

## Business & content (see also `dubai-sign-website` memory)

Dubai Sign LLC — Abu Dhabi signage manufacturer, real core business today
is flagpoles specifically (the rest of the catalog — signboards, traffic
signs, etc. — is real but secondary). Pages: Home, About, Services,
Projects, Gallery, Contact. Credentials: 18 years in business, ISO
certified, named clients (Etisalat, Capital Hotel, Abu Dhabi Civil
Defense, Crown Plaza, Souk, National Guard Command, ADNOC, Private Office
of HH Sheikh Mohammed Bin Zayed Al Nahyan, Abu Dhabi Police Station).
Imagery mix target ~60% flagpole / 40% signboard, sourced from
`projects/dxbsign/images/` (266 files, sorted by category).

Phone numbers: mobile/WhatsApp `+971 50 617 7346`, landline
`+971 2 551 3511`, fax `+971 2 551 3522`, email `info@dubaisign.ae`.

**WhatsApp CTA**: every WhatsApp entry point (floating button, any
"Enquire" button anywhere on the site) deep-links via
`https://wa.me/971506177346?text=...` with a pre-filled flagpole-focused
enquiry message. Not context-aware per section — flagpoles are the real
business, so it's the same message everywhere.

## Reference: arabesco.ae (the look Faris wants to borrow from)

Faris supplied a features doc built from screenshots of arabesco.ae and
asked to pull good ideas from it. Inspected the live site directly to get
exact technical detail rather than relying on the doc's descriptions
alone. It's a property/asset-management company site, not a manufacturer,
so the content doesn't transfer — the craft does.

**What it's actually built with** (confirmed by inspecting the live DOM):
Bootstrap-based template, jQuery + GSAP (scroll-triggered reveals) +
Swiper.js (carousels), not React/Next — meaning the "premium animation
feel" comes from GSAP + Swiper specifically, both of which have solid
React/Next equivalents (`gsap` + `@gsap/react`, `swiper/react`) so this is
fully reproducible in whatever stack the actual build uses.

**Specific, reusable patterns** (described generically — not copying
their actual marketing copy or visual assets):
- **Header**: fixed/sticky, logo far left with nav immediately beside it
  (not centered), phone number and a primary CTA on the right. Faris
  specifically wants this exact left-nav/right-phone layout reused.
- **Hero**: a slider (Swiper) where each slide's text animates/pops in on
  load rather than appearing statically.
- **Scroll-triggered text reveal**: headline + supporting copy fades/
  slides into place as it enters the viewport (GSAP ScrollTrigger),
  paired with a two-image side-by-side card treatment.
- **Logo/client carousel**: an auto-scrolling strip of client or partner
  logos (Swiper, continuous loop).
- **Service/category selector**: a row or grid of blocks (one per
  service) where hovering highlights that block — a simple but effective
  way to make a static grid feel interactive.
- **Switchable project/service cards**: tabbed or paginated card sets
  rather than one long static list.
- **Section divider**: an organic flowing white shape (SVG wave/blob)
  breaking up a section, used on their About page over a dark background
  photo — a nicer alternative to a hard rectangular section break.
- **Scroll-progress bar** (thin bar pinned to top of viewport, fills as
  you scroll down the page): keep, it's subtle and reads as premium.
  **Custom cursor-follow effect ("magic cursor"): rejected by Faris** —
  he found it slow and unprofessional-looking. Not going in.
- **Floating WhatsApp button**: same `wa.me?text=` pre-filled pattern
  already speced above — confirms this is a legitimate, common pattern
  worth keeping, not over-engineering.

## Reference #2: hajster.com (researched properly, not just cited)

A Ukrainian heat-pump manufacturer — closer to dxbsign than arabesco in
one important way: it's an actual technical/industrial product being sold
to a mixed audience of specifiers and end customers, not a lifestyle or
real-estate brand. Inspected the live site directly (DOM + a page-text
pass, translated/summarized below, not quoted at length).

**Built with**: Lenis (inertial smooth-scroll), GSAP, AOS (lighter
scroll-reveal library), Lottie (vector animation, available though not
firing on the page as loaded), running on OpenCart. An autoplaying,
muted, looping background video plays in the hero instead of a static
image — a product/brand animation, not raw camera footage.

**Curated for dxbsign** — per Faris's steer (client is not a young
audience, wants modern + professional + some creativity, not a pile of
trendy gimmicks), these are the patterns worth taking, and why each one
fits that bar rather than reading as a gimmick:
- **Hero background: muted looping video/animation instead of a static
  photo.** Reads as high-production without being flashy. For dxbsign:
  flags moving in slow motion, or a short installation sequence, rather
  than a generic stock loop.
- **Real spec-sheet product cards.** Each product isn't just a photo and
  marketing adjectives — it's a short description followed by a clean
  list of actual numbers (height options, material, wind rating,
  warranty, install time for a flagpole). This is the single most
  transferable idea here: it directly serves the "engineers and
  procurement want specifics fast" principle already in this spec, and
  reads as more credible to an older, professional buyer than mood-board
  styling would.
- **Big-number trust stats.** Large-type callouts for hard numbers (their
  equivalent of "18 years," "ISO certified") rather than burying
  credentials in a paragraph. Classic, ages well, not youth-coded at all.
- **Company timeline** (year-by-year milestone strip) for the About page
   — a natural fit for "18 years in business" and a tasteful, common
  device in serious corporate sites, not a gimmick.
- **Lenis smooth scroll** site-wide — subtle inertia on scroll, makes
  everything else (GSAP/AOS reveals) feel more polished. Low-risk, worth
  including.
- **Dual CTA per product card**: a primary lead-gen action (their "I want
  to install" -> dxbsign's WhatsApp enquiry) plus a secondary "view full
  specifications" link for detail-seekers, instead of forcing everyone
  down one path.

**Deliberately NOT recommending** (interesting, but real cost for
uncertain payoff, and this is exactly the "not every feature" caution
Faris flagged): an interactive savings/quote **calculator** (city + house
size + email -> estimated savings). It works for Hajster because heat
pumps have a clean, quantifiable energy-cost-savings story. Flagpoles
don't have an equivalent natural "savings" narrative, and building a
proper interactive calculator is a real scope increase for a payoff
that's unproven here. Worth a simple "configure your flagpole ->
WhatsApp enquiry" version *if* there's appetite later, but it's a
nice-to-have, not core scope.

## Other reference points (general search, not a specific single site)

General 2026 best-practice signal for manufacturing/industrial B2B sites
(DBS Interactive, Blend B2B, Azuro Digital, Valmax coverage): the common
thread across the better-regarded examples is product clarity and
technical credibility presented for two different readers at once —
engineers/facilities buyers who want specifics, and
procurement/decision-makers who want trust signals fast — via clear
navigation and a deliberate content hierarchy, not just visual polish.
Practical takeaway for dxbsign: credentials (18 years, ISO, named clients)
and the flagpole-first product story need to read clearly within seconds
of landing, not just be present somewhere on the page. One standout
named example worth a manual look if Faris wants more references:
Hajster (cited repeatedly as a manufacturer that broke from generic
industrial-site norms toward a genuinely contemporary look).

## Brand colors (sampled directly from the real logo, `branding/logo.png`)

Blue `#0C4DA2` (dominant), red `#ED1C24` (accent). Use these, not
arabesco's navy — the layout/typography quality is what's being
borrowed, not their palette.

## Correction: flagpoles are the near-exclusive real business (2026-08-05)

Reconfirmed by Faris: the other product lines (signboards, traffic
signs, safety signs, etc.) are real but "pretty much just namesake" at
this point — flagpoles are what the company actually sells now. This
changes how much build effort the Hajster-style spec-sheet product cards
deserve: full, detailed spec cards (height options, material, wind
rating, warranty, install time) belong on **flagpoles specifically** —
give that category the real depth. The other categories should stay
lighter (photo + short description is enough), not built out to the same
level of detail. Don't spend equal effort across all product types.

## Workflow: header designed in Claude design first, then full build here

Faris wants to lock the header specifically in Claude design first (fast
visual iteration on one small, high-leverage component that sets the
whole visual language — font, color usage, spacing) before committing to
the full build. Once he sends that header design back, build the rest of
the site here to match it. The prompt sent for this is reproduced below
for reference.

## Mobile adaptation notes (2026-08-05)

Desktop stays the primary design target (already agreed), but confirmed
with Faris that mobile still needs to feel premium, not like an
afterthought. Most planned features translate directly or even work
better on touch (Swiper carousels, Lenis/GSAP scroll effects, the
spec-sheet cards/stats/timeline as responsive stacked content, the
WhatsApp CTA). Two things need an actual designed mobile equivalent
rather than a blind port:
- **Hover-highlight service cards**: no hover on touchscreens — build a
  tap/active-state equivalent (or default-visible content) from the
  start, don't leave it silently non-functional on phones.
- **Hero background video**: needs `muted` + `playsinline` for mobile
  autoplay to work at all, plus a separate compressed version (or a
  static-image fallback on slow connections) — don't serve the same
  full-size loop blindly on mobile data.

## Decision: build directly here, don't route this through Claude design

Recommended and going with: incorporate all of the above directly into
the real implementation once building starts, rather than writing another
translation prompt for the Claude design conversation. Reasoning — the
technical specifics gathered here (GSAP/Swiper, exact header layout,
named patterns) are precise enough to implement directly and accurately;
routing them through another prompt for a different conversation to
reinterpret would just lose fidelity for no benefit, given the actual
code build happens here regardless per Faris's confirmed plan. Use the
`impeccable` / `bencium-innovative-ux-designer` / `frontend-design`
skills when building, per the existing plan in memory.
