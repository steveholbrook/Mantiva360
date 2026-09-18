# Mantiva360 five-question buyer journey design system

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

The approved Option 7 segmented circular symbol, Mantiva360 wordmark and `Data to Progress.` tagline are reused from the repository SVGs. The homepage uses the existing genuine product captures; Option 02 renderings remain on deeper Product and SAP delivery pages.

Typography uses one highly legible sans-serif stack, led by Inter where installed and followed by native system sans-serif faces. Body text starts at 18 pixels with 1.55 line height. Major desktop headings use fluid sizes up to approximately 72 pixels. Mobile hero headings resolve to approximately 42 pixels at the narrow breakpoint. Prose measures are generally capped at 60 to 68 characters.

The layout uses a 1,280-pixel maximum container, a 12-column desktop grid, 32-pixel desktop gutters, 24-pixel tablet gutters and 20-pixel mobile gutters. Section spacing is fluid within the 56 to 120-pixel target range. Core radii are 12 pixels for controls and cards and 18 pixels for media frames. Shadows are restrained and used to establish media depth, not decoration.

## Reusable components

| Component | Purpose | Accessibility and content rule |
|---|---|---|
| Site header | Four-item primary navigation plus one prioritised commercial action | Sticky without covering focused anchors; Get started opens the separate Mantiva360 application; Escape closes the mobile menu and restores focus. |
| Action hierarchy | Walkthrough, video, application and checklist paths | See how it works is the primary in-page action, Watch overview is secondary, Get started remains the separate application action and the checklist is the honest evaluation route. |
| Five-question navigation | Buying argument | Why change, current tools, Mantiva360, trust and timing are presented as buyer questions rather than a root-cause workshop. |
| Product proof | Four management-question views | Attention, Cause, Action and Impact use native ARIA tabs at every breakpoint. No auto-rotation. Arrow, Home and End keys are supported. |
| Art-directed capture | Legible product proof on narrow screens | Responsive `<picture>` sources use the existing mobile WebP crops and explicit intrinsic dimensions. |
| Video poster | One simple invitation per film | Approved logo, one headline, one play action and verified runtime. No iframe until activation. |
| Video dialog | Privacy-enhanced playback | Native modal focus handling, explicit close, Escape, outside-click close, focus restoration and direct YouTube fallback. |
| Controlled-action story | Four-step product workflow | Identifies exception, source, authorised correction and recalculated result without implying dashboard edits or automatic recovery. |
| Phase rail | SAP Activate context | Uses text rather than SAP logos and separates methodology alignment from endorsement or integration. |
| Editorial columns | Capability breadth | Three management responsibilities on the homepage; deeper Product coverage uses concise evidence-led cards and a boundary table. |
| FAQ | Detailed buyer objections | Native `details` and `summary` controls keep qualifications out of the hero while remaining keyboard accessible. |
| Evaluation panel | Honest next step | The checklist collects no details and implies no booking, duration, offer or result. The unavailable guided-review route is not promoted. |

## Interaction and motion

- Interactive targets are designed around a 44-pixel minimum.
- Links remain underlined or otherwise identifiable beyond colour.
- Focus uses a three-pixel outline that meets the tested non-text contrast requirement on light and navy surfaces.
- Transitions use 180 milliseconds by default and collapse under `prefers-reduced-motion`.
- There is no autoplay, scroll-jacking, automatic carousel or continuous decorative animation.
- Dialog video frames are created after an explicit action and removed when closed.

## Media integrity

Homepage capture dimensions, mobile crops and hashes are maintained in `docs/media-manifest.md`. Values, statuses, controls and capabilities are not retouched. Presentation framing remains outside the capture. The deeper-page Option 02 renderings retain their promotional labels and separate 720-pixel mobile compositions.
