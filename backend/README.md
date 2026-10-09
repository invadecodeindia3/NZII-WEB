# NZII independent backend — implementation scaffold

## Deployment prerequisites
1. Choose an existing Linux runtime able to reach PostgreSQL 15+, an outbound SMTP submission server and approved HTTPS source hosts.
2. Use a DNS hostname under an approved domain, HTTPS with automatic certificate renewal, and a reverse proxy for same-origin `/api`.
3. Provision PostgreSQL with a **least-privilege** app role and encryption-at-rest/backup policy. Apply `schema.sql` using a migration administrator.
4. Configure environment variables from `.env.example` **outside git**. Keep `FORMS_ENABLED=false` until `NOTIFICATION_TO`, SMTP, origin and consent policies have been verified end-to-end.
5. Install in a venv: `pip install -r backend/requirements.txt`; start `uvicorn backend.app:app --host 127.0.0.1 --port 8080` behind the reverse proxy. Bind internally, not to the public Internet.
6. Forward only trusted ingress IP information. Proxy should filter request size, TLS, method, rate limit and bot challenges. Set firewall deny by default. Configure CSP/CORS outside this API as applicable.
7. Deploy website with `VITE_NZII_API_BASE` unset for same-origin or pointing to the approved HTTPS endpoint.

## Forms and privacy
- Contact persists submissions only when SMTP succeeds; without verified recipient, endpoint fails closed (503).
- Newsletter requires explicit consent, sends an email confirmation link, stores status pending until confirmed. Confirmation token expires after 48 hours.
- Do not activate newsletters without privacy notice, data-retention and deletion policy, opt-out/unsubscribe endpoint (not implemented), and review of applicable privacy law. In particular, do not send campaigns yet.
- The app must be configured to use an address hosted and controlled by the team, **not an unverified email displayed in prototype content**.
- Current throttling is IP hash and uses DB; add edge rate limiting and abuse monitoring.
- Use database-transactional outbox and background worker for high-volume mail; this initial endpoint performs SMTP synchronously.

## Independent data pipeline
- Initial World Bank adapter `python -m backend.ingest_worldbank` uses public HTTPS and writes only `staged` records to PostgreSQL.
- No NZII-supplied data is read. Every run records original URL, checksum, retrieval time, raw payload and row count.
- Approval must include license review, extraction tests, units, geography/time period, source conflict resolution, uncertainty and independent scientific sign-off.
- Other source catalogue providers need individual connectors, export permissions, availability and scraping-policy assessments. Never describe the register itself as ingested data.
- Schedule the adapter via existing `systemd` timer or cron only after a first manual verification. Enforce source request ceilings and alert on schema drift.

## Model validation gates
1. Document each input source, license, vintage, GWP basis, unit conversions and denominator.
2. Write reproducible baseline and regression tests using independently published totals.
3. Verify sector aggregation and avoid mixing inventory methodology with facility-level modeled estimates.
4. Include uncertainty and sensitivity analysis; independent domain reviewer must approve reports.
5. Only approved datasets/results can be served to public dashboards. Until then, keep simulator outputs labelled fictional/illustrative.

## Access required (not supplied in chat)
- Existing infrastructure access or deployment authority for backend/PostgreSQL and DNS/TLS/reverse proxy
- Named receiving inbox; provider SMTP credentials/API secret via encrypted secret manager (never chat or repo)
- Existing website deployment settings; correct origin and domain
- Privacy and retention approval, newsletter unsubscribe/confirmation email sender identity
- Qualified scientific reviewer and written approval criteria

## Known limitations
This is implementation scaffolding and a starter ingestion adapter, **not** a live production service. No tests, infrastructure provisioning, recipient verification or scientific audit have yet been completed. Schema is not applied to any server.
