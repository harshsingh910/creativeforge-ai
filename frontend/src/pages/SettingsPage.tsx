import React, { useState, useEffect } from 'react';
import {
  Settings,
  ShieldCheck,
  AlertTriangle,
  Server,
  Zap,
  RefreshCw,
  Key,
  CheckCircle2,
  Terminal,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { HealthStatus } from '../types';

export const SettingsPage: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.checkHealth();
      setHealth(res);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message || 'Failed to reach FastAPI backend on http://127.0.0.1:8000');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">System & API Configuration</h2>
              <span className="text-xs text-slate-400 font-medium">Backend Connectivity & Model Diagnostics</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Verify real-time communication between the React frontend, FastAPI backend, and OpenRouter Claude Haiku 4.5.
          </p>
        </div>

        <button
          onClick={checkConnection}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          <span>{loading ? 'Pinging Backend...' : 'Refresh Health Status'}</span>
        </button>
      </div>

      {/* Connectivity Status Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Backend Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">FastAPI Backend</span>
            <Server className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${health ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-lg font-bold text-white">
              {health ? 'Online & Healthy' : 'Offline / Unreachable'}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            {health ? `Version: ${health.version} • Endpoint: /api/health` : 'Connection refused on port 8000'}
          </p>
        </div>

        {/* LLM Model Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target LLM</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-base font-bold text-white font-mono">
            {health?.model || 'anthropic/claude-haiku-4.5'}
          </div>
          <p className="text-xs text-slate-400">
            Routed via OpenRouter through Amazon Bedrock provider.
          </p>
        </div>

        {/* API Key Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">OPENROUTER_API_KEY</span>
            <Key className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-center gap-2">
            {health?.api_key_configured ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">Configured in .env</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-amber-400">Key Not Detected</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {health?.api_key_configured
              ? 'Securely loaded by backend. Never leaked to frontend.'
              : 'Add OPENROUTER_API_KEY to your backend .env file.'}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300">
          <strong>Backend Connection Error:</strong> {error}
        </div>
      )}

      {lastChecked && (
        <div className="text-[11px] font-mono text-slate-500 text-right">
          Last health audit: {lastChecked}
        </div>
      )}

      {/* Environment Setup Guide */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>Environment Setup & Verification</span>
        </h3>

        <div className="space-y-3 text-xs text-slate-300">
          <p>
            To activate live Claude Haiku 4.5 generation for the 3 agents, configure your OpenRouter API key in the project root:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 space-y-1">
            <div className="text-slate-500"># creativeforge-ai/.env</div>
            <div>OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx</div>
            <div>OPENROUTER_MODEL=anthropic/claude-haiku-4.5</div>
          </div>

          <div className="flex items-start gap-2 pt-2 text-slate-400 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              The backend automatically reloads environment variables from <code>creativeforge-ai/.env</code> or workspace <code>.env</code> upon server startup.
            </span>
          </div>
        </div>
      </div>

      {/* REST API Endpoints Registry */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span>Mounted FastAPI Endpoints</span>
        </h3>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">GET</span>
              <span className="text-slate-200">/api/health</span>
            </div>
            <span className="text-slate-500 text-[11px]">System health & key presence</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 text-[10px] font-bold">POST</span>
              <span className="text-slate-200">/api/agents/content/generate</span>
            </div>
            <span className="text-slate-500 text-[11px]">Content Writing Agent</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-bold">POST</span>
              <span className="text-slate-200">/api/agents/copywriting/generate</span>
            </div>
            <span className="text-slate-500 text-[11px]">Copywriting & Ads Agent</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 text-[10px] font-bold">POST</span>
              <span className="text-slate-200">/api/agents/video/generate</span>
            </div>
            <span className="text-slate-500 text-[11px]">Video Production Agent</span>
          </div>
        </div>
      </div>
    </div>
  );
};
