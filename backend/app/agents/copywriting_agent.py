from typing import Dict, Any
from app.schemas.agent_schemas import CopywritingAgentRequest, AgentResponse
from app.prompts.copywriting_prompt import COPYWRITING_AGENT_SYSTEM_PROMPT, build_copywriting_user_prompt
from app.services.openrouter_service import openrouter_service
from app.utils.json_parser import extract_and_parse_json

class CopywritingAgent:
    """Specialized Direct-Response Copywriting and Paid Ads Agent."""

    def __init__(self):
        self.name = "Copywriting & Ads Agent"

    def generate(self, req: CopywritingAgentRequest) -> AgentResponse:
        user_prompt = build_copywriting_user_prompt(
            platform=req.platform,
            copy_type=req.copy_type,
            product_service=req.product_service,
            target_audience=req.target_audience,
            campaign_goal=req.campaign_goal,
            pain_point=req.pain_point,
            key_benefit=req.key_benefit,
            offer=req.offer or "",
            tone=req.tone
        )

        content, details = openrouter_service.call_claude(
            system_prompt=COPYWRITING_AGENT_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.75,
            max_tokens=4000
        )

        parsed_output = extract_and_parse_json(content)
        raw_markdown = self._format_as_markdown(req, parsed_output)

        return AgentResponse(
            success=True,
            agent="copywriting",
            output=parsed_output,
            raw_content=raw_markdown,
            details=details
        )

    def _format_as_markdown(self, req: CopywritingAgentRequest, output: Dict[str, Any]) -> str:
        lines = [
            f"# Campaign Copy: {req.product_service}",
            f"*Platform: {req.platform} | Format: {req.copy_type} | Goal: {req.campaign_goal}*",
            "",
            "## Campaign Strategy",
            output.get("campaign_strategy", ""),
            "",
            "## Creative Angle",
            output.get("creative_angle", ""),
            "",
            "## Copy Variations",
        ]

        variations = output.get("variations", [])
        if isinstance(variations, list):
            for i, var in enumerate(variations, 1):
                if isinstance(var, dict):
                    name = var.get("name", f"Variation {i}")
                    angle = var.get("target_angle", "")
                    lines.extend([
                        f"### {name}",
                        f"**Angle:** {angle}",
                        f"**Hook:** {var.get('hook', '')}",
                        "",
                        "**Body Copy:**",
                        var.get("body", ""),
                        "",
                        f"**Headline:** {var.get('headline', '')}",
                        f"**CTA:** {var.get('cta', '')}",
                        ""
                    ])

        headlines = output.get("headlines", [])
        if headlines and isinstance(headlines, list):
            lines.append("## High-Converting Headlines")
            for h in headlines:
                lines.append(f"- {h}")
            lines.append("")

        ctas = output.get("ctas", [])
        if ctas and isinstance(ctas, list):
            lines.append("## Call to Action Variations")
            for c in ctas:
                lines.append(f"- {c}")
            lines.append("")

        ab_tests = output.get("ab_tests", [])
        if ab_tests and isinstance(ab_tests, list):
            lines.append("## A/B Testing Matrix")
            for i, test in enumerate(ab_tests, 1):
                if isinstance(test, dict):
                    lines.extend([
                        f"### Test {i}: {test.get('hypothesis', '')}",
                        f"- **Variant A:** {test.get('variant_a', '')}",
                        f"- **Variant B:** {test.get('variant_b', '')}",
                        f"- **Primary Metric:** {test.get('metric_to_track', '')}",
                        ""
                    ])

        return "\n".join(lines)

copywriting_agent = CopywritingAgent()
