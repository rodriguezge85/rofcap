# ADR-0001: Static site with Astro

- Status: Proposed
- Date: 2026-10-23

## Context

The site is a content-light brochure with a small publishing surface (OBSIDIAN) and no accounts or database. It must be fast, accessible, easy for non-engineers to edit as text, and trivial to host and roll back.

## Decision

Build with Astro in static-output mode and TypeScript. Host on a global static CDN (Cloudflare Pages recommended; Netlify or Vercel acceptable). Use Markdown/MDX content collections for OBSIDIAN. Add serverless functions only where a server is required (ADR-0004).

## Consequences

- Positive: near-zero JavaScript, strong Core Web Vitals, built-in image optimisation and content schemas, preview deployments per PR, instant rollback.
- Positive: component structure mirrors the design system.
- Negative: no visual editor; copy changes go through Git. Acceptable for v1; a headless CMS can be added later without changing the output model.
- Negative: adds a Node toolchain to maintain.

## Alternatives considered

- Next.js: more capability than needed; larger runtime and hosting coupling.
- Eleventy: viable, less out-of-the-box image and content-schema support.
- Hand-written HTML/CSS: simplest for Phase 1, no scalable path for OBSIDIAN.
- Stay on Squarespace: cannot implement the design system exactly or keep content in version control.
