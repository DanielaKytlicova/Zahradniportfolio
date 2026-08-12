"""File-based persistence for site content.

All site data lives in a single JSON file under DATA_DIR. The directory should
point at a Railway-mounted volume in production (e.g. /data) so writes survive
redeploys. Locally it defaults to /app/backend/data.
"""
import json
import os
import asyncio
import logging
from pathlib import Path
from typing import Any, Dict

logger = logging.getLogger(__name__)

DATA_DIR = Path(os.environ.get("DATA_DIR", str(Path(__file__).parent / "data")))
DATA_DIR.mkdir(parents=True, exist_ok=True)

CONTENT_FILE = DATA_DIR / "content.json"

_lock = asyncio.Lock()


async def get_content() -> Dict[str, Any]:
    """Return persisted content dict or {} if missing/corrupt."""
    if not CONTENT_FILE.exists():
        return {}
    try:
        return json.loads(CONTENT_FILE.read_text(encoding="utf-8"))
    except Exception as e:
        logger.warning(f"content.json unreadable: {e} — returning empty")
        return {}


async def set_content(content: Dict[str, Any]) -> None:
    """Persist content dict atomically (temp file + rename)."""
    async with _lock:
        tmp = CONTENT_FILE.with_suffix(".json.tmp")
        tmp.write_text(
            json.dumps(content, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        tmp.replace(CONTENT_FILE)
        logger.info(f"content.json updated ({CONTENT_FILE})")
