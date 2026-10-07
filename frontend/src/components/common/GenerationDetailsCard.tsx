import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Server, Coins, Zap, CheckCircle2 } from 'lucide-react';
import { GenerationDetails } from '../../types';

interface GenerationDetailsCardProps {
  details?: GenerationDetails | null;
}

export const GenerationDetailsCard: React.FC<GenerationDetailsCardProps> = ({ details }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!details) return null;

  const hasAnyData = Boolean(
    details.model ||
    details.provider ||
    details.prompt_tokens ||
    details.completion_tokens ||
    details.total_tokens ||
    details.cost !== undefined ||
    details.finish_reason
  );

  if (!hasAnyData) return null;

  return (
    <div className="mt-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-200">Generation Details</span>
            <span className="ml-2 text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-800/50">
              {details.model}
            </span>
            {details.provider && (
              <span className="ml-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                via {details.provider}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <span>{isOpen ? 'Hide telemetry' : 'View metrics'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-800/80 bg-slate-950/30">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-3">
            {/* Model */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Model</span>
              </div>
              <div className="text-xs font-mono font-medium text-slate-200 truncate" title={details.model}>
                {details.model}
              </div>
            </div>

            {/* Provider */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>Provider</span>
              </div>
              <div className="text-xs font-mono font-medium text-slate-200">
                {details.provider || 'OpenRouter'}
              </div>
            </div>

            {/* Prompt Tokens */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Prompt Tkns</span>
              </div>
              <div className="text-xs font-mono font-medium text-slate-200">
                {details.prompt_tokens != null ? details.prompt_tokens.toLocaleString() : 'N/A'}
              </div>
            </div>

            {/* Completion Tokens */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-violet-400" />
                <span>Output Tkns</span>
              </div>
              <div className="text-xs font-mono font-medium text-slate-200">
                {details.completion_tokens != null ? details.completion_tokens.toLocaleString() : 'N/A'}
              </div>
            </div>

            {/* Total Tokens */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                <span>Total Tkns</span>
              </div>
              <div className="text-xs font-mono font-medium text-slate-200">
                {details.total_tokens != null ? details.total_tokens.toLocaleString() : 'N/A'}
              </div>
            </div>

            {/* Cost */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>Est. Cost</span>
              </div>
              <div className="text-xs font-mono font-medium text-emerald-300">
                {details.cost != null
                  ? `$${typeof details.cost === 'number' ? details.cost.toFixed(6) : details.cost}`
                  : 'N/A'}
              </div>
            </div>
          </div>

          {details.finish_reason && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Finish Reason: <span className="font-mono text-slate-300">{details.finish_reason}</span></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
