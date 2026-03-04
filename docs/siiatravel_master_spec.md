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

### 4.1 Performance targets

Lighthouse ≥ 90 mobile
CLS < 0.1
LCP < 2.5s
INP < 200ms

Rules:

- Minimal hydration
- Image optimization (WebP / AVIF)
- Avoid unnecessary render-blocking resources

Critical UX must work without JS.

### 4.2 RU/BY geographic constraints (risk + mitigation plan)

Risk acknowledged:

- Vercel/Sanity edge/CDN IPs can be collateral-damaged by regional blocking.
- Sanity asset CDN issues could cause images not to load even if HTML loads.

Mandatory design outcome:

- If images/scripts fail, content and CTAs still function (numbers visible, email works).

Mitigation path (implement only if monitoring proves needed):

- Option A: Proxy Sanity images through own domain (edge function / reverse proxy)
- Option B: Pre-build LCP-critical assets (hero images) under your own controlled hosting path
- Option C: RU-friendly reverse proxy/CDN layer if required

### 4.3 Node policy

- Even-numbered Node LTS only
- No odd-numbered releases in production
- Pin Node version in repo and CI

### 4.4 Fonts policy (RU-safe, premium + fast)

Preferred strategy:

- Self-hosted **WOFF2** (variable if suitable) with **Cyrillic subset**
- Preload only critical font(s)
- `font-display: swap`
- Strong system fallback stack
- Keep fonts minimal: 1 family (2 max), 2 weights (e.g., 400 + 600)

Alternative:

- System fonts only (maximum resilience/performance)

### 4.5 Image pipeline (Sanity + frontend)

### Image dimension standards

To prevent oversized uploads and protect performance:

Hero / LCP images:

- Maximum width: 2400px
- Typical width: 1600–2000px
- Must include width + height attributes (or equivalent) to prevent CLS

Content images:

- Maximum width: 1600px

Thumbnails / cards:

- Maximum width: 800px

Rules:

- Do not upload raw 4000–6000px camera images.
- Compress before upload when possible.


- Sanity Image API can be used for convenience (`auto=format`), but do not rely on it blindly for LCP assets.
- Enforce strict aspect ratios in CMS to prevent CLS
- LCP-critical hero images:
  - compress + size carefully
  - always set width/height (or equivalent)
  - preload when appropriate
- Consider Astro image tooling for build-time optimization of critical assets (especially if RU/BY asset reliability becomes an issue)

### 4.6 LCP Local Asset Rule (NEW)

All hero/LCP-critical images:

- Pulled at build time.
- Processed via Astro Image.
- Served from same production domain.
- Must not depend on runtime Sanity CDN.

Purpose:
Protect conversion under RU/BY CDN instability.

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

### 7.1 Technical SEO (must-have)

- Clean canonical URLs
- **No trailing slash policy** (define + enforce)
- Sitemap generated (sitemap index + module sitemaps)
- robots.txt configured
- Redirect handling system
- Unique title + meta description per page
- Open Graph + Twitter cards
- Favicon
- Custom 404 page

### 7.2 URL canonicalization (implementation plan)

Locked policy:

- **No trailing slash, site-wide**

Implementation:

- Astro must consistently output non-slashed URLs.
- Vercel must enforce one canonical form via redirects:
  - `/<path>/` → `/<path>` (301)
- Internal links always use canonical form.
- QA: crawl site and verify no duplicate slashed URLs are indexable.

### 7.3 Structured data (safe, high-value)

Primary schemas:

- Organization
- LocalBusiness (Istanbul)
- BreadcrumbList
- FAQPage (only for real visible FAQs)

Experiences/services:

- Use `Service` where appropriate (keep it honest)

Reviews:

- Mark up only reviews that are real and visible on the page

### 7.4 Internal linking

No orphan pages.

Minimum rules:

- Each Tour page links to:
  - parent hub (/tours)
  - 3 related tours
  - 1–2 relevant blog articles (when blog exists)
- Each Yacht page links to:
  - hub (/yacht)
  - 3 related yacht options (or categories)
  - relevant crosslinks to tours/services
- Each Blog article links to:
  - at least 2 relevant commercial pages (tours/yacht/services)
- Hub pages link to all key children
- Natural anchors only

### 7.5 Anti-Cannibalization Rule (NEW)

Do NOT create multiple pages targeting the same core intent with minor keyword variation.

Select one canonical page per intent.

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
  - `src/components/Header.astro`
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

M0 — Workstation ready
✅ Node.js LTS installed

- node v24.14.0 (LTS: Krypton)
- npm 11.9.0
✅ Git installed (git version 2.53.0.windows.1)
✅ Git identity configured
- user.name = Aleksei Andreev
- user.email = <alekews@gmail.com>
- core.editor = VS Code
✅ GitHub account created
✅ GitHub repository created for siiatravel (Private)
✅ Local repo initialized + first commit
✅ Push to GitHub
✅ Workspace folder created: C:\Astro\Projects\siiatravel
✅ Astro dev server runs locally
✅ Astro minimal + TS strict created
✅ Tailwind added
✅ Installed Tailwind Vite plugin dependency (@tailwindcss/vite) and verified dev server
✅ site and trailingSlash: 'never' configured
✅ Vercel connected to GitHub repo + first deploy (staging: siiatravel.vercel.app)
Decision (2026-03-04):
First successful deploy completed.
Astro project builds automatically on Vercel via GitHub integration.
Preview URL: <https://siiatravel.vercel.app/>
✅ Staging indexing blocked (meta robots noindex + robots.txt)
“Indexing is intentionally blocked on staging until M9 domain cutover.”
✅ Env file structure added (.env.example + .env.local ignored)

### Environment decisions

- Default terminal: PowerShell
- Git Bash used only when a tutorial requires bash commands

### Verification commands

git --version → 2.53.0.windows.1
git config --global --list → shows name/email/editor
node -v → v24.14.0
npm -v → 11.9.0
node -p "process.release.lts" → Krypton

M1 — Web skeleton ready ✅ (completed)
Implemented:

- Base layout with global CSS + head slot:
  - `src/layouts/BaseLayout.astro`
- Header + footer components:
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
- Brand colors implemented via Tailwind v4 `@theme` tokens
- Core routes created and load successfully:
  - `/` `/tours` `/yacht` `/interpreter` `/transfer` `/shopping` `/helicopter` `/events`
  - `/blog` `/guide` `/reviews` `/contacts`
- Custom 404 page created:
  - `src/pages/404.astro` (verified working via /doesnotexist)
- Temporary WhatsApp header CTA links to `/contacts` until real WA number is set

M2 — Sanity ready

✅ Sanity Studio created inside repo: C:\Astro\Projects\siiatravel\studio
✅ Logged in via Sanity CLI
✅ Project created: siiatravel
✅ Organization created: Personal
✅ Dataset: production (public read)
✅ TypeScript enabled
✅ Package manager: npm
✅ Studio dev server verified: `npm run dev` → Studio loads locally (initially at http://localhost:3333, later used http://localhost:3334 when 3333 was busy)
  - Initially showed “No document types” until schemas were added
✅ Astro env vars added to .env.local:
    PUBLIC_SANITY_PROJECT_ID=henfiqur
    PUBLIC_SANITY_DATASET=production
    PUBLIC_SANITY_API_VERSION=2023-10-01
    SANITY_API_TOKEN= (placeholder, not used yet)

✅ Studio connected to project (CORS/dev host)
- Added development host origin for local Studio (example used): `http://localhost:3334` (Allow credentials)

- ✅ Schemas defined (initial): Tour
  - `studio/schemaTypes/tour.ts`
  - registered in `studio/schemaTypes/index.ts`
- ✅ Sample content created:
  - 1 published `tour` document (used for end-to-end integration testing)

M3 — Integration

✅ Installed Sanity packages in Astro:

- @sanity/client
- groq
- @sanity/image-url

✅ Created Sanity client wrapper:

- src/lib/sanity.ts
  - sanityClient configured via import.meta.env:
    - PUBLIC_SANITY_PROJECT_ID
    - PUBLIC_SANITY_DATASET
    - PUBLIC_SANITY_API_VERSION
  - useCdn: true
  - urlFor helper for images

✅ Added test endpoint to verify GROQ connectivity:

- src/pages/sanity-test.json.ts
  - GET /sanity-test.json
  - Query: count(*)
  - Expected: `{ ok: true, count, projectId, dataset }`
- Before content: `count: 0`
- After creating first Tour document: `count: 1` (local verified)

✅ Fixed Sanity image-url deprecation:

- switched to createImageUrlBuilder from @sanity/image-url

✅ Astro pulls Tours from Sanity (initial vertical)
- Updated Tours hub to query Sanity:
  - `src/pages/tours/index.astro`
- Added Tour detail route (dynamic):
  - `src/pages/tours/[slug].astro` (uses `getStaticPaths` + GROQ by slug)
- Portable Text rendering enabled (no JSON output):
  - Installed `@astrojs/react` + `@portabletext/react`
  - Updated `astro.config.mjs` to enable React integration
  - Added `src/components/PortableTextRenderer.tsx`

✅ Vercel env vars configured + deployment verified (Production + Preview):

- Added Vercel Environment Variables:
  - PUBLIC_SANITY_PROJECT_ID=henfiqur
  - PUBLIC_SANITY_DATASET=production
  - PUBLIC_SANITY_API_VERSION=2023-10-01
- Triggered Production redeploy → Status: Ready (green)
- Verified deployed endpoint:
  - https://siiatravel.vercel.app/sanity-test.json → { ok:true, count:0, projectId:"henfiqur", dataset:"production" } (count=0 expected until docs exist)


M4 — Reviews system

- Submission → moderation → publish
- Anti-spam controls

M5 — SEO foundations

- Canonicals, redirects, sitemap, robots, OG, JSON-LD

M6 — Performance pass

- Images, fonts, JS budget, CWV checks

M7 — Deploy staging

✅ Vercel staging deploy working (preview domain):
- Preview/Production domain: https://siiatravel.vercel.app
- Auto-deploy GitHub → Vercel confirmed

✅ Environment Variables configured in Vercel (Production + Preview):
- PUBLIC_SANITY_PROJECT_ID=henfiqur
- PUBLIC_SANITY_DATASET=production
- PUBLIC_SANITY_API_VERSION=2023-10-01

✅ Production redeploy verified green:
- Build + deploy status: Ready
- Deployed Sanity connectivity test:
  - /sanity-test.json returns ok:true (count:0 expected until content exists)

⚠️ Note:
- Sanity Studio is local at /studio (http://localhost:3333). It is not deployed to Vercel.

M8 — Content migration

- All pages migrated
- Redirect map implemented and tested

M9 — Production cutover

- Domain switch
- Indexing & monitoring verification

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

---


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
