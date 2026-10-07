import React from 'react';
import {
  FileText,
  Megaphone,
  Video,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Zap,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  isApiConfigured: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, isApiConfigured }) => {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/30 backdrop-blur-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Agent Studio Assignment — Production Grade</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-none mb-4">
            CreativeForge AI
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8">
            Three specialized AI agents for content, campaigns, and video production.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('demo')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Live Demo Mode</span>
            </button>

            <button
              onClick={() => onNavigate('samples')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2 active:scale-95"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>View 9 Sample Outputs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Three Agent Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Specialized AI Agents</h2>
            <p className="text-xs text-slate-400">
              Each agent features dedicated system prompts, distinct multi-step workflows, and unique output schemas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AGENT 1: Content Writing Agent */}
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
                <FileText className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Content Writing Agent</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/40">
                  Agent 1
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                A professional AI content strategist and writer. Crafts publication-ready editorial pieces engineered for reader retention and search visibility.
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Capabilities
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Generate Blogs', 'Website Content', 'E-Book Content', 'SEO-friendly Articles'].map((cap) => (
                    <span
                      key={cap}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 text-blue-200 border border-slate-700/60 font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 mb-6 space-y-1">
                <div className="text-slate-300 font-medium">Distinct Workflow:</div>
                <div>Brief → Audience & Intent → SEO Strategy → Outline → Content → FAQ & Internal Links</div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('content-agent')}
              className="w-full py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Launch Agent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* AGENT 2: Copywriting & Ads Agent */}
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-amber-500/20 hover:border-amber-500/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Megaphone className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Copywriting & Ads Agent</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/40">
                  Agent 2
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                A conversion-focused advertising specialist. Writes high-performing ad hooks, sales frameworks, and systematic A/B test experiments.
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Capabilities
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Facebook Ads',
                    'Google Ads',
                    'LinkedIn Ads',
                    'Product Descriptions',
                    'Email Copy',
                    'CTA Variations',
                    'A/B Testing'
                  ].map((cap) => (
                    <span
                      key={cap}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 text-amber-200 border border-slate-700/60 font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 mb-6 space-y-1">
                <div className="text-slate-300 font-medium">Distinct Workflow:</div>
                <div>Product → Pain Points → Positioning → Creative Angles → Variations → Headlines & CTAs → A/B Tests</div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('copywriting-agent')}
              className="w-full py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Launch Agent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* AGENT 3: Video Production Agent */}
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
                <Video className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Video Production Agent</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/40">
                  Agent 3
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                A video creative director and production planner. Creates full narrative scripts, visual storyboards, shot lists, audio cues, and social cuts.
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Capabilities
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Video Scripts',
                    'Storyboards',
                    'Shot Lists',
                    'Voice-over Scripts',
                    'Social Media Cut',
                    'Audio / SFX'
                  ].map((cap) => (
                    <span
                      key={cap}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 text-purple-200 border border-slate-700/60 font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 mb-6 space-y-1">
                <div className="text-slate-300 font-medium">Distinct Workflow:</div>
                <div>Concept → 3s Hook → Script → Storyboard Cards → Shot List → Voice-Over → Audio/SFX → Social Cut</div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('video-agent')}
              className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Launch Agent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Architectural Rigor & Requirements Highlights */}
      <div className="rounded-2xl p-8 bg-slate-900/40 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>System Architecture & Engineering Standards</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
              <Zap className="w-4 h-4" />
              <span>Claude Haiku 4.5</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real OpenRouter API integration. Tested with live Amazon Bedrock routing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
              <Shield className="w-4 h-4" />
              <span>Key Protection</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              API key strictly isolated in backend <code className="text-slate-300">.env</code>. Zero client-side exposure.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs mb-1">
              <Layers className="w-4 h-4" />
              <span>3 Distinct Workflows</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unique prompts, distinct Pydantic request models, and tailored output schemas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>9 Samples & Live Demo</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive samples gallery and pre-filled one-click live evaluation demos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
