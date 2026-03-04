# siiatravel_ai_brain

Paste this at the start of a new Codex/ChatGPT session if needed.

## Identity
- RU-only Istanbul travel lead-gen site (no payments, no accounts)
- Must work reliably in Russia & Belarus

## Stack
Astro (static-first) + Tailwind v4 + TypeScript strict + Sanity + Vercel

## Non-negotiables
- No trailing slash URLs (site-wide canonical policy)
- Minimal hydration only; avoid heavy client frameworks
- CTA hierarchy: WhatsApp → Form → Phone (always visible)
- LCP Local Asset Rule: hero/LCP images must not depend on runtime Sanity CDN

## Performance targets
Lighthouse ≥ 90 mobile; CLS < 0.1; LCP < 2.5s; INP < 200ms

## Current milestone
M4 — Reviews system (submission → moderation → publish; anti-spam RU/BY-safe)

## Working protocol
ONE step at a time; wait for confirmation; troubleshoot current step only.

### Reviews SEO rule

Reviews must support Schema.org structured data generation.

Goal:
Allow Google rich snippets (ratings and review counts)
for tours and services.

Reviews should be linked to the specific service being reviewed
(e.g., tour, yacht, transfer).
