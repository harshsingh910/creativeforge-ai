import json
import re
from typing import Any, Dict, List

def repair_truncated_json(text: str) -> Dict[str, Any]:
    """
    Attempts to repair truncated JSON caused by token length limits
    by balancing quotes, brackets, and braces.
    """
    clean = text.strip()
    start_idx = clean.find("{")
    if start_idx == -1:
        return {}
    clean = clean[start_idx:]

    # Remove any trailing incomplete key-value or dangling comma/colon
    # Trim back from end to the last complete token if possible
    clean = re.sub(r',\s*"[^"]*":?\s*$', '', clean)
    clean = re.sub(r',\s*$', '', clean)

    # Balance unclosed string quotes
    in_string = False
    escape = False
    stack: List[str] = []

    for char in clean:
        if escape:
            escape = False
            continue
        if char == '\\':
            escape = True
            continue
        if char == '"':
            in_string = not in_string
            continue
        if not in_string:
            if char in '{[':
                stack.append(char)
            elif char in '}]':
                if stack:
                    top = stack[-1]
                    if (char == '}' and top == '{') or (char == ']' and top == '['):
                        stack.pop()

    repaired = clean
    if in_string:
        repaired += '"'

    # Close any open structures in reverse order
    for open_char in reversed(stack):
        if open_char == '{':
            repaired += '}'
        elif open_char == '[':
            repaired += ']'

    try:
        return json.loads(repaired)
    except Exception:
        return {}


def extract_key_value_fallback(text: str) -> Dict[str, Any]:
    """
    Fallback extractor when entire JSON cannot be parsed.
    Extracts individual top-level fields using key-targeted pattern matching.
    """
    result: Dict[str, Any] = {}
    known_str_keys = [
        "creative_concept", "retention_hook", "hook", "script", "full_script",
        "voiceover", "voice_over", "sound_design", "audio_sfx",
        "social_cut", "social_media_version", "cta", "strategy", "campaign_strategy", "creative_angle"
    ]

    for key in known_str_keys:
        # Match "key"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"
        pattern = rf'"{key}"\s*:\s*"((?:[^"\\]|\\.)*)"'
        match = re.search(pattern, text, re.DOTALL)
        if match:
            val = match.group(1).encode('utf-8').decode('unicode_escape', errors='ignore')
            result[key] = val

    # Match shot_list array if present
    shot_match = re.search(r'"shot_list"\s*:\s*\[(.*?)\]', text, re.DOTALL)
    if shot_match:
        items = re.findall(r'"((?:[^"\\]|\\.)*)"', shot_match.group(1))
        if items:
            result["shot_list"] = [it.encode('utf-8').decode('unicode_escape', errors='ignore') for it in items]

    # Match storyboard array if present
    storyboard_match = re.search(r'"storyboard"\s*:\s*\[(.*)\]', text, re.DOTALL)
    if storyboard_match:
        scenes: List[Dict[str, Any]] = []
        scene_blocks = re.findall(r'\{([^{}]+)\}', storyboard_match.group(1))
        for idx, block in enumerate(scene_blocks, 1):
            scene_dict: Dict[str, Any] = {"scene_number": idx}
            for field in ["duration", "visual", "action", "camera_shot", "voice_over", "voiceover", "on_screen_text", "audio_sfx", "sound_design"]:
                f_match = re.search(rf'"{field}"\s*:\s*"((?:[^"\\]|\\.)*)"', block)
                if f_match:
                    scene_dict[field] = f_match.group(1).encode('utf-8').decode('unicode_escape', errors='ignore')
            if len(scene_dict) > 1:
                scenes.append(scene_dict)
        if scenes:
            result["storyboard"] = scenes

    return result


def extract_and_parse_json(text: str) -> Dict[str, Any]:
    """
    Robustly extract and parse a JSON object from LLM response text,
    safely handling markdown fences (```json ... ```), partial truncations,
    and fallback key extraction so fields are never silently lost.
    """
    if not text or not text.strip():
        raise ValueError("Received empty response from AI model.")

    clean_text = text.strip()

    # Step 1: Safely strip markdown code block fences if present
    # Case A: Complete fence ```json ... ```
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", clean_text, re.IGNORECASE)
    if fence_match:
        candidate = fence_match.group(1).strip()
    else:
        # Case B: Opening fence ```json without closing ``` (e.g. truncated)
        open_fence_match = re.search(r"^```(?:json)?\s*([\s\S]*)$", clean_text, re.IGNORECASE)
        if open_fence_match:
            candidate = open_fence_match.group(1).strip()
        else:
            candidate = clean_text

    # Step 2: Direct JSON parse attempt
    try:
        data = json.loads(candidate)
        if isinstance(data, dict):
            return data
    except Exception:
        pass

    # Step 3: Extract content between outermost { and }
    start_idx = candidate.find("{")
    end_idx = candidate.rfind("}")
    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
        bounded = candidate[start_idx : end_idx + 1]
        try:
            data = json.loads(bounded)
            if isinstance(data, dict):
                return data
        except Exception:
            pass

    # Step 4: Repair truncated JSON (for finish_reason=length)
    repaired = repair_truncated_json(candidate)
    if repaired and isinstance(repaired, dict) and len(repaired) > 0:
        return repaired

    # Step 5: Fallback key-by-key extraction
    fallback_data = extract_key_value_fallback(candidate)
    if fallback_data:
        return fallback_data

    # Step 6: If completely unparseable, return raw text container
    return {
        "raw_text": text,
        "is_unstructured": True
    }
