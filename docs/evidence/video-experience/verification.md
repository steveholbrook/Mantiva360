# Video experience verification

Evidence date: 2 October 2026. Tested implementation: `f932de499b66fbf7c21b4af7988e4869b8cce900`. Baseline: `97eb743bddffad7a4108f7157ce6c2014d2bf425`.

[Successful quality run](https://github.com/steveholbrook/Mantiva360/actions/runs/36945168465). [Original evidence artifact](https://github.com/steveholbrook/Mantiva360/actions/runs/36945168465/artifacts/11201429526).

15 unit/static tests, structural validation, and 26 Playwright browser tests passed. Browser results: 0 skipped, 0 unexpected, 0 flaky. The first run found an asynchronous close-event focus race; the player now avoids stealing focus after the visitor has moved to another control. The regression and complete suite passed after the fix.

Chromium 153, Ubuntu GitHub runner, Node 22. Tests used emulated viewports 320, 390, 768, 820, 1024, 1280 and 1440 px. Touch contexts simulate phone and iPad sizes; these are not physical-device tests. Covered keyboard tab navigation, Escape, focus containment/restoration, source cleanup, no-JS fallbacks, reduced motion, Save-Data, blocked autoplay, failed media, unavailable YouTube, captions, seeking and lifecycle exclusion. Axe checks ran on six routes and reported no violations under the selected rules; this is not accessibility certification. Safari/VoiceOver and full editorial/audio review remain open.

## Single-run performance comparison

Same CI runner and localhost preview server. Baseline and changed homepage each measured once per mode. Lighthouse simulated mobile defaults; desktop 1440 by 1000, 40 ms RTT, 10,240 Kbps, CPU slowdown 1. Full configuration, browser identity and findings are in the before/after JSON files. These are lab diagnostics, not production field measurements or statistical evidence of improvement.

| Mode | Measure | Main baseline | Changed |
| --- | --- | ---: | ---: |
| Mobile | Performance score | 100 | 100 |
| Mobile | LCP | 1.655 s | 1.584 s |
| Mobile | Transferred bytes | 88,677 | 117,577 |
| Desktop | Performance score | 100 | 100 |
| Desktop | LCP | 0.409 s | 0.405 s |
| Desktop | Transferred bytes | 88,677 | 1,269,342 |

TBT was 0 ms in all four runs. CLS was 0 except changed desktop 0.00002789. Accessibility and best-practices scores were 100; SEO was 69 with review noindex intentionally retained. The desktop transfer increase includes the 1.15 MB silent hero. Mobile's below-fold hero did not load in this lab viewport; it can load when scrolled into view. Reduced-motion and supported data-saving preferences prevent that download. Long films remain interaction-loaded.

## Hosted transport and entrypoint

The isolated Firebase PR preview returned HTTP 206 for Cockpit bytes 100000 through 101023, with exactly 1024 bytes matching the local export, `video/mp4`, `Accept-Ranges: bytes`, the expected total length 2,359,408, ETag, and `public, max-age=3600, stale-while-revalidate=86400`. Captured headers: `preview-range.headers.txt`. This checks preview CDN behavior, not production deployment. No security-header origin was widened.

A signed-out cloud Chrome visit to https://mantiva360.app/ displayed Sign in, Google/email sign-in, and “No project data is visible until an Admin grants access.” No credentials were entered and no customer data was opened. Website copy retains sign-in qualification and creates no trial, booking or enquiry claim.

## Review screenshots

Screenshots are full-page Chromium captures, converted to WebP for review storage. The underlying layout and content match the tested commit. Hero frames vary during motion.

- [Home desktop](screenshots/after-1440.webp)
- [Home mobile](screenshots/after-390.webp)
- [Home iPad-sized](screenshots/after-820.webp)
- [Product](screenshots/product-1440.webp)
- [SAP Delivery](screenshots/sap-delivery-1440.webp)
- [Resources](screenshots/resources-1440.webp)
- [About](screenshots/about-1440.webp)

## Reproduce

Run `npm ci`, `npm test`, `npm run validate`, `npx playwright install --with-deps chromium`, then `npm run test:browser`. Run `npm run audit:performance` with `CHROMIUM_PATH` pointing to the installed Chrome executable. `npm run preview` serves the site locally. The PR's Firebase action provides an isolated 14-day review preview. No production release has been performed.
