import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import {
  Settings,
  Database,
  Shield,
  Download,
  Copy,
  Check,
  Cpu,
  GraduationCap,
  ExternalLink,
  Save
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, profile, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [sqlSchema, setSqlSchema] = useState<string>('');
  const [loadingSchema, setLoadingSchema] = useState(false);

  const fetchSchema = async () => {
    setLoadingSchema(true);
    try {
      const dump = await api.database.getSchemaDump();
      setSqlSchema(dump);
    } catch (err: any) {
      showToast('Failed to load SQL schema', 'error');
    } finally {
      setLoadingSchema(false);
    }
  };

  const handleCopySql = () => {
    if (!sqlSchema) return;
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    showToast('MySQL schema copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    window.open('/api/database/schema', '_blank');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">System & Project Configuration</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings & Database Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Inspect relational database tables, MySQL export artifacts, AI models, and student account configuration.
        </p>
      </div>

      {/* BCA Final Project Technical Architecture Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">BCA College Project Verification</h2>
            <p className="text-xs text-slate-500">Bachelor of Computer Applications Capstone Specifications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Project Name</span>
            <div className="text-sm font-bold text-slate-900">NexLeaf</div>
            <p className="text-slate-500">AI-Powered Career Navigation Platform</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">AI Integration</span>
            <div className="text-sm font-bold text-slate-900">Google Gemini 3.8 Flash</div>
            <p className="text-slate-500">Server-Side SDK with JSON Schema</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Database Architecture</span>
            <div className="text-sm font-bold text-slate-900">MySQL 8.0 (18 Tables)</div>
            <p className="text-slate-500">Fully Relational & Normalized</p>
          </div>
        </div>
      </div>

      {/* MySQL Relational Schema Viewer & Export */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">MySQL Database Schema (DDL)</h2>
              <p className="text-xs text-slate-500">Complete schema including foreign keys, indexes, and seed records</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!sqlSchema ? (
              <button
                onClick={fetchSchema}
                disabled={loadingSchema}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                {loadingSchema ? 'Loading Schema...' : 'Inspect DDL Script'}
              </button>
            ) : (
              <>
                <button
                  onClick={handleCopySql}
                  className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy SQL'}
                </button>
                <button
                  onClick={handleDownloadSql}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Download .sql File
                </button>
              </>
            )}
          </div>
        </div>

        {sqlSchema ? (
          <div className="space-y-3">
            <pre className="p-4 bg-slate-950 text-slate-200 text-xs rounded-xl overflow-x-auto max-h-80 font-mono leading-relaxed border border-slate-800">
              {sqlSchema}
            </pre>
            <p className="text-xs text-slate-500">
              This schema is pre-tested for MySQL 8.0+ Workbench, phpMyAdmin, and Docker instances.
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-500 leading-relaxed">
            Click "Inspect DDL Script" to load the complete relational schema with 18 normalized tables: <code className="text-indigo-600 font-mono">users</code>, <code className="text-indigo-600 font-mono">profiles</code>, <code className="text-indigo-600 font-mono">skills</code>, <code className="text-indigo-600 font-mono">user_skills</code>, <code className="text-indigo-600 font-mono">careers</code>, <code className="text-indigo-600 font-mono">resumes</code>, <code className="text-indigo-600 font-mono">resume_analysis</code>, <code className="text-indigo-600 font-mono">career_assessments</code>, <code className="text-indigo-600 font-mono">career_matches</code>, <code className="text-indigo-600 font-mono">skill_gaps</code>, <code className="text-indigo-600 font-mono">roadmaps</code>, <code className="text-indigo-600 font-mono">roadmap_tasks</code>, <code className="text-indigo-600 font-mono">projects</code>, <code className="text-indigo-600 font-mono">courses</code>, <code className="text-indigo-600 font-mono">user_progress</code>, and <code className="text-indigo-600 font-mono">ai_interactions</code>.
          </p>
        )}
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Current Session Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Logged-in User</span>
            <span className="font-bold text-slate-900 text-sm">{user?.fullName}</span>
            <span className="text-slate-500 block">{user?.email}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Target Career Goal</span>
            <span className="font-bold text-indigo-600 text-sm">{profile?.targetCareer}</span>
            <span className="text-slate-500 block">{profile?.learningHoursPerDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
