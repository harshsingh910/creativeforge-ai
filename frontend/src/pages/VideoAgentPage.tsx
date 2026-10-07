import React, { useState } from 'react';
import {
  Video,
  Clapperboard,
  Sparkles,
  Camera,
  Music,
  Mic,
  Smartphone,
  Layers,
  Film,
  Target
} from 'lucide-react';
import { VideoAgentFormData, VideoAgentOutput, AgentResponse } from '../types';
import { api } from '../services/api';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { ActionButtons } from '../components/common/ActionButtons';
import { GenerationDetailsCard } from '../components/common/GenerationDetailsCard';

export const VideoAgentPage: React.FC = () => {
  const [formData, setFormData] = useState<VideoAgentFormData>({
    video_type: 'Product Explainer & Commercial',
    topic: 'Next-Gen Developer Workspace that Automates Code Reviews with Autonomous Agents',
    platform: 'YouTube & Website Hero',
    target_audience: 'Staff software engineers, VP of Engineering, tech leads',
    duration: '60 seconds',
    goal: 'Drive high-intent developer signups for public beta',
    tone: 'Cinematic, High-Energy, and Cutting-Edge',
    style: 'Modern Tech Commercial with Kinetic Motion and Neon Aesthetic',
    product_service: 'CodePulse Studio — Real-Time Agentic Code Intelligence',
    cta: 'Experience CodePulse Studio Free at codepulse.dev',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResponse<VideoAgentOutput> | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.topic || !formData.product_service || !formData.cta) {
      setError('Please provide video topic, product name, and closing call to action.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.generateVideo(formData);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate video blueprint. Please try again.');
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
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Video Production Agent</h2>
              <span className="text-xs text-purple-400 font-medium">Creative Director & Cinematography Lead</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Produce complete video concepts, visual storyboard cards, full scripts, and sound cues.
          </p>
        </div>

        {result && (
          <ActionButtons
            content={result.raw_content}
            filename={`${formData.product_service.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}-video-plan.md`}
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
              <Clapperboard className="w-4 h-4 text-purple-400" />
              <span>Production Brief</span>
            </h3>

            {/* Video Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Video Type</label>
              <select
                value={formData.video_type}
                onChange={(e) => setFormData({ ...formData, video_type: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Product Explainer & Commercial">Product Explainer & Commercial</option>
                <option value="Social Media Short (Reels/TikTok/Shorts)">Social Media Short (Reels/TikTok/Shorts)</option>
                <option value="Brand Story & Mission Film">Brand Story & Mission Film</option>
                <option value="Educational Tutorial & Walkthrough">Educational Tutorial & Walkthrough</option>
                <option value="High-Impact UGC Ad">High-Impact UGC Ad</option>
              </select>
            </div>

            {/* Topic & Product Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Video Topic / Core Theme *</label>
              <input
                type="text"
                required
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g. How Next-Gen AI Solves Tech Debt"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Product or Service Featured *</label>
              <input
                type="text"
                required
                value={formData.product_service}
                onChange={(e) => setFormData({ ...formData, product_service: e.target.value })}
                placeholder="e.g. CodePulse Studio"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Platform & Duration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok & Reels (9:16)">TikTok & Reels (9:16)</option>
                  <option value="Website Hero">Website Hero</option>
                  <option value="LinkedIn Video">LinkedIn Video</option>
                  <option value="Multi-Platform Cut">Multi-Platform Cut</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="15 seconds (Micro-hook)">15 seconds (Micro-hook)</option>
                  <option value="30 seconds (Standard Ad)">30 seconds (Standard Ad)</option>
                  <option value="60 seconds (Explainer)">60 seconds (Explainer)</option>
                  <option value="90 seconds (In-Depth)">90 seconds (In-Depth)</option>
                  <option value="2 minutes (Story/Feature)">2 minutes (Story/Feature)</option>
                </select>
              </div>
            </div>

            {/* Target Audience & Goal */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Audience *</label>
              <input
                type="text"
                required
                value={formData.target_audience}
                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                placeholder="e.g. Senior engineers, tech leads, engineering directors"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Objective / Goal</label>
              <input
                type="text"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                placeholder="e.g. Drive viral engagement and product signups"
                className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Tone & Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tone of Voice</label>
                <input
                  type="text"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  placeholder="e.g. High Energy, Cinematic"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Visual & Aesthetic Style</label>
                <input
                  type="text"
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  placeholder="e.g. Cyberpunk, Minimalist, Documentary"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* CTA */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Closing Call to Action (CTA) *</label>
              <input
                type="text"
                required
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                placeholder="e.g. Sign up for free at our website"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Directing Scenes...' : 'Generate Video Plan'}</span>
            </button>
          </form>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7">
          {error && <ErrorAlert error={error} onRetry={() => handleSubmit()} />}

          {loading && <LoadingState message="Claude is directing your video production blueprint..." agentName="Video Production" />}

          {!loading && !result && !error && (
            <div className="h-full min-h-[460px] flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Film className="w-8 h-8 opacity-80" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Ready to Direct Video Assets</h3>
              <p className="text-xs text-slate-400 max-w-sm mb-6">
                Define your video concept on the left, then click "Generate Video Plan" to produce full scripts, visual storyboards, shot lists, and VO via Claude Haiku 4.5.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md text-[11px] text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Cinematic Storyboards</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Director Shot Lists</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Full Script & VO</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">Social 9:16 Cut</span>
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6">
              {/* Section 1: Concept & The 3-Second Hook */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                    <Target className="w-4 h-4" />
                    <span>Creative Concept</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {result.output.creative_concept}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-purple-500/30 bg-purple-950/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>The 3-Second Retention Hook</span>
                  </div>
                  <p className="text-xs text-slate-100 font-bold leading-relaxed">
                    "{result.output.retention_hook || result.output.hook}"
                  </p>
                </div>
              </div>

              {/* Section 2: Visual Storyboard Cards */}
              {result.output.storyboard && result.output.storyboard.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                      <Clapperboard className="w-4 h-4" />
                      <span>Visual Storyboard ({result.output.storyboard.length} Scenes)</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {result.output.storyboard.map((scene, idx) => (
                      <div
                        key={scene.scene_number || idx}
                        className="p-5 rounded-2xl bg-slate-900/70 border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-3"
                      >
                        {/* Scene Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-purple-950 border border-purple-800 text-purple-300 font-mono text-xs font-bold flex items-center justify-center">
                              {scene.scene_number || idx + 1}
                            </span>
                            <span className="text-xs font-bold text-white">Scene {scene.scene_number || idx + 1}</span>
                          </div>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                            {scene.duration}
                          </span>
                        </div>

                        {/* Visual & Action */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                              Visual Framing
                            </span>
                            <span className="text-slate-200">{scene.visual}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                              Action & Motion
                            </span>
                            <span className="text-slate-200">{scene.action}</span>
                          </div>
                        </div>

                        {/* Camera Shot & Voice Over */}
                        <div className="space-y-2 text-xs">
                          <div className="flex items-start gap-2 text-slate-300">
                            <Camera className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <span><strong className="text-slate-200">Camera:</strong> {scene.camera_shot}</span>
                          </div>
                          <div className="flex items-start gap-2 text-slate-300">
                            <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong className="text-slate-200">Voice-Over:</strong> "{scene.voice_over || scene.voiceover}"</span>
                          </div>
                          {(scene.audio_sfx || scene.sound_design) && (
                            <div className="flex items-start gap-2 text-slate-400 text-[11px]">
                              <Music className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span><strong className="text-slate-300">Sound / SFX:</strong> {scene.audio_sfx || scene.sound_design}</span>
                            </div>
                          )}
                          {scene.on_screen_text && (
                            <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60 text-[11px] text-purple-300 font-mono">
                              On-Screen Graphic: {scene.on_screen_text}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Full Script */}
              {(result.output.script || result.output.full_script) && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 shadow-lg">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      <span>Full Production Script</span>
                    </div>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {result.output.script || result.output.full_script}
                  </div>
                </div>
              )}

              {/* Section 4: Shot List, Voice-over & Sound Design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.output.shot_list && result.output.shot_list.length > 0 && (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-purple-400" />
                      <span>Director's Shot List</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {result.output.shot_list.map((shot, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                          <span>{shot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(result.output.voiceover || result.output.voice_over) && (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-emerald-400" />
                      <span>Master Voice-Over Narration</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {result.output.voiceover || result.output.voice_over}
                    </p>
                  </div>
                )}

                {(result.output.sound_design || result.output.audio_sfx) && (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 sm:col-span-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Music className="w-4 h-4 text-amber-400" />
                      <span>Sound Design & Score</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {result.output.sound_design || result.output.audio_sfx}
                    </p>
                  </div>
                )}
              </div>

              {/* Section 5: Short-Form Social Media Version (9:16) */}
              {(result.output.social_cut || result.output.social_media_version) && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                    <Smartphone className="w-4 h-4" />
                    <span>Short-Form Social Media Cut (Reels / TikTok 9:16)</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {result.output.social_cut || result.output.social_media_version}
                  </p>
                </div>
              )}

              {/* Section 6: Closing CTA */}
              {result.output.cta && (
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Closing Call to Action (Verbal & Graphic Resolve):
                  </div>
                  <div className="text-sm font-bold text-purple-300">
                    "{result.output.cta}"
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
