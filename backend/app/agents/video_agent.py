from typing import Dict, Any, List
from app.schemas.agent_schemas import VideoAgentRequest, AgentResponse
from app.prompts.video_prompt import VIDEO_AGENT_SYSTEM_PROMPT, build_video_user_prompt
from app.services.openrouter_service import openrouter_service
from app.utils.json_parser import extract_and_parse_json

class VideoAgent:
    """Specialized AI Video Creative Director and Production Planner Agent."""

    def __init__(self):
        self.name = "Video Production Agent"

    def generate(self, req: VideoAgentRequest) -> AgentResponse:
        user_prompt = build_video_user_prompt(
            video_type=req.video_type,
            topic=req.topic,
            platform=req.platform,
            target_audience=req.target_audience,
            duration=req.duration,
            goal=req.goal,
            tone=req.tone,
            style=req.style,
            product_service=req.product_service,
            cta=req.cta
        )

        content, details = openrouter_service.call_claude(
            system_prompt=VIDEO_AGENT_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.7,
            max_tokens=4000
        )

        raw_parsed = extract_and_parse_json(content)
        normalized_output = self._normalize_and_validate_output(raw_parsed, req)
        raw_markdown = self._format_as_markdown(req, normalized_output)

        return AgentResponse(
            success=True,
            agent="video",
            output=normalized_output,
            raw_content=raw_markdown,
            details=details
        )

    def _normalize_and_validate_output(self, raw: Dict[str, Any], req: VideoAgentRequest) -> Dict[str, Any]:
        """
        Guarantees strict schema adherence and ensures minimum required fields:
        creative_concept, retention_hook, storyboard, shot_list, script, voiceover
        are never empty or missing.
        """
        # 1. Creative Concept
        creative_concept = raw.get("creative_concept") or raw.get("concept") or ""
        if not creative_concept:
            creative_concept = f"High-energy commercial spotlighting {req.product_service} as the ultimate solution for {req.topic}. Uses kinetic pacing and dynamic framing to inspire {req.target_audience}."

        # 2. Retention Hook (0-3 seconds)
        retention_hook = raw.get("retention_hook") or raw.get("hook") or ""
        if not retention_hook:
            retention_hook = f"Close-up high-impact freeze frame of {req.product_service} shattering expectations. Quick beat drop with bold text: Stop Settling for Less."

        # 3. Script
        script = raw.get("script") or raw.get("full_script") or ""
        if not script:
            script = f"[0:00 - 0:05] HOOK: {retention_hook}\n[0:05 - 0:15] PROBLEM & SOLUTION: Experience the next generation of {req.topic} with {req.product_service}.\n[0:15 - 0:25] VALUE & PROOF: Engineered specifically for {req.target_audience} seeking peak results.\n[0:25 - 0:30] OUTRO & CTA: {req.cta}"

        # 4. Voiceover
        voiceover = raw.get("voiceover") or raw.get("voice_over") or ""
        if not voiceover:
            voiceover = f"Tired of compromise? Meet {req.product_service}. Built for {req.target_audience} who demand results. {req.cta}."

        # 5. Sound Design
        sound_design = raw.get("sound_design") or raw.get("audio_sfx") or ""
        if not sound_design:
            sound_design = "Driving electronic synth track at 124 BPM. Crisp risers into punchy low-end drops on key action cuts."

        # 6. Social Cut (9:16)
        social_cut = raw.get("social_cut") or raw.get("social_media_version") or ""
        if not social_cut:
            social_cut = f"15s Vertical Edit: [0:00-0:03] {retention_hook} [0:03-0:10] Rapid product demo cuts of {req.product_service}. [0:10-0:15] {req.cta}"

        # 7. Shot List
        shot_list_raw = raw.get("shot_list") or []
        if isinstance(shot_list_raw, str):
            shot_list = [s.strip("- *").strip() for s in shot_list_raw.split("\n") if s.strip()]
        elif isinstance(shot_list_raw, list):
            shot_list = [str(s) for s in shot_list_raw if str(s).strip()]
        else:
            shot_list = []

        if not shot_list:
            shot_list = [
                f"Shot 1: Extreme Close-Up (ECU) macro texture of {req.product_service}",
                "Shot 2: Medium tracking shot showing intense subject action",
                "Shot 3: Dynamic low-angle hero push-in",
                "Shot 4: High-contrast product benefit demonstration",
                f"Shot 5: Clean centered logo resolve with CTA: '{req.cta}'"
            ]

        # 8. Storyboard Scenes (approx 6-8 scenes for 30s)
        storyboard_raw = raw.get("storyboard") or []
        storyboard: List[Dict[str, Any]] = []

        if isinstance(storyboard_raw, list):
            for idx, sc in enumerate(storyboard_raw, 1):
                if isinstance(sc, dict):
                    vo = sc.get("voice_over") or sc.get("voiceover") or ""
                    sfx = sc.get("audio_sfx") or sc.get("sound_design") or ""
                    storyboard.append({
                        "scene_number": sc.get("scene_number", idx),
                        "duration": sc.get("duration", f"0:{idx*4-4:02d} - 0:{idx*4:02d}"),
                        "visual": sc.get("visual", f"Scene {idx} visual frame for {req.product_service}"),
                        "action": sc.get("action", "Subject engages with core product interaction"),
                        "camera_shot": sc.get("camera_shot", "Dynamic 50mm tracking shot"),
                        "voice_over": vo,
                        "voiceover": vo,
                        "on_screen_text": sc.get("on_screen_text", f"{req.product_service}"),
                        "audio_sfx": sfx,
                        "sound_design": sfx
                    })

        if not storyboard:
            # Generate 6 concise structured scenes based on requested brief
            default_scenes = [
                ("0:00 - 0:04", f"Opening macro view of {req.product_service} amidst dynamic lighting", "Product spins into focus", "Macro 35mm push-in", retention_hook, f"INTRODUCING {req.product_service.upper()}", "Sub-bass rumble into crisp whoosh"),
                ("0:04 - 0:09", f"Target user in daily environment facing typical friction in {req.topic}", "Subject pauses in frustration", "Medium handheld shot", f"Struggling with {req.topic}?", "THE OLD WAY", "Muffled acoustic drop"),
                ("0:09 - 0:14", f"Sudden reveal of {req.product_service} active usage", "Fast transformation moment", "Wide tracking shot", f"Everything changes with {req.product_service}.", "INSTANT RESULTS", "High-energy beat kick-in"),
                ("0:14 - 0:19", "Close-up feature breakdown highlighting premium quality", "Product functions effortlessly", "Close-up 50mm smooth glide", "Engineered for maximum performance and reliability.", "PREMIUM FORMULATION", "Crisp mechanical click SFX"),
                ("0:19 - 0:24", "User thriving, energized and fully satisfied with results", "Subject smiles with confident stance", "Low-angle heroic pan", "Feel the undeniable difference from day one.", "PEAK PERFORMANCE", "Uplifting musical crescendo"),
                ("0:24 - 0:30", f"Crisp hero product lockup with website and offer badge", "Product settles into branded glow", "Locked tripod beauty shot", req.cta, req.cta.upper(), "Signature audio chime and smooth fade")
            ]
            for idx, (dur, vis, act, cam, vo, txt, sfx) in enumerate(default_scenes, 1):
                storyboard.append({
                    "scene_number": idx,
                    "duration": dur,
                    "visual": vis,
                    "action": act,
                    "camera_shot": cam,
                    "voice_over": vo,
                    "voiceover": vo,
                    "on_screen_text": txt,
                    "audio_sfx": sfx,
                    "sound_design": sfx
                })

        return {
            # Strict fields requested in requirement 3
            "creative_concept": creative_concept,
            "retention_hook": retention_hook,
            "storyboard": storyboard,
            "shot_list": shot_list,
            "script": script,
            "voiceover": voiceover,
            "sound_design": sound_design,
            "social_cut": social_cut,
            # Dual aliases for compatibility
            "hook": retention_hook,
            "full_script": script,
            "voice_over": voiceover,
            "audio_sfx": sound_design,
            "social_media_version": social_cut,
            "cta": req.cta
        }

    def _format_as_markdown(self, req: VideoAgentRequest, output: Dict[str, Any]) -> str:
        lines = [
            f"# Video Production Blueprint: {req.topic}",
            f"*Format: {req.video_type} | Platform: {req.platform} | Target Duration: {req.duration}*",
            "",
            "## Creative Concept",
            output.get("creative_concept", ""),
            "",
            "## The 3-Second Retention Hook",
            output.get("retention_hook") or output.get("hook", ""),
            "",
            "## Full Production Script",
            output.get("script") or output.get("full_script", ""),
            "",
            "## Visual Storyboard",
        ]

        storyboard = output.get("storyboard", [])
        if isinstance(storyboard, list):
            for scene in storyboard:
                if isinstance(scene, dict):
                    num = scene.get("scene_number", 1)
                    dur = scene.get("duration", "")
                    lines.extend([
                        f"### Scene {num} ({dur})",
                        f"- **Visual Framing:** {scene.get('visual', '')}",
                        f"- **Camera Shot:** {scene.get('camera_shot', '')}",
                        f"- **Subject Action:** {scene.get('action', '')}",
                        f"- **Voice-Over Narration:** \"{scene.get('voice_over') or scene.get('voiceover', '')}\"",
                        f"- **On-Screen Text:** {scene.get('on_screen_text', '')}",
                        f"- **Audio & SFX:** {scene.get('audio_sfx') or scene.get('sound_design', '')}",
                        ""
                    ])

        shot_list = output.get("shot_list", [])
        if shot_list and isinstance(shot_list, list):
            lines.append("## Director's Shot List")
            for shot in shot_list:
                lines.append(f"- {shot}")
            lines.append("")

        lines.extend([
            "## Master Voice-Over Script",
            output.get("voiceover") or output.get("voice_over", ""),
            "",
            "## Sound Design & Score",
            output.get("sound_design") or output.get("audio_sfx", ""),
            "",
            "## Short-Form Social Cut (Reels/TikTok 9:16)",
            output.get("social_cut") or output.get("social_media_version", ""),
            "",
            "## Closing Call to Action",
            output.get("cta", req.cta)
        ])

        return "\n".join(lines)

video_agent = VideoAgent()
