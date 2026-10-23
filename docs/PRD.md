# Product Requirements Document — ROFCAP Website

| | |
| --- | --- |
| Product | rofcap.com (rebuild) |
| Owner | Ring of Fire Capital Ventures Limited |
| Document status | Draft v0.1 — 23 Oct 2026 |
| Sources | Live site (fetched 23 Oct 2026); ROFCAP design system artifact (read 23 Oct 2026) |

Items marked **[ASSUMPTION]** were not stated in either source and need confirmation. See [Open questions](#10-open-questions).

## 1. Overview

ROFCAP is an investment firm and venture platform focused on megatrends across the Ring of Fire region (Asia-Pacific and the Americas). The website is its institutional front door: it states who the firm is, signals credibility, and gives a single route to contact the firm. It must read as institutional, declarative and unhurried, and it must not read as a solicitation.

## 2. Background and problem

- The live site is a one-page Squarespace build. It carries a stock Squarespace shopping-cart link, an unset meta description, and a mix of logo images used for header and social sharing.
- ROFCAP now has a full design system (colour, type, components, imagery rules, voice) that the current site does not implement.
- The firm intends to publish an insights channel (OBSIDIAN), which the current platform does not support in a way that matches the brand.

## 3. Goals and non-goals

### Goals

1. G1 — Express the brand faithfully: implement the design system without substitutions.
2. G2 — Preserve the existing message: headline, positioning, firm statement, address and LinkedIn link.
3. G3 — Be fast and accessible: Lighthouse ≥ 95 (Performance, Accessibility, Best Practices, SEO) on mobile; WCAG 2.2 AA.
4. G4 — Be maintainable: all content and code in Git; changes ship by pull request with automated checks.
5. G5 — Be extensible: add OBSIDIAN and an inquiry form without re-architecture.

### Non-goals

- E-commerce, accounts, payments, investor portals or any gated content. The Squarespace cart link is dropped.
- Offering, marketing or describing specific investment products, funds, returns or portfolio companies.
- A CMS with a visual editor in v1 (content is edited as files in Git).

## 4. Audience

| Persona | Need | Success looks like |
| --- | --- | --- |
| Prospective co-investor / LP | Quickly understand focus, geography and discipline | Reads the firm statement, finds contact route |
| Founder / operator | Know whether ROFCAP is a fit | Understands sectors, sends an inquiry |
| Advisor / counterparty | Verify the entity | Finds legal name, registered address, LinkedIn |
| Journalist / event organiser | Cite the firm correctly | Finds the correct name, positioning line, logo usage |

## 5. Scope by phase

| Phase | Name | Contents | Exit criterion |
| --- | --- | --- | --- |
| 0 | Documentation | This doc set | Reviewed and merged |
| 1 | Parity site | Single-page site at content and message parity with live site, on design system | Staging passes the [test plan](TEST_PLAN.md) |
| 2 | OBSIDIAN | Insights index and article pages, content in Markdown/MDX | First article published on staging |
| 3 | Inquiry | Contact form with spam protection and email delivery | Test submissions delivered; abuse controls verified |
| 4 | Hardening | Analytics decision, monitoring, uptime alerts, content governance | Runbook signed off |

DNS cutover from Squarespace happens at the end of Phase 1 (v1.0.0). Phases 2–3 ship as minor releases.

## 6. Functional requirements

### Phase 1 — Parity site

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-1 | Render a single page with: masthead/header, hero, firm statement, contact block, footer. | Must |
| FR-2 | Hero shows the headline "Seizing Seismic Opportunities" and the line "Connecting Capital, Operators and Ideas across Asia Pacific & the Americas" over the lead photograph (`eruption-night`), per imagery rules. | Must |
| FR-3 | Firm statement reproduces the four-paragraph description from the live site (see [CONTENT.md](CONTENT.md)), with approved emphasis. | Must |
| FR-4 | Contact block shows legal entity name, address (22nd Floor, Tai Yau Building, 181 Johnston Road, Wan Chai, Hong Kong SAR) and a LinkedIn link opening `linkedin.com/company/rofcap`. | Must |
| FR-5 | Footer carries the mark, legal entity, and the "Not a Solicitation" notice. | Must |
| FR-6 | Header carries the ROFCAP lockup (mark + wordmark set in type) and a Home link; anchor navigation is added only if sections justify it. | Must |
| FR-7 | Metadata: title, meta description, canonical, Open Graph and Twitter card, favicon set, `robots.txt`, `sitemap.xml`, JSON-LD `Organization`. | Must |
| FR-8 | Custom 404 page in brand style. | Should |
| FR-9 | Redirect `rofcap.com` → `www.rofcap.com` (or the reverse) with HTTPS enforced. | Must |
| FR-10 | Print stylesheet producing a clean one-page printout. | Could |

### Phase 2 — OBSIDIAN

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-20 | `/obsidian` index listing articles, newest first, with kicker, title, date and standfirst. | Must |
| FR-21 | Article template using `ObsidianHeader` (black band, optional translucent photograph, lava rule) and a light body. | Must |
| FR-22 | Articles authored as Markdown/MDX with front matter: `title`, `kicker`, `standfirst`, `date`, `image` (from the approved frame list), `draft`. | Must |
| FR-23 | Every article closes with the standard disclaimer plus "OBSIDIAN is commentary, not investment research or advice." | Must |
| FR-24 | RSS/Atom feed. | Should |
| FR-25 | Reading time, previous/next links. | Could |

### Phase 3 — Inquiry form

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-30 | Form fields: name, email, organisation, message, consent checkbox. | Must |
| FR-31 | Server-side validation, rate limiting and bot protection (CAPTCHA alternative such as Cloudflare Turnstile). **[ASSUMPTION]** | Must |
| FR-32 | Delivery to a monitored ROFCAP mailbox via a transactional email provider; no data stored beyond the delivery log, retention ≤ 30 days. **[ASSUMPTION]** | Must |
| FR-33 | Success and error states in brand style, accessible to screen readers. | Must |
| FR-34 | Privacy notice linked from the form stating purpose, processor and retention. | Must |

## 7. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Performance | LCP ≤ 2.5 s and CLS ≤ 0.1 on a mid-range phone over 4G; total page weight ≤ 500 KB excluding the hero image; hero image ≤ 250 KB (AVIF/WebP with JPEG fallback), responsive `srcset`. |
| Accessibility | WCAG 2.2 AA. Text contrast ≥ 4.5:1 on its ground (design-system tokens already meet this except where noted in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)); keyboard operable; visible focus; reduced-motion respected; text over photograph verified at 4.5:1. |
| Responsiveness | Fluid from 320 px to 1920 px; grids collapse to one column below 860 px per the design system. |
| Browser support | Last 2 versions of Chrome, Edge, Firefox, Safari (macOS/iOS), Samsung Internet. |
| SEO | Semantic HTML, one `h1`, descriptive meta, structured data, clean URLs, sitemap. |
| Security | HTTPS only, HSTS, CSP, no inline script without nonce/hash, no third-party scripts in Phase 1, dependency scanning. |
| Privacy | No cookies or analytics in Phase 1. Any analytics added later must be cookieless or consent-gated. |
| Reliability | ≥ 99.9% availability via static hosting on a global CDN; instant rollback. |
| Maintainability | Lint, typecheck and build gates in CI; tokens generated from one source file; conventional commits. |
| Internationalisation | English only. The structure must not preclude adding Traditional Chinese later. **[ASSUMPTION]** |

## 8. Content and legal requirements

- Voice: institutional, declarative, unhurried; first person plural; no exclamation marks, no emoji (design system).
- Legal name "Ring of Fire Capital Ventures Limited"; "ROFCAP" only after the full name has appeared, in the wordmark, and in file names.
- The site must not constitute an offer or solicitation. The live site's "Not a Solicitation" notice is preserved. The design system also defines a longer disclaimer that states ROFCAP is not licensed by the Hong Kong Securities and Futures Commission; **whether and where that sentence appears on the public site is a decision for the firm's legal counsel** (open question Q2). This document does not give legal advice.
- No portfolio names, deal specifics, performance claims or testimonials.

## 9. Success metrics

| Metric | Target | Measured by |
| --- | --- | --- |
| Lighthouse (mobile) | ≥ 95 in all four categories | CI Lighthouse run |
| Accessibility violations | 0 critical/serious | axe in CI + manual pass |
| Content parity | 100% of live copy and facts present or consciously dropped | Review against [CONTENT.md](CONTENT.md) |
| Deploy lead time | PR merged → live in < 5 min | Hosting logs |
| Inquiry delivery (Phase 3) | ≥ 99% of valid submissions delivered | Provider logs |

## 10. Open questions

| # | Question | Owner | Needed by |
| --- | --- | --- | --- |
| Q1 | Is the stack in [ADR-0001](adr/0001-static-site-with-astro.md) accepted, and which host (Cloudflare Pages, Netlify, Vercel)? | Repo owner | Phase 1 start |
| Q2 | Which disclaimer wording is approved for the public site? | Legal counsel | Phase 1 staging |
| Q3 | Is there a monitored public email address (design system cites `info@rofcap.com`; the live site shows none)? | Firm | Phase 1 / Phase 3 |
| Q4 | Who owns the domain registrar, DNS and the Squarespace account? | Firm | Cutover |
| Q5 | Does the site need pages beyond one (Team, Sectors, Approach, Privacy)? The design system documents the Volcanic Framework vocabulary but the live site does not use it. | Firm | Phase 1 scope freeze |
| Q6 | Is the OBSIDIAN channel confirmed for the website, and who writes and approves articles? | Firm | Phase 2 |
| Q7 | Are the logo and photography masters available as originals (the design system holds 1920 px frames and a 1363×1375 mark)? | Firm | Phase 1 |
| Q8 | Is self-hosting Raleway and IBM Plex Mono acceptable instead of Google Fonts? (Recommended: yes, see [ADR-0003](adr/0003-self-host-fonts.md).) | Repo owner | Phase 1 |
| Q9 | Analytics: none, cookieless (e.g. Plausible, Cloudflare Web Analytics), or consent-gated? | Firm | Phase 4 |
| Q10 | GitHub repository name, owner and visibility. | Repo owner | Before first push |

## 11. Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Compliance wording on a regulated-adjacent site | Legal exposure | Counsel sign-off (Q2); keep copy identical to approved text; no new claims |
| Design system is document-oriented (masthead, cards, tables, KPI tiles) and the site needs marketing sections | Inconsistent design | Compose only from documented components; record any new pattern as a design-system change request first |
| Lava text on white is 3.75:1 | Fails AA for small text | Use lava only for display-weight text and rules per the design system; never for body/small text |
| SEO regression at cutover | Traffic and trust loss | Preserve canonical URL, 301 any retired paths, submit sitemap, keep old site up until DNS flips |
| Asset provenance | Brand misuse | Use only files in the design-system asset groups; do not recolour or crop the mark |

## 12. Milestones (indicative)

| Milestone | Deliverable |
| --- | --- |
| M0 | Docs reviewed, repo pushed |
| M1 | Scaffold, tokens, base layout, CI green |
| M2 | Parity page on staging, test plan pass |
| M3 | Legal sign-off, DNS cutover, v1.0.0 |
| M4 | OBSIDIAN on staging |
| M5 | Inquiry form live |
