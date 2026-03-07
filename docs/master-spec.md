# siiatravel_master_spec_v1_3

Git + GitHub + Astro + Tailwind + TypeScript (Strict) + Sanity + Vercel

**Authoritative Technical + Product Specification**
Owner: Алексей Андреев
Primary domain (current): <https://siiatravel.com>
Primary language: RU (only, for now)
Region constraint: Must work reliably in Russia & Belarus
Business type: Istanbul travel experiences & services — lead generation
Launch strategy: Staging first (Vercel preview domain) → cutover to production domain after full validation
Last updated: 2026-03-04

---


## Table of Contents

1. North Star
2. Business Model
3. Architecture Overview
4. Infrastructure Policy
5. Content Strategy
6. Website Structure
7. SEO Baseline Control System
8. Conversion UX Rules
9. Reviews System
10. Tracking & Analytics
11. Production Operations
12. Security Policy
13. Development Environment
14. Development Workflow
15. Monitoring
16. Project File Map
17. Milestones Roadmap
18. Architectural Constraints
19. Decisions Log (ADR)
20. AI Response Directive
21. Placeholders
22. Design System
23. Project AI Context Header


## 0) North Star

Build the fastest, most trustworthy, SEO-dominant travel lead-generation website in its niche:

- Modern UX (Tripster-like)
- Excellent performance (Core Web Vitals)
- Clean technical SEO
- Scalable content system
- Resilient conversion flows for RU/BY

---

## 1) Business Model

### 1.1 Objective

High-performance, SEO-dominant lead-generation platform for Istanbul travel experiences and related services.

### 1.2 Monetization (offer types)

- Private excursions / tours (per-group pricing)
- Bosphorus experiences on individual motor yachts (17 fleet pages)
(Marketed as an experience/tour, not “just rental”)
- Interpreter services (multiple professional spheres)
- Transfers (airport routes)
- Shopping assistance (categories)
- Helicopter tours (packages)
- Event organization (types of events)

### 1.3 Conversion model

Primary CTA: WhatsApp
Secondary CTA: Contact form
Fallback: Visible phone number (tel link)
Optional: Telegram (if enabled)

No online payments. No user accounts.

### 1.4 Lead capture resilience (RU/BY)

Because WhatsApp deep links and protocol handlers may fail or be blocked:

- Every WhatsApp CTA must have a clearly visible fallback phone/WhatsApp number

- Forms must be RU/BY resilient:
  - avoid heavy anti-bot that breaks accessibility
  - Forms: honeypot + rate limiting.
- Cloudflare Turnstile only if spam becomes real.

---

## 2) Current Site Inventory

This is the current “content surface” to preserve or improve, including controlled redirects.

### 2.1 Existing pages (as provided)

- Main page
- Guide in Istanbul (1 page)
- Excursions listing page with **14 tours**
- Interpreter in Istanbul (main) + **5 subpages**:
  - Interpreter for business meetings
  - Interpreter at exhibitions in Istanbul
  - Interpreter for searching factories & suppliers in Turkey
  - Legal interpreter
  - Medical interpreter
- Transfer in Istanbul (main) + **2 subpages**:
  - Transfer from Istanbul Airport
  - Transfer from Sabiha Gökçen Airport
- Shopping in Istanbul (main) + **3 subpages**:
  - Textile & jewelry in Istanbul
  - Leather / fur coats in Istanbul
  - Wholesale purchases
- Yacht in Istanbul (main) + **17 yacht subpages**
- Helicopter tour in Istanbul (main) + **3 package subpages**
- Event organization in Istanbul (main) + **6 subpages** (event types)
- Contacts page

### 2.2 Migration principles

- Preserve valuable URLs where possible
- If URL structure changes, create a **full redirect map** (301)
- Enforce site-wide canonical rules and no trailing slash
- Avoid “soft 404” by keeping equivalent content where redirects land

---

## 3) Architecture Overview

### 3.1 Technology stack

Frontend:

- Astro (static-first)
- TailwindCSS (utility-first styling)
- TypeScript (Strict Mode)

CMS:

- Sanity (hosted Studio)

Deployment:

- Vercel (Edge CDN)

Version control:

- Git + GitHub

Runtime policy:

- Node.js even-numbered LTS only
- Pin Node version in repo via `.nvmrc` (or equivalent)

Node: even-numbered LTS only.

### 3.2 Rendering strategy

Static by default.
SSR only for /reviews (recommended).

### 3.3 JavaScript policy

Hydration only when necessary:

- Mobile menu
- Light gallery
- Copy-to-clipboard
- Minimal UX helpers

No heavy frameworks.

### 3.4 CMS Governance Rules

Mandatory:

- Unique slug validation across content types.
- Required `primaryKeyword` field for commercial + blog pages.

Build-time validation:

- Warn if duplicate `primaryKeyword` detected.
- Warn if slug collision detected.
- Warn if canonical duplication risk.

Purpose:
Prevent structural keyword cannibalization.

---

## 4) Infrastructure Policy

Policy content moved to `docs/infrastructure.md` (authoritative for spec §4).

---

## 5) Content Strategy

### 5.1 Content scope (initial + long-term)

- Tours: current 14 tours; scale as needed
- Motor-yacht fleet: 17 yacht pages
- Services: interpreters/transfers/shopping/helicopter/events
- Reviews: global company reviews (moderated)
- Blog: planned for **100+ long-term SEO articles**

### 5.2 Content principles

- Search-intent-first
- H1 aligned with primary query intent
- Structured internal linking
- FAQ only where real and helpful
- Long-form content where it improves user decision-making

### 5.3 Editorial rules

- No fluff / filler paragraphs
- Consistent brand voice
- Update key pages every 6–12 months

---

### 5.4 Intent Enforcement Rule

Each commercial page must:

- Target ONE dominant search intent.
- Have ONE primary H1.
- Have ONE primary conversion goal.
- Not mix unrelated services.

No keyword variation clones.

### 5.5 Content Depth Minimum

No thin pages allowed.

Minimum:

- Commercial pages: 900–1500 words.
- Hubs: 1200+ words.
- Blog (competitive topics): 1500–2500 words.

---

## 6) Website Structure

Goal: scalable, SEO-friendly hubs, **short URLs**, strong topical authority.

### 6.1 Top-level routes (explicit)

- `/` — Homepage (search-first gateway + trust)
- `/tours` — excursions hub
- `/tours/<slug>` — individual tour pages (conversion-first)

- `/yacht` — Bosphorus motor-yacht experiences hub (fleet gateway)
- `/yacht/<yacht-slug>` — individual yacht pages (17)

- `/interpreter` — interpreter services hub
- `/interpreter/<slug>` — interpreter subpages (medical, legal, exhibitions, suppliers, business)

- `/transfer` — transfers hub
- `/transfer/<slug>` — airport routes (istanbul-airport, sabiha-gokcen)

- `/shopping` — shopping assistance hub
- `/shopping/<slug>` — subpages (textile-jewelry, leather-fur, wholesale)

- `/helicopter` — helicopter tours hub
- `/helicopter/<slug>` — packages

- `/events` — event organization hub
- `/events/<slug>` — event types

- `/guide` — guide in Istanbul
- `/blog` — articles hub
- `/blog/<slug>` — article pages

- `/reviews` — global company reviews (moderated)
- `/contacts` — contact page

Also:

- `/privacy`, `/cookies`, `/terms` (or equivalent legal pages)
- `/404` custom

Notes:

- We intentionally avoid `/services/...` prefix to keep URLs short and to avoid diluting revenue-page authority.
- Folder depth is not a ranking factor by itself; clarity and topical clustering matter more.
- Yachts are treated as a first-class experience vertical (not buried under services).

### 6.2 Core page templates (modules)

- Homepage (search-first)
- Hub pages (listing + intent content + internal links)
- Detail pages:
  - Tour detail
  - Yacht detail
  - Service detail (interpreter/transfer/shopping/helicopter/events)
  - Blog post
- Reviews page (SSR recommended)
- Contact page
- Legal pages
- Custom 404

---

## 7) SEO Baseline Control System

Policy content moved to `docs/seo-policy.md` (authoritative for spec §7).

---

## 8) Conversion UX Rules

## 8.1 CTA placement

- Every commercial page must have:
  - primary WhatsApp CTA
  - secondary form CTA
  - visible phone number + tel link
- Above-the-fold CTAs required for commercial pages:
  - tours, yacht, transfer, interpreter
- Mobile:
  - sticky bottom bar (WhatsApp + Request/Call)

### 8.2 Forms

- Keep forms short (≤ 6 fields)
- Required: phone/WhatsApp
- Show expectations:
  - response time window
  - what happens after submission

### 8.3 Trust blocks

- Company-level reviews where applicable
- Clear inclusions/exclusions
- Pickup/meeting clarity
- FAQ addressing objections

---

### 8.4 CTA Hierarchy Model

Primary CTA: WhatsApp
Secondary CTA: Form
Fallback: Phone (tel link)

Rules:

- Only one primary CTA color per page.
- No button overload.
- Sticky mobile CTA allowed but must not obscure content.

---

## 9) Reviews System (Global, Moderated)

### 9.1 Requirements

- Global company reviews only (not per-tour)
- Submission form for visitors
- Moderation workflow:
  - submitted → pending → approved/published OR rejected

### 9.2 Publishing strategy (to avoid lag)

Recommended:

- `/reviews` is SSR so approved reviews appear immediately after moderation.
- Add caching (short TTL) if necessary.

### 9.3 Anti-spam requirements (RU/BY-safe)

Preferred:

- Honeypot field
- Rate limiting (server-side)
Optional:
- Cloudflare Turnstile only if spam becomes real (and only on submission routes)

### 9.4 SEO note

Only mark up reviews that are visible on the page.
For tour pages, `review[]` JSON-LD must correspond to reviews visibly rendered on that same tour page.

---

## 10) Tracking & Analytics

### 10.1 GA4

Events:

- phone_click
- whatsapp_click
- form_submit

### 10.2 Yandex Metrika

- installed
- event tracking configured

Rules:

- No excessive third-party scripts
- Track only what helps decisions

---

## 11) Production Operations

### 11.1 Content portability / backup

- Schedule periodic Sanity dataset exports (e.g., monthly)
- Document migration plan for posts/pages and media references
- Keep a provider exit plan (pricing/availability changes)

### 11.2 Error logging / monitoring

- Add error logging for:
  - form endpoints
  - SSR route(s) like /reviews
- Suggested tools:
  - Sentry (or equivalent) for runtime errors
  - lightweight uptime checks for key routes
- Goal: know when RU/BY users cannot submit leads

### 11.3 Drafts vs Production content (migration phase)

During M8 migration:

- Maintain clear content states:
  - draft / pending
  - published
- Ensure staging can preview drafts without leaking to production indexing

---

## 12) Security Policy (mandatory before production cutover)

Baseline requirements:

- HTTPS only
- HSTS (after validation)
- CSP appropriate for scripts
- X-Content-Type-Options
- Referrer-Policy
- Clickjacking protection (frame-ancestors / X-Frame-Options)
- Cookie minimization (no unnecessary cookies)

---

## 13) Development Environment (Windows 11)

OS: Windows 11
Terminal: Windows Terminal
Shell: PowerShell 7.5.4
Node: (Pinned even-numbered LTS)  - current v24.14.0
npm: current stable compatible with pinned Node - current 11.9.0

Verification commands:

- node -v
- npm -v
- git --version
- $PSVersionTable.PSVersion


### 13.1 Node version pinning

Node version must be locked in the repository to prevent CI drift between local development and Vercel builds.

Required:

- `.nvmrc` (repo root) with the major version only:

```
24
```

Recommended:

- `package.json` must include engines:

```json
"engines": {
  "node": "24.x"
}
```

Purpose:

- Ensure Vercel builds use the same Node line as local.
- Prevent accidental upgrades that break Astro/Tailwind toolchains.

### Tailwind v4 note (IMPORTANT)

This project uses Tailwind v4 (current observed: v4.2.1).

- `npx tailwindcss init` is NOT available in v4 (no init command).
- Tailwind is enabled via CSS import:
  - `src/styles/global.css` contains: `@import "tailwindcss";`
- Custom design tokens (colors) are defined via:
  - `@theme { --color-navy: ...; --color-primary: ...; }`

---
## 14) Development Workflow (Git → Vercel)

### 14.1 Canonical build commands

Development server:

- `npm run dev`

Production build:

- `npm run build`

Local production preview:

- `npm run preview`

Rules:

- Local development and CI/CD must use these commands.
- Vercel build step must run `npm run build`.


1. Local development
2. Git commit
3. Push to GitHub
4. Vercel automatic deployment (preview)
5. QA validation
6. SEO verification
7. Analytics verification

Release rules:

- No direct edits in production
- All changes via Git
- Rollback must be possible

---

## 15) Monitoring

### 15.1 Performance monitoring

- Monthly PageSpeed / Lighthouse checks
- Monitor: LCP, CLS, INP
- Track real-user performance where possible

### 15.2 SEO monitoring

- Index coverage
- Crawl errors
- Canonicalization checks
- Structured data validation
- Broken links (internal)

## 15.3 Spec maintenance rule (prevent context rot)

- After every milestone completion (M1, M2, M3...) update this spec:
  - mark milestone status
  - record any version/tooling changes (e.g., Tailwind v4 behavior)
  - record file paths created/changed

---

## 16) Project file map (quick reference)

- Global CSS (Tailwind import + theme tokens):
  - `src/styles/global.css`
- Base layout (HTML shell + head slot):
  - `src/layouts/BaseLayout.astro`
- Shared UI:
  - `src/components/Header.astro` — shared global header with desktop navigation, mobile menu, and WhatsApp CTA
  - `src/components/Footer.astro`
- Pages:
  - `src/pages/...` (routes follow spec §6.1)
- Sanity Studio:
  - Tours hub: `src/pages/tours/index.astro` (Sanity-powered)
  - Tour detail: `src/pages/tours/[slug].astro` (Sanity-powered)
- Portable Text renderer:
  - `src/components/PortableTextRenderer.tsx`
- Astro integrations:
  - `astro.config.mjs` includes `@astrojs/react`
- Sanity Studio schemas:
  - `studio/schemaTypes/tour.ts`
  - `studio/schemaTypes/index.ts`
  - studio/ (Sanity Studio app)

  SEO staging noindex (temporary): src/layouts/BaseLayout.astro
  Env template committed: .env.example (secrets in .env.local, ignored)

---

## 17) Milestones Roadmap (Execution Plan)

### M0 — Workstation ready
- [x] Node.js and npm installed and validated (manual).
- [x] Git installed and identity configured (manual).
- [x] GitHub account and private repository created (manual).
- [x] Local workspace initialized and first push completed (manual).
- [x] Vercel connected and first staging deploy completed (manual).
- [x] Staging indexing blocked (`src/layouts/BaseLayout.astro`, `src/pages/robots.txt.ts`).
- [x] Environment file structure added (`.env.example` and `.env.local` ignored).
Notes:
- Decision date: 2026-03-04.
- Preview URL: <https://siiatravel.vercel.app/>.

### M1 — Web skeleton ready
- [x] Base layout with global CSS implemented (`src/layouts/BaseLayout.astro`, `src/styles/global.css`).
- [x] Header and footer components implemented (`src/components/Header.astro`, `src/components/Footer.astro`).
- [x] Core routes created (`src/pages/index.astro`, `src/pages/tours/index.astro`, `src/pages/yacht/index.astro`, `src/pages/interpreter/index.astro`, `src/pages/transfer/index.astro`, `src/pages/shopping/index.astro`, `src/pages/helicopter/index.astro`, `src/pages/events/index.astro`, `src/pages/blog/index.astro`, `src/pages/guide.astro`, `src/pages/reviews.astro`, `src/pages/contacts.astro`).
- [x] Custom 404 page implemented (`src/pages/404.astro`).

### M2 — Sanity ready
- [x] Sanity Studio initialized in-repo (`studio/`) (manual + code-verifiable).
- [x] Sanity project and dataset configured (manual).
- [x] Tour schema defined and registered (`studio/schemaTypes/tour.ts`, `studio/schemaTypes/index.ts`).
- [x] Astro environment variables scaffolded for Sanity (manual).

### M3 — Integration
- [x] Sanity client packages installed and configured (`package.json`, `package-lock.json`, `src/lib/sanity.ts`).
- [x] Sanity connectivity test route implemented (`src/pages/sanity-test.json.ts`).
- [x] Tours hub and tour detail routes wired to Sanity (`src/pages/tours/index.astro`, `src/pages/tours/[slug].astro`).
- [x] Portable Text rendering enabled (`astro.config.mjs`, `src/components/PortableTextRenderer.tsx`).
- [x] Vercel Sanity environment variables configured and deployment verified (manual).

### M4 — Reviews system
- [x] Review schema implemented (`studio/schemaTypes/review.ts`).
- [x] Review submission API implemented (`src/pages/api/review.ts`).
- [x] Review submission UI implemented (`src/components/reviews/ReviewForm.astro`, `src/pages/index.astro`).
- [x] Reviews listing page implemented (`src/pages/reviews.astro`).
- [x] Unnumbered sub-step: tour page visible reviews + JSON-LD `review[]` implemented (`src/pages/tours/[slug].astro`).

### M5 — SEO foundations
- [ ] Canonicals, redirects, sitemap, robots, Open Graph, and JSON-LD baseline finalized.

### M6 — Performance pass
- [ ] Images, fonts, JavaScript budget, and Core Web Vitals checks finalized.

### M7 — Deploy staging
- [x] Vercel staging deployment working at <https://siiatravel.vercel.app> (manual).
- [x] GitHub to Vercel auto-deploy confirmed (manual).
- [x] Sanity environment variables configured in Vercel (manual).
- [x] Production redeploy verification completed (manual).
Notes:
- Sanity Studio remains local (`/studio`) and is not deployed to Vercel.

### M8 — Content migration
- [x] Unnumbered sub-step: CMS-driven Service Hub architecture implemented (`studio/schemaTypes/serviceHub.ts`, `src/lib/getServiceHub.ts`, `src/components/ServiceHubPage.astro`, `src/pages/interpreter/index.astro`, `src/pages/yacht/index.astro`, `src/pages/transfer/index.astro`, `src/pages/shopping/index.astro`, `src/pages/helicopter/index.astro`, `src/pages/events/index.astro`, `src/pages/guide.astro`).
- [ ] All target pages migrated.
- [ ] Redirect map implemented and tested.

### M9 — Production cutover
- [ ] Domain switch executed.
- [ ] Indexing and monitoring verification completed.

---

## 18) Architectural Constraints

Do NOT:

- Introduce heavy frontend frameworks unnecessarily
- Add non-essential client-side JS
- Add non-essential third-party scripts
- Build pages as “freeform canvases” that don’t scale

Always:

- Prioritize SEO + performance
- Prefer scalable patterns
- Respect RU/BY constraints

### 18.1 Decorative Complexity Restriction

No unnecessary animations.
No heavy sliders.
No font sprawl.
Performance > visual novelty.

---

## 19) Decisions Log (ADR Summary)

ADR-001 — Stack selection: Astro + Tailwind + Sanity (hosted) + Vercel
ADR-002 — RU only + No trailing slash
ADR-003 — Global reviews only + moderation
ADR-004 — Staging first → production cutover
ADR-005 — Staging domain: free Vercel preview domain (vercel.app)
ADR-006 — TypeScript Strict Mode
ADR-007 — Design system locked: Light header, Navy primary UI, Green CTA (WhatsApp-first), Modern clean typography (Inter/system), Professional guide service tone.
ADR-008 — GitHub repository visibility: Private (default)
ADR-009 — Project specification stored in repository under /docs
ADR-010 — (2026-03-04) Staging runs on https://siiatravel.vercel.app (no custom domain until M9 Production cutover)
ADR-011 — (2026-03-04) Staging is intentionally blocked from indexing using <meta name="robots" content="noindex, nofollow, noarchive"> until production cutover (remove before indexing real domain)
ADR-012 — (2026-03-04) Sanity Studio initialized in /studio; projectId=henfiqur; dataset=production; local Studio verified at http://localhost:3333
ADR-013 — (2026-03-04) Astro ↔ Sanity integration completed:
    Added src/lib/sanity.ts (sanityClient + urlFor)
    Added /sanity-test.json endpoint (count(*) query verified ok:true locally)
    Added @sanity/client, groq, @sanity/image-url
    Updated image URL builder to createImageUrlBuilder (deprecation fix)
ADR-014 — (2026-03-04) Vercel env vars configured for Sanity + production connectivity verified:
    Set PUBLIC_SANITY_PROJECT_ID=henfiqur, PUBLIC_SANITY_DATASET=production, PUBLIC_SANITY_API_VERSION=2023-10-01 in Vercel (Production + Preview)
    Redeploy succeeded (green)
    /sanity-test.json verified on https://siiatravel.vercel.app (ok:true; count depends on dataset content)
ADR-015 — (2026-03-04) Sanity Tour schema + sample content created:
    Added `studio/schemaTypes/tour.ts` and registered in `studio/schemaTypes/index.ts`
    Published first `tour` document (sanity-test count became 1 locally)
ADR-016 — (2026-03-04) Tours hub + dynamic detail pages wired to Sanity:
    `src/pages/tours/index.astro` queries Sanity and lists tours
    `src/pages/tours/[slug].astro` renders tour detail via slug
ADR-017 — (2026-03-04) Portable Text rendering via React in Astro:
    Installed `@astrojs/react` + `@portabletext/react`
    Enabled React integration in `astro.config.mjs`
    Added `src/components/PortableTextRenderer.tsx`
ADR-018 — (2026-03-04) Local Studio host authorization:
    Added development host/CORS origin for local Studio (e.g., http://localhost:3334)
    Note: Studio may run on 3334 if 3333 is busy (Windows TIME_WAIT)

---

## 20) AI Response Directive (for ChatGPT/Gemini)

Assume:

- SEO-first architecture
- Performance-critical environment
- RU/BY constraints
- Static-first output; SSR only when justified
- Minimal JS; no heavy frameworks
- Production-safe solutions; avoid overengineering

### 20.1 Execution Protocol (MANDATORY)

To prevent getting stuck mid-step:

- The assistant must give ONLY ONE actionable step at a time.
- The assistant must WAIT for confirmation ("Done" / screenshot / error log) before giving the next step.
- If an error occurs, the assistant must NOT continue the plan—only troubleshoot the current step until resolved.
- No multi-step dumps. No “here are all steps” answers unless explicitly requested.
- Every step must include:
  - the exact file path(s) to edit
  - exact command(s) to run (PowerShell)
  - what success looks like (what you should see)

---

## 21) Placeholders to fill (as you set things up)

- GitHub repo URL: <https://github.com/alxdot/siiatravel>
- Vercel project URL: <https://vercel.com/alekews-7993s-projects/siiatravel>
- Staging preview domain: <https://siiatravel.vercel.app>
- Sanity projectId: henfiqur
- Studio URL: <http://localhost:3333> (local dev; may use <http://localhost:3334> if port 3333 is busy)
- Sanity Manage URL: opened via npx sanity manage
- WhatsApp number: ________________________
- Lead email inbox: ________________________
- Telegram handle/link (optional): ________________________

---

## 22) Design System

This section defines the approved UI direction. These decisions are mandatory unless superseded by a future ADR.

### 22.1 Header Style

- Header background: white (light header)
- Navigation text: navy
- CTA button in header: green
- No dark header variant allowed

### 22.2 Color System

Primary Structural Color (Navy):

- Used for headings, footer, icons, structural accents
- Deep navy tone (approx. #0f1f35 range)

Primary Action Color (Green):

- Used for ALL primary CTAs
- WhatsApp-first hierarchy
- No competing primary button colors allowed

Neutral Palette:

- Light gray section backgrounds
- Soft border colors
- Clean white content surfaces

### 22.2.1 Implemented color tokens (Tailwind v4)

Defined in `src/styles/global.css`:

@theme {
  --color-navy: #0f1f35;
  --color-primary: #16a34a;
}

Usage:

- `text-navy`, `bg-navy`
- `bg-primary` for the single primary CTA color

### 22.3 Typography

Primary font direction:

- Modern clean sans-serif
- Preferred: Self-hosted Inter (Cyrillic subset)
- Fallback: system font stack

Rules:

- H1–H3: semi-bold
- Body: regular weight
- No decorative serif usage

### 22.4 Visual Tone

Approved Tone:

- Professional guide service
- Trust-first
- Clean layout
- Structured information blocks
- No marketplace-style search bars
- No visual clutter
- No fake ratings

### 22.5 CTA Hierarchy Enforcement

- Green = primary action only
- No blue or alternative primary buttons
- Sticky mobile WhatsApp CTA allowed
- Desktop sidebar CTA allowed on detail pages

## 22.6 Frontend System Architecture

The frontend must follow a reusable component-based architecture built with Astro and Tailwind.

Goals:

- Maintain visual consistency across all service and tour pages
- Prevent design drift as the site scales
- Keep performance high and JavaScript minimal
- Avoid CMS-driven layout chaos

### 22.6.1 Component System

The UI must be built from reusable components and blocks.

Preferred structure:

```text
src/components/
  layout/
  ui/
  blocks/
  seo/
```

Categories:

Layout

- Header
- Footer
- Mobile navigation
- Global layout wrapper

UI primitives

- Button
- SectionHeading
- Badge
- Container
- Stars
- PriceTag

Container is the base width primitive for shared shell/content wrappers and must provide the default max width plus horizontal gutters.

Blocks

Reusable page sections:

- Hero
- ImageText
- ServicesGrid
- TourCard
- YachtCard
- ReviewSection
- FAQSection
- CTASection
- LeadForm
- GalleryStrip
- Breadcrumbs

Rules:

- Avoid page-specific hardcoded layouts when a reusable block is possible.
- Prefer composable sections instead of monolithic page templates.

### 22.6.2 CMS vs Presentation Responsibility

Clear separation must be preserved:

Sanity CMS controls:

- Content
- Text
- Images
- Structured content blocks
- Limited layout variants

Astro + Tailwind control:

- Layout
- Spacing
- Typography
- Visual hierarchy
- Responsive behavior
- Image rendering
- Section composition

The CMS must not become a visual design tool.

### 22.6.3 Controlled CMS Variants

When layout options are needed, they must be controlled enums.

Examples:

```text
variant: primary | secondary | luxury
theme: light | dark | brand
alignment: left | center
imagePosition: left | right
```

Rules:

- No freeform styling fields in CMS.
- Editors should not control margins, padding, or colors.

### 22.6.4 Template Strategy

Pages should be built using shared templates.

Core templates:

- Homepage
- Tours listing
- Tour detail
- Service hub pages
- Blog article
- Contact page

Each template should be composed from reusable blocks.

### 22.6.5 UI Library Policy

The project must prioritize a custom component system.

Allowed:

- Astro components
- Tailwind CSS utilities
- Small helper libraries when justified

Avoid:

- heavy UI kits
- template frameworks
- component libraries that dictate design

Examples to avoid unless justified:

- Tailwind Plus
- Flowbite
- large design systems

### 22.6.6 Visual Direction

The website must feel:

- premium
- editorial
- photo-driven
- calm and trustworthy
- conversion-focused

Avoid:

- generic SaaS dashboard styling
- template-looking layouts
- overly animated UI

### 22.6.7 Global Navigation System

The website must use a shared global header/navigation system implemented in the shared site header component.

Navigation goals:

- Keep top-level service discovery clear
- Preserve a premium, calm, editorial feel
- Support mobile navigation without heavy JavaScript
- Keep the primary CTA visible

Desktop navigation structure:

Primary navigation:

- Экскурсии
- Яхты
- Гид
- Переводчик
- Трансфер
- Шопинг
- Вертолет
- Мероприятия

Secondary / utility navigation:

- Блог
- Отзывы
- Контакты

CTA:

- WhatsApp CTA must remain visible in the header

Mobile navigation rules:

- Mobile header must include brand, WhatsApp CTA, and hamburger toggle
- Hamburger toggle opens the mobile navigation panel
- Mobile navigation must include all primary and utility links
- Mobile menu should close when a navigation link is selected
- Mobile menu should support Escape key close behavior
- Mobile menu implementation must stay lightweight

Architecture rule:

- Global navigation must be maintained in the shared header component, not duplicated per page.

---

## 23) Future improvement:

Reviews will be used to generate Schema.org structured data
(JSON-LD) for tour and service pages.

Goal:
Enable Google rich snippets (rating stars in search results).

This will be implemented after the review UI and moderation system
are complete.


---

### AI Navigation Rule

When referencing this specification always cite sections by number.

Examples:
- See spec §7 SEO rules
- See spec §4 infrastructure policy
- See spec §17 milestones roadmap

Rules:
- Treat this document as the authoritative architecture source.
- Do not override decisions recorded in ADR.
