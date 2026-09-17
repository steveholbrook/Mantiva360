# Mantiva360 marketing website

Public marketing website source for **Mantiva360**, designed for `https://mantiva360.com` and Firebase Hosting. The separate product and demonstration destination is `https://mantiva360.app`.

The site uses the approved Mantiva360 Option 7 production identity, a white-led Executive Confidence direction, genuine published product captures, three supplied YouTube videos and evidence-led SAP Activate positioning. The homepage answers five buyer questions: why change, why not keep the current tools, why Mantiva360, why trust it and why act now. The deeper Product and SAP delivery pages retain the approved Option 02 promotional renderings.

## Important architecture correction

Firebase Hosting serves the website. Cloud Firestore is a database and must not be described as the web host.

The repository intentionally contains no Firebase credentials, customer data, enquiry records, access tokens or product-application source. The Mantiva360 application remains separate.

## Current status

| Area | Status |
|---|---|
| Homepage, Product, SAP delivery, Resources and privacy pages | Implemented; the review homepage uses the five-question buyer narrative and keeps the existing deep routes |
| Responsive CSS and art direction | The homepage adds 540, 820 and 1050 pixel breakpoints and genuine mobile crops; managed preview, Safari and physical-device checks remain |
| Supplied YouTube content | Click-to-load privacy-enhanced embeds; all three currently report captions unavailable |
| Product visuals | Homepage uses the existing genuine WebP captures with responsive mobile crops; deeper pages retain the disclosed Option 02 promotional SVGs |
| Firebase Hosting configuration | Ready for a selected Firebase project |
| Guided-review route | Not promoted and no public form is rendered until a protected endpoint, approved owner and retrieval process are verified |
| `mantiva360.com` live behaviour | Returned HTTP 200 with TLS during inspection; this review branch is not deployed there |
| `www.mantiva360.com` redirect | Must be configured against the exact Firebase domain instructions |
| `mantiva360.app` application access | Every Get started action links to this separate destination; the application will be configured separately |

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
overviewVideoId: "XMQa-RB5fUU"
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

The production workflow is manual by design. Pull requests receive an isolated Firebase preview, but a production publish still requires the production workflow.

Configure these repository settings before running `Deploy Firebase Hosting`:

- repository variable: `FIREBASE_PROJECT_ID`
- repository secret: `FIREBASE_SERVICE_ACCOUNT_MANTIVA360`
- protected GitHub environment: `production`, with approval if available

Generate the service-account payload through the Firebase GitHub integration or a least-privilege Google Cloud service account. Never paste it into a tracked file.

### Keyless deployment migration

The current production workflow still uses the encrypted service-account JSON secret. Replace it with short-lived GitHub OpenID Connect credentials before deleting that secret.

Run the one-time bootstrap script from Google Cloud Shell while signed in as a project owner:

```bash
git clone https://github.com/steveholbrook/Mantiva360.git
cd Mantiva360
bash scripts/bootstrap-firebase-wif.sh
```

The script refuses service-account authentication. It creates a Workload Identity Federation provider restricted to this repository's immutable numeric ID, the owner's numeric ID, the `main` branch and the protected `production` environment. It grants only `roles/iam.workloadIdentityUser` on the existing Firebase deployment service account.

After the keyless production workflow completes successfully, revoke the old Google Cloud service-account key and remove `FIREBASE_SERVICE_ACCOUNT_MANTIVA360` from GitHub. Do not delete either credential before that verification deployment passes.

## Custom domains

After the Firebase review URL passes acceptance:

1. Add `mantiva360.com` to the exact Hosting site selected for this repository.
2. Copy only the ownership-verification and routing records Firebase displays.
3. Preserve MX records and unrelated subdomains.
4. Wait for Firebase to report domain ownership and SSL as active.
5. Add `www.mantiva360.com` as a redirect to `https://mantiva360.com` using Firebase’s supported domain workflow.
6. Verify both addresses in a signed-out browser and confirm the canonical metadata points to the apex address.

Do not change nameservers or remove an existing apex service without confirming what it currently hosts.

## Guided-review route

No public form or booking action is rendered while the endpoint is disabled. The one-decision evaluation checklist is available without collecting contact details, and the homepage states that the guided-review route is not open.

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
- Homepage product visuals are the existing published captures and preserve their recorded values, statuses and controls. Deeper-page Option 02 visuals remain disclosed promotional renderings based on inspected live screens.
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
