import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import { AssessmentQuestion, AssessmentResult } from '../../../server/types.js';
import { AiProcessingModal } from '../../components/ui/AiProcessingModal.tsx';
import {
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Trophy,
  RotateCcw,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const CareerAssessmentPage: React.FC = () => {
  const { setActivePage, showToast, refreshAppData } = useApp();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.assessment.getQuestions(), api.assessment.getResult()])
      .then(([qList, res]) => {
        setQuestions(qList);
        if (res) setAssessmentResult(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (points: Record<string, number>) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: points
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      submitAssessment();
    }
  };

  const submitAssessment = async () => {
    setIsEvaluating(true);
    try {
      const result = await api.assessment.submit(answers);
      setTimeout(() => {
        setIsEvaluating(false);
        setAssessmentResult(result);
        showToast('Assessment evaluated with Gemini AI!', 'success');
        refreshAppData();
      }, 3500);
    } catch (err: any) {
      setIsEvaluating(false);
      showToast(err.message || 'Failed to submit assessment', 'error');
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setAssessmentResult(null);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading assessment questions...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Psychometric & Technical Profiling</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Career Fit Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Discover which technology specialization best matches your intrinsic problem-solving instincts, technical passions, and work preferences.
        </p>
      </div>

      {!assessmentResult ? (
        /* Questions Flow */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Progress Bar & Question Counter */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="font-semibold text-slate-700">
                {Math.round(((currentIdx + 1) / questions.length) * 100)}% Completed
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          {currentQ && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = JSON.stringify(answers[currentQ.id]) === JSON.stringify(opt.points);
                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleSelectOption(opt.points)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-sm text-indigo-950 font-medium'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm leading-relaxed">{opt.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            {currentIdx > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : <div />}

            <button
              type="button"
              disabled={!answers[currentQ?.id]}
              onClick={handleNext}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
            >
              {currentIdx === questions.length - 1 ? 'Analyze My Career Fit' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Top Match Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Top Assessment Alignment</span>
                <h3 className="text-2xl font-black text-indigo-950">
                  {assessmentResult.topCareerTrack}
                </h3>
                <p className="text-xs text-indigo-800">
                  Overall Affinity Score: {assessmentResult.fitScore}%
                </p>
              </div>

              <button
                onClick={handleRetake}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-center shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
              </button>
            </div>

            {/* Radar Chart & AI Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={assessmentResult.radarScores}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="domain" stroke="#64748b" fontSize={10} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="#cbd5e1" fontSize={9} />
                    <Radar
                      name="Aptitude"
                      dataKey="score"
                      stroke="#4f46e5"
                      fill="#4f46e5"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Psychometric Fit Summary</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {assessmentResult.aiSummary}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block">Recommended Next Steps:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {assessmentResult.nextSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('roadmap')}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    Open Personalized Roadmap <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Processing Modal */}
      <AiProcessingModal
        isOpen={isEvaluating}
        title="Analyzing Career Fit with Gemini 3.8 Flash..."
        steps={[
          'Aggregating multi-domain technical assessment answers...',
          'Evaluating technical affinities against real-world engineering roles...',
          'Mapping competencies across UI, APIs, databases, and security...',
          'Generating personalized radar fit breakdown & roadmap recommendations...'
        ]}
      />
    </div>
  );
};
