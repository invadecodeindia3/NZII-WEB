"""Keyless free-source starter adapter. Stages raw World Bank API pages, never auto-publishes.

Run after schema migration: python -m backend.ingest_worldbank
Use an outbound allowlisted HTTPS connection; pin source/indicator codes in reviews.
"""
import hashlib
import json
from datetime import datetime, timezone

import httpx
from backend.app import db

INDICATORS = ["EG.FEC.RNEW.ZS", "EN.GHG.CO2.MT.CE.AR5"]
BASE = "https://api.worldbank.org/v2/country/IND/indicator/"


def parse_pages(indicator, transport=None):
    # Fixed hostname and allowlisted indicators avoid user-controlled HTTP targets.
    assert indicator in INDICATORS
    with httpx.Client(timeout=20, follow_redirects=False, transport=transport) as client:
        page = 1
        rows = []
        while True:
            response = client.get(BASE + indicator, params={"format": "json", "per_page": 500, "page": page})
            response.raise_for_status()
            metadata, items = response.json()
            if not isinstance(items, list) or "pages" not in metadata:
                raise ValueError("Unexpected World Bank API response")
            rows.extend({
                "country": "IND", "indicator": indicator, "year": item["date"],
                "value": item["value"], "unit": item.get("unit", ""),
                "source_id": item.get("source", {}).get("id") if isinstance(item.get("source"), dict) else item.get("source"),
            } for item in items if item.get("value") is not None and str(item.get("date","")).isdigit())
            if page >= int(metadata["pages"]):
                break
            page += 1
            if page > 100: raise ValueError("Unexpected page count")
    return rows


def ingest():
    for indicator in INDICATORS:
        rows = parse_pages(indicator)
        payload = json.dumps(rows, separators=(",", ":"), sort_keys=True)
        digest = hashlib.sha256(payload.encode()).hexdigest()
        with db() as conn:
            exists = conn.execute(
                "SELECT 1 FROM source_ingest_runs WHERE source_id=%s AND sha256=%s",
                (f"worldbank:{indicator}", digest)).fetchone()
            if exists:
                print(f"{indicator}: unchanged")
                continue
            conn.execute(
                """INSERT INTO source_ingest_runs(source_id,source_url,sha256,rows_loaded,raw_payload)
                VALUES(%s,%s,%s,%s,%s::jsonb)""",
                (f"worldbank:{indicator}", BASE + indicator, digest, len(rows), payload))
        print(f"{indicator}: staged {len(rows)} independently sourced records; NOT published")


if __name__ == "__main__":
    ingest()
