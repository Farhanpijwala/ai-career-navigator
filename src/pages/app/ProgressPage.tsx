import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  LineChart as ChartIcon,
  TrendingUp,
  Clock,
  CheckCircle2,
  FolderGit2,
  BookOpen,
  MapPin,
  Flame,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const ProgressPage: React.FC = () => {
  const { progressData, roadmap, skills, profile } = useApp();

  const readiness = progressData?.overallCareerReadiness || 72;
  const roadmapPct = roadmap?.overallProgressPct || 64;
  const totalHours = progressData?.learningHoursTotal || 68.5;
  const streak = profile?.learningStreakDays || 8;

  const timelineData = progressData?.timelineHistory || [
    { date: 'Jan W2', readiness: 42, hours: 10 },
    { date: 'Jan W4', readiness: 50, hours: 22 },
    { date: 'Feb W2', readiness: 58, hours: 38 },
    { date: 'Feb W4', readiness: 66, hours: 52 },
    { date: 'Mar W2', readiness: 72, hours: 68.5 }
  ];

  const breakdownData = [
    { name: 'Readiness', value: readiness, fill: '#4f46e5' },
    { name: 'Roadmap', value: roadmapPct, fill: '#6366f1' },
    { name: 'Skills (8/12)', value: 67, fill: '#10b981' },
    { name: 'Projects (3/5)', value: 60, fill: '#f59e0b' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Placement Analytics</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Career Progress & Readiness Metrics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Continuous quantitative evaluation of your software engineering readiness over time.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Overall Readiness</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{readiness}%</div>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14% this month
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Roadmap Completion</span>
            <MapPin className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{roadmapPct}%</div>
          <p className="text-xs text-slate-500">
            {roadmap?.tasks.filter((t) => t.status === 'completed').length || 2} of {roadmap?.tasks.length || 6} milestones
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Study Hours</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalHours}h</div>
          <p className="text-xs text-slate-500">Logged across courses & coding</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Active Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">{streak} Days</div>
          <p className="text-xs text-slate-500">Daily learning active</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Readiness & Cumulative Hours</h3>
            <span className="text-xs text-slate-400">Weekly Milestones</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="readinessGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
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
                />
                <Area
                  type="monotone"
                  dataKey="readiness"
                  name="Career Readiness %"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#readinessGrad2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milestone Breakdown Bar Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Component Readiness</h3>
          <p className="text-xs text-slate-500">Distribution across key hiring criteria</p>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdownData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`${val}%`, 'Score']}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
