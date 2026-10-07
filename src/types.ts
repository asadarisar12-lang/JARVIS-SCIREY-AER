export type SkillCategory = 'ai-tech' | 'creative-visual' | 'marketing-branding';

export interface PersonalInfo {
  name: string;
  role: string;
  heroSubtitle: string;
  email: string;
  location: string;
  portraitUrl: string;
  tagline: string;
  about: string;
}

export interface PortfolioPhotos {
  heroPortrait: string;
  aboutPhoto: string;
  jarvisPreview: string;
  filmmakingVisual: string;
  workstationLab: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: string;
  description: string;
  tags: string[];
  iconName: string;
  isLearning?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  features: string[];
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  badge?: string;
  interactiveDemo?: boolean;
}

export interface PortfolioTrioItem {
  title: string;
  tag: string;
  desc: string;
  linkText: string;
  features: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  organization: string;
  award: string;
  badgeColor: string;
  description: string;
  iconName: string;
}

export interface FutureGoalItem {
  id: string;
  title: string;
  area: string;
  progress: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  photos: PortfolioPhotos;
  skills: SkillItem[];
  projects: ProjectItem[];
  portfolioTrio: PortfolioTrioItem[];
  achievements: AchievementItem[];
  futureGoals: FutureGoalItem[];
}

