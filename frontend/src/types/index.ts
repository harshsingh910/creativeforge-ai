export interface GenerationDetails {
  model: string;
  provider?: string | null;
  prompt_tokens?: number | null;
  completion_tokens?: number | null;
  total_tokens?: number | null;
  cost?: number | null;
  finish_reason?: string | null;
}

export interface AgentResponse<T = any> {
  success: boolean;
  agent: string;
  output: T;
  raw_content: string;
  details?: GenerationDetails | null;
  error?: string | null;
}

export interface HealthStatus {
  status: string;
  version: string;
  model: string;
  api_key_configured: boolean;
  timestamp: string;
}

// -------------------------------------------------------------
// Content Writing Agent
// -------------------------------------------------------------
export interface ContentAgentFormData {
  content_type: 'Blog' | 'Website Content' | 'E-Book' | 'SEO Article';
  topic: string;
  target_audience: string;
  goal: string;
  tone: string;
  length: string;
  primary_keyword: string;
  secondary_keywords?: string;
  brand_context?: string;
}

export interface ContentAgentOutput {
  strategy: string;
  seo_information: {
    search_intent?: string;
    meta_title?: string;
    meta_description?: string;
    primary_keyword?: string;
    secondary_keywords?: string[];
    [key: string]: any;
  };
  outline: string[];
  final_content: string;
  faq: Array<{ question: string; answer: string }>;
  cta: string;
  internal_links: string[];
}

// -------------------------------------------------------------
// Copywriting & Ads Agent
// -------------------------------------------------------------
export interface CopywritingAgentFormData {
  platform: 'Facebook' | 'Instagram' | 'Google Ads' | 'LinkedIn' | 'Email';
  copy_type: string;
  product_service: string;
  target_audience: string;
  campaign_goal: string;
  pain_point: string;
  key_benefit: string;
  offer?: string;
  tone: string;
}

export interface CopyVariation {
  id: string;
  name: string;
  hook: string;
  body: string;
  headline: string;
  cta: string;
  target_angle: string;
}

export interface ABTestItem {
  hypothesis: string;
  variant_a: string;
  variant_b: string;
  metric_to_track: string;
}

export interface CopywritingAgentOutput {
  campaign_strategy: string;
  creative_angle: string;
  variations: CopyVariation[];
  headlines: string[];
  ctas: string[];
  ab_tests: ABTestItem[];
}

// -------------------------------------------------------------
// Video Production Agent
// -------------------------------------------------------------
export interface VideoAgentFormData {
  video_type: string;
  topic: string;
  platform: string;
  target_audience: string;
  duration: string;
  goal: string;
  tone: string;
  style: string;
  product_service: string;
  cta: string;
}

export interface StoryboardScene {
  scene_number: number;
  duration: string;
  visual: string;
  action: string;
  camera_shot: string;
  voice_over?: string;
  voiceover?: string;
  on_screen_text?: string;
  audio_sfx?: string;
  sound_design?: string;
}

export interface VideoAgentOutput {
  creative_concept: string;
  retention_hook?: string;
  hook?: string;
  script?: string;
  full_script?: string;
  storyboard: StoryboardScene[];
  shot_list: string[];
  voiceover?: string;
  voice_over?: string;
  on_screen_text?: string[];
  sound_design?: string;
  audio_sfx?: string;
  social_cut?: string;
  social_media_version?: string;
  cta?: string;
}
