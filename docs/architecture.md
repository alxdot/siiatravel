
# Siiatravel — System Architecture

Last updated: 2026-03-07

This document describes the technical architecture of the Siiatravel website.
It exists to help developers and AI agents (Codex / ChatGPT) understand the system quickly.

---

# 1. Project Overview

Siiatravel is a lead‑generation travel website for Istanbul tours and services.

Main goals:
• Fast loading pages
• Strong SEO performance
• Reliable access for RU / BY users
• Simple content management via Sanity CMS
• Static-first architecture for stability and performance

No payments or user accounts exist on the site.
Primary goal is lead generation (WhatsApp, phone, contact form).

---

# 2. Technology Stack

Frontend
- Astro (static-first framework)
- TailwindCSS v4
- TypeScript (strict mode)

CMS
- Sanity Content Lake
- Sanity Studio located in `/studio`

Deployment
- GitHub repository
- Vercel hosting and CI/CD

Images
- Local images for critical content
- Sanity CDN for non-critical assets

Analytics
- Google Analytics
- Yandex Metrika

---

# 3. Deployment Architecture

Development flow:

Developer → GitHub → Vercel → Production

Process:

1. Code is written locally in VS Code.
2. Changes are committed to GitHub.
3. Vercel automatically deploys the project.
4. Astro builds static pages.

Build command:
npm run build

Preview command:
npm run preview

---

# 4. Content Architecture

Content is stored in Sanity CMS.

Sanity manages:
• Tours
• Reviews
• Blog articles (future)
• Images

Data is fetched using GROQ queries.

Example content flow:
Sanity → Astro build → Static pages

---

# 5. Routing Structure

Main routes:

/
/tours
/tours/[slug]
/reviews
/blog (future)

All routes follow no trailing slash policy.

Example:

Correct:
/tours
/tours/private-istanbul-tour

Incorrect:
/tours/

---

# 6. Performance Strategy

The site is optimized for high Lighthouse scores.

Targets:
Mobile Lighthouse ≥ 90

Key principles:

• Static HTML whenever possible
• Minimal client JavaScript
• Lazy loading images
• Local hosting of LCP images
• Avoid heavy frameworks

---

# 7. Image Strategy

Critical images (hero / LCP):

Stored locally in the repository and served by Astro.

Non-critical images:

Served via Sanity CDN.

Reasons:
• Reliability in RU / BY regions
• Faster LCP performance

---

# 8. Review System (M4)

Reviews will use the following flow:

User → Review form → Sanity → Moderation → Published

Fields:
- Name
- Rating
- Comment
- Tour reference
- Status (pending / approved / rejected)

Moderation occurs inside Sanity Studio.
Only approved reviews appear on the website.

## Review system architecture

The site includes a custom review system backed by Sanity CMS.

Submission pipeline:

User
↓
Review form (/reviews)
↓
POST /api/review (Astro server endpoint)
↓
Validation + spam protection (honeypot)
↓
Sanity CMS document created
↓
status = pending
↓
Manual moderation in Sanity Studio
↓
Approved reviews displayed on site

Files:

src/pages/api/review.ts
studio/schemaTypes/review.ts

## Review structured data (SEO)

Approved reviews should eventually generate Schema.org structured data.

Purpose:
Enable Google rich snippets (stars + review counts).

Implementation plan:

Tour pages should output JSON-LD using:

@type: TouristTrip
aggregateRating
review

Example:

{
 "@context": "https://schema.org",
 "@type": "TouristTrip",
 "name": "Private Istanbul Old City Tour",
 "aggregateRating": {
   "@type": "AggregateRating",
   "ratingValue": "4.9",
   "reviewCount": "37"
 }
}

Important:

Google only accepts review rich snippets when the review belongs to a specific service or product.

Therefore reviews should be associated with:

tour
yacht
transfer
guide

---

# 9. Conversion System

Primary conversion methods:

1. WhatsApp
2. Contact form
3. Phone call

Fallback order ensures the site works even if one service is blocked.

---

# 10. Security & Reliability

Security approach:

• No user authentication
• No payment systems
• Minimal attack surface

Spam protection for forms:
• Honeypot field
• Rate limiting
• Optional Cloudflare Turnstile

---

# 11. AI Development Workflow

The project uses AI-assisted development.

Roles:

ChatGPT
Architecture planning, debugging, design decisions

Codex in VS Code
Code implementation and file editing

Repository files used for AI context:

AI_CONTEXT.md
PROJECT_STATE.md
docs/master-spec.md
CODEX_PLAYBOOK.md
docs/architecture.md
docs/seo-policy.md
docs/infrastructure.md
docs/ai-brain.md (legacy)
AI.md (legacy)

---

# 12. Key Development Rules

AI agents must follow these rules:

• Work step-by-step
• Modify minimal files per task
• Avoid unnecessary refactors
• Preserve static-first architecture

If conflict occurs:
Master spec takes priority.

docs/master-spec.md

---

# 13. Future Expansion

Planned additions:

Blog / SEO articles
Review aggregation
Structured data improvements
More Sanity content types

---

# 14. Repository Structure

Key directories:

src/
Astro pages and components

studio/
Sanity Studio configuration

docs/
Project documentation

.codex/
Codex configuration

---

# 15. Frontend Component Architecture (Implemented)

The frontend now follows a reusable component system under `src/components/` with a clear primitive/block split.

Current structure:

`src/components/ui`
- `Container.astro` — shared width/gutter primitive for shell and content wrappers.
- `Button.astro` — reusable CTA primitive (anchor/button usage with variants).
- `SectionHeading.astro` — reusable heading stack (eyebrow, title, description).

`src/components/blocks`
- `CTASection.astro` — centered conversion section with heading + primary CTA.
- `ImageText.astro` — editorial two-column image/text section with optional CTA.
- `TourCard.astro` — reusable tour listing card.
- `TourGrid.astro` — responsive grid for `TourCard` items.
- `Breadcrumbs.astro` — reusable breadcrumb navigation.
- `TourHero.astro` — tour page hero with optional breadcrumbs, rating, intro, and image.

Shared shell alignment:

- `Header.astro` and `Footer.astro` use `Container` for consistent width/gutters.
- Header WhatsApp CTA uses the shared `Button` primitive.

Direction:

- Keep using Astro + Tailwind with static-first rendering.
- Build pages from reusable blocks and keep visual rules in primitives to prevent design drift.

---

End of architecture document.
