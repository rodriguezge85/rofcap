# Deployment and Operations

Status: Draft v0.1. Host-specific steps assume Cloudflare Pages (recommended in ADR-0001); equivalents exist on Netlify and Vercel.

## 1. Environments

| Environment | Trigger | URL | Purpose |
| --- | --- | --- | --- |
| Local | `npm run dev` | http://localhost:4321 | Development |
| Preview | Every pull request | Unique per-PR URL from the host | Review and QA before merge |
| Production | Merge to `main` | https://www.rofcap.com | Live site |

Preview deployments must be `noindex` (host setting or an `X-Robots-Tag` header) so staging copies never appear in search.

## 2. Release flow

1. Branch from `main`, commit with Conventional Commits, open a PR.
2. CI runs lint, typecheck, build, unit, accessibility, end-to-end, Lighthouse and link checks.
3. Reviewer checks the preview URL against the [acceptance checklist](TEST_PLAN.md#7-release-acceptance-checklist).
4. Merge (squash). The host builds and promotes to production automatically.
5. For a release: update `CHANGELOG.md`, tag `vX.Y.Z`, publish a GitHub Release.

Versioning: `0.x` until cutover; `v1.0.0` is the DNS cutover release; minor for new phases (OBSIDIAN, inquiry form); patch for fixes and copy changes.

## 3. DNS cutover from Squarespace (one-time)

Prerequisites: PRD questions Q2 (legal wording) and Q4 (DNS ownership) closed; Phase 1 passes QA on preview.

1. Lower the TTL on the existing `A`/`CNAME` records to 300 seconds at least 24 hours ahead.
2. Record the current DNS zone (screenshot or export) and the Squarespace domain settings.
3. Add `www.rofcap.com` and `rofcap.com` as custom domains in the new host; wait for certificates to issue.
4. Verify production on the host's default domain one last time.
5. Switch the `www` record to the new host; set the apex to redirect to `www` (or the reverse, matching the canonical).
6. Verify: HTTPS padlock, redirect chain (single hop), canonical tag, `robots.txt`, `sitemap.xml`, Open Graph preview.
7. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
8. Keep the Squarespace site unpublished-but-intact for 30 days as a rollback path; cancel only after the window.

Email: if the domain already receives mail, do not touch `MX`, `SPF`, `DKIM` or `DMARC` records during cutover. Phase 3 adds a sending domain verification (DKIM/SPF) for the transactional email provider; review existing SPF before editing.

## 4. Rollback

| Situation | Action | Time |
| --- | --- | --- |
| Bad deploy after cutover | Promote the previous successful deployment in the host dashboard, then revert the commit on `main` | Minutes |
| Serious post-cutover issue | Re-point `www` to Squarespace (record saved in step 2); TTL of 300 s limits propagation | ≤ 15 min |
| Function misbehaving (Phase 3) | Disable the form via the feature flag `INQUIRY_ENABLED=false`; the page shows the fallback contact route | Minutes |

## 5. CI configuration

The starter workflow is `.github/workflows/ci.yml`. It guards each step with a check that `package.json` exists, so it is safe to commit before the scaffold. Extend it as the scaffold lands: Playwright, axe, Lighthouse CI and lychee.

Required status checks on `main`: `build`, and as they are added, `a11y`, `e2e`, `lighthouse`, `links`.

## 6. Secrets and configuration

| Name | Phase | Where | Notes |
| --- | --- | --- | --- |
| `EMAIL_API_KEY` | 3 | Host secret store | Transactional email provider |
| `TURNSTILE_SECRET` | 3 | Host secret store | Server-side verification |
| `TURNSTILE_SITE_KEY` | 3 | Host env (public) | Client widget |
| `INQUIRY_TO`, `INQUIRY_FROM` | 3 | Host env | Recipient and verified sender |
| `INQUIRY_ENABLED` | 3 | Host env | Kill switch |

Never commit secrets. `.env.example` lists names only; real values are never pasted into issues, PRs or chat.

## 7. Monitoring and runbook

| Check | Tool | Alert to |
| --- | --- | --- |
| Uptime of `https://www.rofcap.com/` | Host or external monitor | Shared ROFCAP mailbox |
| Certificate expiry | Host-managed (auto-renew) | Same |
| Deploy failures | GitHub Actions / host notifications | Repo owner |
| Function errors, email bounces (Phase 3) | Host logs, provider dashboard | Same |

Runbook items to write in Phase 4: expired domain, certificate failure, form spam surge, accidental content publish, DNS hijack suspicion.

## 8. Access control

- GitHub: two owners at minimum; branch protection on `main`; 2FA mandatory; secret scanning and push protection enabled.
- Host and DNS: individual accounts with 2FA, no shared logins; document the registrar owner (PRD Q4).
- Offboarding: remove access from GitHub, host, DNS and email provider the same day.
