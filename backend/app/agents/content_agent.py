from typing import Dict, Any
from app.schemas.agent_schemas import ContentAgentRequest, AgentResponse
from app.prompts.content_prompt import CONTENT_AGENT_SYSTEM_PROMPT, build_content_user_prompt
from app.services.openrouter_service import openrouter_service
from app.utils.json_parser import extract_and_parse_json

class ContentAgent:
    """Specialized AI Content Strategist and Writer Agent."""

    def __init__(self):
        self.name = "Content Writing Agent"

    def generate(self, req: ContentAgentRequest) -> AgentResponse:
        user_prompt = build_content_user_prompt(
            content_type=req.content_type,
            topic=req.topic,
            target_audience=req.target_audience,
            goal=req.goal,
            tone=req.tone,
            length=req.length,
            primary_keyword=req.primary_keyword,
            secondary_keywords=req.secondary_keywords or "",
            brand_context=req.brand_context or ""
        )

        content, details = openrouter_service.call_claude(
            system_prompt=CONTENT_AGENT_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.7,
            max_tokens=4000
        )

        parsed_output = extract_and_parse_json(content)

        # Assemble clean markdown for export/download
        raw_markdown = self._format_as_markdown(req, parsed_output)

        return AgentResponse(
            success=True,
            agent="content",
            output=parsed_output,
            raw_content=raw_markdown,
            details=details
        )

    def _format_as_markdown(self, req: ContentAgentRequest, output: Dict[str, Any]) -> str:
        lines = [
            f"# {req.topic}",
            f"*Content Type: {req.content_type} | Target Audience: {req.target_audience}*",
            "",
            "## Content Strategy",
            output.get("strategy", ""),
            "",
            "## SEO Information",
        ]
        seo = output.get("seo_information", {})
        if isinstance(seo, dict):
            for k, v in seo.items():
                lines.append(f"- **{k.replace('_', ' ').title()}**: {v}")
        lines.append("")

        outline = output.get("outline", [])
        if outline and isinstance(outline, list):
            lines.append("## Outline")
            for item in outline:
                lines.append(f"- {item}")
            lines.append("")

        lines.extend([
            "## Final Content",
            output.get("final_content", ""),
            "",
            "## Call to Action",
            output.get("cta", ""),
            ""
        ])

        faqs = output.get("faq", [])
        if faqs and isinstance(faqs, list):
            lines.append("## Frequently Asked Questions")
            for item in faqs:
                if isinstance(item, dict):
                    lines.append(f"### {item.get('question', '')}")
                    lines.append(item.get('answer', ''))
                    lines.append("")

        internal_links = output.get("internal_links", [])
        if internal_links and isinstance(internal_links, list):
            lines.append("## Internal Link Suggestions")
            for link in internal_links:
                lines.append(f"- {link}")

        return "\n".join(lines)

content_agent = ContentAgent()
