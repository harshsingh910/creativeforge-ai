from fastapi import APIRouter
from app.schemas.agent_schemas import CopywritingAgentRequest, AgentResponse
from app.agents.copywriting_agent import copywriting_agent

router = APIRouter(prefix="/agents/copywriting", tags=["Copywriting & Ads Agent"])

@router.post("/generate", response_model=AgentResponse)
def generate_copywriting(req: CopywritingAgentRequest):
    """
    Generate conversion-focused advertising copy, headlines, CTAs, and A/B test variations
    using Claude Haiku 4.5 through OpenRouter.
    """
    return copywriting_agent.generate(req)
