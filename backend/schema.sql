-- Requires PostgreSQL 15+ and an application role with limited permissions.
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  organization VARCHAR(160),
  inquiry_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(254) NOT NULL UNIQUE,
  status VARCHAR(24) NOT NULL CHECK(status IN ('pending','active','unsubscribed')),
  token_hash VARCHAR(64),
  consent_at TIMESTAMPTZ NOT NULL,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS request_throttle (
  scope VARCHAR(40) NOT NULL,
  actor_hash VARCHAR(64) NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  attempts INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (scope, actor_hash)
);
CREATE TABLE IF NOT EXISTS source_ingest_runs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_id VARCHAR(64) NOT NULL,
  source_url TEXT NOT NULL,
  retrieved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sha256 VARCHAR(64) NOT NULL,
  rows_loaded INTEGER NOT NULL,
  state VARCHAR(32) NOT NULL DEFAULT 'staged',
  license_review VARCHAR(32) NOT NULL DEFAULT 'pending',
  scientific_review VARCHAR(32) NOT NULL DEFAULT 'pending',
  raw_payload JSONB NOT NULL,
  CHECK (state IN ('staged','rejected','approved'))
);
CREATE INDEX IF NOT EXISTS ix_source_ingest_runs_source ON source_ingest_runs(source_id, retrieved_at DESC);
