export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced';
export type PriorityLevel = 'high' | 'medium' | 'low';
export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  education: string;
  currentRole: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  bio: string;
  targetCareer: string;
  experienceLevel: ProficiencyLevel;
  learningHoursPerDay: string;
  learningStreakDays: number;
  lastActiveDate: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillName: string;
  proficiency: ProficiencyLevel;
  source: 'manual' | 'resume_detected' | 'assessment';
  verified: boolean;
}

export interface Career {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  averageSalary: string;
  growthOutlook: string;
  difficultyLevel: 'Entry' | 'Moderate' | 'Challenging';
  requiredSkills: string[];
  recommendedSkills: string[];
  typicalResponsibilities: string[];
  toolsAndTechnologies: string[];
}

export interface CareerMatch {
  id: string;
  userId: string;
  careerTitle: string;
  slug: string;
  matchPercentage: number;
  whyMatches: string;
  currentMatchingSkills: string[];
  missingSkills: string[];
  learningDifficulty: string;
  recommendedNextStep: string;
}

export interface SkillGapItem {
  id: string;
  userId: string;
  targetCareer: string;
  skillName: string;
  currentProficiencyPct: number;
  targetProficiencyPct: number;
  priority: PriorityLevel;
  aiAdvice: string;
}

export interface RoadmapTask {
  id: string;
  roadmapId: string;
  phaseNumber: number;
  phaseName: string;
  title: string;
  description: string;
  skillFocus: string;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  resources: Array<{ title: string; url: string; type: string }>;
  recommendedProject?: string;
  status: TaskStatus;
  completedAt?: string;
}

export interface Roadmap {
  id: string;
  userId: string;
  careerTitle: string;
  totalPhases: number;
  currentPhase: number;
  overallProgressPct: number;
  tasks: RoadmapTask[];
}

export interface Project {
  id: string;
  title: string;
  careerCategory: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  skillsLearned: string[];
  technologies: string[];
  description: string;
  deliverables: string[];
}

export interface CourseResource {
  id: string;
  title: string;
  category: string;
  skillName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  resourceType: string;
  provider: string;
  url: string;
  description: string;
}

export interface ResumeAnalysis {
  id: string;
  userId: string;
  fileName: string;
  fileSizeBytes: number;
  uploadDate: string;
  resumeScore: number;
  detectedSkills: string[];
  experienceSummary: string;
  educationSummary: string;
  projectsDetected: string[];
  strengths: string[];
  missingSkills: string[];
  suggestedCareerPaths: Array<{ career: string; matchPct: number; reason: string }>;
  improvementSuggestions: string[];
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: Array<{
    label: string;
    points: Record<string, number>;
  }>;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  completedAt: string;
  fitScore: number;
  topCareerTrack: string;
  radarScores: Array<{ domain: string; score: number }>;
  aiSummary: string;
  nextSteps: string[];
}

export interface UserProgressData {
  overallCareerReadiness: number;
  skillsProgressPct: number;
  roadmapProgressPct: number;
  projectsCompletedCount: number;
  totalProjectsTarget: number;
  coursesCompletedCount: number;
  learningHoursTotal: number;
  timelineHistory: Array<{
    date: string;
    readiness: number;
    skillsCount: number;
    hours: number;
  }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  quickPrompts?: string[];
}
