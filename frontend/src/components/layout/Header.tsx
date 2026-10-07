import React from 'react';
import { Menu, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';
import { PageId } from './Sidebar';

interface HeaderProps {
  currentPage: PageId;
  onOpenMobileSidebar: () => void;
  isApiConfigured: boolean;
}

const pageTitles: Record<PageId, { title: string; subtitle: string; tag: string }> = {
  dashboard: {
    title: 'CreativeForge AI Studio',
    subtitle: 'Three specialized AI agents for content, campaigns, and video production.',
    tag: 'Enterprise Studio',
  },
  'content-agent': {
    title: 'Content Writing Agent',
    subtitle: 'Transform ideas into polished, SEO-friendly long-form articles, websites, and e-books.',
    tag: 'Editorial & SEO',
  },
  'copywriting-agent': {
    title: 'Copywriting & Ads Agent',
    subtitle: 'High-converting multi-platform ad campaigns, direct-response copy, and A/B variations.',
    tag: 'Performance Marketing',
  },
  'video-agent': {
    title: 'Video Production Agent',
    subtitle: 'Cinematic video concepts, frame-by-frame storyboards, scripts, shot lists, and audio design.',
    tag: 'Creative Direction',
  },
  samples: {
    title: 'Interactive Samples Gallery',
    subtitle: 'Explore 9 pre-computed realistic outputs (3 for each specialized agent).',
    tag: '3x3 Verification',
  },
  demo: {
    title: 'Live Evaluation Demo Mode',
    subtitle: 'Run realistic live evaluations with Claude Haiku 4.5 through OpenRouter in one click.',
    tag: 'Live Evaluation',
  },
  about: {
    title: 'Architecture & System Design',
    subtitle: 'Clean decoupling of React, FastAPI, OpenRouter, and Claude Haiku 4.5.',
    tag: 'Technical Spec',
  },
  settings: {
    title: 'Environment & Configuration',
    subtitle: 'Verify OpenRouter API status, Claude model routing, and backend connectivity.',
    tag: 'Telemetry',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onOpenMobileSidebar,
  isApiConfigured,
}) => {
  const currentMeta = pageTitles[currentPage] || pageTitles.dashboard;

  return (
    <header className="h-20 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-white tracking-tight leading-tight">
              {currentMeta.title}
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800/90 text-indigo-400 border border-slate-700">
              {currentMeta.tag}
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Model badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono text-[11px] text-slate-300">claude-haiku-4.5</span>
        </div>

        {/* Status badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
          isApiConfigured
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
            : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
        }`}>
          {isApiConfigured ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">OpenRouter Ready</span>
              <span className="sm:hidden">Ready</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Set OPENROUTER_API_KEY</span>
              <span className="sm:hidden">No Key</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
