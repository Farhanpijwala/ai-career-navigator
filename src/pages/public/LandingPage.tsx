import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  HelpCircle,
  Briefcase,
  GitCompare,
  MapPin,
  LineChart,
  BotMessageSquare,
  TrendingUp,
  Award,
  Layers,
  Code2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, setSelectedCareerSlug } = useApp();

  const sampleCareers = [
    { slug: 'frontend-developer', title: 'Frontend Developer', demand: '+16%', difficulty: 'Moderate', desc: 'React, TypeScript, Next.js & modern UI component architectures.' },
    { slug: 'backend-developer', title: 'Backend Developer', demand: '+14%', difficulty: 'Moderate', desc: 'Node.js, Express, MySQL, REST APIs, and microservices.' },
    { slug: 'full-stack-developer', title: 'Full Stack Developer', demand: '+18%', difficulty: 'Challenging', desc: 'End-to-end full stack software engineering from database to browser.' },
    { slug: 'data-analyst', title: 'Data Analyst', demand: '+23%', difficulty: 'Moderate', desc: 'SQL querying, business intelligence, PowerBI, and data analytics.' },
    { slug: 'data-scientist', title: 'Data Scientist', demand: '+28%', difficulty: 'Challenging', desc: 'Predictive modeling, machine learning, Python, and statistics.' },
    { slug: 'ai-ml-engineer', title: 'AI/ML Engineer', demand: '+35%', difficulty: 'Challenging', desc: 'Gemini LLMs, PyTorch, RAG vector pipelines, and prompt engineering.' },
    { slug: 'cybersecurity-analyst', title: 'Cybersecurity Analyst', demand: '+32%', difficulty: 'Challenging', desc: 'Network security, penetration auditing, OWASP Top 10, and SIEM.' },
    { slug: 'ui-ux-designer', title: 'UI/UX Designer', demand: '+13%', difficulty: 'Entry', desc: 'Figma wireframes, design tokens, usability testing, and WCAG accessibility.' },
    { slug: 'cloud-engineer', title: 'Cloud Engineer', demand: '+24%', difficulty: 'Challenging', desc: 'AWS/GCP infrastructure, Terraform, Docker, and container scalability.' },
    { slug: 'devops-engineer', title: 'DevOps Engineer', demand: '+22%', difficulty: 'Challenging', desc: 'CI/CD GitHub Actions pipelines, Kubernetes, monitoring, and Linux.' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
         <div className="grid grid-cols-1 gap-12 items-center">
            {/* Left Copy */}
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Gen Career Intelligence Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Your Career. Your Roadmap.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Powered by AI.
                </span>
              </h1>
<p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
                NexLeaf analyzes your skills, resume and career goals to build a personalized path toward the career you want.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setActivePage('onboarding')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all group"
                >
                  Start Your Career Analysis
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setActivePage('careers-public')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-sm transition-all"
                >
                  Explore Careers
                </button>
              </div>

              {/* Workflow Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  PDF Resume Scoring
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Interactive Fit Assessment
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Personalized Roadmap
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW NEXLEAF WORKS (SYSTEM WORKFLOW) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">End-to-End System Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How NexLeaf Works
            </h2>
            <p className="text-base text-slate-600">
              A structured, AI-driven guidance platform that transforms your raw academic background into an industry-ready career roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-indigo-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Profile & Resume</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload your PDF resume and input your skills, education, and career interests. Our parser extracts and catalogs your technical history.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-indigo-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Deep Analysis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gemini AI audits your resume against industry benchmarks, identifies strengths, andmatches your profile with relevant high-growth careers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-indigo-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Skill Gap & Roadmap</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pinpoint exact missing technologies. Receive a personalized, phase-by-phase learning roadmap with estimated hours and checkpoints.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-indigo-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900">Track & Coach</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Build recommended portfolio projects, track your learning streak, and get 24/7 contextual guidance from the AI Career Coach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY PLATFORM CAPABILITIES */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Comprehensive Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered Specifically for Tech Students
            </h2>
            <p className="text-base text-slate-600">
              Every tool works together as one connected system rather than a series of disconnected calculators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-7 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Resume Analyzer</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Extracts text from PDF files directly in your browser. Delivers a resume score out of 100, detects verified skills, and provides concrete improvement advice.
              </p>
              <button
                onClick={() => setActivePage('resume-analyzer')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Try Resume Analyzer <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 2 */}
            <div className="p-7 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Career Assessment</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An interactive questionnaire assessing your problem-solving style, design empathy, algorithmic interest, security mindset, and cloud curiosity.
              </p>
              <button
                onClick={() => setActivePage('career-assessment')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Take Assessment <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 3 */}
            <div className="p-7 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <GitCompare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Skill Gap Visualizer</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compare your current skill proficiencies against target industry levels with visual percentage bars and prioritized high/medium/low action flags.
              </p>
              <button
                onClick={() => setActivePage('skill-gap')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Analyze Skill Gaps <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 4 */}
            <div className="p-7 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Personalized Roadmap</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Structured multi-phase milestones with curated documentation, practice tasks, and progress tracking. Updates dynamically as you learn.
              </p>
              <button
                onClick={() => setActivePage('roadmap')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View Roadmap <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 5 */}
            <div className="p-7 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Portfolio Projects</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hands-on projects tailored to your target career and specific skill gaps with concrete deliverables and technology stacks.
              </p>
              <button
                onClick={() => setActivePage('projects')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Explore Projects <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 6 */}
            <div className="p-7 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <BotMessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Contextual AI Coach</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An intelligent mentor aware of your specific profile, skills, resume score, and roadmap phase. Ready to answer questions 24/7.
              </p>
              <button
                onClick={() => setActivePage('ai-coach')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Chat with Coach <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAREERS CATALOG SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Industry Specializations</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Explore High-Demand Tech Careers
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Discover matching roles, required skills, and roadmap paths supported by the platform.
              </p>
            </div>

            <button
              onClick={() => setActivePage('careers-public')}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View Full Careers Catalog <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCareers.map((c) => (
              <div
                key={c.slug}
                onClick={() => {
                  setSelectedCareerSlug(c.slug);
                  setActivePage('career-detail');
                }}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-sm cursor-pointer transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {c.demand}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
                  <span>Difficulty: {c.difficulty}</span>
                  <span className="text-indigo-600 font-medium flex items-center gap-1">
                    Roadmap <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to Navigate Your Tech Career?
          </h2>
          <p className="text-base sm:text-lg text-indigo-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Upload your resume, analyze your technical skill gaps, and begin your personalized roadmap today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('onboarding')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-900 font-bold text-base shadow-lg transition-all"
            >
              Start Free Career Analysis
            </button>
           
          </div>
        </div>
      </section>
    </div>
  );
};
