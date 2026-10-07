export interface AgentMeta {
  id: 'content' | 'copywriting' | 'video';
  name: string;
  tagline: string;
  role: string;
  color: string;
  badgeBg: string;
  endpoint: string;
  capabilities: string[];
  workflowSteps: string[];
  systemPromptFile: string;
}

export const AGENTS_REGISTRY: Record<'content' | 'copywriting' | 'video', AgentMeta> = {
  content: {
    id: 'content',
    name: 'Content Writing Agent',
    tagline: 'Transform ideas into polished, SEO-friendly content.',
    role: 'Editorial Strategist & SEO Specialist',
    color: 'blue',
    badgeBg: 'bg-blue-950 text-blue-300 border-blue-800',
    endpoint: '/api/agents/content/generate',
    capabilities: [
      'Generate Blogs',
      'Website Content',
      'E-Book Content',
      'SEO-friendly Articles',
    ],
    workflowSteps: [
      'Understand Brief & Audience',
      'Analyze Search Intent & Target Keywords',
      'Formulate Content Strategy',
      'Generate Structured Heading Outline',
      'Synthesize Publication-Ready Content',
      'Generate FAQs, CTA & Internal Links',
    ],
    systemPromptFile: 'backend/app/prompts/content_prompt.py',
  },

  copywriting: {
    id: 'copywriting',
    name: 'Copywriting & Ads Agent',
    tagline: 'High-converting multi-platform ad campaigns and direct response copy.',
    role: 'Performance Marketing & Direct Response Copywriter',
    color: 'amber',
    badgeBg: 'bg-amber-950 text-amber-300 border-amber-800',
    endpoint: '/api/agents/copywriting/generate',
    capabilities: [
      'Facebook Ads',
      'Google Ads',
      'LinkedIn Ads',
      'Product Descriptions',
      'Email Copy',
      'CTA Variations',
      'A/B Testing Experiments',
    ],
    workflowSteps: [
      'Deconstruct Product & Customer Psychology',
      'Isolate Acute Pain Points & Value Props',
      'Select Multi-Angle Creative Hooks',
      'Draft Platform-Compliant Copy Variations',
      'Generate Punchy Headlines & Action CTAs',
      'Formulate Rigorous A/B Testing Matrix',
    ],
    systemPromptFile: 'backend/app/prompts/copywriting_prompt.py',
  },

  video: {
    id: 'video',
    name: 'Video Production Agent',
    tagline: 'Cinematic video concepts, scripts, visual storyboards, and audio design.',
    role: 'Creative Video Director & Cinematographer',
    color: 'purple',
    badgeBg: 'bg-purple-950 text-purple-300 border-purple-800',
    endpoint: '/api/agents/video/generate',
    capabilities: [
      'Video Scripts',
      'Storyboards',
      'Shot Lists',
      'Voice-over Scripts',
      'Social Media Video (9:16)',
      'Audio & Sound Design',
    ],
    workflowSteps: [
      'Deconstruct Brief & Platform Constraints',
      'Develop Narrative Concept & 3s Hook',
      'Draft Full Timestamped Production Script',
      'Generate Scene-by-Scene Storyboard Cards',
      'Compile Camera Shot List & Lighting Notes',
      'Specify Voice-Over, SFX, & 9:16 Social Cut',
    ],
    systemPromptFile: 'backend/app/prompts/video_prompt.py',
  },
};
