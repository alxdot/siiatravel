# SEO Policy

Note: This file contains the SEO Baseline policy content moved from `docs/master-spec.md` (spec §7). Wording below is preserved verbatim.

## 7) SEO Baseline Control System

### 7.1 Technical SEO (must-have)

- Clean canonical URLs
- **No trailing slash policy** (define + enforce)
- Sitemap generated (sitemap index + module sitemaps)
- robots.txt configured
- Redirect handling system
- Unique title + meta description per page
- Open Graph + Twitter cards
- Favicon
- Custom 404 page

### 7.2 URL canonicalization (implementation plan)

Locked policy:

- **No trailing slash, site-wide**

Implementation:

- Astro must consistently output non-slashed URLs.
- Vercel must enforce one canonical form via redirects:
  - `/<path>/` → `/<path>` (301)
- Internal links always use canonical form.
- QA: crawl site and verify no duplicate slashed URLs are indexable.

### 7.3 Structured data (safe, high-value)

Primary schemas:

- Organization
- LocalBusiness (Istanbul)
- BreadcrumbList
- FAQPage (only for real visible FAQs)

Experiences/services:

- Use `Service` where appropriate (keep it honest)

Reviews:

- Mark up only reviews that are real and visible on the page

### 7.4 Internal linking

No orphan pages.

Minimum rules:

- Each Tour page links to:
  - parent hub (/tours)
  - 3 related tours
  - 1–2 relevant blog articles (when blog exists)
- Each Yacht page links to:
  - hub (/yacht)
  - 3 related yacht options (or categories)
  - relevant crosslinks to tours/services
- Each Blog article links to:
  - at least 2 relevant commercial pages (tours/yacht/services)
- Hub pages link to all key children
- Natural anchors only

### 7.5 Anti-Cannibalization Rule (NEW)

Do NOT create multiple pages targeting the same core intent with minor keyword variation.

Select one canonical page per intent.
