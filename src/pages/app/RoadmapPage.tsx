import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import confetti from 'canvas-confetti';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  RefreshCw,
  FolderGit2,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TaskStatus, RoadmapTask } from '../../../server/types.js';

export const RoadmapPage: React.FC = () => {
  const { roadmap, updateRoadmapTask, refreshAppData, showToast } = useApp();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [expandedTaskIds, setExpandedTaskIds] = useState<string[]>(['tsk_3']);

  const toggleExpand = (id: string) => {
    setExpandedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStatusChange = async (task: RoadmapTask, newStatus: TaskStatus) => {
    await updateRoadmapTask(task.id, newStatus);
    if (newStatus === 'completed') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRegenerateRoadmap = async () => {
    setIsRegenerating(true);
    try {
      await api.roadmap.regenerate();
      await refreshAppData();
      showToast('Career roadmap dynamically regenerated with AI!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to regenerate roadmap', 'error');
    } finally {
      setIsRegenerating(false);
    }
  };

  const tasks = roadmap?.tasks || [];
  const completedTasks = tasks.filter(
  (task) => task.status === 'completed'
).length;

const progressPct = tasks.length > 0
  ? Math.round((completedTasks / tasks.length) * 100)
  : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            Adaptive Learning Journey
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personalized Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Target Track: <strong className="text-slate-800">{roadmap?.careerTitle || 'Frontend Developer'}</strong> · {tasks.length} Structured Milestones
          </p>
        </div>

        <button
          onClick={handleRegenerateRoadmap}
          disabled={isRegenerating}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Regenerating Roadmap...' : 'Regenerate with AI'}
        </button>
      </div>

      {/* Roadmap Progress Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-bold text-slate-900">Total Roadmap Completion</span>
          <span className="font-extrabold text-indigo-600 text-base">{progressPct}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>{tasks.filter((t) => t.status === 'completed').length} of {tasks.length} phases finished</span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Live synchronization active
          </span>
        </div>
      </div>

      {/* Timeline List of Phases */}
      <div className="space-y-4">
        {tasks.map((task, idx) => {
          const isCompleted = task.status === 'completed';
          const isInProgress = task.status === 'in_progress';
          const isExpanded = expandedTaskIds.includes(task.id);

          return (
            <div
              key={task.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isInProgress
                  ? 'border-indigo-400 shadow-md ring-2 ring-indigo-500/10'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {/* Task Header */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {task.phaseName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isCompleted ? '✓ Completed' : isInProgress ? '● In Progress' : '○ Upcoming'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {task.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {task.estimatedHours} Hours
                      </span>
                      <span>·</span>
                      <span>Difficulty: <strong className="text-slate-700">{task.difficulty}</strong></span>
                      <span>·</span>
                      <span className="text-indigo-600 font-medium">Focus: {task.skillFocus}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher & Accordion Trigger */}
                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value as TaskStatus)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Toggle details"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs">
                  <p className="text-slate-600 leading-relaxed text-sm">{task.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Recommended Project */}
                    {task.recommendedProject && (
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <FolderGit2 className="w-4 h-4 text-indigo-600" />
                          <span>Recommended Practice Project</span>
                        </div>
                        <p className="text-slate-600">{task.recommendedProject}</p>
                      </div>
                    )}

                    {/* Resources */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span>Curated Documentation & Guides</span>
                      </div>
                      <div className="space-y-1">
                        {task.resources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            <span>{res.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
