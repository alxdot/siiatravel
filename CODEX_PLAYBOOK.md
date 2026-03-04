# Codex Playbook — Siiatravel (VS Code)

## Always start sessions with this checklist
1) Read: AI.md
2) Read: PROJECT_STATE.md
3) If a rule exists, follow master spec: docs/siiatravel_master_spec.md

## Safe default prompt (copy/paste)
You are Codex working in the Siiatravel repo.
Before doing anything:
- Read AI.md + PROJECT_STATE.md.
- Summarize constraints in 5 bullets.
- Propose a plan with ONE step.
- List exact files you will edit.
- Then wait.

## “Small change” prompt template
Task:
<describe change>

Constraints:
- Touch only these files: <list>
- No refactors outside scope
- Keep minimal hydration

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
