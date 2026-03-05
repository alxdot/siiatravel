# Siiatravel — Project State

Last updated: 2026-03-05

## Current milestone
M4 — Reviews system (IN PROGRESS)

Next tasks:
- M4 Step 3 — Review submission form (frontend)
- Moderation workflow (pending → approved/published OR rejected)
- SSR route for `/reviews` (recommended)
- Optional hardening later: Turnstile only if needed (RU/BY-safe approach first)

### Progress

✅ M4 Step 1 — Review schema implemented (Sanity document type)

Files:
- studio/schemaTypes/review.ts
- studio/schemaTypes/index.ts

Fields implemented:
- name
- rating
- text
- date (auto-filled, readOnly)
- status (pending / approved / rejected)

Preview:
- shows reviewer name
- rating stars
- moderation status

Status:
M4 Step 1 complete


✅ M4 Step 2 — Review submission API implemented

File:
- src/pages/api/review.ts

Endpoint:
- POST `/api/review`

Behavior:
- Creates Sanity `review` documents with:
  - status = `pending`
  - date = current ISO datetime
- Anti-spam:
  - honeypot field (non-empty → silent success, no write)
  - in-memory rate limit: 5 requests / 10 minutes per IP
- Validation:
  - name: min 2 chars
  - rating: integer 1..5
  - text: min 10 chars

Security / architecture notes:
- Uses server-only `SANITY_API_TOKEN` (write client created inside route)
- `export const prerender = false;` required on this API route so request bodies are available (fixes “empty body” issue in static/prerender mode)

Status:
M4 Step 2 complete


✅ M4 Step 2.5 — Review subject linking implemented

Files:
- studio/schemaTypes/review.ts
- src/pages/api/review.ts

Purpose:
Prepare the review system for **future SEO rich snippets** and **entity-specific reviews** without needing data migration later.

Schema additions:
- subjectType: `company | tour | service` (default: `company`)
- tour: reference to `tour` (visible only when subjectType = `tour`)
- service: enum (visible only when subjectType = `service`)

Service enum values:
- yacht
- transfer
- guide
- interpreter
- helicopter
- shopping
- other

API behavior:
- All new reviews are currently created with: subjectType = "company"

This keeps behavior identical to previous versions while enabling
future UI support for tour/service reviews.

Status:
M4 Step 2.5 complete


---

## Completed milestones (summary)

- M0 ✅ Workstation ready
- M1 ✅ Web skeleton ready
- M2 ✅ Sanity ready (Studio in `/studio`, dataset `production`, projectId `henfiqur`)
- M3 ✅ Astro ↔ Sanity integration for Tours (hub + detail via slug)


---

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


---

## Known constraints

- No heavy frontend frameworks
- Minimal hydration only
- Staging environment must be **noindex** until production cutover


---

## Key files (quick pointers)

Spec:
- `docs/siiatravel_master_spec.md`

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
