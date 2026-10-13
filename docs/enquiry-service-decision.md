# Email contact route and future enquiry service

The user supplied `sales@mantiva360.com` on 13 October 2026 as the public destination for all website sales leads and contact. The website now exposes normal HTML `mailto:` links for sales, demo requests, general enquiries and privacy questions. Demo and privacy subjects identify the purpose while retaining the same recipient. Visitors can also copy the visible address into webmail.

Opening an email link does not send a message, submit a form or confirm a booking. The visitor sends the email through their email application. Website link checks do not verify external mailbox delivery or the owner response process; no test message has been sent.

Keep `enquiry.enabled` set to `false`: no server-side form handler is configured. The email route operates independently of this flag. The implementation below applies only to a future on-site form.

## Smallest suitable implementation

Use one same-origin HTTPS endpoint behind Firebase Hosting, implemented as a second-generation Firebase Function or equivalent Cloud Run service in the approved marketing project.

1. The browser submits JSON to `/api/enquiries` only after explicit response consent.
2. The service validates the exact schema, normalises text, enforces field lengths and rejects the honeypot field.
3. Proportionate abuse controls verify origin, apply a rate limit and use an approved bot signal. Do not rely on the honeypot alone.
4. The service applies an idempotency key so a retry cannot silently create duplicate leads.
5. The service writes to a dedicated server-only enquiry collection. Anonymous clients receive no database read or write access.
6. The response returns `{ "saved": true }` only after durable storage succeeds.
7. Notification is a separate retryable step. A notification failure must not delete or hide a saved lead.
8. Authorised staff retrieve enquiries through an authenticated owner process with access logging.
9. Scheduled retention removes records according to the approved period and records deletion outcomes.

## Decisions required before enablement

| Decision | Required answer |
|---|---|
| Hosting owner | Which Firebase or Google Cloud project owns the marketing endpoint and data? |
| Lead owner | Which monitored role or team is accountable for retrieving and responding to saved requests? |
| Notification route | Use `sales@mantiva360.com` as the recipient; verify delivery and define how failures are monitored. |
| Retention | How long are enquiry records retained, and who approves deletion exceptions? |
| Privacy contact | Public website contact is `sales@mantiva360.com`; define the internal owner for access, correction and deletion requests. |
| Abuse controls | Which rate-limit and bot-control service is approved for the public form? |
| Access | Which identities can read, export or delete enquiries, and how often is access reviewed? |
| Region | Which storage and processing region is approved and can be stated publicly? |
| Analytics | Whether non-personal conversion events are approved. Names, emails and free text must never enter analytics payloads. |

## Acceptance evidence

- valid request saved once;
- duplicate retry returns the original result without a second lead;
- invalid, oversized and automated requests are rejected safely;
- storage failure never shows success;
- notification failure preserves the saved lead and raises an operational alert;
- unauthorised reads and writes are denied;
- owner retrieval, deletion and audit evidence work;
- privacy wording matches the implemented service; and
- the marketing opt-in remains separate from permission to answer the enquiry.
