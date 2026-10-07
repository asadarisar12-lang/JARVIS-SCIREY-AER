import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  PersonalInfo,
  PortfolioPhotos,
  SkillItem,
  ProjectItem,
  AchievementItem,
  FutureGoalItem,
} from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

export const ADMIN_EMAIL = 'asadarisar69@gmail.com';
export const ADMIN_PASSWORD = 'Asad.0';
const STORAGE_KEY = 'asad_portfolio_custom_data_v2';
const AUTH_KEY = 'asad_admin_session_auth_v2';

interface PortfolioContextType {
  data: PortfolioData;
  isAdmin: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string, password?: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updatePhotos: (photos: Partial<PortfolioPhotos>) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  addAchievement: (achievement: Omit<AchievementItem, 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<AchievementItem>) => void;
  deleteAchievement: (id: string) => void;
  addFutureGoal: (goal: Omit<FutureGoalItem, 'id'>) => void;
  updateFutureGoal: (id: string, goal: Partial<FutureGoalItem>) => void;
  deleteFutureGoal: (id: string) => void;
  resetToDefaults: () => void;
  importData: (imported: PortfolioData) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default fields exist if schema upgraded
        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          personalInfo: { ...INITIAL_PORTFOLIO_DATA.personalInfo, ...(parsed.personalInfo || {}) },
          photos: { ...INITIAL_PORTFOLIO_DATA.photos, ...(parsed.photos || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to load saved portfolio data:', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        return parsed?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && parsed?.authenticated === true;
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.authenticated) return parsed.email;
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Save changes to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist portfolio data:', e);
    }
  }, [data]);

  const loginAdmin = (email: string, password?: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail !== ADMIN_EMAIL.toLowerCase()) {
      return {
        success: false,
        message: 'Invalid email address or access denied.',
      };
    }

    if (!password || password !== ADMIN_PASSWORD) {
      return {
        success: false,
        message: 'Incorrect password. Please enter the valid password.',
      };
    }

    setIsAdmin(true);
    setAdminEmail(ADMIN_EMAIL);
    try {
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          email: ADMIN_EMAIL,
          authenticated: true,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn('Failed to save admin auth session:', e);
    }

    return {
      success: true,
      message: 'Authentication verified successfully.',
    };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminEmail(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updatePhotos = (photos: Partial<PortfolioPhotos>) => {
    setData((prev) => ({
      ...prev,
      photos: { ...prev.photos, ...photos },
      personalInfo: {
        ...prev.personalInfo,
        portraitUrl: photos.heroPortrait || prev.personalInfo.portraitUrl,
      },
    }));
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    setData((prev) => ({
      ...prev,
      skills: [newSkill, ...prev.skills],
    }));
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...project,
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addAchievement = (achievement: Omit<AchievementItem, 'id'>) => {
    const newAchievement: AchievementItem = {
      ...achievement,
      id: `award-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    setData((prev) => ({
      ...prev,
      achievements: [newAchievement, ...prev.achievements],
    }));
  };

  const updateAchievement = (id: string, updated: Partial<AchievementItem>) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    }));
  };

  const deleteAchievement = (id: string) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  const addFutureGoal = (goal: Omit<FutureGoalItem, 'id'>) => {
    const newGoal: FutureGoalItem = {
      ...goal,
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    setData((prev) => ({
      ...prev,
      futureGoals: [newGoal, ...prev.futureGoals],
    }));
  };

  const updateFutureGoal = (id: string, updated: Partial<FutureGoalItem>) => {
    setData((prev) => ({
      ...prev,
      futureGoals: prev.futureGoals.map((g) => (g.id === id ? { ...g, ...updated } : g)),
    }));
  };

  const deleteFutureGoal = (id: string) => {
    setData((prev) => ({
      ...prev,
      futureGoals: prev.futureGoals.filter((g) => g.id !== id),
    }));
  };

  const resetToDefaults = () => {
    setData(INITIAL_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const importData = (imported: PortfolioData) => {
    if (imported && imported.personalInfo && imported.skills) {
      setData(imported);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        updatePersonalInfo,
        updatePhotos,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addFutureGoal,
        updateFutureGoal,
        deleteFutureGoal,
        resetToDefaults,
        importData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
