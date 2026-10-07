import React from 'react';
import { AlertCircle, RefreshCw, KeyRound } from 'lucide-react';

interface ErrorAlertProps {
  error: string | null;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onRetry }) => {
  if (!error) return null;

  const isAuthError = error.toLowerCase().includes('openrouter_api_key') || error.toLowerCase().includes('api key') || error.includes('401');

  return (
    <div className="my-6 p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 backdrop-blur-md text-slate-200">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
          {isAuthError ? <KeyRound className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-rose-300 mb-1">
            {isAuthError ? 'Authentication Required' : 'Generation Error'}
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {error}
          </p>

          {isAuthError && (
            <div className="mt-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-semibold">How to configure:</span><br />
              1. Add your OpenRouter key to <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">creativeforge-ai/.env</code>:<br />
              <code className="text-emerald-400">OPENROUTER_API_KEY=sk-or-v1-your-key-here</code><br />
              2. Restart the FastAPI backend server.
            </div>
          )}

          {onRetry && (
            <div className="mt-4">
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
