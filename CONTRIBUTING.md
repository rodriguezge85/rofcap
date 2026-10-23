# Contributing

## Principles

- `main` is always deployable.
- The ROFCAP design system is the source of truth for look and voice. Do not introduce colours, fonts, shadows or patterns it does not define; propose a design-system change first.
- Copy is legal-sensitive. Change wording in [docs/CONTENT.md](docs/CONTENT.md) and `src/content/site.ts` only with the firm's approval; disclaimer wording needs counsel's.

## Workflow

1. Create a branch from `main`: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `chore/<topic>`.
2. Make small, focused commits using [Conventional Commits](https://www.conventionalcommits.org/):
   `feat: add Masthead component`, `fix: correct footer mark opacity`, `docs: update PRD open questions`, `chore(deps): bump astro`.
3. Run `npm run check` locally.
4. Open a pull request using the template. Link the PRD requirement ID (e.g. `FR-4`) it implements.
5. Wait for green checks and one review. Review the preview deployment, not just the diff.
6. Squash-merge. Delete the branch.

## Definition of done

- [ ] Matches the design system (tokens only, lava once per view, no new patterns)
- [ ] Accessible: keyboard operable, contrast verified, axe clean
- [ ] Responsive from 320 px to 1920 px
- [ ] Tests added or updated; CI green
- [ ] Docs updated (PRD/ARCHITECTURE/CONTENT as relevant); `CHANGELOG.md` entry for user-visible changes
- [ ] No secrets, personal data or unapproved third-party requests added

## Releases

Semantic versioning. Update `CHANGELOG.md` (Keep a Changelog format), tag `vX.Y.Z` on `main`, publish a GitHub Release. `v1.0.0` is the DNS cutover.

## Code style

TypeScript strict; Prettier and ESLint configs live in the repo and run in CI. CSS uses design-token custom properties only. Component and class names follow the design system (`.masthead`, `.card`, `.accent`, and so on).

## Security

Report vulnerabilities privately; see [SECURITY.md](SECURITY.md). Never paste secrets into issues or PRs.
