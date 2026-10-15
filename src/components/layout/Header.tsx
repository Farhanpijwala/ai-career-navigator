import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Menu, Sparkles, Globe, Target } from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { activePage, setActivePage, profile, user } = useApp();

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return 'Career Command Center';
      case 'profile':
        return 'My Professional Profile';
      case 'resume-analyzer':
        return 'AI Resume Analyzer';
      case 'career-assessment':
        return 'Interactive Career Assessment';
      case 'career-matches':
        return 'Ranked Career Matches';
      case 'career-detail':
        return 'Career Path Breakdown';
      case 'skill-gap':
        return 'Skill Gap & Readiness Analysis';
      case 'roadmap':
        return 'Personalized Career Roadmap';
      case 'projects':
        return 'Recommended Portfolio Projects';
      case 'courses':
        return 'Curated Learning Resources';
      case 'progress':
        return 'Growth & Progress Analytics';
      case 'ai-coach':
        return 'AI Career Coach';
      case 'settings':
        return 'Account & Database Settings';
      default:
        return 'Career Navigator';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {getPageTitle()}
            </h2>
            <p className="text-xs text-slate-500 hidden sm:block">
              {profile?.targetCareer ? `Targeting: ${profile.targetCareer}` : 'College Project'}
            </p>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Public landing shortcut */}
          <button
            onClick={() => setActivePage('landing')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Public Site</span>
          </button>

          {/* AI Coach quick jump button */}
          <button
            onClick={() => setActivePage('ai-coach')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span className="hidden xs:inline">Ask AI Coach</span>
          </button>

          {/* Target track mini badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-700 font-medium">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>{profile?.targetCareer || 'Frontend Dev'}</span>
          </div>

          {/* User Avatar */}
          <button
            onClick={() => setActivePage('profile')}
            className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-indigo-100 hover:ring-indigo-300 transition-all"
            title="View Profile"
          >
            {user?.fullName?.charAt(0) || 'A'}
          </button>
        </div>
      </div>
    </header>
  );
};
