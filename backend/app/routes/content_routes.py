from fastapi import APIRouter
from app.schemas.agent_schemas import ContentAgentRequest, AgentResponse
from app.agents.content_agent import content_agent

router = APIRouter(prefix="/agents/content", tags=["Content Writing Agent"])

@router.post("/generate", response_model=AgentResponse)
def generate_content(req: ContentAgentRequest):
    """
    Generate SEO blogs, website content, e-book chapters, or SEO articles
    using Claude Haiku 4.5 through OpenRouter.
    """
    return content_agent.generate(req)
