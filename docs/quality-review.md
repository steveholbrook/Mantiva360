# Quality and readiness review, 17 September 2026

Implementation baseline source commit: `8ab7560f7d63f76152a445b690d88cf377a5dc59`.

The deployed homepage, stylesheet, JavaScript, configuration and privacy page matched the inspected baseline after newline normalisation. The revised build remains on the review branch and has not been deployed to production.

| Criterion | Assessment | Evidence | Remaining weakness |
|---|---|---|---|
| Brand and visual quality | Strong review candidate | Approved Option 7 assets, white-led Executive Confidence hero, restrained palette, consistent grid and one dominant product visual. | Final judgement requires the Firebase preview at the full target viewport set and physical devices. |
| Buyer comprehension | Strong with an operational caveat | Hero states the control outcome; three buyer intents remain distinct; product, corrective action, SAP and evaluation sections follow a deliberate sequence. | No working guided-review path means the strongest commercial action cannot yet be used. |
| Product proof | Strong and clearly labelled | Focus Lens crops use genuine product captures with fictional data, exclude identifying demo-project detail and retain unchanged visible status content. The Signal → Source → Action sequence uses one coherent reporting state. | A current genuine Planning & Forecasts capture was not available, so that panel remains an explanatory graphic. |
| SAP and enterprise credibility | Strong, claim-disciplined | Activate phases are tied to specific control uses; toolchain references are category-level; deterministic controls and read-only AI are separated. | Deployment, enterprise roles, SSO, residency, retention, service levels and support require verified product evidence. |
| Accessibility, performance and operational reliability | Not launch-ready | Semantic HTML, keyboard tabs, native modal dialog, explicit focus restoration, reduced motion, responsive layout, local imagery and deferred video loading are implemented. Six target widths rendered without horizontal overflow; critical colour pairs met at least 5.00:1 in source checks. | All videos report captions unavailable; the demo returned HTTP 502 in two checks; enquiry handling is disabled; physical-device and deployed field measurements remain open. |

## Confirmed live checks

- `https://mantiva360.com/` loaded in the cloud browser.
- `https://mantiva360.com/privacy/` loaded and redirected cleanly to `/privacy`.
- Primary live source files matched the inspected repository baseline after newline normalisation.
- Security headers were present on the live homepage response.
- The marketing origin loaded the click-to-play YouTube frame.
- Responsive render checks completed at 360, 390, 768, 1024, 1440 and 1920 pixels with no document-level horizontal overflow.
- Keyboard arrow navigation changed the active product tab; the mobile menu opened, exposed both Watch and Explore demo, and closed with Escape.
- The video dialog created one iframe only after activation, removed it on close and restored focus to the opener.
- Source contrast checks for core body, muted, link, button, dark-surface and video-support colour pairs ranged from 5.00:1 to 16.13:1.
- The revised build keeps the static architecture, removes two obsolete raster captures and the legacy poster source, and loads no framework or initial video payload.
- `https://mantiva360.app/` returned HTTP 502 in both browser and command-line checks from this environment. This is a current observation, not proof that every user or region is affected.
- YouTube watch pages loaded for all three configured IDs. Player controls reported durations of approximately 31 seconds, 90 seconds and 30 seconds. Captions were unavailable.

## Public-launch blockers

1. Connect and verify a durable enquiry service, monitored lead owner, retention rule and privacy contact, or publish another verified contact path.
2. Restore and verify the demo journey, including signed-out behaviour, data isolation, reset expectations and mobile access.
3. Add accurate captions or verified transcripts for all published recordings, then review narration, visual claims and end cards.
4. Complete deployed responsive, keyboard, contrast, zoom, reflow, browser and physical-device tests.
5. Record deployed performance measurements and rollback ownership.
6. Supply approved public wording and the exact IP Australia reference before adding any provisional-patent statement.

## Release recommendation

Use this branch as the next review candidate. Do not deploy it to the public production channel until blockers 1 to 3 are resolved and blockers 4 to 5 have named owners and acceptable evidence.
