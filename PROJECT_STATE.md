# Siiatravel — Project State

Last updated: 2026-03-05

## Current milestone
M6 — Tour page visible reviews + JSON-LD review[] (COMPLETE)

Next tasks:
- Optional hardening later: Turnstile only if needed (RU/BY-safe approach first)

Recently completed:
- M5 — Review SEO schema / JSON-LD (COMPLETE)
- Rich Results Test: valid Product + Review snippets confirmed via CODE test (URL crawl was blocked)

M6 checklist:
- M6-1 Strict normalization/filtering for approved tour reviews [COMPLETE]
- M6-2 Render visible "Отзывы" block on /tours/[slug] [COMPLETE]
- M6-3 Extend JSON-LD to include review[] and match visible reviews [COMPLETE]
- M6-4 Validate again in Rich Results Test [COMPLETE]

M6 verification:
- Google Rich Results Test (code mode) detects valid Product snippets + Review snippets
- review[] JSON-LD mirrors the visible reviews on the same tour page

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

✅ M4 Step 3 — Review submission UI implemented

Files:
- src/components/reviews/ReviewForm.astro
- src/pages/index.astro (form mounted + latest reviews preview + link to `/reviews`)

Behavior:
- Homepage includes review submission form (`POST /api/review`)
- Homepage shows "Последние отзывы" (latest 3 approved reviews)
- Homepage includes "Все отзывы →" link to `/reviews`

Status:
M4 Step 3 complete


✅ M4 Step 4 — Reviews listing page implemented

File:
- src/pages/reviews.astro

Behavior:
- Displays only reviews with `status == "approved"`
- Sorted by `date desc` (newest first)

Status:
M4 Step 4 complete

### Moderation workflow

- New reviews are created with `status = "pending"`.
- In Sanity Studio, an editor should set status to:
  - `approved` — displayed publicly on `/reviews` and homepage preview
  - `rejected` — never displayed
- Moderation guidance:
  - never approve reviews containing links/spam
  - keep reviewer name reasonable
  - fix obvious typos only if desired
- UI submission is live on the homepage and sends reviews to `POST /api/review`.


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
