# QA and Test Plan

Status: Draft v0.1. Covers Phase 1 in full; Phases 2–3 add the sections marked.

## 1. Strategy

Automate everything that can fail silently (contrast, links, performance, accessibility rules, regressions in layout); use manual passes for judgement (brand fidelity, copy, keyboard flow, screen reader). Every pull request gets a preview URL and runs the automated suite.

| Layer | Tool | What it proves |
| --- | --- | --- |
| Static checks | ESLint, Prettier, `tsc`, `astro check` | Code quality, types |
| Token contrast | `npm run check:contrast` | Documented colour pairs meet their stated ratios |
| Unit | Vitest | Content schema, helpers, form validation (Phase 3) |
| Accessibility | axe-core via Playwright | No critical/serious rule violations on every page |
| End-to-end | Playwright (Chromium, Firefox, WebKit) | Page renders, links work, form flow (Phase 3) |
| Visual regression | Playwright screenshots at 3 widths | No unintended layout change |
| Performance and SEO | Lighthouse CI (mobile profile) | Scores and Core Web Vitals budgets |
| Links | lychee | No dead internal or external links |
| Security headers | Scripted header assertions, securityheaders-style check | CSP, HSTS and friends present |
| Dependencies | `npm audit`, Dependabot | No known high/critical issues |

## 2. Test environments and matrix

| Dimension | Coverage |
| --- | --- |
| Browsers | Chrome, Edge, Firefox, Safari (macOS), Safari (iOS), Chrome (Android), Samsung Internet; latest two versions |
| Viewports | 320, 375, 768, 1024, 1280, 1920 px |
| Input | Mouse, touch, keyboard only |
| Assistive tech | VoiceOver (macOS/iOS) and NVDA (Windows), one pass per release |
| Preferences | Light/dark OS setting (site is light-only by design; confirm no breakage), `prefers-reduced-motion`, 200% zoom, forced colours |
| Network | Throttled 4G profile for performance |

## 3. Phase 1 test cases

| ID | Area | Case | Expected |
| --- | --- | --- | --- |
| T-01 | Content | Hero headline and sub-headline match [CONTENT.md](CONTENT.md) | Exact text |
| T-02 | Content | Firm statement paragraphs match, emphasis preserved | Exact text and bold runs |
| T-03 | Content | Address and legal entity match | Exact text |
| T-04 | Links | LinkedIn links open `linkedin.com/company/rofcap` in a new tab with `rel="noopener noreferrer"` | Pass |
| T-05 | Brand | Lava appears once per view; no lava body text | Visual and CSS audit pass |
| T-06 | Brand | Only Raleway and IBM Plex Mono load; no Google Fonts request | Network panel clean |
| T-07 | Brand | Mark: never recoloured or cropped; appears in header (48 px) and footer (38 px, 92%) | Visual pass |
| T-08 | Brand | Photograph only in hero background, translucent over black, text ≥ 4.5:1 | Contrast measured on the busiest region |
| T-09 | A11y | One `h1`, logical heading order, landmarks present (`header`, `main`, `footer`) | axe + manual |
| T-10 | A11y | Skip link works; focus visible on every interactive element | Manual keyboard pass |
| T-11 | A11y | Text contrast ≥ 4.5:1 on its ground (3:1 for ≥ 24 px text) | axe + token check |
| T-12 | A11y | Images have appropriate alt text; decorative images empty alt | Manual |
| T-13 | Responsive | No horizontal scroll at 320 px; grids collapse below 860 px | Playwright at widths |
| T-14 | Performance | LCP ≤ 2.5 s, CLS ≤ 0.1, page weight within budget | Lighthouse CI |
| T-15 | SEO | Title, meta description, canonical, OG/Twitter tags, JSON-LD validate | Rich-results and OG debuggers |
| T-16 | SEO | `robots.txt` and `sitemap.xml` reachable; previews return `noindex` | curl check |
| T-17 | Security | HTTPS enforced; HSTS, CSP, nosniff, referrer policy present | Header assertions |
| T-18 | Routing | Apex ↔ `www` redirect is a single 301; `/cart` and unknown paths return the branded 404 | curl check |
| T-19 | Print | Print preview is a clean single page (if FR-10 built) | Manual |
| T-20 | Resilience | Page is readable with JavaScript disabled and with images blocked | Manual |

## 4. Phase 2 additions (OBSIDIAN)

| ID | Case | Expected |
| --- | --- | --- |
| T-30 | Front-matter schema rejects missing or invalid fields at build | Build fails with a clear message |
| T-31 | Draft articles are excluded from index, sitemap and feed in production | Pass |
| T-32 | Header photograph is one of the approved frames; black band with lava rule | Visual pass |
| T-33 | Every article ends with the standard disclaimer and the OBSIDIAN commentary line | Automated text assertion |
| T-34 | Feed validates | W3C feed validator |

## 5. Phase 3 additions (inquiry form)

| ID | Case | Expected |
| --- | --- | --- |
| T-40 | Valid submission delivers one email to `INQUIRY_TO` | Received with correct fields |
| T-41 | Missing/invalid fields return field-level errors, announced to screen readers | Pass |
| T-42 | Missing or invalid bot token is rejected server-side | 4xx, nothing sent |
| T-43 | Rate limit triggers after repeated requests from one IP | 429 |
| T-44 | Oversized or non-JSON body rejected | 413/415 |
| T-45 | Message bodies and personal data absent from logs | Log review |
| T-46 | Kill switch `INQUIRY_ENABLED=false` shows the fallback contact route | Pass |
| T-47 | Header injection attempts in name/email fields are neutralised | Pass |

## 6. Defect handling

| Severity | Definition | Rule |
| --- | --- | --- |
| S1 | Wrong legal text, broken brand rule on the home page, outage, data exposure | Blocks release; fix immediately |
| S2 | Accessibility failure, broken link, budget miss | Blocks release unless owner signs a waiver |
| S3 | Cosmetic or edge-browser issue | Schedule |

## 7. Release acceptance checklist

- [ ] All automated checks green on the release commit
- [ ] T-01 to T-20 pass on the preview URL
- [ ] Screen reader pass (VoiceOver and NVDA) recorded
- [ ] Legal text approved in writing (PRD Q2)
- [ ] Lighthouse mobile ≥ 95 in all four categories
- [ ] Redirects, certificates, `robots.txt`, `sitemap.xml` verified on production hostnames
- [ ] Rollback path confirmed (previous deployment available; Squarespace untouched)
- [ ] `CHANGELOG.md` updated and tag created
