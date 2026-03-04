# Siiatravel — Project State

Last updated: 2026-03-04

## Current milestone
M4 — Reviews system (NEXT)

Next tasks:
- Review submission form
- Moderation workflow (pending → approved/published OR rejected)
- Anti-spam (honeypot + rate limit; Turnstile only if needed)
- SSR route recommended for `/reviews`

## Completed milestones (summary)
- M0 ✅ Workstation ready
- M1 ✅ Web skeleton ready
- M2 ✅ Sanity ready (Studio in /studio, dataset production, projectId henfiqur)
- M3 ✅ Astro ↔ Sanity integration for Tours (hub + detail via slug)

## Key decisions (high impact)
- Stack: Astro + Tailwind v4 + TS strict + Sanity + Vercel
- Canonical URLs: no trailing slash
- CTA hierarchy: WhatsApp → form → phone
- RU/BY resilience required (fallback phone visible; forms must work)
- LCP images served locally (avoid runtime Sanity CDN dependency)

## Known constraints
- No heavy frontend frameworks.
- Minimal hydration only.
- Staging is noindex until production cutover.

## Key files (quick pointers)
- Spec: `docs/siiatravel_master_spec.md`
- Sanity client: `src/lib/sanity.ts`
- Tours: `src/pages/tours/index.astro`, `src/pages/tours/[slug].astro`
- Portable Text: `src/components/PortableTextRenderer.tsx`
- Studio schemas: `studio/schemaTypes/*`
