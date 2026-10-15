import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  FileText,
  HelpCircle,
  Briefcase,
  GitCompare,
  MapPin,
  FolderGit2,
  BookOpen,
  LineChart,
  BotMessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { setActivePage } = useApp();

  const features = [
    {
      title: 'PDF Resume Analyzer',
      category: 'Resume & Skill Extraction',
      icon: FileText,
      page: 'resume-analyzer' as const,
      description: 'Upload PDF resumes up to 10MB. Automatically parse candidate details, detect verified skills, compute a resume score out of 100, and generate specific bullet-point revisions.'
    },
    {
      title: 'Interactive Career Assessment',
      category: 'Psychometric & Technical Fit',
      icon: HelpCircle,
      page: 'career-assessment' as const,
      description: 'A 12-question technical assessment evaluating programming paradigms, database design curiosity, design empathy, security instincts, and data interest.'
    },
    {
      title: 'Career Match Engine',
      category: 'Algorithmic Placement',
      icon: Briefcase,
      page: 'career-matches' as const,
      description: 'Ranks 10 specialized engineering roles according to your detected abilities. Displays match percentages, justification breakdowns, and next recommended actions.'
    },
    {
      title: 'Visual Skill Gap Analysis',
      category: 'Readiness & Benchmarking',
      icon: GitCompare,
      page: 'skill-gap' as const,
      description: 'Side-by-side comparative bars illustrating current mastery vs. industry target requirements, with high/medium/low priority recommendations determined by AI.'
    },
    {
      title: 'Dynamic Personalized Roadmap',
      category: 'Milestone Execution',
      icon: MapPin,
      page: 'roadmap' as const,
      description: 'Phased timeline of learning modules with live status toggling (Not Started, In Progress, Completed), estimated hours, and curated free resources.'
    },
    {
      title: 'Targeted Project Recommendations',
      category: 'Portfolio Engineering',
      icon: FolderGit2,
      page: 'projects' as const,
      description: 'Curated software projects specifically aligned with your target career track and skill deficits, detailing technologies and expected deliverables.'
    },
    {
      title: 'Curated Learning Resources',
      category: 'Knowledge Base',
      icon: BookOpen,
      page: 'courses' as const,
      description: 'Filterable catalog of official documentation, interactive courses, and tutorials across Frontend, Backend, Database, Cloud, Cybersecurity, and AI.'
    },
    {
      title: 'Progress & Readiness Dashboard',
      category: 'Analytics & Streaks',
      icon: LineChart,
      page: 'progress' as const,
      description: 'Visual tracking of learning hours, active streaks, roadmap progression percentage, and readiness trajectory over time.'
    },
    {
      title: 'Contextual AI Career Coach',
      category: 'Gemini 3.8 Flash Assistant',
      icon: BotMessageSquare,
      page: 'ai-coach' as const,
      description: '24/7 intelligent coach grounded in your specific skills, gaps, and roadmap tasks. Never generic—delivers tactical coding and career advice.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Platform Capabilities</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Suite of Career Tools
          </h1>
          <p className="text-base text-slate-600">
            Engineered to guide student developers step by step from classroom knowledge to hireable software engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3.5 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      {feat.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>

                <button
                  onClick={() => setActivePage(feat.page)}
                  className="pt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors self-start"
                >
                  Open Tool <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
