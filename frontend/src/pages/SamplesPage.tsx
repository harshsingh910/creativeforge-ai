import React, { useState } from 'react';
import {
  Layers,
  FileText,
  Megaphone,
  Video,
  Eye,
  X,
  Search,
  CheckCircle,
  Clapperboard,
  Camera,
  Split,
  Target
} from 'lucide-react';
import { SAMPLES_DATA, SampleItem } from '../data/samplesData';
import { ActionButtons } from '../components/common/ActionButtons';

export const SamplesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'content' | 'copywriting' | 'video'>('all');
  const [selectedSample, setSelectedSample] = useState<SampleItem | null>(null);

  const filteredSamples = SAMPLES_DATA.filter((s) => {
    if (activeTab === 'all') return true;
    return s.agentId === activeTab;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Samples Gallery</h2>
              <span className="text-xs text-emerald-400 font-medium">9 Realistic Demonstrations (3 per Agent)</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Inspect pre-engineered realistic outputs to review system prompt design, multi-step workflows, and output formatting.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All (9)
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'content'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Content (3)
          </button>
          <button
            onClick={() => setActiveTab('copywriting')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'copywriting'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Copy & Ads (3)
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'video'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Video (3)
          </button>
        </div>
      </div>

      {/* Grid of 9 Samples */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSamples.map((sample) => {
          const isContent = sample.agentId === 'content';
          const isCopy = sample.agentId === 'copywriting';
          const borderColor = isContent
            ? 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/10'
            : isCopy
            ? 'border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/10'
            : 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10';

          const badgeBg = isContent
            ? 'bg-blue-950/80 text-blue-300 border-blue-800/50'
            : isCopy
            ? 'bg-amber-950/80 text-amber-300 border-amber-800/50'
            : 'bg-purple-950/80 text-purple-300 border-purple-800/50';

          const IconComponent = isContent ? FileText : isCopy ? Megaphone : Video;

          return (
            <div
              key={sample.id}
              className={`p-6 rounded-2xl bg-slate-900/60 border ${borderColor} transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeBg}`}>
                    {sample.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{sample.agentName.replace(' Agent', '')}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {sample.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {sample.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {sample.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedSample(sample)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Inspect Output Details</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Detail Inspection Modal */}
      {selectedSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/60 sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {selectedSample.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedSample.agentName}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {selectedSample.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <ActionButtons
                  content={selectedSample.rawMarkdown}
                  filename={`${selectedSample.id}.md`}
                />
                <button
                  onClick={() => setSelectedSample(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close sample modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Input Brief Section */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" />
                  <span>Input Brief Given to Agent</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(selectedSample.inputBrief).map(([key, value]) => (
                    <div key={key} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="text-slate-400 block font-semibold text-[11px]">{key}:</span>
                      <span className="text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent 1 Content Writing Details */}
              {selectedSample.agentId === 'content' && (
                <div className="space-y-6">
                  {/* Strategy */}
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">Content Strategy</span>
                    <p className="text-xs text-slate-200 leading-relaxed">{selectedSample.output.strategy}</p>
                  </div>

                  {/* SEO Info */}
                  {selectedSample.output.seo_information && (
                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">SEO Blueprint</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Search Intent:</span>
                          <span className="text-slate-200 font-semibold">{selectedSample.output.seo_information.search_intent}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Primary Keyword:</span>
                          <span className="text-slate-200 font-semibold">{selectedSample.output.seo_information.primary_keyword}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 block">Meta Title:</span>
                          <span className="text-slate-200">{selectedSample.output.seo_information.meta_title}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Final Content */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block mb-3">Structured Output Content</span>
                    <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                      {selectedSample.output.final_content}
                    </div>
                  </div>
                </div>
              )}

              {/* Agent 2 Copywriting Details */}
              {selectedSample.agentId === 'copywriting' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">Campaign Strategy</span>
                      <p className="text-xs text-slate-200 leading-relaxed">{selectedSample.output.campaign_strategy}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-2">Creative Angle</span>
                      <p className="text-xs text-slate-200 leading-relaxed font-semibold">{selectedSample.output.creative_angle}</p>
                    </div>
                  </div>

                  {/* Variations */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">Copy Variations</span>
                    {selectedSample.output.variations.map((v: any, idx: number) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300">{v.name}</span>
                          <span className="text-[11px] text-slate-400">{v.target_angle}</span>
                        </div>
                        <div className="text-xs text-slate-100 font-bold">"{v.hook}"</div>
                        <div className="text-xs text-slate-300 whitespace-pre-wrap">{v.body}</div>
                        <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div><strong>Headline:</strong> {v.headline}</div>
                          <div><strong className="text-amber-400">CTA:</strong> {v.cta}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* A/B Tests */}
                  {selectedSample.output.ab_tests && (
                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">A/B Testing Experiments</span>
                      {selectedSample.output.ab_tests.map((t: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                          <div className="font-semibold text-slate-200">{t.hypothesis}</div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                            <div><span className="text-indigo-400">A:</span> {t.variant_a}</div>
                            <div><span className="text-violet-400">B:</span> {t.variant_b}</div>
                          </div>
                          <div className="text-[11px] text-emerald-400">KPI: {t.metric_to_track}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Agent 3 Video Details */}
              {selectedSample.agentId === 'video' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-2">Creative Concept</span>
                      <p className="text-xs text-slate-200 leading-relaxed">{selectedSample.output.creative_concept}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-purple-500/30">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-2">0–3s Hook</span>
                      <p className="text-xs text-slate-100 font-bold leading-relaxed">"{selectedSample.output.hook}"</p>
                    </div>
                  </div>

                  {/* Storyboard */}
                  {selectedSample.output.storyboard && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block">Storyboard Scenes</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedSample.output.storyboard.map((sc: any, idx: number) => (
                          <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                            <div className="flex items-center justify-between font-bold text-white">
                              <span>Scene {sc.scene_number}</span>
                              <span className="font-mono text-[11px] text-purple-400">{sc.duration}</span>
                            </div>
                            <div><strong className="text-slate-400">Visual:</strong> {sc.visual}</div>
                            <div><strong className="text-slate-400">Action:</strong> {sc.action}</div>
                            <div><strong className="text-purple-300">VO:</strong> "{sc.voice_over}"</div>
                            <div className="text-[11px] text-slate-400 font-mono">Camera: {sc.camera_shot}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full Script */}
                  {selectedSample.output.full_script && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/20">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-2">Production Script</span>
                      <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                        {selectedSample.output.full_script}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
