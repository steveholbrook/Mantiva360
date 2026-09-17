# Product panorama implementation summary

Review branch: `review/product-led-design-mockups`

Status: selected implementation candidate

## Implemented

- Rebuilt the homepage around the selected Option 01 product panorama, with a centered value proposition and a large genuine product screen directly below it.
- Added Option 03's question-led Attention, Cause, Action and Impact navigation as four keyboard-operable ARIA tabs.
- Added buyer-led Product, SAP delivery and Resources pages without changing the static Firebase Hosting architecture.
- Preserved the approved Option 7 brand assets, tagline and exact palette in a central CSS token system.
- Standardised genuine product evidence around the Focus Lens frame and removed the two identifying source screenshots from the deployable directory.
- Added three exact, lossless mobile detail crops and responsive `<picture>` selection so interface content remains legible on narrow screens.
- Implemented a four-view product panorama with exact desktop and mobile captures, a touch-scrollable narrow-screen tab rail and no automatic rotation. Planning & Forecasts is described on the Product page but is not presented as captured UI because approved media is missing.
- Added one homepage video invitation and a three-film Resources library with one-headline, one-action posters and click-to-load privacy-enhanced playback.
- Added the four-step corrective-action story: identify, inspect, make an authorised source correction and review the recalculated result.
- Separated deterministic controls from authorised read-only assistance and narrowed SAP, progress, actuals, reporting and integration statements to inspected evidence.
- Made Get started the primary site-wide action and kept every instance pointed at `https://mantiva360.app/`. Watch overview and the lower guided-review route remain separate. The unconnected enquiry form stays hidden and cannot display success.
- Added privacy-safe local measurement hooks for overview play, product exploration, demo click, review-request start and confirmed review-request success.
- Updated clean canonical routes, sitemap, 404 response, privacy content, security-header validation and repository tests.

## Verification records

- Source and architecture inventory: `docs/source-inventory.md`
- Product-media provenance: `docs/media-manifest.md`
- Broader asset register: `docs/asset-register.md`
- Claim evidence and publication status: `docs/content-and-claims-register.md`
- Tokens and components: `docs/design-system.md`
- Test evidence and internal quality score: `docs/quality-review.md`
- Release acceptance list: `docs/launch-checklist.md`
- Enquiry service decision: `docs/enquiry-service-decision.md`

## Current blockers

1. Approved enquiry endpoint or verified public business contact.
2. Configured and tested access to the separate Mantiva360 application.
3. Approved captions, transcripts, visual descriptions and full video audit.
4. Neutral approved captures and source metadata for uncovered capabilities.
5. Authorised remote preview for rendered screenshots, browser, device and accessibility testing.
6. Laboratory performance test followed by post-release field measurement.

## Deployment and rollback

Do not deploy this branch to the production Hosting channel without explicit approval. The manual Firebase workflow remains unchanged. Before any approved deployment, record the current production release identifier. Firebase Hosting release history provides the rollback path. Detailed review-channel, production and domain instructions remain in `README.md`.
