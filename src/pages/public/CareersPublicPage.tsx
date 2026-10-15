import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import { Career } from '../../../server/types.js';
import { Briefcase, ArrowRight, TrendingUp, DollarSign, Filter, Search } from 'lucide-react';

export const CareersPublicPage: React.FC = () => {
  const { setActivePage, setSelectedCareerSlug } = useApp();
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.careers.getAll()
      .then((data) => setCareers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Web Development', 'Software Engineering', 'Data & Analytics', 'Artificial Intelligence', 'Security & Infrastructure', 'Product Design', 'Cloud & Infrastructure'];

  const filteredCareers = careers.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Careers Catalog</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            High-Growth Technology Career Paths
          </h1>
          <p className="text-base text-slate-600">
            Explore required industry skill sets, salary expectations, growth outlooks, and roadmap benchmarks.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search careers or skills (e.g. React, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Careers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-slate-200/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => (
              <div
                key={career.slug}
                onClick={() => {
                  setSelectedCareerSlug(career.slug);
                  setActivePage('career-detail');
                }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block">
                        {career.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {career.title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 shrink-0">
                      {career.growthOutlook.split(' ')[0]}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {career.description}
                  </p>

                  {/* Salary & Difficulty */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      {career.averageSalary.split(' /')[0]}
                    </span>
                    <span>Difficulty: {career.difficultyLevel}</span>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-1.5">Required Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {career.requiredSkills.slice(0, 4).map((sk) => (
                        <span
                          key={sk}
                          className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {sk}
                        </span>
                      ))}
                      {career.requiredSkills.length > 4 && (
                        <span className="text-[11px] text-slate-400 self-center">
                          +{career.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                  <span>View Breakdown & Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
