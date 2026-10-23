# Security Policy

## Reporting a vulnerability

Please do not open a public issue. Use GitHub's private vulnerability reporting for this repository (Security tab → Report a vulnerability), or email the maintainers at the address in the repository profile. Include steps to reproduce and the affected URL or commit.

We aim to acknowledge reports within 3 business days and to give a remediation plan within 10.

## Scope

The public website and its build pipeline. Out of scope: social engineering, denial of service by volume, and third-party platforms (hosting, DNS, email provider) except for our configuration of them.

## Practices

- No secrets in Git; secret scanning and push protection enabled.
- Dependabot for npm packages and GitHub Actions; `npm audit` in CI.
- `main` protected; changes by reviewed pull request; 2FA required for all collaborators.
- Security headers and CSP defined in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#9-security).
