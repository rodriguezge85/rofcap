# Content Inventory and Copy Deck

Captured from https://www.rofcap.com/ on 23 Oct 2026 (the live site is a Squarespace build). Content belongs to Ring of Fire Capital Ventures Limited. Any edit to this copy for the rebuild needs the firm's approval; compliance wording needs counsel's.

## 1. Live site structure

| Element | Observation |
| --- | --- |
| Pages | One page (`/`). A `/cart` link exists as a Squarespace default and is **not** carried over. |
| Navigation | A single "Home" link. |
| Header | Two logo images linking home: the mark JPG and a second image (a 2025 screenshot of the lockup). The rebuild uses the design-system lockup instead (mark + wordmark set in type). |
| Hero | Full-width volcanic photograph, headline and sub-headline. |
| Body | Five paragraphs describing the firm. |
| Contact | LinkedIn link, legal entity, Hong Kong address. |
| Footer | "Not a Solicitation" with a second LinkedIn link. |
| Metadata | Title "Ring of Fire Capital Ventures"; meta description **empty**; canonical `https://www.rofcap.com`; Open Graph and Twitter card (summary) using the logo JPG. |
| Forms, scripts | None visible. No email address on the page. |

## 2. Copy deck (Phase 1)

### Hero

- H1: **Seizing Seismic Opportunities**
- Sub-headline: **Connecting Capital, Operators and Ideas across Asia Pacific & the Americas**

### Firm statement (emphasis in bold as on the live site)

1. **Ring of Fire Capital Ventures (ROFCAP)** is an investment firm and venture platform focused on capitalizing on tectonic megatrends across the **Ring of Fire region—spanning the dynamic economies of Asia-Pacific and the Americas.**
2. Inspired by the natural forces that shape this region—from **shifting tectonic plates to volcanic creation and renewal**—ROFCAP fuses **capital markets discipline with the adaptability of nature** to identify and scale transformative businesses.
3. We advise, invest directly, structure strategic deals, and partner with entrepreneurs and investors to build enduring value in sectors undergoing rapid evolution—from technology infrastructure and AI to financial innovation, wellness, and regional enterprise transformation.
4. Just as the **Ring of Fire** continuously reshapes the physical landscape, **ROFCAP positions itself at the intersection of volatility and opportunity**—seizing the moment when pressure gives rise to breakthrough.

The live page has four body paragraphs below the sub-headline. Re-check against the live page when implementing, since the page may change before cutover.

### Contact

- LinkedIn: https://www.linkedin.com/company/rofcap/
- Ring of Fire Capital Ventures Limited
- 22nd Floor, Tai Yau Building, 181 Johnston Road, Wan Chai, Hong Kong SAR

### Footer

- "Not a Solicitation" (title case, reserved for the website footer per the design system)
- LinkedIn link

## 3. Copy edits to consider (not applied; need approval)

| # | Observation | Suggestion |
| --- | --- | --- |
| C1 | Live site spells "capitalizing" (US) while the design system's own copy uses British "colour". | Pick one spelling convention for the site and the brand book. |
| C2 | The live address block abbreviates "Johnston Rd". | Use "Johnston Road" in running text. |
| C3 | Meta description is empty. | Proposed (≤ 155 chars): "Ring of Fire Capital Ventures (ROFCAP) is an investment firm and venture platform connecting capital, operators and ideas across Asia-Pacific and the Americas." |
| C4 | No contact route other than LinkedIn. | Decide on an email address or the Phase 3 form (PRD Q3). |

## 4. Page metadata for the rebuild

| Field | Value |
| --- | --- |
| `<title>` | Ring of Fire Capital Ventures |
| Canonical | https://www.rofcap.com/ |
| `og:site_name` | Ring of Fire Capital Ventures |
| `og:type` | website |
| JSON-LD | `Organization`: name, legalName, url, logo, address (Wan Chai, Hong Kong SAR), `sameAs` LinkedIn |

## 5. Phase 2 content: OBSIDIAN

- Channel name: **OBSIDIAN**, always capitals. Tagline: *Sharp insights, hard conviction.* Byline: *An insights channel from Ring of Fire Capital Ventures.*
- Not research, never branded as research. Each article closes with the standard disclaimer and: *OBSIDIAN is commentary, not investment research or advice.*
- Argue, don't hedge: thesis in the first sentence, evidence in the body, stated conviction at the end. No portfolio names or deal specifics.
