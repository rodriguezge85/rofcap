# ADR-0004: Serverless endpoint for the inquiry form

- Status: Proposed (Phase 3)
- Date: 2026-10-23

## Context

A contact route beyond LinkedIn is likely needed (PRD Q3). The site is otherwise static, so the only server-side requirement is receiving a form post and sending an email, with abuse protection, and without storing personal data.

## Decision

Implement one serverless function (`/api/inquiry`) on the same host as the site. It validates input with a shared schema, verifies a bot-protection token, rate limits, sends via a transactional email provider, and logs delivery status only. No database. A kill-switch environment variable disables the form and reveals a fallback contact route.

## Consequences

- Positive: minimal attack surface, no server to patch, no data store to secure or disclose, same deploy pipeline as the site.
- Negative: adds two processors (email provider, bot-protection service) that must appear in the privacy notice; inquiries exist only in email, so there is no archive unless the mailbox provides one.

## Alternatives considered

- Third-party form SaaS: quick, but adds branding, another processor and less control over validation.
- `mailto:` link only: no spam protection issue, but poor experience and exposes the address to scrapers.
- Full backend with a database: unjustified for the volume and sensitivity.
