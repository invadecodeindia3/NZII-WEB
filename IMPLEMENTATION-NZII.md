# NZII — execution contract (confirmed 9 October 2026)

## Decisions locked in
- Hosting: **existing** infrastructure; exact Linux runtime/credentials not yet supplied
- Geographic/sector coverage: **India, all six sector groups** (power, industry, transport, agriculture/land, finance/carbon, just transition)
- Live forms: **contact and newsletter only**; fellowship remains a demonstration form
- Approved notification recipient: **pending secure provisioning**
- Validation: **research-grade** with independent reviewer approval; no unvalidated outputs published as estimates
- Dataset budget: **free access sources only**, subject to publisher rights; no NZII-supplied datasets

## Built in PR #1
- Public-source registry (8 candidates), without invented record counts, downloads or audit status.
- Initial keyless World Bank ingestion adapter: raw JSON stored in `source_ingest_runs` with checksum, source URL and timestamps. It only stages records; the adapter is not scheduled or running.
- Backend API: `/api/v1/health`, `/api/v1/contact`, `/api/v1/newsletter`, `/api/v1/newsletter/confirm`.
- PostgreSQL schema with form records, newsletter consent/confirmation states, rate limits and source staging.
- Frontend contact/newsletter forms connected to API with errors instead of fabricated success.
- Environment variables documented; forms disabled by default.
- Automatic CI recipe for frontend build and backend Python syntax/import checks.

## Required deployment access
1. **Application runtime:** SSH, CI runner or deployment permissions to existing host; container support or Python 3.12 availability; approved storage for backups.
2. **Database:** PostgreSQL connection details/permissions, TLS policy, migration privileges and backups; secrets managed by deployment environment.
3. **Routing:** domain to host API; reverse proxy rule `/api` -> private Uvicorn port, HTTPS certificate and `ALLOWED_ORIGINS` configured to actual website origin.
4. **Email:** secure provisioning of `NOTIFICATION_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM`, email-domain SPF/DKIM/DMARC. Never commit or paste credentials into GitHub/chat.
5. **Privacy:** approved notice, newsletter consent record, retention/deletion periods, unsubscribe/withdrawal process, security owner and incident handling.
6. **Scientific review:** named suitably qualified expert, agreed benchmark datasets, GHG inventory vintage/methodology, uncertainty thresholds, and explicit release sign-off.
7. **Data acquisition:** confirm terms and rate limits for each chosen source, plus permissions where public download is gated.

## Release gates
- CI build succeeds; client and API integration tests pass; no false delivery messaging or exposed secrets.
- HTTPS, origin restrictions, rate limits and bot abuse controls confirmed by deployment operator.
- Contact tests: accepted when configured, rejected otherwise, notification delivered, database stored; false email sender and wrong-origin rejected.
- Newsletter tests: explicit consent, email token, expiry, unsubscribe and deletion request flows. **Unsubscribe endpoint must be implemented before campaigns**.
- Ingest tests: source unavailable/schema changed/no data/duplicate import; logs and failures; every item captures source and temporal version.
- Scientific: independently reviewed inventory references, emissions factor basis, representative benchmark comparisons and reproducibility package.
- Unverified content (partners, case studies, project results, certifications) is removed or labelled fictional independently from the source register.

## Not yet completed
No production server, DB, DNS, SMTP, running ingest worker, publisher licensing decision, deployed forms, CI run evidence or academic review was available within this session. Do not close implementation-related critical findings until those gates pass.
