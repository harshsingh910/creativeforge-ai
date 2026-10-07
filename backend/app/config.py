import os
from pathlib import Path
from dotenv import load_dotenv

# Search for .env files in likely directory hierarchy
BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BASE_DIR.parent
WORKSPACE_ROOT = PROJECT_ROOT.parent

candidate_env_paths = [
    PROJECT_ROOT / ".env",
    BASE_DIR / ".env",
    WORKSPACE_ROOT / ".env",
    Path.cwd() / ".env"
]

for env_path in candidate_env_paths:
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        break
else:
    # Fallback to default load_dotenv() lookup
    load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "").strip()
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "anthropic/claude-haiku-4.5").strip()
OPENROUTER_ENDPOINT = os.getenv(
    "OPENROUTER_ENDPOINT", "https://openrouter.ai/api/v1/chat/completions"
).strip()

def get_api_key() -> str:
    """Retrieve OPENROUTER_API_KEY from environment."""
    key = os.getenv("OPENROUTER_API_KEY", OPENROUTER_API_KEY).strip()
    return key

def is_api_key_configured() -> bool:
    """Check if OPENROUTER_API_KEY is configured without exposing it."""
    key = get_api_key()
    return bool(key and len(key) > 5)
