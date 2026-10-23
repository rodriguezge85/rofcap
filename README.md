# ROFCAP Website

Rebuild of [rofcap.com](https://www.rofcap.com/) — the public site of **Ring of Fire Capital Ventures Limited (ROFCAP)**, a Hong Kong-domiciled investment firm and venture platform — on a version-controlled, code-first stack, using the ROFCAP design system.

> **Status:** v0.3.0 built to the "rofcap.com — Site Directions" design (Home, About, OBSIDIAN index). Pending design-system assets, article pages and legal sign-off. `docs/CONTENT.md` describes the old live site and is superseded for copy by `src/content/`.

## Why this rebuild

The current site is a single-page Squarespace template (hero, firm statement, contact block, footer). The rebuild moves it to a Git-managed static site that:

- implements the ROFCAP design system exactly (Navy structure, one Lava accent, Raleway type);
- is fast, accessible (WCAG 2.2 AA) and SEO-ready;
- has room to grow into the **OBSIDIAN** insights channel and an inquiry form without a re-platform.

## Documentation map

| Document | Purpose |
| --- | --- |
| [docs/PRD.md](docs/PRD.md) | Product requirements: goals, scope, phases, functional and non-functional requirements, open questions |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical architecture: stack, repo layout, rendering, content model, token pipeline, security, CI/CD |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Web implementation of the ROFCAP design system: tokens, rules, component mapping, assets |
| [docs/CONTENT.md](docs/CONTENT.md) | Inventory of the live site and the copy deck for the rebuild |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Environments, release flow, DNS cutover from Squarespace, rollback |
| [docs/TEST_PLAN.md](docs/TEST_PLAN.md) | QA strategy, test matrix, acceptance checklist |
| [docs/adr/](docs/adr/) | Architecture Decision Records |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Branching, commits, PR process, definition of done |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
| [SECURITY.md](SECURITY.md) | How to report vulnerabilities |

## Proposed stack (pending sign-off, see ADR-0001)

Astro (static output) · TypeScript · plain CSS driven by design tokens · Cloudflare Pages (or Netlify/Vercel) · GitHub Actions · optional serverless function for the Phase 3 inquiry form.

## Quick start

```bash
git clone git@github.com:<your-github-username>/rofcap-website.git
cd rofcap-website
cp .env.example .env      # only needed from Phase 3
npm ci
npm run dev               # local dev server
npm run build             # production build to ./dist
npm run check             # contrast check + astro typecheck
npm test                  # content parity, a11y structure, SEO, headers (run build first)
npm run verify            # check + build + test
npm run og                # regenerate public/og-card.png
```

## Adding an OBSIDIAN article

Articles are Markdown files in `src/content/obsidian/` (schema in `src/content.config.ts`, validated at build).

| Field | Notes |
| --- | --- |
| `title`, `standfirst`, `series`, `order` | required; `series` is one of the five slugs in `src/content/obsidian.ts` |
| `status` | `announced` (listed, no page, default) · `placeholder` (page live, marked draft, noindex, not in sitemap) · `published` |
| `draft: true` | excluded from production builds entirely |
| `date`, `minutes`, `author`, `featured` | optional; `featured` is used once |

To publish: write the body, remove the draft banner, set `status: published` and add a `date`. Every article page closes with the standard disclaimer automatically.

## Target repository layout

```
rofcap-website/
├── .github/                 # CI workflow, PR template
├── design/                  # tokens.json (source of truth), brand notes
├── docs/                    # PRD, architecture, design system, content, test plan, ADRs
├── public/                  # static assets: logos, photography, icons, favicons
├── src/
│   ├── components/          # Astro components mapped to design-system components
│   ├── content/             # Phase 2: OBSIDIAN articles (MD/MDX)
│   ├── layouts/
│   ├── pages/
│   └── styles/              # tokens.css (generated), base.css, components.css
├── functions/               # Phase 3: serverless inquiry endpoint
├── tests/                   # unit, a11y, e2e
├── CHANGELOG.md
├── CONTRIBUTING.md
└── README.md
```

## Branching and releases (summary)

Trunk-based: `main` is always deployable; work happens on short-lived branches (`feat/…`, `fix/…`, `docs/…`) merged by pull request. Conventional Commits. Semantic versioning with tags (`v1.0.0` = DNS cutover). Details in [CONTRIBUTING.md](CONTRIBUTING.md).

## Ownership and licence

Site content, the ROFCAP name, the globe-and-volcano mark and photography are proprietary to Ring of Fire Capital Ventures Limited. A licence for the code is **not yet chosen**; until one is added, treat the repository as private and all rights reserved.
