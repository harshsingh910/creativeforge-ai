import sys
from pathlib import Path

# Ensure backend root is always in sys.path
BACKEND_DIR = Path(__file__).resolve().parent.parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.routes.health_routes import router as health_router
from app.routes.content_routes import router as content_router
from app.routes.copywriting_routes import router as copywriting_router
from app.routes.video_routes import router as video_router

# Configure clean logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("creativeforge")

app = FastAPI(
    title="CreativeForge AI API",
    description="Three specialized AI agents for content, campaigns, and video production powered by Claude Haiku 4.5 via OpenRouter.",
    version="1.0.0"
)

# Enable CORS for local React/Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handler for HTTP exceptions
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail
        }
    )

# Exception handler for request validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for err in exc.errors():
        field = " -> ".join([str(loc) for loc in err.get("loc", []) if loc != "body"])
        msg = err.get("msg", "Invalid value")
        errors.append(f"{field}: {msg}" if field else msg)
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": "Validation error: " + "; ".join(errors)
        }
    )

# Generic exception handler to protect against unhandled internal server errors
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Internal server error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "An unexpected server error occurred. Please try again later."
        }
    )

# Mount API routers
app.include_router(health_router, prefix="/api")
app.include_router(content_router, prefix="/api")
app.include_router(copywriting_router, prefix="/api")
app.include_router(video_router, prefix="/api")

@app.get("/")
def root():
    return {
        "product": "CreativeForge AI",
        "tagline": "Three specialized AI agents for content, campaigns, and video production.",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "content_agent": "/api/agents/content/generate",
            "copywriting_agent": "/api/agents/copywriting/generate",
            "video_agent": "/api/agents/video/generate"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
