# Mantiva360 five-question preview review

Review date: 17 September 2026

Implementation base: `a196500507e29636e1f4bb5b58bd970ebc16c200` (`main`)

Review branch: `review/five-buyer-questions`

Preview: `https://mantiva360-marketing--pr11-review-five-buyer-qu-l47apyzs.web.app/`

Production was not changed. The preview is marked `noindex` in both the document and the deployed response headers.

## Acceptance evidence

| Area | Result | Evidence | Remaining limitation |
|---|---|---|---|
| Five buyer questions | Pass | The homepage answers Why change, Why not existing tools, Why Mantiva360, Why trust it and Why act now. Each answer includes a demonstration and a next action. | Representative-buyer comprehension has not been tested. |
| Hero and product proof | Pass | The hero uses the published 360 Cockpit capture. Attention, Cause, Action and Impact use the specified same-origin WebP assets with intrinsic dimensions and mobile sources. All seven deployed images returned HTTP 200 with `image/webp`. | Capture date, product version and a fresh owner sign-off are not recorded. |
| Tabs and keyboard | Pass | Mouse selection worked. End selected Impact, Home returned to Attention, Right/Down advanced and Left reversed. The four-tab implementation preserves ARIA relationships and focus. | Screen-reader and physical touch-device sessions remain open. |
| Video privacy and lifecycle | Pass with accessibility blocker | Initial iframe count was zero. Opening the dialog did not create an iframe. Play created one `youtube-nocookie.com` iframe; Escape and the close button removed it and restored focus. | YouTube reported no transcript for `XMQa-RB5fUU`; accurate captions/transcript and full content review are not verified. |
| Deep links and assets | Pass | `/product`, `/sap-delivery`, `/resources`, `/privacy`, the checklist and all configured homepage captures returned HTTP 200 at the preview origin. The four HTML routes were also opened in the supervised browser. | An ordinary desktop/mobile browser save of the checklist is still required; the endpoint and download filename were verified, but the supervised browser blocked direct text-file navigation. |
| Application route | Blocked | Every Get started link remains centrally configured to `https://mantiva360.app/`. | The signed-out destination returned `502 Bad Gateway` in both the supervised browser and a direct request from this review environment. |
| Conversion honesty | Pass for the current preview | No form, tracking or false success state is present. Booking-style calls to action were removed; visitors can inspect the walkthrough, open the video or download the checklist. | No verified guided-review contact or protected enquiry service exists. A booking CTA must not be added until delivery to an approved owner is proven. |
| Strict CSP and security headers | Pass | The hosted preview returned the existing CSP with self-hosted script/style/image rules and only `youtube-nocookie.com` for frames. It also returned HSTS, `nosniff`, `DENY`, a restrictive Permissions Policy and `X-Robots-Tag: noindex`. | Recheck the production origin immediately before any approved launch. |
| Responsive layout | Partial | The supplied concept QA passed 1440, 1024, 768, 390 and 320 pixel Chromium checks with no horizontal overflow. The integrated hosted preview had `scrollWidth === clientWidth` at the available 1363-pixel browser viewport. | Hosted checks at every target width, 200% zoom/reflow, Safari and physical iOS/Android remain open. |

## Automated and deployment checks

- `npm test`: 15 passed, 0 failed.
- `npm run validate`: 33 public files and 6 HTML pages validated; homepage main copy counted at 1,346 words.
- `node --check` passed for `five-whys.js`, `site-config.js` and the retained shared JavaScript.
- `git diff --check` reported no whitespace errors.
- Local HTTP smoke checks returned 200 for `/`, `/product`, `/sap-delivery`, `/resources`, `/privacy`, the checklist and a representative product capture; the unknown-route check returned 404.
- GitHub Actions quality run `35280673032` completed successfully.
- Firebase preview run `35280673036` completed successfully.
- The preview channel expires on 1 October 2026 at 22:10:57 GMT.

## Assertions deliberately not promoted

- No native connectors, automated gates, universal import support or automatic data quality are claimed.
- SAP Activate language is phase context only; it does not imply SAP endorsement, partnership, certification or native integration.
- Progress recognition is described as following the configured control method. Effort, evidence, expenditure and earned progress remain separate concepts.
- No security certification, data residency, SSO, scale, ROI, customer count, patent or ownership claim was added.
- Product calculation, import formats, operating ownership and update cadence still require evaluation against the visitor's actual process.

## Remaining launch blockers

1. Restore and verify `https://mantiva360.app/` signed-out behavior, demonstration-data isolation, reset expectations and mobile access.
2. Supply accurate captions or a verified transcript and material visual descriptions for the overview, then review the complete footage, narration, identity and end card.
3. Complete hosted 320, 390, 768, 1024 and 1440 pixel checks, 200% reflow, Safari, physical-device, screen-reader, slow-network and error-state testing.
4. Confirm a normal desktop and mobile checklist save using the intended filename.
5. Record capture provenance with product version/date and obtain current product-owner approval for the visible screens and explanatory claims.
6. If guided review is to be offered, implement and owner-test an approved contact route or protected endpoint before publishing any booking language.
7. Remove review `noindex`, confirm canonical metadata and update the sitemap only after explicit production approval.

## Recommendation

Keep the branch on the preview channel. Do not publish it to the production Hosting channel until the application and video-accessibility blockers are resolved and the remaining device, download and provenance checks have accepted evidence and owners.
