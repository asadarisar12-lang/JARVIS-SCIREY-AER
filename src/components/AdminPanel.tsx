import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  ShieldCheck,
  Lock,
  LogOut,
  Camera,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Award,
  Briefcase,
  Layers,
  Target,
  User,
  RotateCcw,
  Download,
  Check,
  AlertCircle,
  BrainCircuit,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio, ADMIN_EMAIL } from '../context/PortfolioContext';
import { SkillCategory, SkillItem, ProjectItem, AchievementItem, FutureGoalItem } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'photos' | 'skills' | 'awards' | 'works' | 'goals' | 'profile' | 'backup';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
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
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('photos');
  const [loginInputEmail, setLoginInputEmail] = useState<string>('');
  const [loginPasscode, setLoginPasscode] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Clear login inputs whenever modal opens or closes
  React.useEffect(() => {
    if (!isAdmin) {
      setLoginInputEmail('');
      setLoginPasscode('');
      setLoginError(null);
    }
  }, [isOpen, isAdmin]);

  // Photo tab local state
  const [photoInputs, setPhotoInputs] = useState(data.photos);

  // Skill tab local form state
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: SkillCategory;
    level: string;
    description: string;
    tags: string;
    iconName: string;
    isLearning: boolean;
  }>({
    name: '',
    category: 'ai-tech',
    level: 'Advanced',
    description: '',
    tags: '',
    iconName: 'Sparkles',
    isLearning: false,
  });
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  // Award tab local form state
  const [newAward, setNewAward] = useState<{
    title: string;
    event: string;
    organization: string;
    award: string;
    badgeColor: string;
    description: string;
    iconName: string;
  }>({
    title: '',
    event: '',
    organization: '',
    award: 'Medal',
    badgeColor: 'border-slate-300 text-slate-100 bg-slate-800/80',
    description: '',
    iconName: 'Medal',
  });
  const [editingAwardId, setEditingAwardId] = useState<string | null>(null);

  // Project tab local form state
  const [newProject, setNewProject] = useState<{
    title: string;
    subtitle: string;
    category: string;
    badge: string;
    description: string;
    features: string;
    techStack: string;
    imageUrl: string;
    liveUrl: string;
    repoUrl: string;
  }>({
    title: '',
    subtitle: '',
    category: 'AI & Systems',
    badge: 'Featured Work',
    description: '',
    features: '',
    techStack: '',
    imageUrl: '',
    liveUrl: '',
    repoUrl: '',
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Goal tab local form state
  const [newGoal, setNewGoal] = useState<{
    title: string;
    area: string;
    progress: string;
    description: string;
    iconName: string;
    tags: string;
  }>({
    title: '',
    area: '',
    progress: 'Active Deep Learning',
    description: '',
    iconName: 'Target',
    tags: '',
  });
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  // Profile info local form
  const [profileForm, setProfileForm] = useState(data.personalInfo);

  const fileInputHeroRef = useRef<HTMLInputElement>(null);
  const fileInputAboutRef = useRef<HTMLInputElement>(null);
  const fileInputJarvisRef = useRef<HTMLInputElement>(null);
  const fileInputFilmRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = loginAdmin(loginInputEmail, loginPasscode);
    if (!result.success) {
      setLoginError(result.message);
    } else {
      showToast('Welcome back, Asad Ali! Admin authorization granted.');
    }
  };

  const handleFileUpload = (
    key: keyof typeof photoInputs,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const updated = { ...photoInputs, [key]: reader.result };
          setPhotoInputs(updated);
          updatePhotos(updated);
          showToast(`Photo updated successfully!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhotoUrl = (key: keyof typeof photoInputs, url: string) => {
    if (!url.trim()) return;
    const updated = { ...photoInputs, [key]: url.trim() };
    setPhotoInputs(updated);
    updatePhotos(updated);
    showToast(`Image URL updated for ${String(key)}!`);
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const tagsArray = newSkill.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addSkill({
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: newSkill.level,
      description: newSkill.description.trim(),
      tags: tagsArray.length > 0 ? tagsArray : ['Skill'],
      iconName: newSkill.iconName || 'Sparkles',
      isLearning: newSkill.isLearning,
    });

    setNewSkill({
      name: '',
      category: 'ai-tech',
      level: 'Advanced',
      description: '',
      tags: '',
      iconName: 'Sparkles',
      isLearning: false,
    });
    showToast('New skill added to portfolio!');
  };

  const handleCreateAward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAward.title.trim()) return;

    addAchievement({
      title: newAward.title.trim(),
      event: newAward.event.trim(),
      organization: newAward.organization.trim(),
      award: newAward.award.trim(),
      badgeColor: newAward.badgeColor,
      description: newAward.description.trim(),
      iconName: newAward.iconName || 'Award',
    });

    setNewAward({
      title: '',
      event: '',
      organization: '',
      award: 'Medal',
      badgeColor: 'border-slate-300 text-slate-100 bg-slate-800/80',
      description: '',
      iconName: 'Medal',
    });
    showToast('New award added to portfolio!');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const featArray = newProject.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const techArray = newProject.techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addProject({
      title: newProject.title.trim(),
      subtitle: newProject.subtitle.trim(),
      category: newProject.category.trim(),
      badge: newProject.badge.trim() || 'Featured Project',
      description: newProject.description.trim(),
      features: featArray.length > 0 ? featArray : ['Core capability'],
      techStack: techArray.length > 0 ? techArray : ['Fullstack'],
      imageUrl: newProject.imageUrl.trim() || data.photos.heroPortrait,
      liveUrl: newProject.liveUrl.trim() || undefined,
      repoUrl: newProject.repoUrl.trim() || undefined,
    });

    setNewProject({
      title: '',
      subtitle: '',
      category: 'AI & Systems',
      badge: 'Featured Work',
      description: '',
      features: '',
      techStack: '',
      imageUrl: '',
      liveUrl: '',
      repoUrl: '',
    });
    showToast('New work project created successfully!');
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;

    const tagsArray = newGoal.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addFutureGoal({
      title: newGoal.title.trim(),
      area: newGoal.area.trim(),
      progress: newGoal.progress.trim(),
      description: newGoal.description.trim(),
      iconName: newGoal.iconName || 'Target',
      tags: tagsArray.length > 0 ? tagsArray : ['Focus Area'],
    });

    setNewGoal({
      title: '',
      area: '',
      progress: 'Active Deep Learning',
      description: '',
      iconName: 'Target',
      tags: '',
    });
    showToast('New future goal added!');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    showToast('Profile information updated successfully!');
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asad-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio JSON exported successfully!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          importData(parsed);
          showToast('Portfolio restored from backup file!');
        } catch {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md">
        
        {/* Toast Alert */}
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 z-50 px-5 py-3 rounded-2xl bg-emerald-950 border border-emerald-400 text-emerald-100 font-mono text-xs flex items-center gap-2 shadow-2xl"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successToast}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] max-h-[850px] shadow-2xl border border-slate-300 flex flex-col overflow-hidden text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-950 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-lg tracking-tight text-white">{isAdmin ? 'ASAD ALI ADMIN PORTAL' : 'LOGIN'}</h2>
                  {isAdmin && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                      AUTHENTICATED
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  {isAdmin ? `Authorized as: ${adminEmail}` : 'Enter your credentials to continue'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  onClick={() => {
                    logoutAdmin();
                    showToast('Logged out successfully.');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Log out of session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MAIN BODY: Login View OR Authenticated Control Panel */}
          {!isAdmin ? (
            /* NON-AUTHENTICATED LOGIN SCREEN */
            <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center bg-slate-50">
              <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-300 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mx-auto shadow-inner">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-slate-950">Login</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Please enter your email and password to access the portal.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-300 text-red-800 text-xs font-mono flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="login-email-input"
                      value={loginInputEmail}
                      onChange={(e) => setLoginInputEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="off"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      id="login-password-input"
                      value={loginPasscode}
                      onChange={(e) => setLoginPasscode(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    id="login-submit-button"
                    className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Login</span>
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-[11px] font-mono text-slate-400">
                    Security Policy: Unauthorized access attempts are rejected.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN PANEL */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-60 bg-slate-900 text-slate-300 border-r border-slate-800 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
                {[
                  { id: 'photos', label: 'Photos & Media', icon: Camera },
                  { id: 'skills', label: 'Skills & Tech', icon: Sparkles },
                  { id: 'awards', label: 'Awards & Honors', icon: Award },
                  { id: 'works', label: 'Works & Projects', icon: Briefcase },
                  { id: 'goals', label: 'Future Goals', icon: Target },
                  { id: 'profile', label: 'Profile & Bio', icon: User },
                  { id: 'backup', label: 'Backup & Reset', icon: Layers },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as AdminTab)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-white text-slate-950 shadow-md'
                          : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panel */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50 space-y-6">
                
                {/* 1. PHOTOS & MEDIA TAB */}
                {activeTab === 'photos' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-950">Website Photos & Visuals</h3>
                      <p className="text-xs text-slate-600">
                        Upload custom portrait photos or provide direct image URLs. Changes apply immediately across the web application.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Hero Portrait */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-900 uppercase">1. Hero Main Portrait</span>
                          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                            Center Stage
                          </span>
                        </div>
                        <div className="relative aspect-[3/4] max-h-56 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                          <img
                            src={photoInputs.heroPortrait}
                            alt="Hero Preview"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="space-y-2 pt-1">
                          <button
                            onClick={() => fileInputHeroRef.current?.click()}
                            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Upload Hero Photo</span>
                          </button>
                          <input
                            type="file"
                            ref={fileInputHeroRef}
                            onChange={(e) => handleFileUpload('heroPortrait', e)}
                            accept="image/*"
                            className="hidden"
                          />
                          <div className="flex gap-2">
                            <input
                              type="url"
                              placeholder="Or paste direct image URL"
                              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSavePhotoUrl('heroPortrait', (e.target as HTMLInputElement).value);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* About / Filmmaking Visual */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-900 uppercase">2. Filmmaking / About Photo</span>
                          <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                            Cinematography
                          </span>
                        </div>
                        <div className="relative aspect-[3/4] max-h-56 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                          <img
                            src={photoInputs.filmmakingVisual}
                            alt="Filmmaking Preview"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="space-y-2 pt-1">
                          <button
                            onClick={() => fileInputFilmRef.current?.click()}
                            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 text-purple-400" />
                            <span>Upload Filmmaking Photo</span>
                          </button>
                          <input
                            type="file"
                            ref={fileInputFilmRef}
                            onChange={(e) => handleFileUpload('filmmakingVisual', e)}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Smarter AI / JARVIS System Preview */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-900 uppercase">3. Smarter AI (JARVIS) Graphic</span>
                          <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                            AI HUD
                          </span>
                        </div>
                        <div className="relative aspect-video max-h-48 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                          <img
                            src={photoInputs.jarvisPreview}
                            alt="Jarvis Preview"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="space-y-2 pt-1">
                          <button
                            onClick={() => fileInputJarvisRef.current?.click()}
                            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Upload JARVIS Graphic</span>
                          </button>
                          <input
                            type="file"
                            ref={fileInputJarvisRef}
                            onChange={(e) => handleFileUpload('jarvisPreview', e)}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Workstation Lab */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-900 uppercase">4. Workstation / Lab Photo</span>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Dev Setup
                          </span>
                        </div>
                        <div className="relative aspect-video max-h-48 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                          <img
                            src={photoInputs.workstationLab}
                            alt="Workstation Preview"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="space-y-2 pt-1">
                          <button
                            onClick={() => fileInputAboutRef.current?.click()}
                            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Upload Workstation Photo</span>
                          </button>
                          <input
                            type="file"
                            ref={fileInputAboutRef}
                            onChange={(e) => handleFileUpload('workstationLab', e)}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 2. SKILLS MANAGER TAB */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-950">Add & Manage Skills</h3>
                      <p className="text-xs text-slate-600">
                        Add technical skills, creative filmmaking proficiencies, and marketing toolkits.
                      </p>
                    </div>

                    {/* Add Skill Form */}
                    <form onSubmit={handleCreateSkill} className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <Plus className="w-4 h-4 text-indigo-600" />
                        <span>CREATE NEW SKILL ENTRY</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Skill Name
                          </label>
                          <input
                            type="text"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            placeholder="e.g. LLM Fine-Tuning"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Category
                          </label>
                          <select
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as SkillCategory })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          >
                            <option value="ai-tech">AI & Technology</option>
                            <option value="creative-visual">Creative & Visual</option>
                            <option value="marketing-branding">Marketing & Branding</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Proficiency Level
                          </label>
                          <select
                            value={newSkill.level}
                            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          >
                            <option value="Master">Master</option>
                            <option value="Expert">Expert</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Learning">Learning (Active)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={newSkill.description}
                            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                            placeholder="Brief description of what this skill accomplishes"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Tags (Comma separated)
                          </label>
                          <input
                            type="text"
                            value={newSkill.tags}
                            onChange={(e) => setNewSkill({ ...newSkill, tags: e.target.value })}
                            placeholder="PyTorch, Transformers, Agentic AI"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-emerald-400" />
                        <span>Add Skill to Portfolio</span>
                      </button>
                    </form>

                    {/* Existing Skills List */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-slate-800 uppercase">
                        Current Skills ({data.skills.length})
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto">
                        {data.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 shadow-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {skill.level}
                                </span>
                              </div>
                              <div className="text-[10px] font-mono text-slate-500 uppercase">{skill.category}</div>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm(`Delete skill "${skill.name}"?`)) {
                                  deleteSkill(skill.id);
                                  showToast(`Deleted skill: ${skill.name}`);
                                }
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Skill"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. AWARDS & ACHIEVEMENTS TAB */}
                {activeTab === 'awards' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-950">Awards & Honors</h3>
                      <p className="text-xs text-slate-600">
                        Manage olympiad medals, certificates, recognitions, and competitive distinctions.
                      </p>
                    </div>

                    {/* Add Award Form */}
                    <form onSubmit={handleCreateAward} className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>ADD NEW AWARD / MEDAL</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Award Title
                          </label>
                          <input
                            type="text"
                            value={newAward.title}
                            onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                            placeholder="e.g. Gold Medalist"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Event / Competition
                          </label>
                          <input
                            type="text"
                            value={newAward.event}
                            onChange={(e) => setNewAward({ ...newAward, event: e.target.value })}
                            placeholder="National Informatics Olympiad"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Organization
                          </label>
                          <input
                            type="text"
                            value={newAward.organization}
                            onChange={(e) => setNewAward({ ...newAward, organization: e.target.value })}
                            placeholder="ICA National Olympiad Committee"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Award Badge Type
                          </label>
                          <input
                            type="text"
                            value={newAward.award}
                            onChange={(e) => setNewAward({ ...newAward, award: e.target.value })}
                            placeholder="Silver Medal / Certificate"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={newAward.description}
                          onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                          placeholder="Honored for exceptional algorithmic reasoning and problem solving distinction..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>Add Award to Showcase</span>
                      </button>
                    </form>

                    {/* List of current awards */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono font-bold text-slate-800 uppercase">
                        Current Awards ({data.achievements.length})
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {data.achievements.map((ach) => (
                          <div
                            key={ach.id}
                            className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-950">{ach.title}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                                  {ach.award}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 font-mono">{ach.event} • {ach.organization}</p>
                              <p className="text-xs text-slate-500">{ach.description}</p>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm(`Delete award "${ach.title}"?`)) {
                                  deleteAchievement(ach.id);
                                  showToast(`Deleted award: ${ach.title}`);
                                }
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Award"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. WORKS & PROJECTS TAB */}
                {activeTab === 'works' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-950">Works & Project Initiatives</h3>
                      <p className="text-xs text-slate-600">
                        Add AI models, creative reel showcases, and web applications to your portfolio works.
                      </p>
                    </div>

                    {/* Add Project Form */}
                    <form onSubmit={handleCreateProject} className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <Briefcase className="w-4 h-4 text-cyan-600" />
                        <span>ADD NEW WORK / PROJECT</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            placeholder="e.g. Autonomous Vision Engine"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Subtitle / Tagline
                          </label>
                          <input
                            type="text"
                            value={newProject.subtitle}
                            onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                            placeholder="Real-Time Multimodal OCR Pipeline"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            placeholder="AI & Autonomous Systems"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Badge
                          </label>
                          <input
                            type="text"
                            value={newProject.badge}
                            onChange={(e) => setNewProject({ ...newProject, badge: e.target.value })}
                            placeholder="Live Demo / Active R&D"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Tech Stack (Comma-separated)
                          </label>
                          <input
                            type="text"
                            value={newProject.techStack}
                            onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                            placeholder="Python, PyTorch, React, Vite"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                          Project Description
                        </label>
                        <textarea
                          rows={2}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          placeholder="Comprehensive summary of project capabilities and architecture..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                          Key Features (One feature per line)
                        </label>
                        <textarea
                          rows={3}
                          value={newProject.features}
                          onChange={(e) => setNewProject({ ...newProject, features: e.target.value })}
                          placeholder="Zero-latency audio streaming\nMultimodal viewport rasterization\nPersistent knowledge graph"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-cyan-400" />
                        <span>Publish Project to Works</span>
                      </button>
                    </form>

                    {/* Current Works List */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono font-bold text-slate-800 uppercase">
                        Current Works & Projects ({data.projects.length})
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {data.projects.map((proj) => (
                          <div
                            key={proj.id}
                            className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-950">{proj.title}</span>
                                {proj.badge && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200">
                                    {proj.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 font-mono">{proj.subtitle}</p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {proj.techStack?.map((t, i) => (
                                  <span key={i} className="text-[9px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm(`Delete project "${proj.title}"?`)) {
                                  deleteProject(proj.id);
                                  showToast(`Deleted project: ${proj.title}`);
                                }
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. FUTURE GOALS TAB */}
                {activeTab === 'goals' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-950">Trajectory & Future Goals</h3>
                      <p className="text-xs text-slate-600">
                        Add strategic horizons such as Ethical Hacking, AI agent robotics, or Distributed Systems.
                      </p>
                    </div>

                    <form onSubmit={handleCreateGoal} className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <span>ADD STRATEGIC GOAL</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Goal Title
                          </label>
                          <input
                            type="text"
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                            placeholder="e.g. Offensive Security & Pentesting"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Domain / Area
                          </label>
                          <input
                            type="text"
                            value={newGoal.area}
                            onChange={(e) => setNewGoal({ ...newGoal, area: e.target.value })}
                            placeholder="Cybersecurity / AI"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Progress Status
                          </label>
                          <input
                            type="text"
                            value={newGoal.progress}
                            onChange={(e) => setNewGoal({ ...newGoal, progress: e.target.value })}
                            placeholder="Active Deep Learning"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={newGoal.description}
                            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                            placeholder="Expanding knowledge of packet auditing and vulnerability testing..."
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Tags (Comma separated)
                          </label>
                          <input
                            type="text"
                            value={newGoal.tags}
                            onChange={(e) => setNewGoal({ ...newGoal, tags: e.target.value })}
                            placeholder="Kali Linux, OWASP, Networks"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-emerald-400" />
                        <span>Add Trajectory Goal</span>
                      </button>
                    </form>

                    <div className="space-y-3">
                      <div className="text-xs font-mono font-bold text-slate-800 uppercase">
                        Current Trajectory Goals ({data.futureGoals.length})
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {data.futureGoals.map((g) => (
                          <div
                            key={g.id}
                            className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-950">{g.title}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                                  {g.progress}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">{g.description}</p>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm(`Delete goal "${g.title}"?`)) {
                                  deleteFutureGoal(g.id);
                                  showToast(`Deleted goal: ${g.title}`);
                                }
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Goal"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. PROFILE & BIO TAB */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-950">Personal Profile & Bio</h3>
                      <p className="text-xs text-slate-600">
                        Update your public name, professional titles, contact email, and executive bio.
                      </p>
                    </div>

                    <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Full Display Name
                          </label>
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Professional Role Title
                          </label>
                          <input
                            type="text"
                            value={profileForm.role}
                            onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                            Location / Availability
                          </label>
                          <input
                            type="text"
                            value={profileForm.location}
                            onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={profileForm.tagline}
                          onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                          Detailed Bio / About Paragraph
                        </label>
                        <textarea
                          rows={4}
                          value={profileForm.about}
                          onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Save className="w-4 h-4 text-cyan-400" />
                        <span>Save Profile Updates</span>
                      </button>
                    </form>
                  </div>
                )}

                {/* 7. BACKUP & SYSTEM RESET TAB */}
                {activeTab === 'backup' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-950">Data Backup & Factory Reset</h3>
                      <p className="text-xs text-slate-600">
                        Export your customized portfolio data as a JSON file or restore original default settings.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Export & Import */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                        <div className="font-mono text-xs font-bold text-slate-900 uppercase">
                          JSON Backup & Migration
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Download a complete JSON snapshot of all your skills, projects, awards, and photos.
                        </p>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={handleExportJSON}
                            className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-cyan-400" />
                            <span>Export Portfolio JSON</span>
                          </button>

                          <button
                            onClick={() => jsonImportRef.current?.click()}
                            className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Upload className="w-4 h-4 text-slate-600" />
                            <span>Import from JSON File</span>
                          </button>
                          <input
                            type="file"
                            ref={jsonImportRef}
                            onChange={handleImportJSON}
                            accept=".json"
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Reset to Factory Defaults */}
                      <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-4">
                        <div className="font-mono text-xs font-bold text-red-900 uppercase flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span>Reset to Original Defaults</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          This will reset all skills, awards, projects, and photos back to initial factory portfolio specifications.
                        </p>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to reset all portfolio data back to default specifications?')) {
                              resetToDefaults();
                              showToast('Portfolio restored to initial defaults.');
                            }
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Reset to Default Data</span>
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
