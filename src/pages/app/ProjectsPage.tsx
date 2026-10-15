import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import { Project } from '../../../server/types.js';
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  ExternalLink,
  Code2,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { profile, showToast, setActivePage } = useApp();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedProjectIds, setAddedProjectIds] = useState<string[]>(['proj_1', 'proj_2']);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    api.projects.getRecommended()
      .then((data) => setProjects(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToRoadmap = (project: Project) => {
    if (!addedProjectIds.includes(project.id)) {
      setAddedProjectIds((prev) => [...prev, project.id]);
      showToast(`Added "${project.title}" to your active roadmap!`, 'success');
    } else {
      showToast(`"${project.title}" is already in your roadmap.`, 'info');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            Target Track: {profile?.targetCareer || 'Frontend Developer'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Recommended Portfolio Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Tailored software projects engineered to resolve your specific skill gaps and create hireable GitHub evidence.
          </p>
        </div>

        <button
          onClick={() => setActivePage('roadmap')}
          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          View Roadmap Checkpoints
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-slate-200/60 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const isAdded = addedProjectIds.includes(project.id);

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {project.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{project.estimatedHours} hrs
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Skills learned */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-medium text-slate-400 block">Skills Learned:</span>
                    <div className="flex flex-wrap gap-1">
                      {project.skillsLearned.map((sk) => (
                        <span key={sk} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 block">Tech Stack:</span>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tch) => (
                        <span key={tch} className="text-[11px] font-bold text-indigo-700 bg-indigo-50/70 px-2 py-0.5 rounded">
                          {tch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900"
                  >
                    View Project
                  </button>

                  <button
                    onClick={() => handleAddToRoadmap(project)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isAdded
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add to Roadmap
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block">
                  {selectedProject.careerCategory} · {selectedProject.difficulty}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{selectedProject.description}</p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 block">Deliverables & Acceptance Criteria:</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedProject.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Estimated Effort: {selectedProject.estimatedHours} Hours</span>
              <button
                onClick={() => {
                  handleAddToRoadmap(selectedProject);
                  setSelectedProject(null);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
              >
                Add to My Roadmap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
