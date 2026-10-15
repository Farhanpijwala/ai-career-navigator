import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { api } from '../../services/api.ts';
import {
  BotMessageSquare,
  Sparkles,
  Send,
  User,
  ArrowRight,
  RefreshCw,
  Target,
  FileText,
  MapPin
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AiCoachPage: React.FC = () => {
  const { user, profile, skills, roadmap, resumeAnalysis, skillGaps } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: `Hello ${user?.fullName || 'Alex'}! I'm your dedicated AI Career Coach. I've synced your profile: target career **${profile?.targetCareer || 'Frontend Developer'}**, resume score **${resumeAnalysis?.resumeScore || 78}/100**, and **${roadmap?.overallProgressPct || 64}%** roadmap completion.\n\nWhat would you like to discuss today? Feel free to ask about skill gaps, portfolio projects, interview preparation, or next steps.`,
      timestamp: 'Just now'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [quickPrompts, setQuickPrompts] = useState<string[]>([
    'What should I learn next?',
    `Why am I a good match for ${profile?.targetCareer || 'Frontend Development'}?`,
    'What critical skills am I missing?',
    'Give me a portfolio project to practice React and REST APIs.',
    'Review my career readiness and resume score.',
    'How do I bridge my gap in TypeScript?'
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim() || isSending) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInputValue('');
    setIsSending(true);

    try {
      const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const res = await api.ai.chatCoach(text, history);

      const assistantMsg: Message = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (res.quickPrompts && res.quickPrompts.length > 0) {
        setQuickPrompts(res.quickPrompts);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ast_err_${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but I encountered a temporary connection issue. Your current highest priority remains mastering React state management and REST API integration before moving to TypeScript.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 flex flex-col h-[calc(100vh-5rem)]">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">AI Career Coach</h1>
            <p className="text-xs text-slate-500">
              Contextual to {user?.fullName} · {profile?.targetCareer} Track · Gemini 3.8 Flash
            </p>
          </div>
        </div>

        {/* Live Context Indicators */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
            Score: {resumeAnalysis?.resumeScore || 78}/100
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium">
            Roadmap: {roadmap?.overallProgressPct || 64}%
          </span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800'
                }`}
              >
                {msg.content}
                <div
                  className={`text-[10px] mt-2 ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-500 italic">
              AI Coach is thinking with candidate context...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="shrink-0 space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {quickPrompts.slice(0, 4).map((qp, qIdx) => (
            <button
              key={qIdx}
              onClick={() => handleSend(qp)}
              disabled={isSending}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 whitespace-nowrap font-medium transition-colors shadow-xs disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask your coach anything about skills, projects, roadmap, or placement..."
            disabled={isSending}
            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isSending}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors disabled:opacity-40 shrink-0 shadow-sm"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
