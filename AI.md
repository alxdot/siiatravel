# AI Development Context — Siiatravel

This repo is an AI-assisted build. AI agents (Codex/ChatGPT) must follow the rules here.

## Project overview
- Product: Siiatravel — Istanbul travel experiences & services
- Language: RU-only
- Business: lead generation (no payments, no user accounts)
- Region constraint: must work reliably in Russia & Belarus (RU/BY resilience)

Primary conversion hierarchy:
1) WhatsApp
2) Contact form
3) Phone

## Stack (locked)
- Astro (static-first)
- TailwindCSS v4
- TypeScript (strict)
- Sanity CMS (hosted Studio in /studio)
- Deploy: Vercel (GitHub → Vercel auto deploy)

## Non‑negotiable architectural rules
- Static-first. SSR only when justified (recommended: /reviews).
- Minimal hydration only. Do NOT introduce heavy client frameworks.
- URL canonicals: **no trailing slash** site-wide.
- LCP Local Asset Rule: hero/LCP images must not rely on runtime Sanity CDN.

## Performance targets
- Lighthouse ≥ 90 mobile
- CLS < 0.1
- LCP < 2.5s
- INP < 200ms

## Documentation
- Master spec: `docs/siiatravel_master_spec.md`
- State: `PROJECT_STATE.md`
- AI brain: `docs/siiatravel_ai_brain.md`

If instructions conflict:
1) Follow `docs/siiatravel_master_spec.md`
2) Then `PROJECT_STATE.md`
3) Then this file (`AI.md`)

## Execution protocol (MANDATORY)
- Provide ONE actionable step at a time.
- Wait for confirmation before the next step.
- If an error occurs: troubleshoot only the current step.
- Before editing, state which files you will touch.
