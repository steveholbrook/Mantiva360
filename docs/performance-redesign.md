# SAP project performance redesign

Review date: 1 October 2026. Base: `eb7a2d8` (main). Branch: `feat/sap-project-performance-intelligence`.

## What changed and why

The marketing hierarchy moves from project controls → features → governance to project economics → performance intelligence → early intervention → SAP delivery → trusted controls underneath. The opening promise is **More delivery. Less waste.** The buyer can understand the proposition without watching a film.

The implementation improves the existing static architecture. No framework migration, new backend, analytics, unverified enquiry service, SAP connector or production deployment is included.

- Homepage: economics, connected signals, four outcomes, fictional Get to Green example, six Activate phases, real product proof, Detect / Decide / Act / Verify, product evolution and a clear next action.
- Product: six buyer decisions, with the existing capabilities and authority boundaries underneath each answer. Genuine captures lead; existing promotional SVGs remain in an explicitly labelled optional section.
- SAP Delivery: complementary roles for SAP Activate and Mantiva360, six phases and honest project-management applications around migration, testing, cutover, adoption and recovery.
- Resources: two local films and all three existing YouTube resources, visible runtimes and categories, written summaries and the evaluation checklist.
- About: a dedicated route using the existing approved founder photograph and biography. `/#about-us` is retained.
- Privacy: existing details retained, with local-versus-YouTube delivery clarified. Shared navigation across all six primary pages.
- SEO: revised titles, descriptions, canonicals, Open Graph, social image, Organization microdata and About sitemap entry. Microdata avoids weakening the script CSP for inline JSON-LD. Review noindex is retained.

## Inventory and protected behaviour

The live homepage returned HTTP 200 and matched the repository’s five-question, controls-led page. Its existing robots meta is `noindex,nofollow`. Live security headers matched `firebase.json`. A direct live-browser screenshot was unavailable because that connection returned an empty response; **before screenshots are the unchanged base repository rendered locally**, not an asserted capture of production.

Existing `/product`, `/sap-delivery`, `/resources`, `/privacy`, `/404.html`, checklist, robots, manifest, brand assets and genuine WebP files remain. Existing meaningful homepage section anchors and Product deep-link anchors remain. About was previously a homepage section, now also `/about`. Existing main-branch tests passed 15/15 before edits.

The homepage and deeper pages previously had separate player/navigation implementations. They now use shared `main.js` and `site-config.js`. Native modal dialog, explicit boundary focus cycling, Escape/backdrop/close handling and focus restoration cover local and YouTube media. All media activators are real fallback links. Without JS the mobile links and all product-proof panels remain visible. A tiny same-origin pre-paint script avoids a collapsing-menu layout shift. The previous inactive form and tracking hooks were removed from the shared runtime; enquiry config remains disabled.

`firebase.json` is byte-for-byte unchanged. CSP, frame sources, X-Frame-Options, HSTS, Permissions-Policy, Referrer-Policy and nosniff are preserved. No `unsafe-inline`, analytics, cookie handling or new third-party request is introduced. Local video is covered by `default-src 'self'`.

## Product evidence and claim boundaries

Current `steveholbrook/ptracker3` main documentation was read through the connected repository:

- `docs/project-recovery-workflow.md`, blob `0723c4deb5b198fec16725337d9c04d9a5493e5f`: assessment, baseline/current outlook, scenario comparison, authorised correction or Change Request, reforecast and verification, with stale assessment handling and reporting.
- The existing marketing content/claims register establishes Cockpit, Delivery Plan, Forecasts, Actuals, Resources, RAID, progress methods, reporting, deterministic checks and read-only assistance.
- The existing genuine captures remain unchanged. New captures for standalone Forecasts, Change and Reports were not fabricated.

Recovery cause and benefits require PM judgement. Closing an action or approving a change does not certify recovery. No quantified saving, predictive AI promise, customer endorsement or automatic project rescue is claimed. The AUD $3.02m / $320k example is fictional, and explicitly separates forecast from additional exposure. A modelled opportunity is not a realised saving. Employee productivity scoring is not part of the proposition.

## Official SAP terminology verification

Checked 1 October 2026 against official primary sources:

1. [SAP Learning: Describing the Methodology Structure](https://learning.sap.com/courses/discovering-sap-activate-implementation-tools-and-methodology/describing-the-methodology-structure_d959f6fc-ebfc-4143-94b3-6b83a6339b8b)
2. [SAP Learning: Fit-to-Standard Analysis Process](https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition/providing-an-overview-of-the-fit-to-standard-analysis-process_aa2f7030-617a-4679-997f-c937f8a8cc03)
3. [SAP: Activate methodology](https://www.sap.com/sea/products/erp/activate-methodology.html)

Confirmed phase order: Discover, Prepare, Explore, Realize, Deploy, Run. Fit-to-standard workshops belong in Explore; build/test in Realize; readiness and hypercare in Deploy; productive operation and improvement in Run. Public page wording is paraphrased. Phase mappings describe Mantiva360 project-management uses, not SAP execution or certification.

SAP Activate provides the methodology and implementation roadmap. Mantiva360 provides performance intelligence and delivery context. The independent-product disclaimer remains concise. No SAP endorsement, partnership, certification, native integration or automated SAP quality-gate certification is implied. SAP Cloud ALM, Solution Manager and specialist tools retain their execution roles.

## Media inspection

Three uploads contain two distinct stories. Both 30-second copies are visually the same review-cut story, with different container hashes. The original non-suffixed upload was selected. Contrary to the brief’s portrait description, **all uploaded streams are 910 × 512 landscape, with no rotation metadata**. No supplied film was stretched, cropped into portrait or discarded. The player also supports portrait dimensions if a replacement portrait film is later configured.

The 30-second source visibly contains `REVIEW CUT / PRODUCT INSERTS PENDING` and placeholder product panels. The website labels it a promotional review cut. It is not described as genuine product proof. The 90-second film uses recorded demonstration product views and a product-evolution timeline, not dated release or customer-outcome evidence.

The original task uploads remain untouched. Published files use semantic paths, H.264/AAC, CRF 23, 96 kbps audio and fast-start metadata. Posters are extracted frames. Native controls, playsinline, preload none and interaction-created players avoid loading either MP4 on first visit. Nothing auto-plays locally, including with reduced motion.

Existing YouTube IDs and direct links are preserved: `XMQa-RB5fUU`, `QkCRdrASlAg`, `wEgHPeHhb7I`. All embeddings use `youtube-nocookie.com` and are created after activation. Repository configuration was verified. Live external availability could not be fully confirmed: QkCRdrASlAg oEmbed resolved to Mantiva360 / “Mantiva360 SAP Made Simple”; the other requests timed out, and the web retrieval service could not open YouTube. Approximate runtimes remain those in the existing verified inventory. Tests stub the external player to verify the local contract, not to assert YouTube uptime.

## Test and validation evidence

See checked-in browser results and Lighthouse JSON under `docs/evidence/performance-redesign/`.

- `npm test`: 15/15 pass. Existing obsolete five-question copy assertions were replaced with outcome-led assertions; route, claim, media, no-JS, security, source-boundary, palette and disabled-enquiry invariants remain.
- `npm run validate`: passes all seven HTML pages, asset targets, sitemap, local media and cross-page fragments. Homepage 1,144 words. The previous 1,200-word minimum contradicted the requested concise redesign; the explicit range is now 700–1,500, with the upper bound retained.
- Browser suite: 21/21 pass. responsive routes at 320, 390, 768, 820, 1024, 1280 and 1440 px; no horizontal overflow; mobile navigation; keyboard tabs; modal containment/restoration; Escape, close and backdrop; safe interior click; native video metadata decoding; no initial MP4/YouTube requests; all local links; MP4 byte-range delivery; no-JS; 200% text resize; reduced motion; tablet orientation; touch-sized phone/tablet playback.
- axe WCAG 2.2 A/AA automated checks: zero violations across the six main pages. These do not certify complete WCAG conformance.
- Genuine source image binaries and Firebase security headers remain unchanged.
- Before and after screenshots cover desktop/mobile; after evidence includes 820 px tablet and Product, SAP Delivery, Resources and About.

Issues found and corrected during QA: oversized hero wrapping, 320 px Product heading overflow, SAP-page grid overflow with 200% text, modal boundary focus escaping towards browser chrome, and mobile navigation CLS. Screenshot collection was fixed to load visible lazy images before capture.

## Performance findings

Local Lighthouse 13.5 lab run, Chromium 153. Mobile uses simulated throttling and 4× CPU slowdown. Desktop uses 40 ms RTT / 10 Mbps / 1× CPU. Both report:

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 69 | 69 |

SEO is limited by deliberately retained `noindex,nofollow`. This is an explicit release decision, not a claimed SEO pass. CLS is 0 and TBT is 0 in both final lab runs. Initial transferred resources are approximately 81 KiB; the MP4 bodies are not among them. Local uncompressed preview and a single lab sample are not production CDN or field Core Web Vitals evidence. Minor image-sizing and render-blocking suggestions remain; no new font download or framework bundle was added.

## Accessibility and release limitations

1. **Video accessibility remains open.** Both local films contain burned-in text but no embedded subtitle track. Draft WebVTT files are prepared outside public/. They require full audio verification, timing, sound cues and assessment of essential visual descriptions before publication as accurate captions. Resources provides clearly labelled written summaries. Existing YouTube caption/transcript review remains unresolved.
2. **Short film is not final footage.** Product placeholders and the review-cut footer remain in the supplied content, transparently labelled. Replace with verified final footage before treating it as a finished sales film.
3. **Physical iPad/iPhone Safari and assistive-technology review remain open.** Chromium responsive/touch emulation and keyboard checks passed; those are not device or VoiceOver certification.
4. **External application access and YouTube uptime are not guaranteed.** Application CTAs point to the existing destination and state sign-in may be required. No anonymous demo or booking claim is made.
5. **Existing launch blockers remain:** review noindex, verified business privacy contact and enquiry-service owner decisions. No enquiry flow has been enabled.
6. **Product screenshots are real but dated.** They preserve the existing approved demo capture values and layout. Fresh captures for newer capabilities would strengthen proof; no placeholder UI was substituted.

## Buyer conversion review

| Buyer | What / why / value | SAP relevance and differentiation | Next action |
|---|---|---|---|
| CIO | Connected performance signals to protect transformation investment | SAP phase context plus diagnosis, governed response and verification | See Mantiva360 in action |
| CFO | Forecast, cost-to-complete and emerging exposure without invented savings | Traceable actual/forecast distinctions around SAP programme economics | Product: cost and forecast |
| SAP Program Director | Surface workstream drift and compare recovery responses | Activate-aligned delivery context, Get to Green and formal change | Explore SAP Delivery |
| SAP Project Manager | Reduce status chasing and follow findings into accountable work | Real Cockpit/Delivery Plan evidence and a repeatable response workflow | Product proof or 30-second film |
| PMO Director | Consistent reporting context and explainable measures | Shared controls underneath the performance story | Trust explanation and evaluation checklist |

The primary CTA still enters an application that may require sign-in. A verified sales-contact journey could improve conversion later; inventing a booking form would reduce trust now.

## Critical assumption review and quality gate

| Criterion | Assessment | Remaining weakness |
|---|---|---|
| Commercial clarity | Concrete cost drift, capacity, forecast and admin outcomes lead. Fictional values are clearly classified. | Financial benefit remains an evaluation proposition, not validated ROI. |
| SAP relevance / accuracy | Six phases, fit-to-standard, independent role and complementary toolchain are explicit. | No native connector claim or device-specific demo guarantee. |
| Differentiation | Detect loss → understand driver → model recovery → govern change → verify result; real proof underneath. | New Forecast/Change/Reports screenshots would strengthen proof. |
| Conversion / UX | Consistent navigation, touch targets, direct CTA and accessible fallback journeys; fast first load. | Application access may require sign-in; short film is a review cut. |
| Trust / technical quality | Exact security preservation, truthful claim limits, passed automated checks and documented QA. | Caption, physical Safari and existing privacy/indexing release items remain. |

Specific risks checked: no generic “AI-powered PM” positioning; no unsupported savings; no SAP borrowing of credibility; no individual productivity scoring; no initial video body transfer; supplied aspect ratios preserved; caveats moved to relevant media/product layers; CTAs and fallbacks functional; methodology roles clear; page understandable without video; genuine captures versus promotional content labelled; no security weakening.

## Deployment notes

No merge or production deployment was performed. The existing PR workflow may create an isolated Firebase preview; production remains a separate manual workflow. `firebase.json`, production workflow and domain configuration are unchanged. Browser-only development dependencies are not served from public/.

Before an approved release: review the preview in physical Safari, resolve the media items, confirm privacy contact and indexing decisions, then run the deployment checks. If indexing is approved, update the robots meta on the marketing pages and the corresponding review-state tests together; retain noindex for 404. Verify CDN media Content-Type, range responses, security headers, canonical URLs and actual YouTube playback on the preview before production. Keep the previous Firebase release ID for rollback.

## Screenshot review

| Before (base repository) | After (this branch) |
|---|---|
| [Desktop before](evidence/performance-redesign/before-desktop.webp) | [Desktop after](evidence/performance-redesign/after-1440.webp) |
| [Mobile before](evidence/performance-redesign/before-mobile.webp) | [Mobile after](evidence/performance-redesign/after-390.webp) |

[Tablet 820 px](evidence/performance-redesign/after-820.webp) · [Product](evidence/performance-redesign/product-1440.webp) · [SAP Delivery](evidence/performance-redesign/sap-delivery-1440.webp) · [Resources](evidence/performance-redesign/resources-1440.webp) · [About](evidence/performance-redesign/about-1440.webp)
