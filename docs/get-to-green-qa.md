# Get to Green implementation and QA

New route: `/get-to-green`. Review branch: `feature/get-to-green-page`. Production merge and deployment are outside the authorised scope.

## Implementation

- Nine sections follow the requested order, with Detect / Decide / Act / Verify mapped to the application's actual workflow labels.
- Existing static HTML, shared brand tokens, native dialog/player, email enquiry destination and Firebase Hosting security policy are retained. No runtime dependency, enquiry endpoint, analytics or application change was added.
- Get to Green appears in desktop/mobile navigation and the footer on all normal routes. Contextual links connect the homepage, Product and SAP Delivery pages. The header's existing collapsed-menu behaviour now applies through 1100 px to accommodate the additional item.
- One H1, ordered headings, canonical URL, title, description, Open Graph tags, VideoObject microdata, intrinsic image dimensions and XML sitemap inclusion are implemented. The current site-wide review noindex policy is deliberately retained pending approved release.
- Poster links work without JavaScript. MP4 bodies load only after deliberate playback. Native controls, playsInline, keyboard focus restoration, failure fallback, film descriptions and reduced-motion support use the established architecture.

## Media inspection

| Film | Duration and display | Source size | Integrated size | Treatment |
| --- | --- | --- | --- | --- |
| From Red to Recovery | 45 seconds, 1920 × 1080, 24 fps, H.264 High / AAC-LC stereo | 5,783,716 bytes | 5,783,716 bytes | Original supplied bytes retained. |
| What Will Recovery Really Cost? | 70 seconds, 1920 × 1080, 24 fps, H.264 High / AAC-LC stereo | 14,746,164 bytes | 8,722,291 bytes | Web derivative using x264 CRF 18, slow preset and fast-start; original AAC stream copied. |

The financial film is 40.9% smaller. Full-film SSIM against the supplied original is 0.999083. Encoded audio-packet MD5 matches the original for both films. Both originals fully decode without error; audio is present throughout the spoken sections. The 70-second original has two short detected pauses, including its closing silence. This technical inspection does not replace a full human listening and caption-synchronisation review.

Both videos use yuv420p, MP4 avc1 and AAC-LC at 48 kHz. Their moov atoms precede mdat for progressive playback. No separate subtitle track was supplied; visible burned-in captions are preserved. The player does not advertise an optional caption track when none exists. Film descriptions are clearly labelled descriptions, not verbatim transcripts. Full caption completeness and audio description are release-review items.

Hashes, streams, fast-start atom order and audio equality are recorded in [media-validation.json](evidence/get-to-green/media-validation.json), with decoder/audio measurements in [audio-integrity.json](evidence/get-to-green/audio-integrity.json).

## Checks and evidence

`npm test`, `npm run validate` and `git diff --check` pass for the implementation. A dedicated Playwright suite covers six new-page widths (320, 390, 768, 820, 1024 and 1440 px), actual image loading, expanded-disclosure axe WCAG 2.2 AA analysis, deferred downloads, native keyboard playback of both films, duration, seeking, close/stop/focus restoration, navigation/history, the demonstration destination, no-JavaScript reflow, 200% text and reduced motion. The existing 26 browser checks remain in the full regression suite.

Final validation ran against application code in marketing commit `41d79768cfb69d8a6283a08b5f0e7dbd9925f6e5` in [Website quality run 39001803018](https://github.com/steveholbrook/Mantiva360/actions/runs/39001803018). All 38 browser checks passed, with no skips, unexpected results or flaky results. Axe found zero automated WCAG 2.2 AA violations with the recovery disclosures expanded. The existing static suite passed all 15 tests and route/asset validation passed. Browser metadata, native playback, seeking and close behaviour passed for both integrated films.

The isolated Firebase review channel also passed. The actual hosted preview was opened and visually inspected: [Get to Green review page](https://mantiva360-marketing--pr17-feature-get-to-green-elpsuuep.web.app/get-to-green). This is a temporary PR preview, not a production release.

## Performance results

Lighthouse measured `/get-to-green` in the GitHub Ubuntu runner using its local server, Chrome and simulated network/CPU throttling. These are single lab runs, not production field percentiles.

| Measurement | Mobile | Desktop |
| --- | --- | --- |
| Performance score | 99 | 100 |
| Largest Contentful Paint | 1.81 seconds | 0.45 seconds |
| Cumulative Layout Shift | 0 | 0 |
| Total Blocking Time | 0 ms | 0 ms |
| Accessibility score | 100 | 100 |
| Best Practices score | 100 | 100 |
| SEO score | 69 | 69 |
| Initial transferred bytes | 125,456 | 179,377 |

Mobile used the Lighthouse default mobile profile, simulated 150 ms RTT, 1,638.4 Kbps throughput and 4× CPU slowdown. Desktop used a 1440 × 1000 viewport, simulated 40 ms RTT, 10,240 Kbps throughput and 1× CPU slowdown. Full settings, timestamps, browser environment and findings are retained in the JSON evidence.

LCP and CLS meet the requested thresholds in these lab conditions. INP was not measured. Zero total blocking time does not establish an INP result. The SEO score is reduced by the intentional review `noindex,nofollow` policy, which must be considered in the approved production release. Shared CSS, image delivery and render-blocking requests have small remaining optimisation opportunities; no performance target is asserted for an unmeasured production deployment.

## Review captures and raw results

- [Desktop page](evidence/get-to-green/desktop-full.png), [desktop hero](evidence/get-to-green/desktop-hero.png) and [four-stage framework](evidence/get-to-green/desktop-framework.png).
- [Tablet page](evidence/get-to-green/tablet-full.png) and [tablet hero](evidence/get-to-green/tablet-hero.png).
- [Mobile page](evidence/get-to-green/mobile-full.png) and [mobile hero](evidence/get-to-green/mobile-hero.png).
- [Browser summary](evidence/get-to-green/browser-summary.json), [full successful browser results](evidence/get-to-green/browser-results.json), [axe results](evidence/get-to-green/axe.json), [mobile Lighthouse](evidence/get-to-green/lighthouse-mobile.json) and [desktop Lighthouse](evidence/get-to-green/lighthouse-desktop.json).

Desktop, tablet and mobile captures were visually reviewed alongside layout assertions. Images, stage connections, comparison rows, financial cards, film posters, CTAs and footer remain within their viewports. The 200% text check verifies reflow independently of the standard screenshots.

## Release limitations

1. Staging inspection reached a sign-in screen. Product claims are source-verified, while authenticated live workflow, project availability and current screenshots remain unverified. See [the claim matrix](get-to-green-product-validation.md).
2. Supplied films and thumbnail contain REVIEW CUT markings and show incomplete demonstration financial inputs. The website does not represent their draft/unverified state as a successful recovery.
3. No physical Safari/iOS or Edge test, screen-reader certification, full listening review or external mailbox receipt test has been completed. Mailto links use the existing sales mailbox and do not confirm a booking or send a message automatically.
4. Keep this PR in draft until the release reviewer accepts the media, authenticated product check and indexing decision. No merge or production deployment has been performed.
