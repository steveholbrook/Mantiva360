# Mantiva360 media manifest

Internal review record, 17 September 2026. Public media must use only approved fictional data and must not expose the retired internal demonstration identity.

The repository does not record the original capture date or a product build/version identifier for the supplied screenshots. Their scenario is an approved representative fictional project state. Capture date and product version therefore remain owner-supplied metadata blockers and are not inferred from file timestamps.

## Product captures

| Published asset | Source evidence | Exact crop | Native dimensions | Intended use | Alt-text intent | Approval state |
|---|---|---|---:|---|---|---|
| `cockpit-context-v2.webp` | Cockpit source SHA-256 `d93b3eaf...a972` | `1040x550+275+300` | 1040 × 550 | Homepage contextual hero | Project Health, control filters, attention queue and controlled-recovery context | Review candidate. Pixel inspection and OCR found no retired demo identity. |
| `cockpit-finding-v2.webp` | Cockpit source SHA-256 `d93b3eaf...a972` | `1010x350+285+500` | 1010 × 350 | Product showcase and corrective-action signal | Critical deliverable finding, impact and recommended correction | Review candidate. Pixel inspection and OCR found no retired demo identity. |
| `cockpit-recovery-v2.webp` | Cockpit source SHA-256 `d93b3eaf...a972` | `670x330+620+515` | 670 × 330 | Focused recovery explanation | Controlled-recovery guidance and source-engine verification boundary | Review candidate. Pixel inspection and OCR found no retired demo identity. |
| `delivery-context-v2.webp` | Delivery source SHA-256 `35f2bed...028` | `1050x740+270+100` | 1050 × 740 | Product showcase and Product page | Execution timeline with selected activity, evidence and next-action context | Review candidate. Pixel inspection and OCR found no retired demo identity. |
| `cockpit-mobile-v2.webp` | Cockpit source SHA-256 `d93b3eaf...a972`; derived through the approved recovery crop | Original-source coordinates `295x330+995+515` | 295 × 330 | Mobile hero and controlled-response detail | Controlled-recovery action, source correction and recalculation boundary | Review candidate. Exact lossless crop; visual inspection and OCR found no retired demo identity. |
| `cockpit-finding-mobile-v2.webp` | Cockpit source SHA-256 `d93b3eaf...a972`; derived through the approved finding crop | Original-source coordinates `330x270+290+575` | 330 × 270 | Mobile exception detail | Critical deliverable condition, impact and owner | Review candidate. Exact lossless crop; visual inspection and OCR found no retired demo identity. |
| `delivery-mobile-v2.webp` | Delivery source SHA-256 `35f2bed...028`; derived through the approved contextual crop | Original-source coordinates `420x740+900+100` | 420 × 740 | Mobile Delivery Plan detail | Selected activity, progress, schedule, action and evidence context | Review candidate. Exact lossless crop; visual inspection and OCR found no retired demo identity. |

The crops are deterministic pixel crops. No content, value, status, person, label or control was generated, removed, retouched or recoloured. Lossless WebP was selected to protect interface text. The mobile images are art-directed detail crops selected with responsive `<picture>` sources, with CSS widths capped to prevent upscaling.

The source screenshots are excluded from the Firebase `public/` payload because their uncropped pixels contain a retired internal demonstration identity. Their complete SHA-256 fingerprints are recorded in repository history. A private owner-controlled source archive remains required.

### Published-file integrity

| Asset | SHA-256 |
|---|---|
| `cockpit-context-v2.webp` | `a3e4bdd6d85fa540fcd6af5157798e19e8b0ef29cd56b174b42d277cbfe8a307` |
| `cockpit-finding-v2.webp` | `3e1718b2eedad8fbf4d9339c9bfcf36f3b51857648dcc4175afe1452f3751dca` |
| `cockpit-recovery-v2.webp` | `18e7f8982cd80ae28d282f0e4373d6a46edd73c3c2571eb76da54c0b95f5e5a8` |
| `delivery-context-v2.webp` | `ad15162a9410809dec5bf8092e7916b26c53b0a1a343aca93ded0d208dbe4cd5` |
| `cockpit-mobile-v2.webp` | `33f6fd2e9ca95d10372b84ed9241e3d09c5dfc8f091c5fcfb7ab9214b9b86c95` |
| `cockpit-finding-mobile-v2.webp` | `59869a742de364c31567df0b2e94452e9d8925d3509e3d513188ac062e4b019f` |
| `delivery-mobile-v2.webp` | `0b56405f73141ba0ab397d643d605cbf3b4d9f9e39e15b971bb027d87e1a6b49` |

## Brand and social media

| Asset | Purpose | Verification | Approval state |
|---|---|---|---|
| `mantiva360-full-light.svg` | Wordmark on light surfaces | Approved Option 7 source | Approved |
| `mantiva360-full-dark.svg` | Wordmark on dark surfaces | Approved Option 7 source | Approved |
| `mantiva360-compact-light.svg` | Compact mark on light surfaces | Approved Option 7 source | Approved |
| `mantiva360-compact-dark.svg` | Compact mark on dark surfaces | Approved Option 7 source | Approved |
| `mantiva360-social-v1.png` | 1200 × 630 social preview | Uses approved logo, palette and current positioning | Review candidate |

## Video inventory

| Video ID | Public poster title | Observed runtime | Loading treatment | Accessibility and content status |
|---|---|---:|---|---|
| `XMQa-RB5fUU` | See the bigger picture. | approximately 0:31 | Homepage feature and Resources library; click-to-load privacy-enhanced embed | Captions unavailable in prior review. Full audio, visual, identity and end-card audit required. |
| `QkCRdrASlAg` | From issue to action. | approximately 1:30 | Resources library only; click-to-load privacy-enhanced embed | Captions unavailable in prior review. Full audio, visual, identity and end-card audit required. |
| `wEgHPeHhb7I` | Project control for SAP. | approximately 0:30 | Resources library only; click-to-load privacy-enhanced embed | Captions unavailable in prior review. Full audio, visual, identity and end-card audit required. |

Posters are HTML and CSS surfaces with the approved logo, one headline, one play action and the verified runtime. No screenshot is used as a poster background.

## Missing media

Current approved captures do not provide a neutral, high-resolution view of Planning & Forecasts, Actuals and allocation, RAID, Reporting, Health detail, Reconciliation detail or read-only assistance. Those capabilities may be described only from verified implementation evidence and must not be presented as captured UI until approved media is supplied.
