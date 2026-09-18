# Mantiva360 website launch checklist

Record **Pass**, **Fail** or **Not verified** with evidence. Do not convert an untested item into a pass.

## 1. Brand and claim accuracy

- [ ] Canonical Option 7 symbol and Mantiva360 wordmark are used on every website surface.
- [ ] Homepage visuals are verified genuine captures with unchanged values/statuses; deeper-page promotional renderings remain labelled and no source-account identity or legacy application branding is visible.
- [ ] Desktop and mobile art-directed WebP crops have been reviewed at their actual CSS display sizes.
- [ ] No personal email, customer name or confidential project record appears in a public asset.
- [ ] No SAP endorsement, certification, partnership or unverified integration is claimed.
- [ ] Any provisional-patent wording uses the exact approved IP Australia reference and public claim.
- [ ] Progress wording matches the configured project-control strategies.
- [ ] The three YouTube films have been watched end to end and their logos, narration, captions and closing links match the live offer.

## 2. Conversion clarity

- [ ] The demo CTA opens `https://mantiva360.app` in a signed-out desktop session.
- [ ] The demo CTA opens correctly on a physical phone.
- [ ] Nearby copy accurately describes sign-in and access requirements.
- [ ] The video action is distinct from demo access.
- [ ] Product, SAP delivery and Resources routes resolve without a redirect loop and match their canonical URLs.
- [ ] No booking CTA or public form appears while the guided-review endpoint is disabled.
- [ ] Once a route is approved, the guided-review form stores a test enquiry and only then shows success.
- [ ] The owner can retrieve and action that test enquiry.

## 3. Media and accessibility

- [ ] Keyboard-only navigation reaches and operates the menu, product tabs, video posters, FAQ and form.
- [ ] Focus remains visible against every background.
- [ ] Video opens only after a user action and closes with the button, Escape and outside click.
- [ ] All three videos have accurate captions and a usable verified transcript or equivalent support.
- [ ] Content remains usable at 200% browser zoom.
- [ ] Reduced-motion mode removes non-essential motion.
- [ ] Colour contrast is reviewed with an automated tool and spot-checked manually.
- [ ] Physical iPhone Safari test completed.
- [ ] Physical Android Chrome test completed.

## 4. Domain and operational readiness

- [ ] Firebase review channel approved.
- [ ] Correct Firebase project and Hosting site confirmed.
- [ ] `mantiva360.com` ownership is verified and TLS is active.
- [ ] `www.mantiva360.com` redirects once to the HTTPS apex URL.
- [ ] Existing email DNS and unrelated subdomains remain intact.
- [ ] `mantiva360.app` remains on separate product hosting.
- [ ] Public marketing access does not expose administrative routes or enquiry records.
- [ ] Previous live release can be restored by an authorised owner.

## 5. Performance and maintainability

- [ ] No YouTube iframe or video payload loads before a visitor clicks play.
- [ ] Page works without horizontal overflow at 320, 390, 768, 1024 and 1440 pixels, including 200% text reflow.
- [ ] Hero image is prioritised; below-fold images are lazy-loaded.
- [ ] All local images are optimised and have intrinsic dimensions.
- [ ] Shared demo and video destinations are controlled in one configuration file.
- [ ] Overview play, product exploration, demo click, review-request start and confirmed review-request success events carry no personal or free-text data.
- [ ] Security headers are present on the deployed response.
- [ ] Lighthouse or equivalent mobile performance and accessibility reports are retained.
- [ ] GitHub quality workflow and Firebase deployment workflow complete successfully.

## Public launch decision

Launch only when the remaining failures have named owners and no failure can expose private data, misstate product capability, break the core conversion path or prevent rollback.
