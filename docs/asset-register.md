# Mantiva360 marketing asset register

Internal review record. Updated 17 September 2026 against base commit `a196500`.

## Approved brand assets

| Asset | Public treatment | Verification | Boundary |
|---|---|---|---|
| `public/assets/brand/mantiva360-full-light.svg` | Primary wordmark on light surfaces | Approved Option 7 source in the marketing repository | Reused without redrawing or recolouring. |
| `public/assets/brand/mantiva360-full-dark.svg` | Wordmark on navy surfaces | Approved Option 7 source in the marketing repository | Reused without redrawing or recolouring. |
| `public/assets/brand/mantiva360-compact-light.svg` | Favicon and compact light-surface mark | Approved Option 7 source | Decorative repetitions require empty alt text. |
| `public/assets/brand/mantiva360-compact-dark.svg` | Compact dark-surface mark | Approved Option 7 source | Not substituted for the full wordmark where brand recognition is needed. |
| `public/assets/images/mantiva360-social-v1.png` | 1200 by 630 social preview | Existing repository asset inspected | Review candidate. A platform preview check is still required. |

## Genuine published product captures

The five-question homepage reuses the existing WebP captures without changing the binary files, displayed values, status, controls or capabilities. Desktop and mobile pairs are selected through `<picture>`; the Action view uses its single focused capture.

| Asset | Native dimensions | Homepage treatment |
|---|---:|---|
| `cockpit-context-v2.webp` | 1040 × 550 | Hero and Attention desktop capture |
| `cockpit-mobile-v2.webp` | 295 × 330 | Hero and Attention narrow-screen crop |
| `cockpit-finding-v2.webp` | 1010 × 350 | Cause desktop capture |
| `cockpit-finding-mobile-v2.webp` | 330 × 270 | Cause narrow-screen crop |
| `cockpit-recovery-v2.webp` | 670 × 330 | Action capture |
| `delivery-context-v2.webp` | 1050 × 740 | Impact desktop capture |
| `delivery-mobile-v2.webp` | 420 × 740 | Impact narrow-screen crop |

Presentation labels and explanatory annotations remain outside the image pixels. Public captions identify the images as actual captures with fictional project data, and image-failure states never substitute an invented interface.

## Deeper-page promotional product renderings

The selected Option 02 treatment is a transparent promotional reconstruction of the live Mantiva360 interface. It keeps the actual Delivery Plan, signal-detail and governed-response structures while simplifying application chrome and using representative fictional data. Detailed dimensions, intended use and hashes are recorded in `docs/media-manifest.md`.

| Asset pair | Public treatment | Product basis | Status |
|---|---|---|---|
| `option2-delivery-plan.svg` and `option2-delivery-plan-mobile.svg` | Product page and SAP Delivery page | Live Delivery Plan structure, six workstreams, POAP baseline, progress and Today markers | Selected Option 02 |
| `option2-signal-source.svg` and `option2-signal-source-mobile.svg` | Product page | Live exception-detail structure with severity, detection, affected record and deterministic trace | Selected Option 02 |
| `option2-governed-response.svg` and `option2-governed-response-mobile.svg` | Product page | Live corrective-action fields with owner, target, required outcome and post-recalculation verification | Selected Option 02 |

The renderings are SVG interface artwork, not pixel-for-pixel product captures. Every public caption states that the treatment is promotional and based on the live interface. The scenario consistently uses the fictional `Solution Design` condition and `Alex Morgan` owner. It excludes personal account details and the source application's legacy branding.

The WebP captures are now the homepage proof. Approved media still does not cover Planning & Forecasts, actual allocation, RAID, Reporting, detailed reconciliation or read-only assistance.

## Video assets

| Video ID | Poster headline | Observed runtime | Loading treatment | Open item |
|---|---|---:|---|---|
| `XMQa-RB5fUU` | See the bigger picture. | approximately 0:31 | Homepage and Resources; click-to-load privacy-enhanced embed | Captions, transcript, audio, complete footage and end card require approval. |
| `QkCRdrASlAg` | From issue to action. | approximately 1:30 | Resources only; click-to-load privacy-enhanced embed | Captions, transcript, audio, complete footage and end card require approval. |
| `wEgHPeHhb7I` | Project control for SAP. | approximately 0:30 | Resources only; click-to-load privacy-enhanced embed | Captions, transcript, audio, complete footage and end card require approval. |

No YouTube iframe is present in the initial HTML. Each poster contains the approved logo, one headline, one action and a visible runtime. The JavaScript creates a privacy-enhanced player only after activation, removes it on close and keeps a direct YouTube fallback link.

## Excluded assets and claims

- No customer logo, testimonial, stock image or AI-generated product interface is published.
- No patent notice is published. Exact approved wording and verifiable filing details were not supplied.
- No promotional rendering is described as an exact capture. Desktop and mobile assets use separate layouts so interface text remains legible without exposing source-account detail.
