> **Global Directive**
> Before doing anything in this repo, read `/AI_CONTEXT.md` and `/PROJECT_STATE.md` (and read `/docs/seo-policy.md` before creating or editing any page/route).

# AI Context — Siiatravel

This is the single startup context for AI agents (Codex/ChatGPT) in this repository.
Preferred Codex model: gpt-5.3-codex

## Project Overview
- Product: Siiatravel — Istanbul travel experiences & services
- Language: RU-only
- Business model: lead generation (no payments, no user accounts)
- Region constraint: must work reliably in Russia & Belarus (RU/BY resilience)
- Engineering stance: act as a senior engineer/architect focused on long-term maintainability

Primary conversion hierarchy:
1) WhatsApp
2) Contact form
3) Phone

## Tech Stack
- Astro (static-first)
- TailwindCSS v4
- TypeScript (strict)
- Sanity CMS (hosted Studio in `/studio`)
- Deploy: Vercel (GitHub -> Vercel auto deploy)

Development workflow:
- ChatGPT = architecture and planning
- Codex in VS Code = implementation
- GitHub = version control
- Vercel = deployment

## Performance Rules
- Static-first. SSR only when justified (recommended: `/reviews`).
- Minimal hydration only. Do NOT introduce heavy client frameworks.
- URL canonicals: no trailing slash site-wide.
- LCP Local Asset Rule: hero/LCP images must not rely on runtime Sanity CDN.
- Lighthouse >= 90 mobile
- CLS < 0.1
- LCP < 2.5s
- INP < 200ms
- Focus on performance, SEO, and reliability (including RU/BY accessibility).

## Golden Rules
- Source-of-truth only: rely on repository files and documented rules; never infer structure or business rules without checking repo files first.
- Static-first architecture by default; use SSR only when justified.
- Prefer performance over cleverness in implementation choices.
- LCP assets must be local and must not depend on runtime Sanity CDN.
- Keep canonical URLs without trailing slash site-wide.
- Preserve RU/BY resilience for conversion-critical paths and dependencies.
- Ship small diffs, one step at a time.

## RU/BY Constraints Summary
- Core conversion paths must remain usable without blocked third-party services.
- Contact channels should always prioritize reliability in RU/BY conditions.
- Anti-spam and moderation choices should prefer RU/BY-safe defaults first.
- Any infra-dependent decision should be validated for RU/BY reachability.
- See `docs/infrastructure.md`.

## AI Workflow Rules
- Never propose large changes without explaining risks.
- Prefer small incremental steps.
- Provide ONE actionable step at a time.
- Wait for confirmation before the next step.
- If an error occurs: troubleshoot only the current step.
- Before editing, state which files you will touch.
- If more context is needed, ask which repo file to open.
- Avoid hallucinating project structure; rely on repository files.

## Reviews SEO Rule
Reviews must support Schema.org structured data generation.

Goal:
- Allow Google rich snippets (ratings and review counts) for tours and services.
- Reviews should be linked to the specific service being reviewed (for example: tour, yacht, transfer).

## Documentation Hierarchy
- Master spec: `docs/master-spec.md`
- State: `PROJECT_STATE.md`
- AI brain (legacy context source): `docs/ai-brain.md`
- Codex playbook: `CODEX_PLAYBOOK.md`

## Policy Files

Detailed technical policies are separated from the master spec:

- SEO policy: `docs/seo-policy.md`
- Infrastructure / RU-BY constraints: `docs/infrastructure.md`

When working on page creation, routing, metadata, or structured data, consult the SEO policy.
When working on hosting, runtime services, or third-party integrations, consult the infrastructure policy.

If instructions conflict:
1) Follow `AI_CONTEXT.md` (AI operating rules)
2) Then `docs/master-spec.md` (product/architecture rules)
3) Then `PROJECT_STATE.md` (current milestone)

## Safe Default Prompt (copy/paste)
You are Codex working in the Siiatravel repo.
Before doing anything:
- Read AI_CONTEXT.md + PROJECT_STATE.md.
- Summarize constraints in 5 bullets.
- Propose a plan with ONE step.
- List exact files you will edit.
- Then wait.
