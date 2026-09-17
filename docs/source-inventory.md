# Mantiva360 website source inventory

Reviewed 17 September 2026 for the Executive Confidence implementation.

## Repository and delivery boundary

| Item | Verified source | Review result |
|---|---|---|
| Marketing repository | `steveholbrook/Mantiva360` | Confirmed from the configured Git remote. |
| Implementation base | `main` at merge commit `c47ad1967f887830ee7f88247ee6320872951956` | PR #2 is present in the branch history. |
| Review branch | `review/world-class-executive-confidence-2026-09-17` | New branch created from current `origin/main`. |
| Hosting architecture | `firebase.json` and the manual GitHub workflow | Static files under `public/` are the Firebase Hosting payload. No replatforming is required. |
| Marketing destination | `https://mantiva360.com` | Returned HTTP 200 from this review environment. The deployed files differ from current `main`, so production is treated as the behavioural baseline only. |
| Demonstration destination | `https://mantiva360.app` | Preserved exactly. It returned HTTP 502 from this review environment. This does not prove universal unavailability, but anonymous access cannot be claimed. |
| Product application | `steveholbrook/ptracker3` | Read-only source inspection used to validate product boundaries. No product files, data, authentication, rules or calculations are changed by this branch. |

## Review-branch routes

| Route | Purpose | Review-branch status |
|---|---|---|
| `/` | Core buyer story and evaluation paths | Rebuilt. |
| `/product` | Buyer-led product and control explanation | Added. |
| `/sap-delivery` | SAP-specific delivery and toolchain context | Added. |
| `/resources` | Approved video library and evaluation resources | Added. |
| `/privacy` | Review-state privacy notice | Revised. |
| `/404.html` | Not-found response | Revised. |

Firebase is configured with clean URLs and `trailingSlash: false`; canonical URLs, internal navigation and the sitemap therefore use the extensionless forms above.

## Approved brand sources

- `public/assets/brand/mantiva360-full-light.svg`
- `public/assets/brand/mantiva360-full-dark.svg`
- `public/assets/brand/mantiva360-compact-light.svg`
- `public/assets/brand/mantiva360-compact-dark.svg`
- Wordmark: Mantiva360
- Tagline: Data to Progress.
- Direction: Executive Confidence with white-led surfaces, navy hierarchy and restrained blue, teal and green accents.

The SVG files are reused without redrawing or recolouring the segmented circular mark.

## Product evidence inspected

The product repository currently documents and implements the following boundaries used by the website:

- the 360 Cockpit projects current deterministic Project Health, Project Controls Reconciliation and strategy-aware metrics without adding a second calculation path;
- corrective actions retain ownership and audit context, while completing an action does not itself resolve an exception;
- Project Health and Controls Reconciliation are deterministic, reason-coded services; optional AI explanation is downstream and cannot change their result;
- Ask PTracker is read-only, project-authorised assistance and does not expose a mutation method;
- Actual allocation is governed by a deterministic allocation service, and actual effort or cost does not automatically create progress or earned value;
- the configured control strategy governs progress and reporting emphasis;
- SAP Activate phases and methodology settings are represented without implying SAP endorsement or native integration; and
- reporting drafts use canonical project-control results and require authorised review before publication.

These statements are narrower than a general claim that every module, integration or enterprise control is available in every deployment.

## Working integrations and configuration

| Integration | Current state | Publication boundary |
|---|---|---|
| YouTube playback | Three configured video IDs use `youtube-nocookie.com` and are loaded after user action. | Runtime was previously observed as approximately 31 seconds, 90 seconds and 30 seconds. Captions and transcripts remain unverified. |
| Demo link | Shared `siteConfig.demoUrl` points to `https://mantiva360.app/`. | Preserve the URL. Do not promise anonymous or uninterrupted access. |
| Guided-review enquiry | `siteConfig.enquiry.enabled` is false and no endpoint is configured. | Do not show a success state or transmit contact details until a verified service is supplied. |
| Analytics | No approved provider is configured. | Instrument only privacy-safe local event hooks. Do not transmit personal or free-text data. |
| Firebase production deployment | Manual workflow only. | Do not run without explicit approval. |

## Material blockers

1. A verified guided-review endpoint or approved alternative business contact is required before the primary commercial route can work publicly.
2. The demonstration destination must be restored and its signed-out, isolation, reset and mobile behaviour verified.
3. Accurate captions or verified transcripts and a complete footage, audio and end-card review are required for each published video.
4. New neutral, high-resolution product captures are still required for complete feature coverage. The current approved sources support only the Cockpit, a focused finding/recovery view and Delivery Plan.
5. The original screenshot sources contain a retired internal demonstration identity. This revision removes them from the deployable directory and publishes only exact crops that exclude it. The owner must archive the originals in an approved private location before any public-history cleanup.
6. Physical-device, Safari and deployed field-performance evidence remain outstanding.
