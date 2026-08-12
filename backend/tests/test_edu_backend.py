"""Backend tests specific to the /vzdelavani (edu) CMS extensions.
Covers: login, content roundtrip, image upload+serve, doc upload+serve, 415 handling."""
import io
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
BASE_URL = (BASE_URL or "").rstrip("/")
PW = "venku-admin-2026"
HDR = {"X-Admin-Password": PW}


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# ---- Login ----
def test_login_ok(s):
    r = s.post(f"{BASE_URL}/api/admin/login", json={"password": PW}, timeout=20)
    assert r.status_code == 200 and r.json().get("ok") is True


def test_login_wrong(s):
    r = s.post(f"{BASE_URL}/api/admin/login", json={"password": "x"}, timeout=20)
    assert r.status_code == 401


# ---- GET /api/content baseline ----
def test_get_content(s):
    r = s.get(f"{BASE_URL}/api/content", timeout=20)
    assert r.status_code == 200
    assert isinstance(r.json(), dict)


# ---- PUT /api/admin/content roundtrip with edu payload ----
def test_put_edu_roundtrip(s):
    # Read current content, patch edu, verify roundtrip, then RESTORE.
    current = s.get(f"{BASE_URL}/api/content", timeout=20).json() or {}
    original_edu = current.get("edu")  # may be None -> means "not present"
    payload = {k: v for k, v in current.items() if k not in ("updated_at",)}
    payload["edu"] = {
        "hero": {"title": {"cz": "TEST_HERO", "en": "TEST_HERO"}},
        "categories": [{"id": "cat-test", "slug": "test-cat", "name": {"cz": "T", "en": "T"}, "order": 1}],
        "programs": [{
            "id": "prog-test", "slug": "test-prog", "categoryId": "cat-test",
            "title": {"cz": "TEST_PROG", "en": "TEST_PROG"}, "status": "published",
            "featured": True, "order": 1,
        }],
    }
    try:
        r = s.put(f"{BASE_URL}/api/admin/content", json=payload, headers=HDR, timeout=20)
        assert r.status_code == 200, r.text
        g = s.get(f"{BASE_URL}/api/content", timeout=20).json()
        assert g["edu"]["categories"][0]["slug"] == "test-cat"
        assert g["edu"]["programs"][0]["slug"] == "test-prog"
    finally:
        # Restore. If edu wasn't originally there, remove it from the payload.
        restore = {k: v for k, v in current.items() if k not in ("updated_at",)}
        if original_edu is None:
            restore.pop("edu", None)
        else:
            restore["edu"] = original_edu
        s.put(f"{BASE_URL}/api/admin/content", json=restore, headers=HDR, timeout=20)


def test_put_edu_no_header(s):
    r = s.put(f"{BASE_URL}/api/admin/content", json={"edu": {}}, timeout=20)
    assert r.status_code == 401


# ---- Image upload ----
PNG = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xcf\xc0\x00\x00\x00\x03\x00\x01"
    b"[\xe6\x0b\xf6\x00\x00\x00\x00IEND\xaeB`\x82"
)


def test_upload_image_and_serve(s):
    files = {"file": ("test.png", io.BytesIO(PNG), "image/png")}
    r = s.post(f"{BASE_URL}/api/admin/upload", headers=HDR, files=files, timeout=30)
    assert r.status_code == 200, r.text
    url = r.json()["url"]
    assert url.startswith("/api/files/")
    fr = s.get(f"{BASE_URL}{url}", timeout=20)
    assert fr.status_code == 200
    assert fr.headers.get("content-type", "").startswith("image/png")


def test_upload_image_wrong_type(s):
    files = {"file": ("bad.exe", io.BytesIO(b"MZ"), "application/octet-stream")}
    r = s.post(f"{BASE_URL}/api/admin/upload", headers=HDR, files=files, timeout=20)
    assert r.status_code == 415


# ---- Doc upload (PDF) ----
PDF = b"%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF"


def test_upload_pdf_and_serve(s):
    files = {"file": ("doc.pdf", io.BytesIO(PDF), "application/pdf")}
    r = s.post(f"{BASE_URL}/api/admin/upload-doc", headers=HDR, files=files, timeout=30)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body.get("name") == "doc.pdf"
    assert body["url"].startswith("/api/files/") and "/docs/" in body["url"]
    fr = s.get(f"{BASE_URL}{body['url']}", timeout=20)
    assert fr.status_code == 200
    assert fr.content.startswith(b"%PDF")


def test_upload_doc_bad_ext(s):
    files = {"file": ("evil.exe", io.BytesIO(b"MZ"), "application/octet-stream")}
    r = s.post(f"{BASE_URL}/api/admin/upload-doc", headers=HDR, files=files, timeout=20)
    assert r.status_code == 415


def test_upload_doc_no_auth(s):
    files = {"file": ("doc.pdf", io.BytesIO(PDF), "application/pdf")}
    r = s.post(f"{BASE_URL}/api/admin/upload-doc", files=files, timeout=20)
    assert r.status_code == 401
