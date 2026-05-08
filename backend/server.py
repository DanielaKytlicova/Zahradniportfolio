from fastapi import FastAPI, APIRouter, HTTPException, Header, Body, UploadFile, File
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import uuid
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime, timezone

from storage import init_storage, put_object, get_object, APP_NAME
from db import get_content, set_content


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Admin password (single pre-set password, stored in backend env)
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'venku-admin-2026')

ALLOWED_IMAGE_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
}
MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10 MB

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "Atelier Venku API"}


# ===== Content (CMS) endpoints =====

@api_router.get("/content")
async def get_content_endpoint():
    """Return persisted site content. Empty object if nothing saved yet."""
    return await get_content()


class LoginBody(BaseModel):
    password: str


@api_router.post("/admin/login")
async def admin_login(body: LoginBody):
    if body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"ok": True}


@api_router.put("/admin/content")
async def update_content(
    content: Dict[str, Any] = Body(...),
    x_admin_password: Optional[str] = Header(None, alias="X-Admin-Password"),
):
    if x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")
    payload = {**content, "updated_at": datetime.now(timezone.utc).isoformat()}
    await set_content(payload)
    return {"ok": True}


# ===== Upload (admin only) =====

@api_router.post("/admin/upload")
async def upload_image(
    file: UploadFile = File(...),
    x_admin_password: Optional[str] = Header(None, alias="X-Admin-Password"),
):
    if x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

    content_type = (file.content_type or "").lower()
    if content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{content_type}'. Allowed: {list(ALLOWED_IMAGE_TYPES.keys())}",
        )

    data = await file.read()
    if len(data) == 0:
        raise HTTPException(status_code=400, detail="Empty file")
    if len(data) > MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=413, detail="File too large (max 10 MB)")

    ext = ALLOWED_IMAGE_TYPES[content_type]
    obj_path = f"{APP_NAME}/uploads/{uuid.uuid4().hex}.{ext}"
    try:
        result = put_object(obj_path, data, content_type)
    except Exception as e:
        logging.exception("Object storage upload failed")
        raise HTTPException(status_code=502, detail=f"Storage upload failed: {e}")

    # Public URL the frontend can drop into <img src=...>
    public_url = f"/api/files/{result['path']}"
    return {"path": result["path"], "url": public_url, "size": result.get("size", len(data))}


# ===== Public file serving =====

@api_router.get("/files/{path:path}")
async def serve_file(path: str):
    """Serve uploaded file (public, no auth — for use in <img src>)."""
    # Only allow paths under our app namespace to prevent probing other apps
    if not path.startswith(f"{APP_NAME}/"):
        raise HTTPException(status_code=404, detail="Not found")
    try:
        data, content_type = get_object(path)
    except Exception as e:
        # Distinguish 404 from other failures
        from requests.exceptions import HTTPError
        if isinstance(e, HTTPError) and e.response is not None and e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Not found")
        logging.exception("Object storage get failed")
        raise HTTPException(status_code=502, detail=f"Storage error: {e}")
    # Cache aggressively — paths are immutable (UUID-based)
    return Response(
        content=data,
        media_type=content_type,
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )


# Include the router in the main app
app.include_router(api_router)

# Parse CORS origins robustly (trim whitespace, drop empties, strip stray quotes)
_raw_origins = os.environ.get('CORS_ORIGINS', '*')
cors_origins = [o.strip().strip('"').strip("'") for o in _raw_origins.split(',')]
cors_origins = [o for o in cors_origins if o]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    logger.info(f"CORS allow_origins: {cors_origins}")
    try:
        init_storage()
        logger.info("Object storage initialized")
    except Exception as e:
        logger.error(f"Storage init failed: {e}")
