# Design System — Web Implementation Guide

Source: the "Ring of Fire Capital Ventures" design system artifact (59 files; last changed 22 Oct 2026, note: "eruption-night set as the lead image motif"). This guide restates the rules that matter for the website and records the decisions and gaps found while reading it. **The design system remains the source of truth**; if the two disagree, the design system wins and this file is corrected.

Principle: **Navy is structure, Lava is emphasis, Raleway is the voice.** No substitutions of colour, font or mark.

## 1. Colour tokens

| Token | Value | Role |
| --- | --- | --- |
| `navy` | #376092 | Structure: titles, section headings, links, KPI values |
| `navy-700` | #305680 | Link hover |
| `navy-900` | #21405F | Dark panels, sticky nav ground |
| `navy-dark-2` | #2B4A6E | Dark masthead gradient end |
| `navy-100` / `navy-50` | #DEE7F0 / #EFF3F8 | Tints |
| `lava` | #E2553C | Emphasis only, **once per view** |
| `lava-700` | #C44229 | Small lava text on `lava-50`/white |
| `lava-300` | #F0967F | Lava on dark grounds |
| `lava-50` | #FDF0EC | Callout ground |
| `obsidian` / `coal` / `cinder` / `charcoal` | #000000 / #111111 / #2E2E33 / #414850 | Dark grounds (headers, OBSIDIAN) |
| `bg` | #EDF1F0 | Page ground |
| `card` / `card-soft` | #FFFFFF / #F4F6F8 | Surfaces |
| `line` / `line-strong` | #D9DEE3 / #B0B4BB | Hairlines |
| `ink` | #3F3F46 | Body text |
| `strong` | #2E2E33 | Emphasised text |
| `muted` | #5A636E | Secondary text |
| `on-dark-body` / `on-dark-item` / `on-dark-nav` / `on-dark-muted` | #E6EDF4 / #DCE6F0 / #CBD7E6 / #BCCCDD | Text on navy-900 |
| `good` `warn` `info` `danger` (+ `-700`, `-bg`) | #2F9E6E, #B07A1E, #376092, #C0392B | Status, always with a word |
| `pur` | #4F6388 | Fourth chart series |

Full list with usage notes and contrast ratios is in the artifact's `project/tokens.json`; copy it verbatim to `design/tokens.json`.

## 2. Typography

- **Raleway** 400/500/600/700/800 and italic 600/700; **IBM Plex Mono** 500/600 for numerals only (`num`). No other faces.
- Scale (design-system names): `doc-title` 27/800 navy; `doc-subtitle` 17/600 italic lava; `section-heading` 15/800 uppercase navy, 2px tracking; `card-title` 18/700; `body` 17/1.6 `ink`; `note-text` 14 `muted`; `footer-text` 13/1.7 `muted`; `masthead-word` 24/800 with 3px tracking; `masthead-full` 13.
- Keep body line-height at 1.6; do not tighten for density.
- Casing: Title Case for titles, sentence case for body, UPPERCASE only where a style specifies it.

## 3. Space, shape, elevation

- Page width 1280 px (`measure-page`), 32 px gutter; sections open with 48 px above; page ends with 96 px.
- Radius: `radius` 10, `radius-lg` 14, pills 999, flags/bars 5. A card with a left rule squares its left corners.
- Shadows are navy-tinted only: `shadow-sm` at rest, `shadow` on hover. No grey/black shadows. No gradients except the dark masthead's navy-900 → navy-dark-2.
- Accent language is a **rule, not a fill**: 4 px lava rule on the title bar and the one featured card; 1 px `line` elsewhere.
- Grids collapse to one column below 860 px (KPIs 760 px; fork/detail rows 680 px).

## 4. Rules that are easy to break

1. Lava appears **once per view**: the accent rule, the italic byline, the number tick, one pill or one callout. Never a button fill, status colour or chart series.
2. Never set body or small text in `lava` (3.75:1 on white). Use `lava-700` on `lava-50`, or `lava-300` on dark grounds.
3. Photography is **background only**, one image per page, translucent over `obsidian`; never behind body text, tables or charts. No stock-business imagery.
4. The mark is never recoloured, outlined, cropped, flattened, or placed directly on a photograph; clear space = half its diameter; minimum 24 px.
5. The mark appears in the header **and** the footer.
6. Write "ROFCAP · rofcap.com" never; one shorthand per line. URL only in contact blocks and footers.
7. No emoji, exclamation marks or illustrations.

## 5. Component mapping (web)

See the table in [ARCHITECTURE.md §5](ARCHITECTURE.md#5-component-architecture). The design system's components are documents-and-dashboards oriented; for the public site only `Masthead`, `SectionHeader`, `Card`, `Footer`, `ObsidianHeader`, `Callout`, and (optionally) `StickyNav` are expected to be used.

## 6. Asset inventory

Group names and files as stored in the design system; export these into `public/` unchanged.

| Group | File | Use |
| --- | --- | --- |
| Logos | `rofcap-mark.png` (1363×1375, transparent) | Master mark, above 96 px, on `card`/`bg`/solid dark |
| Logos | `rofcap-mark-on-charcoal.jpg` | Favicons and social avatars (no transparency) |
| Logos | `rofcap-mark-96.png` | Masthead 48 px / footer 38 px on light grounds |
| Logos | `rofcap-mark-96-on-dark.png` | Dark and OBSIDIAN mastheads |
| Photography | `eruption-night.jpg` | Lead motif: hero, OBSIDIAN header, Open Graph base |
| Photography | `lava-river-aerial.jpg`, `lava-channel.jpg`, `lava-flow-cliff.jpg`, `lava-glass-red.jpg`, `eruption-dusk.jpg`, `lava-crust.jpg` | Secondary frames; rotate on OBSIDIAN pieces and dividers |
| Icons | `marker-navy.svg`, `plug-navy.svg`, `diploma-lava.svg` | Office monoline icons at 40–56 px (cards) / 20–24 px (inline); lava only for the single emphasised item |

Photography is stored at 1920 px long edge. Note: `rofcap-mark.png` is about 1.2 MB; the build must derive optimised sizes rather than ship it raw.

## 7. Voice and copy rules (summary)

Institutional, declarative, unhurried; first person plural; thesis first, then evidence; currency as *US$ 1.2bn*, percentages with one decimal, dates as *12 Jun 2026*. Vocabulary to reuse when copy is added: the **Volcanic Framework**, its seven stages (*Dormancy, Magma Accumulation, Pre-Eruptive Unrest, Eruption, Lava Flow, Cooling, Dormancy or Extinction*), the risk state **Caldera**.

## 8. Findings, gaps and proposed deviations

| # | Finding | Proposal |
| --- | --- | --- |
| D1 | Design system specifies Raleway "from Google Fonts". | Self-host the same files (ADR-0003). No visual change. Requires owner approval. |
| D2 | The system targets documents, decks and dashboards; it defines no website-specific layout (hero, section rhythm, contact block). | Compose the hero from the `ObsidianHeader` band language and the photography rules; compose sections from `SectionHeader` and `Card`. Log the composition in this file once built, and ask the design-system owner to ratify it. |
| D3 | `masthead-word` and the lockup are fixed (no navigation inside the masthead). | Keep navigation out of the masthead; use `StickyNav` only if sections ≥ 6. |
| D4 | `good-700` on `good-bg` is 4.42:1 (just under 4.5:1) and the lava subtitle is 3.75:1; both are acknowledged in the system. | Avoid `good` pills for small text on the site; lava only at display weight. |
| D5 | The system's footer disclaimer ("not licensed by the Hong Kong Securities and Futures Commission") differs from the live site's "Not a Solicitation". | Counsel decides the public wording (PRD Q2). |
| D6 | Live-site Open Graph image is a JPG logo; no social image designed in the system. | Derive a 1200×630 card from `eruption-night` plus the mark on a solid field, ratify with the owner. |

## 9. Keeping in sync

When the artifact changes, re-copy `tokens.json` into `design/tokens.json`, regenerate `tokens.css`, run `npm run check:contrast`, and record the change in [CHANGELOG.md](../CHANGELOG.md) under "Design".
