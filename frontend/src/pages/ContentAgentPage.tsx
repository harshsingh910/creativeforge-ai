import React, { useState } from 'react';
import {
  FileText,
  Search,
  ListTree,
  HelpCircle,
  Link,
  Target,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ContentAgentFormData, ContentAgentOutput, AgentResponse } from '../types';
import { api } from '../services/api';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { ActionButtons } from '../components/common/ActionButtons';
import { GenerationDetailsCard } from '../components/common/GenerationDetailsCard';

export const ContentAgentPage: React.FC = () => {
  const [formData, setFormData] = useState<ContentAgentFormData>({
    content_type: 'SEO Article',
    topic: 'How Generative AI is Reshaping B2B SaaS Workflows in 2026',
    target_audience: 'SaaS product managers, CTOs, and enterprise software buyers',
    goal: 'Educate readers on AI agent automation while driving signups for modern workflow software',
    tone: 'Authoritative, Insightful, and Engaging',
    length: 'Medium (~1,200 words)',
    primary_keyword: 'generative AI in SaaS',
    secondary_keywords: 'autonomous software agents, SaaS workflow automation, AI product management',
    brand_context: 'B2B enterprise productivity platform focusing on agentic automation',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResponse<ContentAgentOutput> | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.topic || !formData.primary_keyword) {
      setError('Please provide at least a topic and primary keyword.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.generateContent(formData);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Content Writing Agent</h2>
              <span className="text-xs text-blue-400 font-medium">Editorial Strategist & SEO Specialist</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Transform ideas into polished, SEO-friendly content.
          </p>
        </div>

        {result && (
          <ActionButtons
            content={result.raw_content}
            filename={`${formData.topic.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}-content.md`}
            onRegenerate={handleSubmit}
            onClear={handleClear}
            isGenerating={loading}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-5">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span>Content Specifications</span>
            </h3>

            {/* Content Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Content Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Blog', 'Website Content', 'E-Book', 'SEO Article'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, content_type: type })}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      formData.content_type === type
                        ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Topic or Title *</label>
              <input
                type="text"
                required
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g. The Complete Guide to Cloud Security in 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Audience *</label>
              <input
                type="text"
                required
                value={formData.target_audience}
                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                placeholder="e.g. Enterprise DevOps leads and Security Engineers"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Goal & Tone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Goal</label>
                <input
                  type="text"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="e.g. Educate and rank top 3"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tone of Voice</label>
                <input
                  type="text"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  placeholder="e.g. Authoritative, Conversational"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Length */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Length</label>
              <select
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Short (~600 words)">Short (~600 words)</option>
                <option value="Medium (~1,200 words)">Medium (~1,200 words)</option>
                <option value="Long (~2,000 words)">Long (~2,000 words)</option>
                <option value="Comprehensive Guide (~3,000 words)">Comprehensive Guide (~3,000 words)</option>
              </select>
            </div>

            {/* SEO Keywords */}
            <div className="space-y-3 pt-1 border-t border-slate-800/60">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Keyword *</label>
                <input
                  type="text"
                  required
                  value={formData.primary_keyword}
                  onChange={(e) => setFormData({ ...formData, primary_keyword: e.target.value })}
                  placeholder="e.g. cloud security architecture"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Secondary Keywords</label>
                <input
                  type="text"
                  value={formData.secondary_keywords}
                  onChange={(e) => setFormData({ ...formData, secondary_keywords: e.target.value })}
                  placeholder="Comma-separated, e.g. zero trust, compliance, IAM"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Brand Context */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Brand / Product Information</label>
              <textarea
                rows={2}
                value={formData.brand_context}
                onChange={(e) => setFormData({ ...formData, brand_context: e.target.value })}
                placeholder="Product name, company mission, or value prop to naturally weave into copy..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Crafting Content...' : 'Generate Content'}</span>
            </button>
          </form>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7">
          {error && <ErrorAlert error={error} onRetry={() => handleSubmit()} />}

          {loading && <LoadingState message="Claude is crafting your content..." agentName="Content Writing" />}

          {!loading && !result && !error && (
            <div className="h-full min-h-[460px] flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <BookOpen className="w-8 h-8 opacity-80" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Ready to Draft Content</h3>
              <p className="text-xs text-slate-400 max-w-sm mb-6">
                Configure your brief on the left and click "Generate Content" to summon Claude Haiku 4.5 through OpenRouter.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md text-[11px] text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Blogs</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Website Content</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">E-Books</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">SEO Articles</span>
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6">
              {/* Section 1: Content Strategy */}
              {result.output.strategy && (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                    <Target className="w-4 h-4" />
                    <span>Content Strategy</span>
                  </div>
                  <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {result.output.strategy}
                  </div>
                </div>
              )}

              {/* Section 2: SEO Information */}
              {result.output.seo_information && (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                    <Search className="w-4 h-4" />
                    <span>SEO Intelligence</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {result.output.seo_information.search_intent && (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-400 block mb-1">Search Intent</span>
                        <span className="font-semibold text-slate-200">{result.output.seo_information.search_intent}</span>
                      </div>
                    )}
                    {result.output.seo_information.meta_title && (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-400 block mb-1">Meta Title</span>
                        <span className="font-semibold text-slate-200">{result.output.seo_information.meta_title}</span>
                      </div>
                    )}
                    {result.output.seo_information.meta_description && (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 sm:col-span-2">
                        <span className="text-slate-400 block mb-1">Meta Description</span>
                        <span className="text-slate-300">{result.output.seo_information.meta_description}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 3: Outline */}
              {result.output.outline && result.output.outline.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-3">
                    <ListTree className="w-4 h-4" />
                    <span>Structural Outline</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {result.output.outline.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section 4: Final Content */}
              {result.output.final_content && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-blue-500/20 shadow-lg">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
                      <FileText className="w-4 h-4" />
                      <span>Publication-Ready Content</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Markdown Format</span>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {result.output.final_content}
                  </div>
                </div>
              )}

              {/* Section 5: FAQ */}
              {result.output.faq && result.output.faq.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                    <HelpCircle className="w-4 h-4" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <div className="space-y-3">
                    {result.output.faq.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <h4 className="text-xs font-bold text-slate-200 mb-1">{item.question}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 6: CTA */}
              {result.output.cta && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/30">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
                    Primary Call To Action (CTA)
                  </div>
                  <div className="text-sm text-slate-100 font-medium">
                    {result.output.cta}
                  </div>
                </div>
              )}

              {/* Section 7: Internal Link Suggestions */}
              {result.output.internal_links && result.output.internal_links.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-3">
                    <Link className="w-4 h-4" />
                    <span>Internal Link Architecture</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.output.internal_links.map((link, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 font-medium"
                      >
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Telemetry Details */}
              <GenerationDetailsCard details={result.details} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
