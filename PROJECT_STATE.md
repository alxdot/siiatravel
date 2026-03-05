# Siiatravel — Project State

Last updated: 2026-03-05

## Current milestone
M5 — SEO foundations

## Next milestone
M6 — Performance pass

## Milestones (aligned with `docs/master-spec.md` §17)

### M0 — Workstation ready
- [x] Node.js and npm installed and validated (manual).
- [x] Git installed and identity configured (manual).
- [x] GitHub account and repository setup completed (manual).
- [x] Local repository initialized and pushed (manual).
- [x] Vercel project connected and first deploy completed (manual).
- [x] Environment file structure created (`.env.example`, `.env.local` ignored).
Notes:
- Manual setup confirmations are tracked in the historical setup logs in `docs/master-spec.md` §17.

### M1 — Web skeleton ready
- [x] Base layout implemented (`src/layouts/BaseLayout.astro`).
- [x] Shared header and footer implemented (`src/components/Header.astro`, `src/components/Footer.astro`).
- [x] Core top-level routes implemented (`src/pages/index.astro`, `src/pages/tours/index.astro`, `src/pages/yacht/index.astro`, `src/pages/interpreter/index.astro`, `src/pages/transfer/index.astro`, `src/pages/shopping/index.astro`, `src/pages/helicopter/index.astro`, `src/pages/events/index.astro`, `src/pages/blog/index.astro`, `src/pages/guide.astro`, `src/pages/reviews.astro`, `src/pages/contacts.astro`).
- [x] Custom 404 page implemented (`src/pages/404.astro`).
Notes:
- Legacy completion markers were normalized to strict task-list format on 2026-03-05.

### M2 — Sanity ready
- [x] Sanity Studio initialized in-repo (`studio/`) (manual + code-verifiable).
- [x] Tour schema registered (`studio/schemaTypes/tour.ts`, `studio/schemaTypes/index.ts`).
- [x] Astro environment variables configured for Sanity (manual).
Notes:
- Login, organization, project, and dataset setup are manual operations.

### M3 — Integration
- [x] Sanity client wrapper implemented (`src/lib/sanity.ts`).
- [x] Tours hub integrated with Sanity (`src/pages/tours/index.astro`).
- [x] Tour detail route integrated with Sanity (`src/pages/tours/[slug].astro`).
- [x] Portable Text rendering implemented (`src/components/PortableTextRenderer.tsx`).
Notes:
- Vercel environment-variable verification remains manual.

### M4 — Reviews system
- [x] Review schema implemented (`studio/schemaTypes/review.ts`).
- [x] Review submission API implemented (`src/pages/api/review.ts`).
- [x] Review form mounted on homepage (`src/components/reviews/ReviewForm.astro`, `src/pages/index.astro`).
- [x] Reviews listing page implemented (`src/pages/reviews.astro`).
- [x] Tour page visible reviews + JSON-LD `review[]` implemented (`src/pages/tours/[slug].astro`).
Notes:
- Legacy mislabeled item `M6 — Tour page visible reviews + JSON-LD review[]` is tracked as an unnumbered completed sub-step under M4.

### M5 — SEO foundations
- [ ] Canonicals, redirects, sitemap, robots, Open Graph, and JSON-LD baseline fully finalized.
- [ ] FAQ schema rollout finalized where applicable.
Notes:
- Active milestone.

### M6 — Performance pass
- [ ] Image and font optimization pass finalized.
- [ ] JavaScript budget review and Core Web Vitals verification finalized.

### M7 — Deploy staging
- [x] Staging deployment on Vercel verified (manual).
- [x] Preview auto-deploy from GitHub verified (manual).
- [x] Required Sanity environment variables set in Vercel (manual).

### M8 — Content migration
- [x] Unnumbered sub-step: CMS-driven Service Hub architecture implemented (`src/components/ServiceHubPage.astro`, `src/lib/getServiceHub.ts`, `studio/schemaTypes/serviceHub.ts`, `src/pages/interpreter/index.astro`, `src/pages/yacht/index.astro`, `src/pages/transfer/index.astro`, `src/pages/shopping/index.astro`, `src/pages/helicopter/index.astro`, `src/pages/events/index.astro`, `src/pages/guide.astro`).
- [ ] All target pages migrated.
- [ ] Redirect map implemented and tested.
Notes:
- Legacy mislabeled item `M7 — CMS-driven Service Hub architecture` is tracked under M8 without changing M0-M9 meanings.

### M9 — Production cutover
- [ ] Domain cutover executed.
- [ ] Staging `noindex` removed for production.
- [ ] Production indexing and monitoring verification completed.

## Key decisions (high impact)

Stack:
- Astro
- Tailwind v4
- TypeScript (strict)
- Sanity
- Vercel

Architecture decisions:
- Canonical URLs: **no trailing slash**
- CTA hierarchy: **WhatsApp → form → phone**
- RU/BY resilience required:
  - fallback phone visible
  - forms must work without blocked services
- LCP images served **locally** (avoid runtime Sanity CDN dependency)

## Known constraints

- No heavy frontend frameworks
- Minimal hydration only
- Staging environment must be **noindex** until production cutover

## Key files (quick pointers)

Spec:
- `docs/master-spec.md`

Sanity client:
- `src/lib/sanity.ts`

Tours:
- `src/pages/tours/index.astro`
- `src/pages/tours/[slug].astro`

Reviews API:
- `src/pages/api/review.ts`

Portable Text renderer:
- `src/components/PortableTextRenderer.tsx`

Studio schemas:
- `studio/schemaTypes/*`
