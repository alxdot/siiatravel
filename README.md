# siiatravel

High-performance lead-generation website for Istanbul travel experiences.

**Stack:** Astro + Tailwind + TypeScript (strict) + Sanity + Vercel
**Spec:** see `/docs/master-spec.md`

## Start here

1) Read [`AI_CONTEXT.md`](AI_CONTEXT.md)
2) Read [`PROJECT_STATE.md`](PROJECT_STATE.md)

If you create/edit pages or routes, read `docs/seo-policy.md`. If you change infrastructure/runtime assumptions, read `docs/infrastructure.md`.

## Documentation Index

| Document | Purpose | Who / When |
|---|---|---|
| [`AI_CONTEXT.md`](AI_CONTEXT.md) | Global AI operating context and startup directive | All AI sessions, first read |
| [`PROJECT_STATE.md`](PROJECT_STATE.md) | Current milestone, progress, and next tasks | Before planning or implementation |
| [`docs/master-spec.md`](docs/master-spec.md) | Authoritative product and implementation spec | For rule decisions and scope checks |
| [`AI.md`](AI.md) | Legacy AI rules reference (superseded by AI_CONTEXT) | Consult only if needed for older context |
| [`CODEX_PLAYBOOK.md`](CODEX_PLAYBOOK.md) | Codex execution templates and workflow commands | During hands-on implementation in VS Code |
| [`docs/architecture.md`](docs/architecture.md) | High-level architecture overview | Before cross-cutting/structural changes |
| [`docs/ai-brain.md`](docs/ai-brain.md) | Legacy session context header | For back-compat with older prompts |
| [`docs/seo-policy.md`](docs/seo-policy.md) | SEO policy for pages/routes | Mandatory before creating/editing any page/route |
| [`docs/infrastructure.md`](docs/infrastructure.md) | Infrastructure constraints and deployment details | Mandatory when changing infrastructure/runtime assumptions |

## Local development

```bash
npm install
npm run dev
