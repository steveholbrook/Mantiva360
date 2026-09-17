# Mantiva360 product panorama design system

Internal implementation summary, 17 September 2026.

## Foundations

| Token | Value | Use |
|---|---|---|
| Brand navy | `#0B2239` | Hierarchy, primary actions and one major dark section |
| Brand blue | `#1268B3` | Links and navigational emphasis |
| Brand teal | `#139A9A` | Restrained geometric and control accents |
| Brand green | `#62B44B` | Minor identity accent only, never a universal health signal |
| Ice | `#EAF4FA` | Light emphasis surfaces |
| Page | `#F7F9FB` | Alternate page sections |
| Body text | `#172536` | Primary copy |
| White | `#FFFFFF` | Dominant surface |

The approved Option 7 segmented circular symbol, Mantiva360 wordmark and `Data to Progress.` tagline are reused from the repository SVGs. Product status colours remain inside genuine captures and are not recoloured to match the marketing palette.

Typography uses one highly legible sans-serif stack, led by Inter where installed and followed by native system sans-serif faces. Body text starts at 18 pixels with 1.55 line height. Major desktop headings use fluid sizes up to approximately 72 pixels. Mobile hero headings resolve to approximately 42 pixels at the narrow breakpoint. Prose measures are generally capped at 60 to 68 characters.

The layout uses a 1,280-pixel maximum container, a 12-column desktop grid, 32-pixel desktop gutters, 24-pixel tablet gutters and 20-pixel mobile gutters. Section spacing is fluid within the 56 to 120-pixel target range. Core radii are 12 pixels for controls and cards and 18 pixels for media frames. Shadows are restrained and used to establish media depth, not decoration.

## Reusable components

| Component | Purpose | Accessibility and content rule |
|---|---|---|
| Site header | Four-item primary navigation plus one prioritised commercial action | Sticky without covering focused anchors; Get started opens the separate Mantiva360 application; Escape closes the mobile menu and restores focus. |
| Action hierarchy | Application, video and guided-review paths | Get started is the primary action, Watch overview is secondary and the lower guided-review route remains clearly separate. |
| Focus Lens frame | Contextual or focused genuine product evidence | One substantial capture, at most two callouts, no perspective distortion or invented overlay metrics. |
| Product panorama | Four management-question views | Attention, Cause, Action and Impact use native ARIA tabs at every breakpoint. The narrow layout uses a touch-scrollable tab rail. No auto-rotation. Arrow, Home and End keys are supported. |
| Art-directed capture | Legible product proof on narrow screens | Responsive `<picture>` sources use exact mobile crops and explicit dimensions. CSS prevents upscaling. |
| Video poster | One simple invitation per film | Approved logo, one headline, one play action and verified runtime. No iframe until activation. |
| Video dialog | Privacy-enhanced playback | Native modal focus handling, explicit close, Escape, outside-click close, focus restoration and direct YouTube fallback. |
| Controlled-action story | Four-step product workflow | Identifies exception, source, authorised correction and recalculated result without implying dashboard edits or automatic recovery. |
| Phase rail | SAP Activate context | Uses text rather than SAP logos and separates methodology alignment from endorsement or integration. |
| Editorial columns | Capability breadth | Three management responsibilities on the homepage; deeper Product coverage uses concise evidence-led cards and a boundary table. |
| FAQ | Detailed buyer objections | Native `details` and `summary` controls keep qualifications out of the hero while remaining keyboard accessible. |
| Guided-review panel | Primary commercial route | Form remains hidden while the endpoint is disabled. The visible state explains the blocker and cannot display false success. |

## Interaction and motion

- Interactive targets are designed around a 44-pixel minimum.
- Links remain underlined or otherwise identifiable beyond colour.
- Focus uses a three-pixel outline that meets the tested non-text contrast requirement on light and navy surfaces.
- Transitions use 180 milliseconds by default and collapse under `prefers-reduced-motion`.
- There is no autoplay, scroll-jacking, automatic carousel or continuous decorative animation.
- Dialog video frames are created after an explicit action and removed when closed.

## Media integrity

Desktop contextual captures are displayed at approximately half their native width where practical. Narrow layouts receive focused lossless crops rather than a scaled-down desktop interface. Every capture is labelled as genuine product evidence using representative fictional data. Exact provenance and crop coordinates are maintained in `docs/media-manifest.md`.
