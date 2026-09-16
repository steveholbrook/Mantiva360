# Quality review, 16 September 2026

The review uses the five criteria agreed for the website. Scores are deliberately not used because several launch properties require live infrastructure or physical-device evidence.

| Criterion | Status | Evidence | Remaining weakness |
|---|---|---|---|
| Brand and claim accuracy | Pass for source review | Canonical SVGs from the Mantiva360 product implementation; claim register; GOLD2 labels; personal account header removed from published screenshots. | All three YouTube films still require an end-to-end human content review against the live build. |
| Conversion clarity | Partial | Demo, video and guided-review actions are visibly distinct; the demo URL is centralised. | Demo access is not live-verified. Enquiry storage is intentionally disabled. |
| Media and accessibility | Partial | Semantic sections, keyboard tabs, labelled dialog, visible focus, reduced motion, responsive CSS and click-to-load video. | No physical iPhone or Android check, no automated browser accessibility scan and no caption audit in this build environment. |
| Domain and operational readiness | Not verified | Firebase configuration and a manual production workflow are present. | Firebase project, DNS, TLS, `www` redirect, public audience and rollback owner are not configured. |
| Performance and maintainability | Pass for static source | No framework payload, optimised local imagery, deferred YouTube iframe, central destinations, security headers and dependency-free tests. | Deployed response headers, CDN behaviour and Lighthouse metrics require a Firebase preview URL. |

## Release recommendation

Approve the source as the review candidate. Do not call the website launch-ready until demo access, enquiry handling, video content, Firebase preview, domains and physical-device checks are closed.
