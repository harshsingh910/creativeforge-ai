from datetime import datetime, timezone
from fastapi import APIRouter
from app.config import is_api_key_configured, OPENROUTER_MODEL
from app.schemas.agent_schemas import HealthResponse

router = APIRouter(tags=["Health"])

@router.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint indicating API status and key configuration."""
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        model=OPENROUTER_MODEL,
        api_key_configured=is_api_key_configured(),
        timestamp=datetime.now(timezone.utc).isoformat()
    )
