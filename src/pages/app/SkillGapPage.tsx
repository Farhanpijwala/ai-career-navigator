import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import {
  GitCompare,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { PriorityLevel } from '../../../server/types.js';

export const SkillGapPage: React.FC = () => {
  const { skillGaps, profile, refreshAppData, showToast, setActivePage } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await api.skills.refreshGaps();
      await refreshAppData();
      showToast('Skill gaps re-evaluated with Gemini AI!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to refresh skill gaps', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  const highPriority = skillGaps.filter((g) => g.priority === 'high');
  const mediumPriority = skillGaps.filter((g) => g.priority === 'medium');
  const lowPriority = skillGaps.filter((g) => g.priority === 'low');

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'high':
        return (
          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            Medium Priority
          </span>
        );
      case 'low':
        return (
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            Target: {profile?.targetCareer || 'Frontend Developer'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Visual comparison between your current proficiency and industry employment requirements.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Analyzing with Gemini...' : 'Re-evaluate with AI'}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-rose-600 block">High Priority Gaps</span>
          <div className="text-2xl font-black text-slate-900">{highPriority.length} Skills</div>
          <p className="text-[11px] text-slate-500">Blockers for tech interviews</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-600 block">Medium Priority Gaps</span>
          <div className="text-2xl font-black text-slate-900">{mediumPriority.length} Skills</div>
          <p className="text-[11px] text-slate-500">Recommended for intermediate roles</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-emerald-600 block">Verified / Low Priority</span>
          <div className="text-2xl font-black text-slate-900">{lowPriority.length} Skills</div>
          <p className="text-[11px] text-slate-500">Proficiency verified</p>
        </div>
      </div>

      {/* Visual Proficiency Comparison Table/Cards */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Skill Competency Comparison</h3>
          <span className="text-xs text-slate-400">Current vs Required (100%)</span>
        </div>

        <div className="space-y-6">
          {skillGaps.map((item) => {
            const isHigh = item.priority === 'high';
            const isMedium = item.priority === 'medium';

            return (
              <div key={item.id} className="space-y-2 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.skillName}</span>
                    {getPriorityBadge(item.priority)}
                  </div>
                  <div className="font-mono text-xs font-semibold text-slate-700">
                    Current: <span className="text-indigo-600 font-bold">{item.currentProficiencyPct}%</span> / Target: {item.targetProficiencyPct}%
                  </div>
                </div>

                {/* Progress bar visualizer */}
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  {/* Current progress */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.currentProficiencyPct >= 80
                        ? 'bg-emerald-600'
                        : isHigh
                        ? 'bg-rose-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${item.currentProficiencyPct}%` }}
                  />
                  {/* Target benchmark marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-900/40"
                    style={{ left: `${item.targetProficiencyPct}%` }}
                    title={`Target: ${item.targetProficiencyPct}%`}
                  />
                </div>

                {/* Tactical AI Advice */}
                <div className="flex items-start gap-1.5 text-xs text-slate-500 pt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong className="text-slate-700 font-medium">AI Guidance:</strong> {item.aiAdvice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer Callout */}
      <div className="p-6 bg-indigo-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-base">Close Your Gaps with the Phased Roadmap</h4>
          <p className="text-xs text-indigo-200">
            Every high-priority skill gap has a dedicated learning milestone and recommended project.
          </p>
        </div>
        <button
          onClick={() => setActivePage('roadmap')}
          className="px-5 py-2.5 bg-white text-indigo-950 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors shrink-0 shadow-md flex items-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-indigo-600" /> Go to My Roadmap
        </button>
      </div>
    </div>
  );
};
