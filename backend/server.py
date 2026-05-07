from fastapi import FastAPI, APIRouter, HTTPException, Header, Body
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Admin password (single pre-set password, stored in backend env)
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'venku-admin-2026')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "Atelier Venku API"}


# ===== Content (CMS) endpoints =====

@api_router.get("/content")
async def get_content():
    """Return persisted site content. Empty object if nothing saved yet."""
    doc = await db.site_content.find_one({"_id": "main"}, {"_id": 0, "updated_at": 0})
    return doc or {}


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
    await db.site_content.update_one(
        {"_id": "main"},
        {"$set": payload},
        upsert=True,
    )
    return {"ok": True}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
