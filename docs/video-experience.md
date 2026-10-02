# Mantiva360 video experience review

Prepared 2 October 2026. Branch `feat/durable-video-experience`, based on `main` at `97eb743bddffad7a4108f7157ce6c2014d2bf425`. No production deployment is authorised.

The website now gives each film a distinct buyer purpose: establish context, examine a decision, inspect the Cockpit, understand SAP delivery, or learn the product history. The unfinished See It Early film is excluded. Source media remains preserved in ChatGPT Library and the earlier repository history.

## Current baseline

PR 14 is merged. Its main-branch configuration includes the Performance and Evolution local films. A fresh HTTP fetch of the live `assets/js/site-config.js` still returned the earlier three-YouTube configuration. The captured configuration is in `evidence/video-experience/live-config-before.txt`. This is an observed deployment difference, not a claim about every CDN location.

A signed-out cloud Chrome visit to mantiva360.app on 2 October displayed Sign in, Google/email options, and “No project data is visible until an Admin grants access.” No anonymous demo access was established. The website retains the sign-in qualification; there is no invented booking or enquiry endpoint. No authenticated demo project or current continuous resource/scenario/report recording was supplied in this task. No application data was modified.

## Placement map

| Page | Film | Buyer purpose |
| --- | --- | --- |
| Home hero | 10-second Hero, encoded from 1080p master to 720p | Silent visual context with visible pause control and static fallback |
| Home overview | Five WHYs Professional Voice, 60 seconds | Examine the working before committing budget or capacity |
| Product | 360 Cockpit, 30 seconds | Follow a signal into accountable response and reassessment |
| SAP Delivery | Professional Promo, 90 seconds | SAP programme context, governed records and SAP Activate fit |
| About | Evolution, 90 seconds | Founder-provided development story |
| Resources | Four featured narrated films | One card per story, descriptive transcripts and captions |
| Resources expandable references | Three existing YouTube IDs | Retain original links without treating unverified legacy edits as new stories |

The Professional Promo opens with a complex SAP programme and explicitly covers SAP Activate. It provides SAP-specific material while the earlier SAP Made Simple, SAP Promo and GOLD2 edits remain outside the featured catalogue. Its presence on SAP Delivery does not assert new native SAP integration.

## Source and editorial decisions

`video-register.json` contains measured source hashes, duration, dimensions, codecs, audio, source locations, lifecycle status and delivery mapping for 25 recovered MP4s. `evidence/video-experience/source-discovery.json` records exact Library identities for associated source packs, notes, posters, transcripts, captions and the additional Hero WebM.

Selected masters were encoded as H.264/yuv420p fast-start MP4, with AAC at 128 kbps when audio exists. The four narrated films retain 1920 by 1080 framing. The silent hero is 1280 by 720 and approximately 1.15 MB. `encoded-assets.json` records the exact delivery sizes, hashes, measured duration and caption paths. The labelled 30/60/90-second durations round small container padding of at most 0.016 seconds.

The five UUID uploads are derivative story exports: two landscape Evolution copies, two landscape See It Early copies, and one portrait See It Early copy. Their distinct hashes are retained; they are not asserted to be byte-identical. The source masters, rather than these 910 by 512 / 512 by 910 copies, drive delivery encodes.

Runway provenance is supported by the Hero readme and Evolution production notes. Generated character or office footage is not automatically attributed to Runway where generator provenance is absent. It is atmosphere, not evidence of product functionality.

Associated production ZIPs were recovered for Hero, Five WHYs Professional Voice, Cockpit, Evolution and Professional Promo. The last pack contains the finished MP4, captions, transcript and notes only; it does not contain a complete editable renderer or separated audio stems. Do not claim full edit-source recovery for that film.

The source transcripts and sampled visual frames were reviewed for claims and branding. Every new delivery file passed a complete FFmpeg decode. This is not a full human listening review or a continuous live-product acceptance test. Those gates remain open. Narration has not been re-recorded: the commercial refresh is in page titles, placement and explanatory copy. A proposed revised overview script follows below.

## See It Early release blocker

The four named REVIEW variants and their uploads remain review-only. There is no public player source for the `performance` configuration key, no public video file, and no public placement. Prior binaries are recoverable from Library and Git history.

Missing captures, all from one authorised fictional project and one reporting date:

1. 6.8 to 10 seconds: genuine capacity finding, affected milestone and supporting record.
2. 11.8 to 16 seconds: genuine scenario comparison, proposed status, action owner and approval where required.
3. 17.8 to 22 seconds: genuine report and its source drill-down.

If the deployed product cannot demonstrate any shot, rewrite that shot before production. Do not remove the review markers from the preserved source to disguise missing footage. Do not imply that assigning an action resolves the condition.

## Accessibility and lifecycle

All featured narrated films have production-source WebVTT tracks and descriptive transcripts. The caption wording and timing are carried from the matching production SRT. Since these masters already have burned-in captions, the optional track is not enabled by default, avoiding duplicate captions. Player controls allow it to be selected. These are not labelled independently verified captions.

The source script, production-caption timing and technical decode are evidence; final audio-versus-caption listening review is still required. Descriptive transcripts add meaningful visual context. An audio-description assessment remains necessary for full WCAG AA claims where essential visual information is not conveyed by the narration. No automated score is presented as accessibility certification.

The shared player preserves keyboard controls, Escape, focus restoration, direct links and source cleanup. A local playback error leaves transcript and direct MP4 links available. YouTube cross-origin playback failure cannot reliably be inferred, so the direct original link remains visible throughout.

The silent hero starts only when visible and when reduced motion and supported Save-Data preferences allow it. It pauses out of view, in a hidden tab, or when opening a film. A deliberate pause persists during subsequent scrolling. Preference changes unload its source. Autoplay rejection leaves the poster and a manual play control. No audible autoplay is introduced. A no-JavaScript visit retains the poster and direct narrated-film links.

Only `approved-candidate`, `approved` and explicitly retained `legacy-reference` states may open the player. Validation also rejects missing, draft, review-only and archived page placements. Candidates are for this noindex review build; a release owner must complete editorial checks before production.

## Durable delivery and rollback

All new public URLs are relative, same-origin asset paths with content hashes. There are no temporary generation links, signed download URLs or preview URLs in media configuration. Security headers and Firebase hosting architecture are unchanged. Existing one-hour asset caching with stale-while-revalidate remains; changed bytes receive new filenames. Preview CDN transport results are recorded in the verification evidence. Production responses still require verification on an authorised release.

The complete source archive stays outside public delivery. The register ties each selected master to its compressed export, caption path, poster and measured hash. Keep old hashed assets when revising an already deployed release until the prior cache window expires. For this unreleased branch the superseded PR-14 low-resolution files and unfinished film are removed from the deployment payload.

Rollback is the previous Firebase release, or a revert of this PR followed by the existing manually authorised deployment workflow. Do not alter DNS, access controls or application hosting.

## Proposed refreshed overview script

This is an edit brief, not narration currently present in the film:

“On a complex SAP programme, cost pressure often appears before the overrun. Capacity tightens. Work remains open. The forecast shifts. The question is what you can still change.

Mantiva360 connects the plan, progress, resources, actuals and forecast so you can examine the position together.

Start with the signal. Follow its source. Understand the delivery consequence. Make the response accountable, then recheck the result.

Calculation engines establish the controls. AI assistance helps explain permitted information. Authorised people decide what changes.

The aim is practical: less time reconstructing status, earlier intervention and better use of project investment.

Mantiva360. Project Performance Intelligence. Explore the delivery picture.”

Before recording, verify each depicted workflow and match the final words to the available real footage. Keep SAP Activate context on the SAP page; avoid implying certification or native integration.

## Verification and measurements

The unchanged baseline passed 15 unit/static tests and structural validation. The revised branch passes those gates with updated media expectations. Added browser scenarios cover motion preferences, Save-Data, deliberate pause, autoplay rejection, caption cues, seeking, failed media, and lifecycle rejection, alongside existing responsive, keyboard, touch and axe checks.

The managed local environment prohibits a browser process's required socket. Local browser and Lighthouse attempts therefore did not measure the site. The GitHub quality workflow at commit `f932de4` passed all 26 browser scenarios, with 0 skipped or flaky tests, plus 15 unit/static tests and validation. It generated the committed screenshots and same-run before/after Lighthouse diagnostics. See `evidence/video-experience/verification.md` for measurements and limits. Physical iPhone/iPad Safari and VoiceOver remain separate release checks. The temporary local WebKit installation could not establish physical Safari conformance.

No new tracking provider is installed. Suggested future events are video start, 25/50/75/100 percent milestones, transcript opening, relevant CTA click and server-confirmed enquiry. Do not equate a click with a qualified lead or booked meeting.

## Sources checked

- Current source: https://github.com/steveholbrook/Mantiva360
- SAP methodology: https://learning.sap.com/courses/discovering-sap-activate-implementation-tools-and-methodology/describing-the-methodology-structure_d959f6fc-ebfc-4143-94b3-6b83a6339b8b
- Accessible transcripts: https://www.w3.org/WAI/media/av/transcripts/
- Visual descriptions: https://www.w3.org/WAI/media/av/description/
- Captions: https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html

SAP retains Discover, Prepare, Explore, Realize, Deploy and Run. Fit-to-standard is associated with Explore in the inspected SAP source. Existing page wording and independence disclaimers are preserved.
