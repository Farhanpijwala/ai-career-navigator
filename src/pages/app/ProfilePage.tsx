import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import {
  User,
  GraduationCap,
  Briefcase,
  Code,
  Target,
  Clock,
  Plus,
  Trash2,
  Check,
  Save,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { ProficiencyLevel } from '../../../server/types.js';

export const ProfilePage: React.FC = () => {
  const { user, profile, skills, updateProfileState, showToast, refreshAppData } = useApp();

  const [fullName, setFullName] = useState(user?.fullName || 'Alex Sharma');
  const [education, setEducation] = useState(user?.education || 'BCA (Bachelor of Computer Applications)');
  const [currentRole, setCurrentRole] = useState(user?.currentRole || 'Student & Aspiring Frontend Engineer');
  const [bio, setBio] = useState(profile?.bio || 'Final year BCA student passionate about web engineering.');
  const [targetCareer, setTargetCareer] = useState(profile?.targetCareer || 'Frontend Developer');
  const [experienceLevel, setExperienceLevel] = useState<ProficiencyLevel>(profile?.experienceLevel || 'intermediate');
  const [learningHoursPerDay, setLearningHoursPerDay] = useState(profile?.learningHoursPerDay || '2-4 hours/day');
  const [githubUrl, setGithubUrl] = useState(profile?.githubUrl || 'https://github.com/alex-sharma-demo');
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedinUrl || 'https://linkedin.com/in/alex-sharma-demo');
  const [portfolioUrl, setPortfolioUrl] = useState(profile?.portfolioUrl || 'https://alexsharma.dev');

  // Skill addition
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState<ProficiencyLevel>('intermediate');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.profile.update({
        fullName,
        education,
        currentRole,
        bio,
        targetCareer,
        experienceLevel,
        learningHoursPerDay,
        githubUrl,
        linkedinUrl,
        portfolioUrl
      });
      updateProfileState(res.user, res.profile);
      showToast('Profile updated successfully!', 'success');
      refreshAppData();
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    try {
      await api.skills.add({
        skillName: newSkillName.trim(),
        proficiency: newSkillProficiency,
        source: 'manual'
      });
      setNewSkillName('');
      showToast(`Added ${newSkillName} to skills!`, 'success');
      refreshAppData();
    } catch (err: any) {
      showToast(err.message || 'Failed to add skill', 'error');
    }
  };

  const handleRemoveSkill = async (id: string, skillName: string) => {
    try {
      await api.skills.remove(id);
      showToast(`Removed ${skillName}`, 'info');
      refreshAppData();
    } catch (err: any) {
      showToast(err.message || 'Failed to remove skill', 'error');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Profile</h1>
          <p className="text-xs text-slate-500">Manage your technical skills, career objectives, and credentials</p>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-sm font-bold text-slate-900">
              <User className="w-4 h-4 text-indigo-600" />
              <span>Personal Information</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Role / Status</label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Education</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Career Goal & Learning Preferences */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-sm font-bold text-slate-900">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Career Goal & Preferences</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Career Specialization</label>
                <select
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="AI/ML Engineer">AI/ML Engineer</option>
                  <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                  >
                    <option value="beginner">Beginner (Foundations)</option>
                    <option value="intermediate">Intermediate (Projects built)</option>
                    <option value="advanced">Advanced (Production-ready)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Study Availability</label>
                  <select
                    value={learningHoursPerDay}
                    onChange={(e) => setLearningHoursPerDay(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                  >
                    <option value="Less than 1 hour/day">Less than 1 hour/day</option>
                    <option value="1–2 hours/day">1–2 hours/day</option>
                    <option value="2–4 hours/day">2–4 hours/day</option>
                    <option value="4+ hours/day">4+ hours/day</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-sm font-bold text-slate-900">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Public Portfolio & Links</span>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="https://github.com/username"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="relative">
                <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="https://yourportfolio.dev"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills Management (Add/Edit/Remove) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Verified Skills ({skills.length})</span>
              </div>
            </div>

            {/* Add skill inline form */}
            <form onSubmit={handleAddSkill} className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-700 block">Add New Technical Skill</span>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Skill name (e.g. Next.js, Redux, Docker)"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />

                <div className="flex items-center gap-2">
                  <select
                    value={newSkillProficiency}
                    onChange={(e) => setNewSkillProficiency(e.target.value as any)}
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>

                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </form>

            {/* Skills List */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {skills.map((skill) => {
                const isAdvanced = skill.proficiency === 'advanced';
                const isIntermediate = skill.proficiency === 'intermediate';

                return (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-white transition-all group"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {skill.skillName}
                      </div>
                      <div className="text-[11px] text-slate-500 capitalize flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isAdvanced
                              ? 'bg-emerald-500'
                              : isIntermediate
                              ? 'bg-indigo-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span>{skill.proficiency}</span>
                        {skill.source === 'resume_detected' && (
                          <span className="text-[10px] text-indigo-600 font-medium">· Resume verified</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveSkill(skill.id, skill.skillName)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {skills.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400">
                  No skills listed yet. Add skills or upload your resume.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
