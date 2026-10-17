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

An earlier local run passed the existing 26 browser checks and the new page checks after correcting 200% text overflow. Workspace maintenance subsequently removed the checkout and browser runtime. Final source and the optimised film have therefore been submitted to the repository's CI browser suite and Lighthouse workflow for a fresh authoritative run. Local browser installation currently fails with a truncated download; a launch failure is an infrastructure failure, not a page-test result. Final CI evidence and metrics will be appended when available.

The performance workflow measures this route on Lighthouse mobile and desktop profiles. Synthetic LCP, CLS and total blocking time will be reported from actual output. INP requires representative interaction/field data and will not be claimed from a Lighthouse load audit. Local/CDN deployment performance and physical device behaviour may differ.

## Release limitations

1. Staging inspection reached a sign-in screen. Product claims are source-verified, while authenticated live workflow, project availability and current screenshots remain unverified. See [the claim matrix](get-to-green-product-validation.md).
2. Supplied films and thumbnail contain REVIEW CUT markings and show incomplete demonstration financial inputs. The website does not represent their draft/unverified state as a successful recovery.
3. No physical Safari/iOS or Edge test, screen-reader certification, full listening review or external mailbox receipt test has been completed. Mailto links use the existing sales mailbox and do not confirm a booking or send a message automatically.
4. Keep this PR in draft until the release reviewer accepts the media, authenticated product check and indexing decision. No merge or production deployment has been performed.
