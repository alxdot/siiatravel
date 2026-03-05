# Infrastructure Policy

Note: This file contains the Infrastructure Policy content moved from `docs/master-spec.md` (spec §4). Wording below is preserved verbatim.

## 4) Infrastructure Policy

### 4.1 Performance targets

Lighthouse ≥ 90 mobile
CLS < 0.1
LCP < 2.5s
INP < 200ms

Rules:

- Minimal hydration
- Image optimization (WebP / AVIF)
- Avoid unnecessary render-blocking resources

Critical UX must work without JS.

### 4.2 RU/BY geographic constraints (risk + mitigation plan)

Risk acknowledged:

- Vercel/Sanity edge/CDN IPs can be collateral-damaged by regional blocking.
- Sanity asset CDN issues could cause images not to load even if HTML loads.

Mandatory design outcome:

- If images/scripts fail, content and CTAs still function (numbers visible, email works).

Mitigation path (implement only if monitoring proves needed):

- Option A: Proxy Sanity images through own domain (edge function / reverse proxy)
- Option B: Pre-build LCP-critical assets (hero images) under your own controlled hosting path
- Option C: RU-friendly reverse proxy/CDN layer if required

### 4.3 Node policy

- Even-numbered Node LTS only
- No odd-numbered releases in production
- Pin Node version in repo and CI

### 4.4 Fonts policy (RU-safe, premium + fast)

Preferred strategy:

- Self-hosted **WOFF2** (variable if suitable) with **Cyrillic subset**
- Preload only critical font(s)
- `font-display: swap`
- Strong system fallback stack
- Keep fonts minimal: 1 family (2 max), 2 weights (e.g., 400 + 600)

Alternative:

- System fonts only (maximum resilience/performance)

### 4.5 Image pipeline (Sanity + frontend)

### Image dimension standards

To prevent oversized uploads and protect performance:

Hero / LCP images:

- Maximum width: 2400px
- Typical width: 1600–2000px
- Must include width + height attributes (or equivalent) to prevent CLS

Content images:

- Maximum width: 1600px

Thumbnails / cards:

- Maximum width: 800px

Rules:

- Do not upload raw 4000–6000px camera images.
- Compress before upload when possible.


- Sanity Image API can be used for convenience (`auto=format`), but do not rely on it blindly for LCP assets.
- Enforce strict aspect ratios in CMS to prevent CLS
- LCP-critical hero images:
  - compress + size carefully
  - always set width/height (or equivalent)
  - preload when appropriate
- Consider Astro image tooling for build-time optimization of critical assets (especially if RU/BY asset reliability becomes an issue)

### 4.6 LCP Local Asset Rule (NEW)

All hero/LCP-critical images:

- Pulled at build time.
- Processed via Astro Image.
- Served from same production domain.
- Must not depend on runtime Sanity CDN.

Purpose:
Protect conversion under RU/BY CDN instability.
