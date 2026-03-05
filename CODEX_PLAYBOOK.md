# Codex Playbook — Siiatravel (VS Code)

## Always start sessions with this checklist
1) Read: AI_CONTEXT.md
2) Read: PROJECT_STATE.md
3) If a rule exists, follow master spec: docs/master-spec.md
4) Before creating/editing pages or routes, read: docs/seo-policy.md (mandatory)
5) If changing infrastructure/runtime assumptions, read: docs/infrastructure.md (mandatory)

## Safe default prompt (copy/paste)
Moved to: `AI_CONTEXT.md` (section: "Safe Default Prompt (copy/paste)").

## “Small change” prompt template
Task:
<describe change>

Constraints:
- Touch only these files: <list>
- No refactors outside scope
- Keep minimal hydration
- For page creation/routing/metadata/structured data changes: read docs/seo-policy.md first

Process:
- Show diff
- Run npm test/build (or npm run build) if relevant
- Explain how to verify locally

## “Investigate” prompt template (no changes)
Investigate:
<problem>

Rules:
- Read files only
- No edits
- Provide diagnosis + the smallest fix proposal
- Wait before applying fix

## “Reviews system” kick-off prompt (M4)
We are implementing M4 Reviews system.
Requirements are in spec §9 and PROJECT_STATE.md.
Do this first:
- Propose the data model (Sanity schema) and routes needed.
- Keep SSR only for /reviews (recommended).
- Anti-spam: honeypot + rate limiting; Turnstile only if needed.
- Provide ONE step to begin (file path + exact change), then wait.

### API routes

Server endpoints are implemented in:

src/pages/api/

Example:
src/pages/api/review.ts

These endpoints run as serverless functions on Vercel.
