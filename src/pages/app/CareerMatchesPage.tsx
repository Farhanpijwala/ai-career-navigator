import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Briefcase,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  Sparkles,
  MapPin
} from 'lucide-react';

export const CareerMatchesPage: React.FC = () => {
  const { careerMatches, setSelectedCareerSlug, setActivePage, updateProfileState, user, profile, showToast, refreshAppData } = useApp();

  const handleStartRoadmap = async (careerTitle: string, slug: string) => {
    if (user && profile) {
      updateProfileState(user, { ...profile, targetCareer: careerTitle });
      setSelectedCareerSlug(slug);
      showToast(`Target career set to ${careerTitle}! Roadmap activated.`, 'success');
      setActivePage('roadmap');
      refreshAppData();
    }
  };

  const handleViewCareer = (slug: string) => {
    setSelectedCareerSlug(slug);
    setActivePage('career-detail');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Algorithmic Career Alignment</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ranked Career Matches
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Careers ranked dynamically according to your verified technical skills, resume audit, and assessment affinities.
        </p>
      </div>

      {/* Matches Grid */}
      <div className="space-y-4">
        {careerMatches.map((match, idx) => (
          <div
            key={match.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-5"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-sm text-indigo-600 shrink-0">
                  #{idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{match.careerTitle}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>Difficulty: <strong className="text-slate-700">{match.learningDifficulty}</strong></span>
                    <span>·</span>
                    <span>Rank: <strong className="text-slate-700">Top {idx + 1}</strong></span>
                  </div>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-xs text-slate-400 font-medium">Match Score:</span>
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-base rounded-xl">
                  {match.matchPercentage}%
                </span>
              </div>
            </div>

            {/* Why It Matches */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 block">Why It Matches Your Profile:</span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {match.whyMatches}
              </p>
            </div>

            {/* Skills: Matching vs Missing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1.5">
                <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Current Matching Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {match.currentMatchingSkills.map((sk) => (
                    <span key={sk} className="bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/60 border border-amber-100 rounded-xl space-y-1.5">
                <span className="font-semibold text-amber-950 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Missing / Gap Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {match.missingSkills.map((sk) => (
                    <span key={sk} className="bg-white text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Next Step & CTAs */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <strong className="text-slate-900">Recommended Next Step:</strong> {match.recommendedNextStep}
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => handleViewCareer(match.slug)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  View Career
                </button>
                <button
                  onClick={() => handleStartRoadmap(match.careerTitle, match.slug)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" /> Start Roadmap
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
