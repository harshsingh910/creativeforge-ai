import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Megaphone,
  Video,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import {
  ContentAgentFormData,
  CopywritingAgentFormData,
  VideoAgentFormData,
  AgentResponse
} from '../types';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { ActionButtons } from '../components/common/ActionButtons';
import { GenerationDetailsCard } from '../components/common/GenerationDetailsCard';

export const DemoPage: React.FC = () => {
  // Pre-filled demo brief 1
  const demoContentInput: ContentAgentFormData = {
    content_type: 'SEO Article',
    topic: 'How Next-Gen Multi-Agent Systems Prevent Software Regressions',
    target_audience: 'VP of Engineering, QA Architects, Senior Tech Leads',
    goal: 'Educate engineering leaders on autonomous test generation and reduce production rollback frequency',
    tone: 'Authoritative, Practical, and Engineering-Focused',
    length: 'Medium (~1,200 words)',
    primary_keyword: 'multi-agent software testing',
    secondary_keywords: 'autonomous regression testing, agentic CI/CD, synthetic test generation',
    brand_context: 'DevForge AI — Automated Regression Intelligence for High-Velocity Teams'
  };

  // Pre-filled demo brief 2
  const demoCopywritingInput: CopywritingAgentFormData = {
    platform: 'LinkedIn',
    copy_type: 'Sponsored Executive Feed Ad',
    product_service: 'DataMesh Cloud — Zero-ETL Real-Time Analytics Lakehouse',
    target_audience: 'Chief Data Officers and Heads of Data Engineering',
    campaign_goal: 'Book Executive Product Architecture Reviews',
    pain_point: 'Engineering teams burn 40% of their sprints maintaining fragile ETL data pipelines that break daily',
    key_benefit: 'Queries cross-cloud operational databases directly with sub-second latency and zero pipeline maintenance',
    offer: 'Complimentary 30-Day Architectural Pilot with Dedicated Data Architect Support',
    tone: 'Thought-Provoking, Senior B2B Executive, Credible'
  };

  // Pre-filled demo brief 3
  const demoVideoInput: VideoAgentFormData = {
    video_type: 'Product Explainer & Commercial',
    topic: 'Smart Ring for High-Performance Mental Clarity & Deep Recovery',
    platform: 'YouTube & Website Hero',
    target_audience: 'Founders, knowledge workers, and athletes optimizing cognitive stamina',
    duration: '60 seconds',
    goal: 'Pre-order campaign reservations with $50 early-bird deposit',
    tone: 'High-Tech, Minimalist, Inspiring, and Cinematic',
    style: 'Apple-style sleek lighting with macro titanium texture close-ups',
    product_service: 'Onyx NeuroRing',
    cta: 'Reserve your Onyx NeuroRing today at onyxbio.com'
  };

  // State per demo
  const [loadingDemo1, setLoadingDemo1] = useState(false);
  const [errorDemo1, setErrorDemo1] = useState<string | null>(null);
  const [resultDemo1, setResultDemo1] = useState<AgentResponse | null>(null);

  const [loadingDemo2, setLoadingDemo2] = useState(false);
  const [errorDemo2, setErrorDemo2] = useState<string | null>(null);
  const [resultDemo2, setResultDemo2] = useState<AgentResponse | null>(null);

  const [loadingDemo3, setLoadingDemo3] = useState(false);
  const [errorDemo3, setErrorDemo3] = useState<string | null>(null);
  const [resultDemo3, setResultDemo3] = useState<AgentResponse | null>(null);

  const runDemo1 = async () => {
    setLoadingDemo1(true);
    setErrorDemo1(null);
    try {
      const res = await api.generateContent(demoContentInput);
      setResultDemo1(res);
    } catch (err: any) {
      setErrorDemo1(err.message || 'Error running Content Agent demo.');
    } finally {
      setLoadingDemo1(false);
    }
  };

  const runDemo2 = async () => {
    setLoadingDemo2(true);
    setErrorDemo2(null);
    try {
      const res = await api.generateCopywriting(demoCopywritingInput);
      setResultDemo2(res);
    } catch (err: any) {
      setErrorDemo2(err.message || 'Error running Copywriting Agent demo.');
    } finally {
      setLoadingDemo2(false);
    }
  };

  const runDemo3 = async () => {
    setLoadingDemo3(true);
    setErrorDemo3(null);
    try {
      const res = await api.generateVideo(demoVideoInput);
      setResultDemo3(res);
    } catch (err: any) {
      setErrorDemo3(err.message || 'Error running Video Agent demo.');
    } finally {
      setLoadingDemo3(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Assignment Live Demo Mode</h2>
            <span className="text-xs text-violet-400 font-medium">One-Click Live LLM Pipeline Evaluation</span>
          </div>
        </div>
        <p className="text-sm text-slate-400">
          Evaluator sandbox configured with verified enterprise briefs. Clicking "Run Demo" connects live to Claude Haiku 4.5 through OpenRouter to execute the full multi-step workflow.
        </p>
      </div>

      {/* Demo Cards Grid */}
      <div className="space-y-12">
        {/* ================================================================= */}
        {/* DEMO 1: Content Writing Agent */}
        {/* ================================================================= */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-blue-500/30 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  Demo 1
                </span>
                <h3 className="text-lg font-bold text-white">Content Writing Agent Live Demo</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {resultDemo1 && (
                <button
                  onClick={() => setResultDemo1(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
              <button
                onClick={runDemo1}
                disabled={loadingDemo1}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{loadingDemo1 ? 'Generating via Claude...' : 'Run Demo 1'}</span>
              </button>
            </div>
          </div>

          {/* Pre-filled Brief Inspection */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Pre-filled Brief Parameters:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
              <div><strong className="text-blue-400">Topic:</strong> {demoContentInput.topic}</div>
              <div><strong className="text-blue-400">Audience:</strong> {demoContentInput.target_audience}</div>
              <div><strong className="text-blue-400">Keyword:</strong> {demoContentInput.primary_keyword}</div>
            </div>
          </div>

          {/* Error and Loading */}
          {errorDemo1 && <ErrorAlert error={errorDemo1} onRetry={runDemo1} />}
          {loadingDemo1 && <LoadingState message="Claude Haiku 4.5 is executing the Content Strategy Workflow..." agentName="Content Writing" />}

          {/* Result Output */}
          {resultDemo1 && (
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-blue-500/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Live Generated Content Output
                </span>
                <ActionButtons
                  content={resultDemo1.raw_content}
                  filename="demo-1-content.md"
                />
              </div>

              {/* Strategy */}
              {resultDemo1.output?.strategy && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                  <strong className="text-blue-400 block mb-1">Strategy:</strong>
                  {resultDemo1.output.strategy}
                </div>
              )}

              {/* Content Preview */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {resultDemo1.output?.final_content || resultDemo1.raw_content}
              </div>

              <GenerationDetailsCard details={resultDemo1.details} />
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* DEMO 2: Copywriting & Ads Agent */}
        {/* ================================================================= */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-amber-500/30 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                  Demo 2
                </span>
                <h3 className="text-lg font-bold text-white">Copywriting & Ads Agent Live Demo</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {resultDemo2 && (
                <button
                  onClick={() => setResultDemo2(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
              <button
                onClick={runDemo2}
                disabled={loadingDemo2}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-600/30 active:scale-95 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{loadingDemo2 ? 'Generating via Claude...' : 'Run Demo 2'}</span>
              </button>
            </div>
          </div>

          {/* Pre-filled Brief Inspection */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Pre-filled Brief Parameters:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
              <div><strong className="text-amber-400">Product:</strong> {demoCopywritingInput.product_service}</div>
              <div><strong className="text-amber-400">Platform:</strong> {demoCopywritingInput.platform}</div>
              <div><strong className="text-amber-400">Pain Point:</strong> {demoCopywritingInput.pain_point}</div>
            </div>
          </div>

          {/* Error and Loading */}
          {errorDemo2 && <ErrorAlert error={errorDemo2} onRetry={runDemo2} />}
          {loadingDemo2 && <LoadingState message="Claude Haiku 4.5 is forging conversion variations..." agentName="Copywriting & Ads" />}

          {/* Result Output */}
          {resultDemo2 && (
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Live Generated Ad Campaign
                </span>
                <ActionButtons
                  content={resultDemo2.raw_content}
                  filename="demo-2-copywriting.md"
                />
              </div>

              {/* Variations */}
              {resultDemo2.output?.variations && (
                <div className="space-y-3">
                  {resultDemo2.output.variations.map((v: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-amber-500/20 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-300">{v.name}</span>
                        <span className="text-slate-400">{v.target_angle}</span>
                      </div>
                      <div className="font-bold text-white">"{v.hook}"</div>
                      <div className="text-slate-300 whitespace-pre-wrap">{v.body}</div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px]">
                        <div><strong>Headline:</strong> {v.headline}</div>
                        <div><strong className="text-amber-400">CTA:</strong> {v.cta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <GenerationDetailsCard details={resultDemo2.details} />
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* DEMO 3: Video Production Agent */}
        {/* ================================================================= */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-purple-500/30 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  Demo 3
                </span>
                <h3 className="text-lg font-bold text-white">Video Production Agent Live Demo</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {resultDemo3 && (
                <button
                  onClick={() => setResultDemo3(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
              <button
                onClick={runDemo3}
                disabled={loadingDemo3}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30 active:scale-95 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{loadingDemo3 ? 'Generating via Claude...' : 'Run Demo 3'}</span>
              </button>
            </div>
          </div>

          {/* Pre-filled Brief Inspection */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Pre-filled Brief Parameters:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
              <div><strong className="text-purple-400">Topic:</strong> {demoVideoInput.topic}</div>
              <div><strong className="text-purple-400">Duration:</strong> {demoVideoInput.duration}</div>
              <div><strong className="text-purple-400">CTA:</strong> {demoVideoInput.cta}</div>
            </div>
          </div>

          {/* Error and Loading */}
          {errorDemo3 && <ErrorAlert error={errorDemo3} onRetry={runDemo3} />}
          {loadingDemo3 && <LoadingState message="Claude Haiku 4.5 is planning video scenes & storyboards..." agentName="Video Production" />}

          {/* Result Output */}
          {resultDemo3 && (
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-purple-500/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Live Generated Video Blueprint
                </span>
                <ActionButtons
                  content={resultDemo3.raw_content}
                  filename="demo-3-video.md"
                />
              </div>

              {/* Hook */}
              {resultDemo3.output?.hook && (
                <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-slate-200">
                  <strong className="text-purple-300 block mb-1">The 3-Second Hook:</strong>
                  "{resultDemo3.output.hook}"
                </div>
              )}

              {/* Storyboard Cards */}
              {resultDemo3.output?.storyboard && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resultDemo3.output.storyboard.map((scene: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Scene {scene.scene_number || idx + 1}</span>
                        <span className="font-mono text-purple-400 text-[11px]">{scene.duration}</span>
                      </div>
                      <div><strong className="text-slate-400">Visual:</strong> {scene.visual}</div>
                      <div><strong className="text-purple-300">VO:</strong> "{scene.voice_over}"</div>
                    </div>
                  ))}
                </div>
              )}

              <GenerationDetailsCard details={resultDemo3.details} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
