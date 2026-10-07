import React from 'react';
import {
  Cpu,
  Layers,
  Shield,
  Zap,
  ArrowRight,
  Server,
  FileCode,
  CheckCircle2,
  GitBranch,
  FileText,
  Megaphone,
  Video
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white tracking-tight">System Architecture & Design</h2>
        <p className="text-sm text-slate-400 mt-1">
          Technical specifications, agent separation principles, and OpenRouter integration architecture.
        </p>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-indigo-500/20 backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <GitBranch className="w-4 h-4" />
            <span>Decoupled Production Architecture</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Zero Key Exposure Guarantee</span>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center py-4">
          {/* Step 1: React */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs font-bold text-indigo-300 mb-1">React + Vite</div>
            <div className="text-[10px] text-slate-400">TypeScript & Tailwind</div>
            <div className="mt-2 text-[10px] font-mono text-emerald-400">UI / Forms</div>
          </div>

          <div className="hidden sm:flex justify-center text-slate-600">
            <ArrowRight className="w-5 h-5 text-indigo-500" />
          </div>

          {/* Step 2: FastAPI */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs font-bold text-violet-300 mb-1">FastAPI Backend</div>
            <div className="text-[10px] text-slate-400">Python 3.12 + Pydantic</div>
            <div className="mt-2 text-[10px] font-mono text-emerald-400">Validation & Routing</div>
          </div>

          <div className="hidden sm:flex justify-center text-slate-600">
            <ArrowRight className="w-5 h-5 text-violet-500" />
          </div>

          {/* Step 3: OpenRouter */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs font-bold text-amber-300 mb-1">OpenRouter API</div>
            <div className="text-[10px] text-slate-400">anthropic/claude-haiku-4.5</div>
            <div className="mt-2 text-[10px] font-mono text-emerald-400">Bedrock Routing</div>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          The frontend never communicates directly with OpenRouter or holds the API key. All prompt construction, schema validation, and credential resolution occur safely inside the isolated Python FastAPI service.
        </p>
      </div>

      {/* The Three Distinct Agents Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Three Truly Specialized AI Agents</h3>
        <p className="text-xs text-slate-400">
          This system is not a chatbot with different button labels. Each agent has an isolated system prompt, custom multi-step domain workflow, and specialized Pydantic output schema.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Content Writing */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-blue-500/20 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <FileText className="w-4 h-4" />
              <span>1. Content Writing Agent</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong>Role:</strong> Senior Content Strategist, SEO Specialist & Editorial Writer.<br />
              <strong>Prompt:</strong> <code className="text-blue-300">backend/app/prompts/content_prompt.py</code><br />
              <strong>Workflow:</strong> Brief → Audience → Intent → SEO Strategy → Outline → Content → FAQ & Links.<br />
              <strong>Output Schema:</strong> Strategy, Meta Title/Desc, Outline array, Markdown content, FAQs, CTA.
            </div>
          </div>

          {/* Copywriting */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Megaphone className="w-4 h-4" />
              <span>2. Copywriting & Ads Agent</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong>Role:</strong> Direct-Response Performance Copywriter & CRO Architect.<br />
              <strong>Prompt:</strong> <code className="text-amber-300">backend/app/prompts/copywriting_prompt.py</code><br />
              <strong>Workflow:</strong> Product → Pain Points → Positioning → Creative Angles → Variations → Headlines & CTAs → A/B Tests.<br />
              <strong>Output Schema:</strong> Strategy, Creative Angle, Variations list, Headlines, CTAs, A/B Testing Matrix.
            </div>
          </div>

          {/* Video Production */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Video className="w-4 h-4" />
              <span>3. Video Production Agent</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong>Role:</strong> Commercial Creative Director & Cinematographer.<br />
              <strong>Prompt:</strong> <code className="text-purple-300">backend/app/prompts/video_prompt.py</code><br />
              <strong>Workflow:</strong> Concept → 3s Hook → Full Script → Storyboard Cards → Shot List → VO & SFX → Social 9:16 Cut.<br />
              <strong>Output Schema:</strong> Concept, Hook, Script, Storyboard scenes, Shot List, Audio/SFX, 9:16 Cut, CTA.
            </div>
          </div>
        </div>
      </div>

      {/* Security Architecture */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Security & Environment Isolation</span>
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><code>OPENROUTER_API_KEY</code> is loaded strictly via Python <code>python-dotenv</code> and backend environment variables.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>The API key is never logged, never returned in API payloads, and never bundled in client Javascript assets.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><code>.env</code> is added to <code>.gitignore</code> and protected by <code>.env.example</code> templates.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
