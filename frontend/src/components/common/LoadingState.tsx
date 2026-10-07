import React from 'react';
import { Sparkles, Brain, Cpu, Wand2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  agentName?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Claude is crafting your content...",
  agentName = "CreativeForge Agent"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 my-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-indigo-500/20 backdrop-blur-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Animated icon orb */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
          <Sparkles className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-indigo-500/30 blur-sm -z-10 animate-ping opacity-50" style={{ animationDuration: '3s' }} />
      </div>

      {/* Main message */}
      <h3 className="text-xl font-bold text-white tracking-tight text-center mb-2">
        {message}
      </h3>
      <p className="text-sm text-slate-400 text-center max-w-md mb-8">
        Querying <span className="text-indigo-400 font-medium">Claude Haiku 4.5</span> via OpenRouter with specialized {agentName} system instructions.
      </p>

      {/* Progress pill steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
          <Brain className="w-4 h-4 text-indigo-400 shrink-0 animate-bounce" />
          <span>Strategic Intent Analysis</span>
        </div>
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
          <Cpu className="w-4 h-4 text-violet-400 shrink-0" />
          <span>Synthesis & Generation</span>
        </div>
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
          <Wand2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Structured Output Delivery</span>
        </div>
      </div>
    </div>
  );
};
