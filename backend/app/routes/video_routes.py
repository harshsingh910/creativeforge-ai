from fastapi import APIRouter
from app.schemas.agent_schemas import VideoAgentRequest, AgentResponse
from app.agents.video_agent import video_agent

router = APIRouter(prefix="/agents/video", tags=["Video Production Agent"])

@router.post("/generate", response_model=AgentResponse)
def generate_video(req: VideoAgentRequest):
    """
    Generate video concepts, scripts, storyboards, shot lists, VO, and sound design
    using Claude Haiku 4.5 through OpenRouter.
    """
    return video_agent.generate(req)
