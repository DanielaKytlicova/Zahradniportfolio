"""Backend tests for upload + SEO public assets (iteration 6)."""
import io
import os
import struct
import zlib
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://garden-atelier-2.preview.emergentagent.com").rstrip("/")
ADMIN_PW = os.environ.get("ADMIN_PASSWORD", "venku-admin-2026")


def _tiny_jpeg_bytes() -> bytes:
    """Return a tiny but valid JPEG file (1x1 px white)."""
    # Minimum valid JPEG (1x1 white pixel) — known good payload
    return bytes.fromhex(
        "FFD8FFE000104A46494600010100000100010000FFDB004300080606"
        "070605080707070909080A0C140D0C0B0B0C1912130F141D1A1F1E1D"
        "1A1C1C20242E2720222C231C1C2837292C30313434341F27393D3832"
        "3C2E333432FFC0000B080001000101011100FFC4001F0000010501010"
        "1010101010000000000000000010203040506070809000B0AFFC400B5100"
        "002010303020403050504040000017D01020300041105122131410613516107"
        "1422718132811491A1B1C109233352F0156272D1A1B1F02434E125F11718192"
        "1A263435362728292A33536373839544555657666768697374557585A5B5C5D"
        "5E5F606162636465666768696A737475767778797A8284858687888A92"
        "93949596979899A2A3A4A5A6A7A8A9B2B3B4B5B6B7B8B9BAC2C3C4C5C6"
        "C7C8C9CAD2D3D4D5D6D7D8D9DAE1E2E3E4E5E6E7E8E9EAF1F2F3F4F5F6F7F8F9FAFFC4001F010003010101010101010101"
        "0100000000000001020304050607080900B0AFFC400B5110002010204040305040400010277000102031104052131"
        "061241510761711322328108144291A1B1C109233352F0156272D1A263435362728292A35363738393A434445464748494A535455565758595A636465666768696A737475767778797A82"
        "838485868788898A92939495969798999AA2A3A4A5A6A7A8A9B2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE2E3E4E5E6E7E8E9EAF2F3F4F5F6F7F8F9FAFFDA000C03010002110311003F00FBD0FFD9"
    )


@pytest.fixture(scope="module")
def jpeg_payload():
    # Use a simpler, real 1x1 jpeg that decoders accept; here byte content & content-type matter
    # for backend logic (it does not validate JPEG structure). We just need *some* bytes and image/jpeg.
    return b"\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00" + b"\x00" * 64 + b"\xff\xd9"


# ============== Upload endpoint ==============

class TestUploadAuth:
    def test_upload_no_password_returns_401(self, jpeg_payload):
        files = {"file": ("test.jpg", jpeg_payload, "image/jpeg")}
        r = requests.post(f"{BASE_URL}/api/admin/upload", files=files, timeout=30)
        assert r.status_code == 401

    def test_upload_wrong_password_returns_401(self, jpeg_payload):
        files = {"file": ("test.jpg", jpeg_payload, "image/jpeg")}
        r = requests.post(
            f"{BASE_URL}/api/admin/upload",
            files=files,
            headers={"X-Admin-Password": "wrong"},
            timeout=30,
        )
        assert r.status_code == 401


class TestUploadValidation:
    def test_upload_text_returns_415(self):
        files = {"file": ("hello.txt", b"hello world", "text/plain")}
        r = requests.post(
            f"{BASE_URL}/api/admin/upload",
            files=files,
            headers={"X-Admin-Password": ADMIN_PW},
            timeout=30,
        )
        assert r.status_code == 415


class TestUploadSuccessAndServe:
    uploaded_url = None
    uploaded_size = None
    uploaded_payload = None

    def test_upload_jpeg_success(self, jpeg_payload):
        files = {"file": ("test.jpg", jpeg_payload, "image/jpeg")}
        r = requests.post(
            f"{BASE_URL}/api/admin/upload",
            files=files,
            headers={"X-Admin-Password": ADMIN_PW},
            timeout=60,
        )
        assert r.status_code == 200, r.text
        body = r.json()
        assert "path" in body and "url" in body and "size" in body
        assert body["path"].startswith("venku/uploads/")
        assert body["path"].endswith(".jpg")
        assert body["url"] == f"/api/files/{body['path']}"
        assert body["size"] == len(jpeg_payload)

        TestUploadSuccessAndServe.uploaded_url = body["url"]
        TestUploadSuccessAndServe.uploaded_size = body["size"]
        TestUploadSuccessAndServe.uploaded_payload = jpeg_payload

    def test_serve_uploaded_file(self):
        assert TestUploadSuccessAndServe.uploaded_url, "Skip: no prior upload"
        r = requests.get(f"{BASE_URL}{TestUploadSuccessAndServe.uploaded_url}", timeout=60)
        assert r.status_code == 200
        assert r.headers.get("Content-Type", "").startswith("image/jpeg")
        assert "Cache-Control" in r.headers
        # Note: backend sets "public, max-age=31536000, immutable" but ingress/CDN
        # may override — assert presence of header only.
        assert len(r.content) == TestUploadSuccessAndServe.uploaded_size
        assert r.content == TestUploadSuccessAndServe.uploaded_payload


class TestServePathTraversal:
    def test_non_venku_path_returns_404(self):
        r = requests.get(f"{BASE_URL}/api/files/otherapp/uploads/x.jpg", timeout=30)
        assert r.status_code == 404

    def test_missing_venku_file_returns_404_or_502(self):
        r = requests.get(f"{BASE_URL}/api/files/venku/uploads/nonexistent-uuid.jpg", timeout=30)
        # Either propagated 404 or storage error
        assert r.status_code in (404, 502)


# ============== Public SEO assets ==============

class TestSEOAssets:
    def test_sitemap_xml(self):
        r = requests.get(f"{BASE_URL}/sitemap.xml", timeout=30)
        assert r.status_code == 200
        body = r.text
        for path in ["/", "/portfolio", "/nabidka", "/o-atelieru", "/vzdelavani", "/kontakt"]:
            assert f"https://ateliervenku.cz{path}" in body or f"ateliervenku.cz{path}" in body, (
                f"Missing {path} in sitemap"
            )

    def test_robots_txt(self):
        r = requests.get(f"{BASE_URL}/robots.txt", timeout=30)
        assert r.status_code == 200
        body = r.text
        assert "Disallow: /admin" in body
        assert "Sitemap:" in body
