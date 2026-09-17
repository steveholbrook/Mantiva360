# Mantiva360 marketing asset register

Reviewed 17 September 2026 against implementation baseline `8ab7560f7d63f76152a445b690d88cf377a5dc59`.

| Asset | Public treatment | Verification | Boundary or open item |
|---|---|---|---|
| `public/assets/brand/mantiva360-full-light.svg` | Primary wordmark on light surfaces | Repository-approved Option 7 identity | Do not redraw or substitute. |
| `public/assets/brand/mantiva360-full-dark.svg` | Wordmark on dark surfaces | Repository-approved Option 7 identity | Do not redraw or substitute. |
| `public/assets/brand/mantiva360-compact-light.svg` and `mantiva360-compact-dark.svg` | Compact symbol and favicon use | Repository-approved Option 7 identity | Decorative repetitions use empty alt text. |
| `cockpit-red-v1.webp` | Source for the Focus Lens hero, cockpit proof and three-step product story | Dimensions and visible content inspected; no credentials or customer data observed | Published CSS crops exclude navigation and identifying demo-project detail. Visible status and finding values are unchanged. |
| `delivery-plan-v1.webp` | Source for the focused delivery-context view | Visible content inspected | The published crop excludes identifying demo-project detail and retains the selected execution timeline and activity context. |
| `mantiva360-social-v1.png` | Existing social preview image | Preserved from the approved source | Social-card refresh was not requested. |
| `XMQa-RB5fUU` | 30-second overview | Live YouTube title: `Mantiva360 SAP Promo 30s`; player reported about 31 seconds | Captions unavailable. Audio, complete visual claims and end-card destination require human review. |
| `QkCRdrASlAg` | 90-second product story | Live YouTube title: `Mantiva360 SAP Made Simple`; player reported 1 minute 30 seconds | Captions unavailable. Audio, complete visual claims and end-card destination require human review. |
| `wEgHPeHhb7I` | 30-second SAP delivery overview | Live YouTube title: `Mantiva360 SAP Promo 30s`; player reported 30 seconds | Captions unavailable. Audio, complete visual claims and end-card destination require human review. |

## Media loading notes

- No YouTube iframe is present in the initial HTML.
- The player is created only after a visitor chooses a video and is removed when the dialog closes.
- Video posters are CSS-rendered brand surfaces with one headline and one action; no raster poster or product screenshot is presented as the video frame.
- The live marketing origin loaded the privacy-enhanced player. Direct no-referrer checks returned YouTube Error 153, which is not treated as proof that embedding is disabled.
- A direct YouTube link remains available when an embed is blocked.

## Excluded asset or claim

No provisional-patent reference has been published. The exact approved IP Australia reference and public wording were not supplied in this repository, so adding a patent or patent-pending claim would be unsupported.
