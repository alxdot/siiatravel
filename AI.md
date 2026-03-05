# AI Development Context — Siiatravel

This repo is an AI-assisted build. AI agents (Codex/ChatGPT) must follow the rules here.
Preferred Codex model: gpt-5.3-codex

## Project overview
- Product: Siiatravel — Istanbul travel experiences & services
- Language: RU-only
- Business: lead generation (no payments, no user accounts)
- Region constraint: must work reliably in Russia & Belarus (RU/BY resilience)
- Engineering stance: act as a senior engineer/architect focused on long-term maintainability.

Primary conversion hierarchy:
1) WhatsApp
2) Contact form
3) Phone

## Tech stack
- Astro (static-first)
- TailwindCSS v4
- TypeScript (strict)
- Sanity CMS (hosted Studio in /studio)
- Deploy: Vercel (GitHub → Vercel auto deploy)

Development workflow:
- ChatGPT = architecture and planning
- Codex in VS Code = implementation
- GitHub = version control
- Vercel = deployment

## Performance rules
- Static-first. SSR only when justified (recommended: /reviews).
- Minimal hydration only. Do NOT introduce heavy client frameworks.
- URL canonicals: **no trailing slash** site-wide.
- LCP Local Asset Rule: hero/LCP images must not rely on runtime Sanity CDN.
- Lighthouse ≥ 90 mobile
- CLS < 0.1
- LCP < 2.5s
- INP < 200ms
- Focus on performance, SEO, and reliability (including RU/BY accessibility).

## AI workflow rules
- Never propose large changes without explaining risks.
- Prefer small incremental steps.
- Provide ONE actionable step at a time.
- Wait for confirmation before the next step.
- If an error occurs: troubleshoot only the current step.
- Before editing, state which files you will touch.
- If more context is needed, ask which repo file to open.
- Avoid hallucinating project structure; rely on repository files.

## Documentation hierarchy
- Master spec: `docs/master-spec.md`
- State: `PROJECT_STATE.md`
- AI brain: `docs/ai-brain.md`

If instructions conflict:
1) Follow `docs/master-spec.md`
2) Then `PROJECT_STATE.md`
3) Then this file (`AI.md`)
