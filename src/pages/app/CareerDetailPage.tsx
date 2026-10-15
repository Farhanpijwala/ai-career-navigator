import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import { Career } from '../../../server/types.js';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Sparkles,
  MapPin,
  FolderGit2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const CareerDetailPage: React.FC = () => {
  const {
    selectedCareerSlug,
    setActivePage,
    skills,
    user,
    profile,
    updateProfileState,
    showToast,
    refreshAppData
  } = useApp();

  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = selectedCareerSlug || 'frontend-developer';

  useEffect(() => {
    api.careers.getBySlug(slug)
      .then((data) => setCareer(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading career details...</div>;
  }

  if (!career) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-slate-500">Career path not found.</p>
        <button
         onClick={() =>setActivePage(user ? 'career-matches' : 'careers-public')
}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs"
        >
          Return to Career Matches
        </button>
      </div>
    );
  }

  const userSkillNames = skills.map((s) => s.skillName.toLowerCase());

const matchingSkills = (career.requiredSkills ?? [])
  .filter((sk) => typeof sk === 'string' && sk.trim() !== '')
  .filter((sk) =>
    userSkillNames.some(
      (uSk) =>
        typeof uSk === 'string' &&
        (uSk.includes(sk.toLowerCase()) ||
          sk.toLowerCase().includes(uSk.toLowerCase()))
    )
  );


const missingSkills = (career.requiredSkills ?? []).filter(
  (sk) =>
    typeof sk === 'string' &&
    sk.trim() !== '' &&
    !(userSkillNames ?? []).some(
      (uSk) =>
        typeof uSk === 'string' &&
        (uSk.toLowerCase().includes(sk.toLowerCase()) ||
          sk.toLowerCase().includes(uSk.toLowerCase()))
    )
);


  const matchPercentage = Math.round((matchingSkills.length / Math.max(career.requiredSkills.length, 1)) * 100);


const handleSetTargetCareer = () => {
  if (!user || !profile) {
    showToast('Please log in to activate your personalized roadmap.', 'info');
    setActivePage('login');
    return;
  }

  updateProfileState(user, { ...profile, targetCareer: career.title });
  showToast(`Target career set to ${career.title}!`, 'success');
  setActivePage('roadmap');
  refreshAppData();
};


const requireLogin = (feature: string) => {
  if (!user) {
    showToast(`Please log in to access ${feature}.`, 'info');
    setActivePage('login');
    return false;
  }

  return true;
};
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => setActivePage('career-matches')}
        className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Career Matches
      </button>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            {career.category}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{career.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" /> {career.averageSalary}
            </span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              {career.growthOutlook}
            </span>
            <span>·</span>
            <span>Difficulty: <strong className="text-slate-700">{career.difficultyLevel}</strong></span>
          </div>
        </div>
<div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
  {user ? (
    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-left md:text-right">
      <div className="text-2xl font-black text-indigo-600">
        {matchPercentage}%
      </div>
      <span className="text-xs text-slate-400 font-medium block">
        Profile Fit Score
      </span>
    </div>
  ) : (
    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-left md:text-right">
      <div className="text-sm font-semibold text-slate-600">
        Personalized score
      </div>
      <span className="text-xs text-slate-400 block">
        Log in to see your fit score
      </span>
    </div>
  )}

  <button
    onClick={handleSetTargetCareer}
    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
  >
    <MapPin className="w-3.5 h-3.5" />
    Set as Target & Activate Roadmap
  </button>
</div>

            </div>

      {/* Overview & AI Advice */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Career Overview</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{career.description}</p>

          <div className="pt-3 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Typical Daily Responsibilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {career.typicalResponsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Advice Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Placement Guidance</span>
            </div>
            <h4 className="text-base font-bold text-white">How to break into this track</h4>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Focus on closing the gap in <strong>{missingSkills.slice(0, 2).join(' & ')}</strong>. Combine these into a full-scale portfolio project with documented tests and live deployment.
            </p>
          </div>

          <button
           onClick={() => {
  if (requireLogin('AI Coach')) {
    setActivePage('ai-coach');
  }
}}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-colors"
          >
            Ask AI Coach About {career.title}
          </button>
        </div>
      </div>

      {/* Skills Analysis Comparison: Current vs Missing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Your Current Skills Matching this Role ({matchingSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchingSkills.map((sk) => (
              <span key={sk} className="text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
                {sk}
              </span>
            ))}
            {matchingSkills.length === 0 && (
              <p className="text-xs text-slate-400">No matching skills detected yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Missing Industry Skills to Bridge ({missingSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.map((sk) => (
              <span key={sk} className="text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tools & Recommended Skills */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Essential Developer Toolchain</h3>
        <div className="flex flex-wrap gap-2">
          {career.toolsAndTechnologies.map((tool) => (
            <span key={tool} className="text-xs font-semibold bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Recommended Projects & Courses shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
         onClick={() => {
  if (requireLogin('Recommended Projects')) {
    setActivePage('projects');
  }
}}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="font-bold text-slate-900 text-sm block">Recommended Projects</span>
              <span className="text-xs text-slate-500">Hands-on capstones for {career.title}</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
         onClick={() => {
  if (requireLogin('Curated Courses')) {
    setActivePage('courses');
  }
}}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="font-bold text-slate-900 text-sm block">Curated Courses</span>
              <span className="text-xs text-slate-500">MDN, React, and official docs</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
