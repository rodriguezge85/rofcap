# ADR-0003: Self-host fonts instead of Google Fonts

- Status: Proposed (needs owner approval; deviates from the design system's wording)
- Date: 2026-10-23

## Context

The design system loads Raleway (and IBM Plex Mono for numerals) from Google Fonts. Loading from a third party adds a cross-origin request, can delay text rendering, and sends visitor IP addresses to a third party, which matters for a privacy-conscious institutional site with no other third-party requests.

## Decision

Self-host the same families and weights as subsetted WOFF2 files (Raleway 400/500/600/700/800 and italic 600/700; IBM Plex Mono 500/600), preload the critical two, and use `font-display: swap`. Visual output is unchanged.

## Consequences

- Positive: no third-party request, tighter CSP, faster and more predictable rendering, no GDPR-style disclosure for fonts.
- Negative: we maintain the font files; both families are open-licence (SIL OFL) so redistribution is permitted. Confirm licence files are included in the repo.

## Alternatives considered

- Google Fonts as specified: simplest, but loses the benefits above.
- A system font stack: violates the brand rule of no other faces.
