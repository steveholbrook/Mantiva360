# Mantiva360 marketing asset register

Internal review record. Reviewed 17 September 2026 against base commit `c47ad1967f887830ee7f88247ee6320872951956`.

## Approved brand assets

| Asset | Public treatment | Verification | Boundary |
|---|---|---|---|
| `public/assets/brand/mantiva360-full-light.svg` | Primary wordmark on light surfaces | Approved Option 7 source in the marketing repository | Reused without redrawing or recolouring. |
| `public/assets/brand/mantiva360-full-dark.svg` | Wordmark on navy surfaces | Approved Option 7 source in the marketing repository | Reused without redrawing or recolouring. |
| `public/assets/brand/mantiva360-compact-light.svg` | Favicon and compact light-surface mark | Approved Option 7 source | Decorative repetitions require empty alt text. |
| `public/assets/brand/mantiva360-compact-dark.svg` | Compact dark-surface mark | Approved Option 7 source | Not substituted for the full wordmark where brand recognition is needed. |
| `public/assets/images/mantiva360-social-v1.png` | 1200 by 630 social preview | Existing repository asset inspected | Review candidate. A platform preview check is still required. |

## Published product captures

Detailed crop provenance, hashes, dimensions, intended use and approval state are recorded in `docs/media-manifest.md`.

| Asset | Public treatment | Integrity result | Status |
|---|---|---|---|
| `cockpit-context-v2.webp` | Hero and Product page contextual view | Exact lossless crop. No value, state or control altered. OCR and visual inspection found no retired demonstration identity. | Review candidate |
| `cockpit-finding-v2.webp` | Cockpit tab and exception story | Exact lossless crop from the same Cockpit state. | Review candidate |
| `cockpit-recovery-v2.webp` | Progress and controlled-response detail | Exact lossless crop from the same Cockpit state. | Review candidate |
| `delivery-context-v2.webp` | Delivery Plan tab, Product page and SAP delivery page | Exact lossless crop. Scope, reporting context and selected activity are retained. | Review candidate |
| `cockpit-mobile-v2.webp` | Mobile hero and controlled-response detail | Exact lossless crop of the approved recovery view. | Review candidate |
| `cockpit-finding-mobile-v2.webp` | Mobile exception detail | Exact lossless crop of the approved finding view. | Review candidate |
| `delivery-mobile-v2.webp` | Mobile Delivery Plan detail | Exact lossless crop retaining the selected activity and decision context. | Review candidate |

The two uncropped source screenshots were removed from the deployable `public/` directory because their pixels contain a retired demonstration identity. Their source hashes and crop coordinates remain in `docs/media-manifest.md`, and the originals remain recoverable from Git history. An owner-controlled private source archive is still required.

Approved media does not yet cover Planning & Forecasts, actual allocation, RAID, Reporting, detailed Project Health, Controls Reconciliation or read-only assistance. The website describes those areas only where implementation evidence exists and does not present invented interface artwork.

## Video assets

| Video ID | Poster headline | Observed runtime | Loading treatment | Open item |
|---|---|---:|---|---|
| `XMQa-RB5fUU` | See the bigger picture. | approximately 0:31 | Homepage and Resources; click-to-load privacy-enhanced embed | Captions, transcript, audio, complete footage and end card require approval. |
| `QkCRdrASlAg` | From issue to action. | approximately 1:30 | Resources only; click-to-load privacy-enhanced embed | Captions, transcript, audio, complete footage and end card require approval. |
| `wEgHPeHhb7I` | Project control for SAP. | approximately 0:30 | Resources only; click-to-load privacy-enhanced embed | Captions, transcript, audio, complete footage and end card require approval. |

No YouTube iframe is present in the initial HTML. Each poster contains the approved logo, one headline, one action and a visible runtime. The JavaScript creates a privacy-enhanced player only after activation, removes it on close and keeps a direct YouTube fallback link.

## Excluded assets and claims

- No customer logo, testimonial, stock image, invented dashboard or AI-generated product interface is published.
- No patent notice is published. Exact approved wording and verifiable filing details were not supplied.
- No product capture is described as high definition merely because it was compressed or enlarged. CSS display widths are capped at or below half the source crop width where practical.
