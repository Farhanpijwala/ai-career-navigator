import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Sparkles,
  ArrowRight,
  Target,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Flame,
  FileText,
  MapPin,
  BotMessageSquare,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const {
    user,
    profile,
    skills,
    roadmap,
    resumeAnalysis,
    skillGaps,
    progressData,
    aiRecommendation,
    setActivePage
  } = useApp();

const currentSkillsList = skills.map((s) => s.skillName);

 const missingSkillsList = skillGaps
  .filter((g) => g.priority === 'high' || g.priority === 'medium')
  .map((g) => g.skillName);

  const matchScore = resumeAnalysis?.suggestedCareerPaths?.[0]?.matchPct ?? 0;
 const roadmapPct = progressData?.roadmapProgressPct ?? 0;
  const currentTask = roadmap?.tasks.find((t) => t.status === 'in_progress') || roadmap?.tasks[0];

const chartData = progressData?.timelineHistory || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. TOP GREETING BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
             Good morning, {user?.fullName ?? 'User'}
            </h1>
            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
             {profile?.learningStreakDays ?? 0}d Streak
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Let's move one step closer to your career goal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('resume-analyzer')}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
           Resume Audit ({resumeAnalysis?.resumeScore ?? 0}/100)
          </button>
          <button
            onClick={() => setActivePage('ai-coach')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Ask AI Coach
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Target Career Match */}
        <div
          onClick={() => setActivePage('career-matches')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Career Match</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {profile?.targetCareer ?? 'No target career set'}
            </div>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {matchScore}% Alignment
            </div>
          </div>
        </div>

        {/* Roadmap Progress */}
        <div
          onClick={() => setActivePage('roadmap')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Roadmap Progress</span>
            <MapPin className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{roadmapPct}%</div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${roadmapPct}%` }} />
            </div>
          </div>
        </div>

        {/* Skills Tracked */}
        <div
          onClick={() => setActivePage('profile')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Verified Skills</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {currentSkillsList.length} <span className="text-xs text-slate-400 font-normal">/ 12 required</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {missingSkillsList.length} critical gaps identified
            </p>
          </div>
        </div>

        {/* Projects Finished */}
        <div
          onClick={() => setActivePage('projects')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Portfolio Projects</span>
            <FolderGit2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div><div className="text-2xl font-black text-slate-900">
  {progressData?.projectsCompletedCount || 0}
  <span className="text-xs text-slate-400 font-normal">
    {' '} / {progressData?.totalProjectsTarget || 0} Recommended
  </span>
</div>

<p className="text-xs text-slate-500 mt-1">
  {progressData?.learningHoursTotal || 0} hours invested
</p>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC AI RECOMMENDATION SECTION */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white rounded-2xl shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI System Recommendation</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {aiRecommendation?.title || 'Next High-Impact Milestone'}
            </h3>
           <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-normal">
  {aiRecommendation?.message || 'No AI recommendation available yet.'}
</p>
          </div>

          <button
            onClick={() => setActivePage('roadmap')}
            className="px-5 py-2.5 bg-white text-indigo-950 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors shrink-0 shadow-md"
          >
            Start Next Step
          </button>
        </div>
      </div>

      {/* 4. CURRENT POSITION -> TARGET -> GAP -> NEXT STEP */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-slate-900">Career Trajectory Mapping</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Current Position */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              1. Your Current Position
            </span>
            <div className="font-bold text-slate-900 text-sm">
              {user?.education || 'BCA Final Year'}
            </div>
            <div className="text-xs text-slate-600 line-clamp-2">
              {currentSkillsList.slice(0, 4).join(', ')}...
            </div>
            <button
              onClick={() => setActivePage('profile')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1 flex items-center gap-1"
            >
              View Skills <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Your Target */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              2. Your Target Goal
            </span>
            <div className="font-bold text-slate-900 text-sm">
              {profile?.targetCareer ?? 'No target career set'}
            </div>
            <div className="text-xs text-emerald-600 font-semibold">
              {matchScore}% Match Readiness
            </div>
            <button
              onClick={() => setActivePage('career-matches')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1 flex items-center gap-1"
            >
              Role Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Your Gap */}
          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/70 space-y-2">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
              3. Your Identified Gap
            </span>
            <div className="font-bold text-amber-950 text-sm">
              Missing High-Priority Skills
            </div>
            <div className="text-xs text-amber-800">
              {missingSkillsList.slice(0, 3).join(', ')}
            </div>
            <button
              onClick={() => setActivePage('skill-gap')}
              className="text-xs font-semibold text-amber-900 hover:text-amber-950 pt-1 flex items-center gap-1"
            >
              Analyze Gap <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Your Next Step */}
          <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200/70 space-y-2">
            <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wider block">
              4. Your Next Step
            </span>
            <div className="font-bold text-indigo-950 text-sm truncate">
  {currentTask?.title || 'No task available'}
</div>

<div className="text-xs text-indigo-700">
  {currentTask
    ? `Est: ${currentTask.estimatedHours} hours · ${currentTask.status.replace('_', ' ')}`
    : 'No roadmap task available'}
</div>
            <button
              onClick={() => setActivePage('roadmap')}
              className="text-xs font-semibold text-indigo-900 hover:text-indigo-950 pt-1 flex items-center gap-1"
            >
              Open Task <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. CAREER READINESS PROGRESS CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Career Readiness Growth</h3>
              <p className="text-xs text-slate-500">Historical readiness percentage based on verified milestones</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Current Level</span>
              <div className="text-lg font-bold text-indigo-600">
                {progressData?.overallCareerReadiness ?? 0}%
              </div>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`${val}% Readiness`, 'Progress']}
                />
                <Area
                  type="monotone"
                  dataKey="readiness"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#readinessGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Launch Checklist */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>
            <p className="text-xs text-slate-500">Key modules to advance your placement profile</p>

            <div className="space-y-2.5">
              <div
                onClick={() => setActivePage('resume-analyzer')}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-slate-800">Audit / Upload Resume</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div
                onClick={() => setActivePage('career-assessment')}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-slate-800">Retake Fit Assessment</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div
                onClick={() => setActivePage('skill-gap')}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-slate-800">Inspect Skill Gap Report</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div
                onClick={() => setActivePage('roadmap')}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">
  {currentTask
    ? `Advance Phase ${currentTask.phaseNumber} Tasks`
    : 'No roadmap task available'}
</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
           <span>Target: {profile?.targetCareer ?? 'No target career set'}</span>
            <button
              onClick={() => setActivePage('ai-coach')}
              className="font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Ask AI Coach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
