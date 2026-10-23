# ADR-0002: Design tokens as the single source of truth

- Status: Proposed
- Date: 2026-10-23

## Context

The ROFCAP design system publishes its values in `tokens.json` (colour, type, spacing, radius, shadow, rules) with usage notes and contrast ratios. The site must match it exactly and stay in sync as it evolves.

## Decision

Copy the design system's `tokens.json` verbatim to `design/tokens.json`. Generate `src/styles/tokens.css` from it with a build script; never hand-edit the CSS. Add a contrast check that asserts the documented pairs. Component CSS references tokens only, never raw hex values.

## Consequences

- Positive: one place to update; token drift is caught in CI; brand rules (e.g. contrast ratios) become tests.
- Negative: a small script to build and maintain; a manual re-sync step when the design system changes (documented in DESIGN_SYSTEM.md §9).

## Alternatives considered

- Hand-written CSS variables: fast but drifts silently.
- Style Dictionary or similar: heavier than needed for one theme.
