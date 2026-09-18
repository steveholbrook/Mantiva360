# Five buyer questions implementation summary

Branch: `review/five-buyer-questions`

Base: `a196500507e29636e1f4bb5b58bd970ebc16c200`

Status: review only; production is unchanged

## Implemented

- Merged the supplied `repository-overlay/public/` into the existing Firebase Hosting public directory without replacing the repository, routes, deployment configuration or image library.
- Rebuilt the homepage around five buyer questions: why change, why not keep the current tools, why Mantiva360, why trust it and why act now.
- Reused the approved Option 7 SVG asset and `Data to Progress.` line; no brand mark was redrawn.
- Replaced the prior three-tab promotional homepage with one genuine 360 Cockpit hero capture and four genuine Attention, Cause, Action and Impact product views.
- Added the supplied one-decision evaluation checklist and linked it from the homepage and deeper routes.
- Preserved Product, SAP delivery, Resources, Privacy, `/#how-it-works` and `/#guided-review` deep links.
- Retained every Get started destination as `https://mantiva360.app/` and kept the application/video destinations in `site-config.js`.
- Kept the enquiry endpoint disabled and removed booking-style calls to action. No public form, false success state, tracking request or personal-data collection is present on the revised homepage.
- Preserved the strict Firebase CSP, same-origin image policy and YouTube privacy-enhanced frame origin.
- Kept video two-stage consent: opening the native dialog makes no third-party request; selecting Play creates the iframe; closing removes it and returns focus.
- Added intrinsic image dimensions, responsive WebP art direction, mobile navigation focus restoration and full Arrow/Home/End tab-key handling.
- Kept review `noindex,nofollow`; canonical and social metadata remain prepared for an approved production release.
- Updated repository validation and safety tests for the new copy, proof assets, conversion path and interaction boundaries.

## Deliberately unchanged

- Product application code, authentication, data, calculations and hosting.
- DNS, Firebase production channel, secrets and production workflow.
- Existing Product, SAP delivery, Resources, Privacy and 404 route content except for replacing unverified guided-review CTAs with the checklist.
- Existing genuine WebP capture binaries and Option 02 SVG assets.

## Current blockers

1. Captions, transcripts, material visual descriptions and full content review for the published videos.
2. Successful signed-out desktop/mobile application access, data-isolation and reset verification at `https://mantiva360.app/`.
3. A protected enquiry service or verified business contact with validation, abuse controls, confirmed persistence/delivery and an owner-retrieval test before any booking CTA is restored.
4. Physical Safari, iPhone, Android and screen-reader checks.
5. Launch approval, removal of homepage `noindex,nofollow` and an explicit production deployment.
