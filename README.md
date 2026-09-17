# Mantiva360 marketing website

Public marketing website source for **Mantiva360**, designed for `https://mantiva360.com` and Firebase Hosting. The separate product and demonstration destination is `https://mantiva360.app`.

The site uses the approved Mantiva360 Option 7 production identity, the white-led Executive Confidence system, focused product captures with fictional project data, three supplied YouTube videos and evidence-led SAP Activate positioning.

Implementation base: `main` merge commit `c47ad1967f887830ee7f88247ee6320872951956`, inspected on 17 September 2026. The implementation is on `review/world-class-executive-confidence-2026-09-17` and has not been deployed.

## Important architecture correction

Firebase Hosting serves the website. Cloud Firestore is a database and must not be described as the web host.

The repository intentionally contains no Firebase credentials, customer data, enquiry records, access tokens or product-application source. The Mantiva360 application remains separate.

## Current status

| Area | Status |
|---|---|
| Homepage, Product, SAP delivery, Resources and privacy pages | Implemented in the Executive Confidence review build |
| Responsive CSS and art direction | Breakpoints cover 320, 390, 720, 768, 900, 1120 and 1440 pixel contexts; managed rendered, Safari and physical-device checks remain |
| Supplied YouTube content | Click-to-load privacy-enhanced embeds; all three currently report captions unavailable |
| Product captures | Lossless Focus Lens crops retain genuine interface content; mobile views use separate exact detail crops and the deployable directory excludes identifying source pixels |
| Firebase Hosting configuration | Ready for a selected Firebase project |
| Guided-review form | Hidden until a protected endpoint and owner retrieval process are verified |
| `mantiva360.com` live behaviour | Returned HTTP 200 with TLS during inspection; this review branch is not deployed there |
| `www.mantiva360.com` redirect | Must be configured against the exact Firebase domain instructions |
| `mantiva360.app` demo access | Linked, but returned HTTP 502 in two independent checks on 17 September 2026; user reachability must be verified separately |

## Local preview

Requirements: Node.js 22 or later and Python 3.

```bash
npm test
npm run validate
npm run dev
```

Open `http://localhost:4173`.

## Core configuration

Edit `public/assets/js/site-config.js` for shared runtime destinations.

```js
demoUrl: "https://mantiva360.app/"
```

The three supplied videos are configured once in the same file:

- short overview: `XMQa-RB5fUU`
- full product story: `QkCRdrASlAg`
- SAP delivery: `wEgHPeHhb7I`

Do not enable enquiry submission until its endpoint has passed persistence, access, spam, privacy and owner-retrieval checks. The page requires `{ "saved": true }` from the endpoint before it shows success.

## Firebase Hosting deployment

1. Create or select the Firebase project that will own the marketing site. A separate marketing project is safest if the current product Firebase project contains application data.
2. In Firebase Console, enable Hosting and note the exact project ID.
3. Copy `.firebaserc.example` to `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID` locally. `.firebaserc` is ignored by Git.
4. Install the official Firebase CLI, authenticate with the correct account and run a preview deployment first.

```bash
npm install --global firebase-tools
firebase login
firebase use YOUR_FIREBASE_PROJECT_ID
firebase hosting:channel:deploy review
```

5. Review the temporary channel on desktop and mobile. Run the launch checklist in `docs/launch-checklist.md`.
6. Deploy live only after approval.

```bash
firebase deploy --only hosting
```

Firebase Hosting provides CDN delivery, SSL and custom-domain support. Follow the exact domain records returned for this specific Firebase project. Do not copy DNS values from another project.

Official reference: [Firebase Hosting](https://firebase.google.com/docs/hosting)

## GitHub deployment workflow

The production workflow is manual by design. It will not publish merely because code was pushed.

Configure these repository settings before running `Deploy Firebase Hosting`:

- repository variable: `FIREBASE_PROJECT_ID`
- repository secret: `FIREBASE_SERVICE_ACCOUNT_MANTIVA360`
- protected GitHub environment: `production`, with approval if available

Generate the service-account payload through the Firebase GitHub integration or a least-privilege Google Cloud service account. Never paste it into a tracked file.

## Custom domains

After the Firebase review URL passes acceptance:

1. Add `mantiva360.com` to the exact Hosting site selected for this repository.
2. Copy only the ownership-verification and routing records Firebase displays.
3. Preserve MX records and unrelated subdomains.
4. Wait for Firebase to report domain ownership and SSL as active.
5. Add `www.mantiva360.com` as a redirect to `https://mantiva360.com` using Firebase’s supported domain workflow.
6. Verify both addresses in a signed-out browser and confirm the canonical metadata points to the apex address.

Do not change nameservers or remove an existing apex service without confirming what it currently hosts.

## Guided-review form

The form is not shown while the endpoint is disabled. Visitors see an explicit status panel explaining that no contact details are collected or sent.

Before enabling it, implement a same-origin, server-side Firebase Function or Cloud Run endpoint with:

- strict schema and length validation;
- bot and rate-limit controls;
- Firebase App Check or an equivalent abuse control;
- create-only server access to a dedicated enquiry collection;
- no public reads;
- confirmed persistence before `{ "saved": true }` is returned;
- an owner retrieval and monitoring process;
- retention and deletion rules; and
- an updated privacy contact and notice.

Do not write directly from the anonymous browser to a broadly writable Firestore collection.

See `docs/enquiry-service-decision.md` for the smallest suitable service design, required owner and privacy decisions, and acceptance evidence.

## Content boundaries

- Mantiva360 is positioned as a project-control and assurance layer, not a rip-and-replace execution suite.
- SAP Activate phase alignment is described without claiming SAP endorsement or certification.
- SAP Cloud ALM, Jira, Microsoft Project, finance and document platforms are referenced as toolchain categories. Native integrations are not claimed.
- AI assists interpretation and navigation. Deterministic services calculate status and reconciliation.
- Actual effort and cost do not automatically create earned progress.
- Published product captures use fictional project data and exclude identifying demonstration detail.
- The four-step exception story does not promise one-click remediation; status changes only when the underlying governed records change and controls recalculate.

See `docs/change-summary.md` for the implementation handoff, `docs/design-system.md` for tokens and components, `docs/content-and-claims-register.md` for the maintained claim register and `docs/media-manifest.md` for product-image and video provenance.

## Repository layout

```text
public/                   Firebase Hosting root
  assets/brand/           Canonical Mantiva360 SVG assets
  assets/images/          Optimised product and marketing imagery
  assets/js/              Shared destinations and interactions
  product/                Product route
  sap-delivery/           SAP delivery route
  resources/              Video and evaluation resources route
  privacy/                Privacy route
scripts/                  Static validation
tests/                    Node-based content and safety tests
docs/                     Launch, claims and quality handoff
.github/workflows/        Quality and manual Firebase deployment
firebase.json             Hosting and security-header configuration
```

## Rollback

Firebase Hosting keeps release history and supports rollback. Before changing DNS or the live channel, retain the last approved release ID and confirm who is authorised to roll back.
