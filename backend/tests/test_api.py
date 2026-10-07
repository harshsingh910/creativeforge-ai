import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.agent_schemas import GenerationDetails

client = TestClient(app)

def test_health_endpoint():
    """Verify health endpoint returns status, version, and model."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "model" in data
    assert "api_key_configured" in data

def test_missing_api_key_handling():
    """Verify that when API key is missing, endpoint returns 401 with friendly message."""
    with patch("app.services.openrouter_service.get_api_key", return_value=""):
        payload = {
            "content_type": "Blog",
            "topic": "AI in Healthcare",
            "target_audience": "Healthcare executives",
            "goal": "Explain benefits of AI automation",
            "tone": "Authoritative",
            "length": "Medium (~1,200 words)",
            "primary_keyword": "AI in Healthcare"
        }
        response = client.post("/api/agents/content/generate", json=payload)
        assert response.status_code == 401
        data = response.json()
        assert data["success"] is False
        assert "OPENROUTER_API_KEY" in data["error"]

def test_validation_error_content_agent():
    """Verify that missing required fields return 422 with descriptive validation details."""
    response = client.post("/api/agents/content/generate", json={})
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert "Validation error" in data["error"]

def test_content_agent_generation_mock():
    """Verify Content Writing Agent processes LLM response correctly."""
    mock_details = GenerationDetails(
        model="anthropic/claude-haiku-4.5",
        provider="Amazon Bedrock",
        prompt_tokens=150,
        completion_tokens=400,
        total_tokens=550,
        cost=0.00045,
        finish_reason="stop"
    )
    mock_json = """{
        "strategy": "Target healthcare leaders looking to integrate AI.",
        "seo_information": {
            "search_intent": "Informational",
            "meta_title": "AI in Healthcare Guide 2026",
            "meta_description": "Comprehensive guide on AI applications in clinical workflows."
        },
        "outline": ["I. Introduction", "II. Key Clinical Benefits"],
        "final_content": "## Introduction\\nAI is transforming modern medical care.",
        "faq": [{"question": "Is AI compliant?", "answer": "Yes, HIPAA compliant."}],
        "cta": "Schedule your executive healthcare demo.",
        "internal_links": ["Healthcare Compliance Guide", "Clinical Decision Support Systems"]
    }"""

    with patch("app.services.openrouter_service.openrouter_service.call_claude", return_value=(mock_json, mock_details)):
        payload = {
            "content_type": "Blog",
            "topic": "AI in Healthcare",
            "target_audience": "Healthcare executives",
            "goal": "Explain benefits of AI automation",
            "tone": "Authoritative",
            "length": "Medium (~1,200 words)",
            "primary_keyword": "AI in Healthcare",
            "secondary_keywords": "telemedicine, clinical AI",
            "brand_context": "HealthTech Solutions Inc."
        }
        response = client.post("/api/agents/content/generate", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["agent"] == "content"
        assert "output" in data
        assert data["output"]["strategy"].startswith("Target healthcare")
        assert data["details"]["model"] == "anthropic/claude-haiku-4.5"
        assert data["details"]["provider"] == "Amazon Bedrock"
        assert data["details"]["cost"] == 0.00045

def test_copywriting_agent_generation_mock():
    """Verify Copywriting & Ads Agent processes LLM response and variations correctly."""
    mock_details = GenerationDetails(
        model="anthropic/claude-haiku-4.5",
        provider="Amazon Bedrock",
        prompt_tokens=120,
        completion_tokens=350,
        total_tokens=470,
        cost=0.00038
    )
    mock_json = """{
        "campaign_strategy": "Conversion-driven Meta campaign targeting busy founders.",
        "creative_angle": "Reclaim 10 hours a week through automated invoice reconciliation.",
        "variations": [
            {
                "id": "v1",
                "name": "Variation 1: Pain-Agitate-Solve",
                "target_angle": "Frustration with manual billing",
                "hook": "Still spending Sunday nights sorting invoices?",
                "body": "Automate billing in 3 clicks with InvoicePilot.",
                "headline": "Stop Wasting Weekends on Accounting",
                "cta": "Start 14-Day Free Trial"
            }
        ],
        "headlines": ["Stop Wasting Weekends on Accounting", "Billing on Autopilot"],
        "ctas": ["Start 14-Day Free Trial", "See Interactive Demo"],
        "ab_tests": [
            {
                "hypothesis": "Time-savings angle vs error-prevention angle.",
                "variant_a": "Focus on 10 hours saved",
                "variant_b": "Focus on zero bookkeeping errors",
                "metric_to_track": "CTR"
            }
        ]
    }"""

    with patch("app.services.openrouter_service.openrouter_service.call_claude", return_value=(mock_json, mock_details)):
        payload = {
            "platform": "Facebook",
            "copy_type": "Feed Ad",
            "product_service": "InvoicePilot SaaS",
            "target_audience": "Small business owners",
            "campaign_goal": "Free trial signups",
            "pain_point": "Manual bookkeeping takes hours",
            "key_benefit": "Automate invoices in 3 clicks",
            "offer": "14-day free trial",
            "tone": "Direct and Relatable"
        }
        response = client.post("/api/agents/copywriting/generate", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["agent"] == "copywriting"
        assert len(data["output"]["variations"]) == 1
        assert len(data["output"]["headlines"]) == 2

def test_video_agent_generation_mock():
    """Verify Video Production Agent processes storyboard and shot list correctly."""
    mock_details = GenerationDetails(
        model="anthropic/claude-haiku-4.5",
        prompt_tokens=180,
        completion_tokens=500,
        total_tokens=680
    )
    mock_json = """{
        "creative_concept": "High-octane visual montage showcasing productivity surge.",
        "hook": "Close-up of ticking clock smashing into code editor.",
        "full_script": "[0:00-0:05] Voiceover: Speed up your sprint cycles.",
        "storyboard": [
            {
                "scene_number": 1,
                "duration": "0:00 - 0:05",
                "visual": "Programmer frustrated at midnight desk.",
                "action": "Types furiously on mechanical keyboard.",
                "camera_shot": "Close-up 50mm, blue ambient lighting.",
                "voice_over": "Deadlines closing in?",
                "on_screen_text": "Shipping shouldn't hurt.",
                "audio_sfx": "Ticking clock SFX."
            }
        ],
        "shot_list": ["Shot 1: Extreme close-up of keyboard", "Shot 2: Wide shot of modern office"],
        "voice_over": "Narrator VO with energetic delivery.",
        "on_screen_text": ["Ship 3x faster.", "Get Started."],
        "audio_sfx": "Synthwave driving beat at 120 BPM.",
        "social_media_version": "15-second cut for TikTok.",
        "cta": "Download free trial at our site."
    }"""

    with patch("app.services.openrouter_service.openrouter_service.call_claude", return_value=(mock_json, mock_details)):
        payload = {
            "video_type": "Product Explainer",
            "topic": "AI Developer Productivity Tool",
            "platform": "YouTube",
            "target_audience": "Software engineers and tech leads",
            "duration": "60 seconds",
            "goal": "Drive developer signups",
            "tone": "High Energy and Inspiring",
            "style": "Modern Cinematic Tech",
            "product_service": "DevSprint AI",
            "cta": "Get Started Free"
        }
        response = client.post("/api/agents/video/generate", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["agent"] == "video"
        assert len(data["output"]["storyboard"]) == 1
        assert data["output"]["storyboard"][0]["scene_number"] == 1
