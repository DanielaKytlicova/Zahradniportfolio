"""Backend API tests for Atelier Venku admin content/CMS endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # fallback: read frontend/.env
    try:
        with open("/app/frontend/.env", "r") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip()
                    break
    except Exception:
        pass

BASE_URL = (BASE_URL or "").rstrip("/")
ADMIN_PW = "venku-admin-2026"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- GET /api/content ----
class TestContent:
    def test_get_content_ok(self, api):
        r = api.get(f"{BASE_URL}/api/content", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, dict)


# ---- POST /api/admin/login ----
class TestAdminLogin:
    def test_login_correct(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login",
                     json={"password": ADMIN_PW}, timeout=20)
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_login_wrong(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login",
                     json={"password": "wrong-pw"}, timeout=20)
        assert r.status_code == 401

    def test_login_missing_field(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={}, timeout=20)
        # pydantic 422
        assert r.status_code in (401, 422)


# ---- PUT /api/admin/content ----
class TestAdminContentPut:
    SAMPLE = {
        "home": {
            "eyebrow": {"cz": "TEST_EYEBROW_CZ", "en": "TEST_EYEBROW_EN"}
        },
        "kontakt": {"email": "TEST_admin@example.com"},
    }

    def test_put_without_header(self, api):
        r = api.put(f"{BASE_URL}/api/admin/content",
                    json=self.SAMPLE, timeout=20)
        assert r.status_code == 401

    def test_put_with_wrong_header(self, api):
        r = api.put(f"{BASE_URL}/api/admin/content",
                    json=self.SAMPLE,
                    headers={"X-Admin-Password": "nope"}, timeout=20)
        assert r.status_code == 401

    def test_put_with_correct_header_and_persistence(self, api):
        r = api.put(f"{BASE_URL}/api/admin/content",
                    json=self.SAMPLE,
                    headers={"X-Admin-Password": ADMIN_PW}, timeout=20)
        assert r.status_code == 200, r.text
        assert r.json().get("ok") is True

        # Re-GET to verify persistence
        g = api.get(f"{BASE_URL}/api/content", timeout=20)
        assert g.status_code == 200
        data = g.json()
        assert data.get("home", {}).get("eyebrow", {}).get("cz") == "TEST_EYEBROW_CZ"
        assert data.get("home", {}).get("eyebrow", {}).get("en") == "TEST_EYEBROW_EN"
        assert data.get("kontakt", {}).get("email") == "TEST_admin@example.com"
        # Ensure mongo _id and updated_at not leaked in response (server excludes _id and updated_at)
        assert "_id" not in data
        assert "updated_at" not in data

    def test_put_update_overwrites(self, api):
        new_payload = {"home": {"eyebrow": {"cz": "TEST_EYEBROW_CZ2", "en": "TEST_EYEBROW_EN2"}}}
        r = api.put(f"{BASE_URL}/api/admin/content",
                    json=new_payload,
                    headers={"X-Admin-Password": ADMIN_PW}, timeout=20)
        assert r.status_code == 200
        g = api.get(f"{BASE_URL}/api/content", timeout=20)
        assert g.json().get("home", {}).get("eyebrow", {}).get("cz") == "TEST_EYEBROW_CZ2"
