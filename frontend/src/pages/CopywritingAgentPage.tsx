import React, { useState } from 'react';
import {
  Megaphone,
  Sparkles,
  Target,
  Split,
  Layers,
  Flame,
  CheckCircle,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { CopywritingAgentFormData, CopywritingAgentOutput, AgentResponse } from '../types';
import { api } from '../services/api';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { ActionButtons } from '../components/common/ActionButtons';
import { GenerationDetailsCard } from '../components/common/GenerationDetailsCard';

export const CopywritingAgentPage: React.FC = () => {
  const [formData, setFormData] = useState<CopywritingAgentFormData>({
    platform: 'Facebook',
    copy_type: 'Feed Ad & Story Creative',
    product_service: 'FlowPulse — Autonomous Workflow AI for Tech Teams',
    target_audience: 'Growth team leads, startup founders, and engineering managers',
    campaign_goal: 'Free Trial Signups and Booked Product Demos',
    pain_point: 'Engineering and ops teams burn 15+ hours weekly manually syncing Jira tickets, Slack updates, and deployment logs',
    key_benefit: 'Auto-syncs cross-tool work states instantly, slashing context switching and team status meetings by 80%',
    offer: '14-Day Full-Feature Trial with No Credit Card Required',
    tone: 'High-Impact, Direct-Response, and Empathetic',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResponse<CopywritingAgentOutput> | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.product_service || !formData.pain_point || !formData.key_benefit) {
      setError('Please provide product name, pain point, and core benefit.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.generateCopywriting(formData);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate ad copy. Please try again.');
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Copywriting & Ads Agent</h2>
              <span className="text-xs text-amber-400 font-medium">Performance Marketing & CRO Architect</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Generate high-converting multi-platform ad campaigns, distinct variations, and test matrices.
          </p>
        </div>

        {result && (
          <ActionButtons
            content={result.raw_content}
            filename={`${formData.product_service.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}-copy.md`}
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
              <Target className="w-4 h-4 text-amber-400" />
              <span>Campaign Parameters</span>
            </h3>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Facebook', 'Instagram', 'Google Ads', 'LinkedIn', 'Email'] as const).map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setFormData({ ...formData, platform: plat })}
                    className={`px-2.5 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      formData.platform === plat
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>

            {/* Copy Type & Product/Service */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Copy / Ad Format</label>
              <input
                type="text"
                value={formData.copy_type}
                onChange={(e) => setFormData({ ...formData, copy_type: e.target.value })}
                placeholder="e.g. Feed Ad, Search Ad Headline, Cold Email, Product Description"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Product or Service Name *</label>
              <input
                type="text"
                required
                value={formData.product_service}
                onChange={(e) => setFormData({ ...formData, product_service: e.target.value })}
                placeholder="e.g. ApexFit Smart Recovery Ring"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Target Audience & Campaign Goal */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Audience *</label>
              <input
                type="text"
                required
                value={formData.target_audience}
                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                placeholder="e.g. Competitive runners, sleep optimizers, fitness enthusiasts"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Campaign Goal</label>
              <input
                type="text"
                value={formData.campaign_goal}
                onChange={(e) => setFormData({ ...formData, campaign_goal: e.target.value })}
                placeholder="e.g. Purchases, Lead Magnets, Free Trials, App Installs"
                className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Pain Point */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Customer Pain Point *</label>
              <textarea
                rows={2}
                required
                value={formData.pain_point}
                onChange={(e) => setFormData({ ...formData, pain_point: e.target.value })}
                placeholder="What frustration keeps them stuck or costs them time/money?"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            {/* Key Benefit */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Core Benefit / Value Proposition *</label>
              <textarea
                rows={2}
                required
                value={formData.key_benefit}
                onChange={(e) => setFormData({ ...formData, key_benefit: e.target.value })}
                placeholder="The single biggest transformation or competitive advantage delivered..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            {/* Offer & Tone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Special Offer / Incentive</label>
                <input
                  type="text"
                  value={formData.offer}
                  onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                  placeholder="e.g. 20% Off + Free Shipping"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tone of Voice</label>
                <input
                  type="text"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  placeholder="e.g. Punchy, Direct, Humorous"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Synthesizing Angles...' : 'Generate Campaign'}</span>
            </button>
          </form>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7">
          {error && <ErrorAlert error={error} onRetry={() => handleSubmit()} />}

          {loading && <LoadingState message="Claude is forging your ad campaign..." agentName="Copywriting & Ads" />}

          {!loading && !result && !error && (
            <div className="h-full min-h-[460px] flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Flame className="w-8 h-8 opacity-80" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Ready to Forge High-Converting Copy</h3>
              <p className="text-xs text-slate-400 max-w-sm mb-6">
                Fill in your product and audience brief on the left, then click "Generate Campaign" to generate multi-angle ad units with Claude Haiku 4.5.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md text-[11px] text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Meta Ads</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Google Search Ads</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">LinkedIn Ads</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Email Copy</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">A/B Testing</span>
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6">
              {/* Section 1: Campaign Strategy & Creative Angle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    <Target className="w-4 h-4" />
                    <span>Campaign Strategy</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {result.output.campaign_strategy}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Creative Angle</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {result.output.creative_angle}
                  </p>
                </div>
              </div>

              {/* Section 2: Copy Variations (Visually Distinct Cards) */}
              {result.output.variations && result.output.variations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>Ad Copy Variations ({result.output.variations.length} Angles)</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {result.output.variations.map((v, idx) => {
                      const colors = [
                        'border-amber-500/30 bg-amber-950/10',
                        'border-indigo-500/30 bg-indigo-950/10',
                        'border-emerald-500/30 bg-emerald-950/10',
                      ];
                      const badgeColors = [
                        'bg-amber-950/80 text-amber-300 border-amber-800/60',
                        'bg-indigo-950/80 text-indigo-300 border-indigo-800/60',
                        'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
                      ];
                      const borderStyle = colors[idx % colors.length];
                      const badgeStyle = badgeColors[idx % badgeColors.length];

                      return (
                        <div key={v.id || idx} className={`p-5 rounded-2xl border ${borderStyle} backdrop-blur-sm space-y-3`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                              {v.name || `Variation ${idx + 1}`}
                            </span>
                            <span className="text-[11px] text-slate-400 italic">
                              Angle: {v.target_angle}
                            </span>
                          </div>

                          {/* Hook */}
                          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                              Thumb-Stopping Hook:
                            </div>
                            <div className="text-xs font-bold text-slate-100">
                              "{v.hook}"
                            </div>
                          </div>

                          {/* Body Copy */}
                          <div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                              Primary Ad Body:
                            </div>
                            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                              {v.body}
                            </div>
                          </div>

                          {/* Headline & CTA Row */}
                          <div className="pt-2 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                              <span className="text-[10px] text-slate-400 block font-semibold">Headline</span>
                              <span className="text-xs font-bold text-slate-100">{v.headline}</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                              <span className="text-[10px] text-slate-400 block font-semibold">CTA Button</span>
                              <span className="text-xs font-bold text-amber-300">{v.cta}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Section 3: High-Converting Headlines & CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.output.headlines && result.output.headlines.length > 0 && (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Alternative Headlines</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {result.output.headlines.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.output.ctas && result.output.ctas.length > 0 && (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>High-Converting CTAs</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {result.output.ctas.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-200">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 4: A/B Testing Matrix */}
              {result.output.ab_tests && result.output.ab_tests.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                    <Split className="w-4 h-4" />
                    <span>Scientific A/B Testing Experiments</span>
                  </div>

                  <div className="space-y-3">
                    {result.output.ab_tests.map((test, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center justify-center text-[10px] font-bold">
                            #{idx + 1}
                          </span>
                          <span>{test.hypothesis}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                            <span className="text-indigo-400 font-bold block">Variant A:</span>
                            <span className="text-slate-300">{test.variant_a}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                            <span className="text-violet-400 font-bold block">Variant B:</span>
                            <span className="text-slate-300">{test.variant_b}</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1">
                          <span className="text-slate-300 font-medium">Primary KPI: </span>
                          <span className="font-mono text-emerald-400">{test.metric_to_track}</span>
                        </div>
                      </div>
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
