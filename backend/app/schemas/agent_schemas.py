from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

# ==============================================================================
# Content Writing Agent Schemas
# ==============================================================================

class ContentAgentRequest(BaseModel):
    content_type: str = Field(..., description="Blog, Website Content, E-Book, or SEO Article")
    topic: str = Field(..., description="Topic or subject of the content")
    target_audience: str = Field(..., description="Intended audience description")
    goal: str = Field(..., description="Goal (e.g., educate, rank on Google, convert leads)")
    tone: str = Field(default="Professional and Engaging", description="Desired tone of voice")
    length: str = Field(default="Medium (~1,200 words)", description="Desired length")
    primary_keyword: str = Field(..., description="Primary SEO keyword")
    secondary_keywords: Optional[str] = Field(default="", description="Comma-separated secondary keywords")
    brand_context: Optional[str] = Field(default="", description="Background about company, product, or brand voice")

class ContentAgentOutput(BaseModel):
    strategy: str = Field(..., description="Content strategy and audience alignment")
    seo_information: Dict[str, Any] = Field(default_factory=dict, description="Meta title, description, search intent")
    outline: List[str] = Field(default_factory=list, description="Structured outline / headings")
    final_content: str = Field(..., description="Full ready-to-publish content in Markdown")
    faq: List[Dict[str, str]] = Field(default_factory=list, description="Frequently asked questions with answers")
    cta: str = Field(..., description="Primary call-to-action")
    internal_links: List[str] = Field(default_factory=list, description="Internal linking recommendations")


# ==============================================================================
# Copywriting & Ads Agent Schemas
# ==============================================================================

class CopywritingAgentRequest(BaseModel):
    platform: str = Field(..., description="Facebook, Instagram, Google Ads, LinkedIn, Email")
    copy_type: str = Field(..., description="Ad copy, Product description, Email newsletter, etc.")
    product_service: str = Field(..., description="Name and description of product or service")
    target_audience: str = Field(..., description="Target customer profile")
    campaign_goal: str = Field(..., description="Objective: conversions, clicks, signups, leads")
    pain_point: str = Field(..., description="Key customer pain point addressed")
    key_benefit: str = Field(..., description="Core value proposition or benefit")
    offer: Optional[str] = Field(default="", description="Offer or incentive (e.g., 20% discount, free trial)")
    tone: str = Field(default="Persuasive and Direct", description="Tone of voice")

class CopyVariation(BaseModel):
    id: str
    name: str
    hook: str
    body: str
    headline: str
    cta: str
    target_angle: str

class ABTestItem(BaseModel):
    hypothesis: str
    variant_a: str
    variant_b: str
    metric_to_track: str

class CopywritingAgentOutput(BaseModel):
    campaign_strategy: str
    creative_angle: str
    variations: List[CopyVariation] = Field(default_factory=list)
    headlines: List[str] = Field(default_factory=list)
    ctas: List[str] = Field(default_factory=list)
    ab_tests: List[ABTestItem] = Field(default_factory=list)


# ==============================================================================
# Video Production Agent Schemas
# ==============================================================================

class VideoAgentRequest(BaseModel):
    video_type: str = Field(default="Social UGC / Commercial", description="Explainer, Product Demo, Social UGC, Brand Story, Tutorial")
    topic: str = Field(..., description="Video topic and central idea")
    platform: str = Field(default="TikTok / Instagram Reels", description="YouTube, TikTok, Instagram Reels, LinkedIn, Website")
    target_audience: str = Field(default="Fitness enthusiasts and young professionals", description="Target viewers")
    duration: str = Field(default="30 seconds", description="Requested duration (e.g. 30s, 60s, 90s, 2m)")
    goal: str = Field(default="Drive product awareness and engagement", description="Objective of the video")
    tone: str = Field(default="High Energy and Inspiring", description="Tone and pacing")
    style: str = Field(default="Modern and Dynamic", description="Visual and narrative style")
    product_service: str = Field(default="Product / Brand", description="Product or service featured")
    cta: str = Field(default="Try It Today", description="Desired viewer call-to-action")

class StoryboardScene(BaseModel):
    scene_number: int
    duration: str
    visual: str
    action: str
    camera_shot: str
    voice_over: str = ""
    voiceover: str = ""
    on_screen_text: str = ""
    audio_sfx: str = ""
    sound_design: str = ""

class VideoAgentOutput(BaseModel):
    creative_concept: str
    retention_hook: str = ""
    hook: str = ""
    script: str = ""
    full_script: str = ""
    storyboard: List[StoryboardScene] = Field(default_factory=list)
    shot_list: List[str] = Field(default_factory=list)
    voiceover: str = ""
    voice_over: str = ""
    sound_design: str = ""
    audio_sfx: str = ""
    social_cut: str = ""
    social_media_version: str = ""
    on_screen_text: List[str] = Field(default_factory=list)
    cta: str = ""


# ==============================================================================
# Unified API Response Schemas
# ==============================================================================

class GenerationDetails(BaseModel):
    model: str
    provider: Optional[str] = None
    prompt_tokens: Optional[int] = None
    completion_tokens: Optional[int] = None
    total_tokens: Optional[int] = None
    cost: Optional[float] = None
    finish_reason: Optional[str] = None

class AgentResponse(BaseModel):
    success: bool
    agent: str
    output: Dict[str, Any]
    raw_content: str
    details: Optional[GenerationDetails] = None
    error: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    version: str
    model: str
    api_key_configured: bool
    timestamp: str
