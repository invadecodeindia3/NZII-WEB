"""Independent-source staging + safely gated, consent-based contact/newsletter API.

No NZII-origin data, no public publication of unreviewed scientific output.
Set secrets outside git; route /api through a same-origin reverse proxy.
"""
import hashlib
import hmac
import logging
import os
import secrets
import smtplib
import ssl
from contextlib import contextmanager
from email.message import EmailMessage
from urllib.parse import quote
from datetime import datetime, timezone
from typing import Literal

import psycopg
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title="NZII independent data and forms", docs_url=None, redoc_url=None)
LOG = logging.getLogger(__name__)


def setting(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


def enabled(name: str) -> bool:
    return setting(name).lower() == "true"


@contextmanager
def db():
    url = setting("DATABASE_URL")
    if not url:
        raise HTTPException(status_code=503, detail="Database not configured")
    with psycopg.connect(url, connect_timeout=5) as conn:
        yield conn


def trusted_request(request: Request):
    allowed = {v.strip().rstrip("/") for v in setting("ALLOWED_ORIGINS").split(",") if v.strip()}
    if not allowed:
        raise HTTPException(503, "Origin allowlist not configured")
    origin = request.headers.get("origin", "").rstrip("/")
    # Reject cross-origin and missing-Origin state-changing browser requests.
    if origin not in allowed:
        raise HTTPException(403, "Origin not approved")


def throttle(conn, scope: str, request: Request, limit: int = 5):
    # TRUSTED proxy must overwrite X-Forwarded-For; do not trust client-supplied headers.
    client_ip = request.client.host if request.client else "unknown"
    secret = setting("RATE_LIMIT_SECRET")
    if len(secret) < 32:
        raise HTTPException(503, "Rate limiter key not configured")
    actor_hash = hmac.new(secret.encode(), client_ip.encode(), hashlib.sha256).hexdigest()
    record = conn.execute(
        """INSERT INTO request_throttle(scope,actor_hash) VALUES(%s,%s)
        ON CONFLICT(scope,actor_hash) DO UPDATE SET
        attempts=CASE WHEN request_throttle.window_start < NOW()-INTERVAL '1 hour'
                      THEN 1 ELSE request_throttle.attempts+1 END,
        window_start=CASE WHEN request_throttle.window_start < NOW()-INTERVAL '1 hour'
                          THEN NOW() ELSE request_throttle.window_start END
        RETURNING attempts""", (scope, actor_hash)).fetchone()
    if record[0] > limit:
        raise HTTPException(429, "Rate limit exceeded. Try again later.")


def send_message(recipient: str, subject: str, body: str):
    host = setting("SMTP_HOST")
    username = setting("SMTP_USERNAME")
    password = setting("SMTP_PASSWORD")
    sender = setting("SMTP_FROM")
    if not all([host, username, password, sender]):
        raise HTTPException(503, "Email delivery not configured")
    mail = EmailMessage()
    mail["From"] = sender
    mail["To"] = recipient
    mail["Subject"] = subject
    mail.set_content(body)
    context = ssl.create_default_context()
    with smtplib.SMTP(host, int(setting("SMTP_PORT", "587")), timeout=12) as smtp:
        smtp.starttls(context=context)
        smtp.login(username, password)
        smtp.send_message(mail)


class Contact(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    organization: str = Field(default="", max_length=160)
    inquiryType: str = Field(min_length=2, max_length=100)
    message: str = Field(min_length=10, max_length=10000)


class Newsletter(BaseModel):
    email: EmailStr
    consent: Literal[True]


@app.get("/api/v1/health")
def health():
    return {"status": "ok", "forms_active": enabled("FORMS_ENABLED"), "data_status": "staging_only"}


@app.post("/api/v1/contact", status_code=202)
def contact(form: Contact, request: Request):
    trusted_request(request)
    recipient = setting("NOTIFICATION_TO")
    if not enabled("FORMS_ENABLED") or not recipient:
        raise HTTPException(503, "Contact form is not yet accepting submissions")
    with db() as conn:
        throttle(conn, "contact", request)
        # Deliver before accepting. If email fails, the transaction rolls back.
        send_message(recipient, "NZII contact inquiry", (
            f"Name: {form.name}\nEmail: {form.email}\nOrganization: {form.organization}\n"
            f"Inquiry: {form.inquiryType}\n\n{form.message}"
        ))
        conn.execute(
            "INSERT INTO contact_inquiries(name,email,organization,inquiry_type,message) VALUES(%s,%s,%s,%s,%s)",
            (form.name, str(form.email), form.organization, form.inquiryType, form.message))
    return {"status": "accepted"}


@app.post("/api/v1/newsletter", status_code=202)
def newsletter(form: Newsletter, request: Request):
    trusted_request(request)
    base = setting("PUBLIC_SITE_URL").rstrip("/")
    if not enabled("FORMS_ENABLED") or not base or not setting("SMTP_HOST"):
        raise HTTPException(503, "Newsletter confirmation not yet configured")
    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    with db() as conn:
        throttle(conn, "newsletter", request, limit=4)
        current = conn.execute("SELECT status FROM newsletter_subscriptions WHERE email=%s", (str(form.email),)).fetchone()
        if current and current[0] == "active":
            return {"status": "confirmation_pending"}  # prevent address enumeration
        confirmation_url = f"{base}/api/v1/newsletter/confirm?token={quote(token)}&email={quote(str(form.email))}"
        send_message(str(form.email), "Confirm your NZII newsletter signup", (
            "You requested NZII research updates. Confirm your subscription using this link:\n"
            f"{confirmation_url}\n\nIf you did not request this, ignore this email."
        ))
        conn.execute(
            """INSERT INTO newsletter_subscriptions(email,status,token_hash,consent_at)
            VALUES(%s,'pending',%s,NOW()) ON CONFLICT(email) DO UPDATE SET
            status='pending', token_hash=EXCLUDED.token_hash, consent_at=NOW(), confirmed_at=NULL""",
            (str(form.email), token_hash))
    return {"status": "confirmation_pending"}


@app.get("/api/v1/newsletter/confirm")
def newsletter_confirm(token: str, email: EmailStr):
    if len(token) > 256:
        raise HTTPException(400, "Invalid token")
    digest = hashlib.sha256(token.encode()).hexdigest()
    with db() as conn:
        row = conn.execute(
            """UPDATE newsletter_subscriptions SET status='active',token_hash=NULL,
            confirmed_at=NOW() WHERE email=%s AND token_hash=%s AND status='pending'
            AND consent_at > NOW()-INTERVAL '48 hours' RETURNING id""",
            (str(email), digest)).fetchone()
        if not row:
            raise HTTPException(400, "Confirmation expired or already used")
    return RedirectResponse(setting("PUBLIC_SITE_URL").rstrip("/") + "/?newsletter=confirmed", status_code=303)
