import json
import logging
from typing import Dict, Any, Optional, Tuple
import requests
from fastapi import HTTPException

from app.config import get_api_key, OPENROUTER_MODEL, OPENROUTER_ENDPOINT
from app.schemas.agent_schemas import GenerationDetails

logger = logging.getLogger("creativeforge.openrouter")

class OpenRouterService:
    def __init__(self, endpoint: str = OPENROUTER_ENDPOINT, model: str = OPENROUTER_MODEL):
        self.endpoint = endpoint
        self.model = model

    def call_claude(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 4000,
        timeout: int = 60
    ) -> Tuple[str, GenerationDetails]:
        """
        Calls Anthropic Claude Haiku 4.5 via OpenRouter with full error handling
        and usage/cost extraction. Never logs or exposes API keys.
        """
        api_key = get_api_key()
        if not api_key:
            raise HTTPException(
                status_code=401,
                detail="OpenRouter API key is not configured. Please add OPENROUTER_API_KEY to your .env file."
            )

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "CreativeForge AI"
        }

        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            "max_tokens": max_tokens,
            "temperature": temperature
        }

        try:
            response = requests.post(
                self.endpoint,
                headers=headers,
                json=payload,
                timeout=timeout
            )
        except requests.exceptions.Timeout:
            raise HTTPException(
                status_code=504,
                detail="Request to OpenRouter timed out (exceeded 60s). Claude may be generating long output; please try again."
            )
        except requests.exceptions.ConnectionError:
            raise HTTPException(
                status_code=502,
                detail="Failed to connect to OpenRouter. Please check your internet connection and network access."
            )
        except requests.exceptions.RequestException as e:
            raise HTTPException(
                status_code=500,
                detail=f"Network communication error occurred while calling OpenRouter: {str(e)}"
            )

        # Handle HTTP error statuses with clear, friendly messages
        if response.status_code == 401:
            raise HTTPException(
                status_code=401,
                detail="Invalid OpenRouter API Key. Please verify the OPENROUTER_API_KEY in your .env file."
            )
        elif response.status_code == 429:
            raise HTTPException(
                status_code=429,
                detail="OpenRouter rate limit or credit limit reached. Please verify your OpenRouter account balance."
            )
        elif response.status_code >= 500:
            raise HTTPException(
                status_code=502,
                detail=f"OpenRouter upstream service error (HTTP {response.status_code}). Please try again in a few moments."
            )
        elif not response.ok:
            error_msg = "Unknown error from OpenRouter."
            try:
                err_data = response.json()
                if isinstance(err_data, dict) and "error" in err_data:
                    error_msg = err_data["error"].get("message", error_msg)
            except Exception:
                error_msg = response.text[:200]
            raise HTTPException(
                status_code=response.status_code,
                detail=f"OpenRouter error ({response.status_code}): {error_msg}"
            )

        try:
            data = response.json()
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=502,
                detail="Received malformed JSON response from OpenRouter."
            )

        choices = data.get("choices", [])
        if not choices:
            raise HTTPException(
                status_code=502,
                detail="OpenRouter response did not contain any completion choices."
            )

        first_choice = choices[0]
        message = first_choice.get("message", {})
        content = message.get("content", "")

        if not content:
            raise HTTPException(
                status_code=502,
                detail="OpenRouter returned an empty message content."
            )

        # Parse usage details (without fabricating any values)
        usage_data = data.get("usage") or {}
        generation_model = data.get("model", self.model)
        provider = data.get("provider")  # E.g. 'Amazon Bedrock' if supplied by OpenRouter
        finish_reason = first_choice.get("finish_reason")

        prompt_tokens = usage_data.get("prompt_tokens")
        completion_tokens = usage_data.get("completion_tokens")
        total_tokens = usage_data.get("total_tokens")
        cost = data.get("cost") or usage_data.get("cost")

        details = GenerationDetails(
            model=generation_model,
            provider=provider,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=total_tokens,
            cost=cost,
            finish_reason=finish_reason
        )

        return content, details

# Global singleton
openrouter_service = OpenRouterService()
