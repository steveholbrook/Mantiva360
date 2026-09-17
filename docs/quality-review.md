# Mantiva360 quality and readiness review

Review date: 17 September 2026

Implementation base: `c47ad1967f887830ee7f88247ee6320872951956`

Review branch: `review/product-led-design-mockups`

This branch is deployed only to an isolated Firebase preview channel. Scores are an internal prioritisation aid, not a certification. Release blockers override the total.

## Evidence-based quality gates

| Area | Score | Evidence | Limitation |
|---|---:|---|---|
| Comprehension | 22/25 | The 1,092-word homepage leads with a centered product proposition and four direct management questions: Attention, Cause, Action and Impact. Product and SAP detail remain available below and on dedicated routes. | No representative-user comprehension test was available. Do not mark unfamiliar-buyer comprehension as passed without actual feedback. |
| Product proof | 21/25 | Seven genuine, lossless desktop and mobile crops are recorded with provenance and exact coordinates. The product repository supports the published Cockpit, deterministic control, progress, actual-allocation, reporting, SAP-phase and read-only-assistance boundaries. | Approved captures do not cover every described capability. Capture date and product version metadata were not supplied. |
| Brand coherence | 18/20 | Approved Option 7 SVGs, exact palette tokens, a single sans-serif stack, restrained borders and one editorial panorama system are implemented. The 1,363-pixel Firebase render passed optical review. | Final mobile, Safari and platform-font review remain open. |
| Evaluation journey | 9/15 | Get started, Watch overview and guided review remain distinct. Every Get started action resolves to the separately configured Mantiva360 application. | The application destination and enquiry endpoint are not yet production-ready, and captions and transcripts are unapproved. |
| Technical quality | 11/15 | Semantic static HTML, four keyboard-operable ARIA tabs, native dialog focus restoration, reduced-motion support, clean routes, security headers, responsive sources, intrinsic dimensions and privacy-safe event hooks are implemented. Twelve automated tests pass. | Screen-reader, Safari, physical-device, slow-network and field Core Web Vitals tests remain open. |
| **Provisional total** | **81/100** | Strong selected implementation with disciplined claims and genuine product proof. | Below the 90/100 internal target and blocked from release. |

## Completed checks

- `npm test`: 12 tests passed, 0 failed.
- `npm run validate`: 24 public files and 6 HTML pages validated; homepage main copy counted at 1,092 words.
- `node --check`: shared JavaScript and configuration parsed successfully.
- `git diff --check`: no whitespace errors.
- Local HTTP smoke test: `/`, `/product`, `/sap-delivery`, `/resources` and `/privacy` returned 200; an unknown route returned the custom 404 response.
- All initial HTML is iframe-free. YouTube is created only after an explicit play action and removed when the dialog closes.
- The deployable directory contains no uncropped source screenshots or retired demonstration-company filenames.
- OCR, visual review and string inspection found no retired demonstration identity in the seven published product crops.
- Published captures are lossless WebP with intrinsic dimensions. CSS width caps prevent upscaling, and narrow layouts select art-directed detail crops.
- Key text contrast pairs range from 5.15:1 to 16.13:1. The focus outline ranges from 3.49:1 to 4.62:1 against tested light and navy surfaces.
- Interactive controls are designed around a 44-pixel minimum target, including navigation, question tabs, modal close and footer actions.
- The isolated Firebase preview rendered successfully at 1,363 by 936 pixels. Attention and Cause were visually checked, all four tabs switched to the correct panel, and ArrowRight moved focus and selection from Cause to Action.
- Rendered inspection found and corrected an inherited homepage navigation-state error that incorrectly marked an in-page anchor as the current page.
- Canonical URLs and sitemap routes match Firebase clean URLs with `trailingSlash: false`.
- Only privacy-safe event names are exposed. Name, email, organisation and free-text question values are not sent to analytics hooks.
- The public homepage at `https://mantiva360.com` returned HTTP 200 during source inspection. It does not contain this branch.
- The separate `https://mantiva360.app` destination returned HTTP 502 from this environment. This observation does not establish universal availability.

## Not completed

- The isolated Firebase preview was not published to the production Hosting channel.
- Rendered 320, 390 and 768 pixel checks are still required, along with 200 percent reflow.
- No representative-user comprehension test was conducted and no user feedback is reported.
- No Safari, physical iPhone, physical Android, screen-reader or 200% browser-zoom session was completed.
- No laboratory performance trace or representative 75th-percentile field Core Web Vitals data exists for this branch.
- No live enquiry submission was attempted because no approved endpoint exists.
- No successful signed-out demo session was observed.
- The three videos were not approved for public accessibility because verified captions, transcripts and material visual descriptions were not supplied.

## Release blockers

1. Connect and test an approved enquiry endpoint or provide a verified public business contact. Confirm server validation, abuse protection, persistence or delivery, owner notification, retention and deletion.
2. Restore and verify the separate demo journey, including signed-out behaviour, data isolation, reset expectations and mobile access.
3. Supply accurate captions, transcripts and material visual descriptions, then complete an end-to-end footage, narration, identity and end-card audit for each video.
4. Supply approved neutral high-resolution captures for uncovered capabilities, including capture date and product version metadata.
5. Complete rendered 320, 390, 768 and 1440 pixel checks, 200 percent reflow, Safari, physical-device, keyboard, screen-reader, slow-network and error-state testing.
6. Collect laboratory performance evidence before release, then field Core Web Vitals separately for mobile and desktop after sufficient production traffic exists.

## Release recommendation

Keep the branch in review. Do not deploy it to the production Hosting channel until blockers 1 to 3 are resolved and blockers 4 to 6 have accepted evidence and owners. Preserve the current production release identifier before any approved deployment so Firebase Hosting rollback remains available.
