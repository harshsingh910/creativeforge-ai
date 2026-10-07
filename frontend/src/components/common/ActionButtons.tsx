import React, { useState } from 'react';
import { Copy, Check, Download, RotateCcw, Trash2 } from 'lucide-react';
import { copyToClipboard, downloadTextFile } from '../../utils/export';

interface ActionButtonsProps {
  content: string;
  filename?: string;
  onRegenerate?: () => void;
  onClear?: () => void;
  isGenerating?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  content,
  filename = 'creativeforge-output.md',
  onRegenerate,
  onClear,
  isGenerating = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadTextFile(filename, content);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all active:scale-95 shadow-sm"
        title="Copy raw markdown to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Markdown</span>
          </>
        )}
      </button>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all active:scale-95 shadow-sm"
        title="Download as .md file"
      >
        <Download className="w-3.5 h-3.5 text-slate-400" />
        <span>Download .md</span>
      </button>

      {/* Regenerate Button */}
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
          title="Regenerate with current inputs"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Regenerate</span>
        </button>
      )}

      {/* Clear Button */}
      {onClear && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 border border-rose-500/20 text-xs font-semibold transition-all active:scale-95"
          title="Clear current output"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
};
