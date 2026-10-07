import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Video,
  Layers,
  Sparkles,
  Info,
  Settings,
  ChevronRight,
  Bot
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'content-agent'
  | 'copywriting-agent'
  | 'video-agent'
  | 'samples'
  | 'demo'
  | 'about'
  | 'settings';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isApiConfigured: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isApiConfigured,
  onCloseMobile,
}) => {
  const handleItemClick = (page: PageId) => {
    onNavigate(page);
    if (onCloseMobile) onCloseMobile();
  };

  const navItemClass = (page: PageId) => {
    const isActive = currentPage === page;
    return `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`;
  };

  return (
    <aside className="w-72 h-full flex flex-col bg-slate-950 border-r border-slate-800/80 p-5 select-none overflow-y-auto">
      {/* Brand Header */}
      <div
        onClick={() => handleItemClick('dashboard')}
        className="flex items-center gap-3 cursor-pointer group pb-6 mb-6 border-b border-slate-800/80"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-white tracking-tight leading-none">
              CreativeForge AI
            </h1>
          </div>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 uppercase">
            Tri-Agent Enterprise Studio
          </p>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 space-y-6">
        {/* Core Nav */}
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
            Overview
          </div>
          <button
            onClick={() => handleItemClick('dashboard')}
            className={navItemClass('dashboard')}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </div>
            {currentPage === 'dashboard' && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
          </button>
        </div>

        {/* Specialized Agents */}
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2 flex items-center justify-between">
            <span>Specialized Agents</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
              3 Active
            </span>
          </div>

          <div className="space-y-1">
            {/* Content Writing Agent */}
            <button
              onClick={() => handleItemClick('content-agent')}
              className={navItemClass('content-agent')}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="truncate">Content Writing</span>
              </div>
              {currentPage === 'content-agent' && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
            </button>

            {/* Copywriting & Ads Agent */}
            <button
              onClick={() => handleItemClick('copywriting-agent')}
              className={navItemClass('copywriting-agent')}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span className="truncate">Copywriting & Ads</span>
              </div>
              {currentPage === 'copywriting-agent' && <ChevronRight className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            {/* Video Production Agent */}
            <button
              onClick={() => handleItemClick('video-agent')}
              className={navItemClass('video-agent')}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <Video className="w-4 h-4 text-purple-400" />
                <span className="truncate">Video Production</span>
              </div>
              {currentPage === 'video-agent' && <ChevronRight className="w-3.5 h-3.5 text-purple-400" />}
            </button>
          </div>
        </div>

        {/* Showcase & Validation */}
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
            Evaluation
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleItemClick('samples')}
              className={navItemClass('samples')}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Samples (9 Outputs)</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                3x3
              </span>
            </button>

            <button
              onClick={() => handleItemClick('demo')}
              className={navItemClass('demo')}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Demo Mode</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                Live
              </span>
            </button>
          </div>
        </div>

        {/* System & Info */}
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
            System
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleItemClick('about')}
              className={navItemClass('about')}
            >
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-slate-400" />
                <span>About Architecture</span>
              </div>
            </button>

            <button
              onClick={() => handleItemClick('settings')}
              className={navItemClass('settings')}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings & Config</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Backend & Model Status Footer Card */}
      <div className="pt-4 mt-6 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 font-medium">Claude Haiku 4.5</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isApiConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={`text-[10px] font-semibold ${isApiConfigured ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isApiConfigured ? 'Ready' : 'No Key'}
              </span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 leading-tight">
            Connected via OpenRouter with Amazon Bedrock routing.
          </div>
        </div>
      </div>
    </aside>
  );
};
