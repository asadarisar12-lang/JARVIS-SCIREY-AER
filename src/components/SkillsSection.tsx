import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BrainCircuit,
  Sparkles,
  Bot,
  MessageSquareCode,
  Zap,
  Cpu,
  ShieldAlert,
  Palette,
  Clapperboard,
  PenTool,
  Film,
  Camera,
  Video,
  Eye,
  Projector,
  Layers,
  Smartphone,
  Gauge,
  Tv,
  Award,
  TrendingUp,
  Users,
  Search,
  Filter,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategory } from '../types';
import { TiltCard } from './TiltCard';
import {
  sectionStaggerContainer,
  editorialHeadingVariants,
  editorialItemVariants,
  gridStaggerContainer,
  cardItemVariants,
} from '../utils/animations';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  BrainCircuit,
  Sparkles,
  Bot,
  MessageSquareCode,
  Zap,
  Cpu,
  ShieldAlert,
  Palette,
  Clapperboard,
  PenTool,
  Film,
  Camera,
  Video,
  Eye,
  Projector,
  Layers,
  Smartphone,
  Gauge,
  Tv,
  Award,
  TrendingUp,
  Users,
};

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | SkillCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const skillsList = data.skills;

  const filterTabs = [
    { id: 'all', label: 'All Disciplines', count: skillsList.length },
    { id: 'ai-tech', label: 'AI & Technology', count: skillsList.filter(s => s.category === 'ai-tech').length },
    { id: 'creative-visual', label: 'Creative & Visual', count: skillsList.filter(s => s.category === 'creative-visual').length },
    { id: 'marketing-branding', label: 'Marketing & Branding', count: skillsList.filter(s => s.category === 'marketing-branding').length },
  ];

  const filteredSkills = skillsList.filter(skill => {
    const matchesCategory = activeFilter === 'all' || skill.category === activeFilter;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 bg-[#EDEDEB] text-[#121214] relative overflow-hidden border-t border-slate-300/80">
      
      {/* Background Orbit Ring Accent */}
      <div className="absolute left-0 top-1/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-slate-300/40 pointer-events-none -ml-44 animate-pulse-glow" />

      {/* Main Container with Staggered Fade-In-Up Entrance Animation */}
      <motion.div
        variants={sectionStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Giant Editorial Title Section */}
        <motion.div
          variants={editorialHeadingVariants}
          className="border-b border-slate-300 pb-10 mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <h2 id="skills-giant-heading" className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#121214] uppercase select-none">
                SKILLS
              </h2>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-900 bg-white/90 shadow-sm backdrop-blur-md cursor-pointer"
              >
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              </motion.div>
            </div>

            <p className="max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              A comprehensive technical arsenal covering <strong className="text-slate-950 font-semibold">AI Engineering, Prompt Tuning, Autonomous Agents, Cinematography, Speed Ramping, Full-Stack Code, and UGC Marketing</strong>.
            </p>
          </div>
        </motion.div>

        {/* Filter Controls & Search Bar */}
        <motion.div
          variants={editorialItemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/80 border border-slate-300 shadow-sm w-full md:w-auto">
            {filterTabs.map(tab => (
              <motion.button
                key={tab.id}
                id={`filter-skills-${tab.id}`}
                onClick={() => setActiveFilter(tab.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 flex-1 sm:flex-initial justify-center cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    activeFilter === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="skills-search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skills, tags, tech..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm transition-colors font-mono"
            />
          </div>
        </motion.div>

        {/* Skills Grid with AnimatePresence and 3D TiltCards */}
        <motion.div
          variants={editorialItemVariants}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map(skill => {
              const IconComponent = iconMap[skill.iconName] || BrainCircuit;
              
              // Determine card accent by category
              let badgeBg = 'bg-cyan-50 text-cyan-800 border-cyan-300';
              let iconBox = 'bg-cyan-50 text-cyan-700 border-cyan-200';
              let progressWidth = 'w-[92%] bg-cyan-600';
              
              if (skill.level === 'Expert' || skill.level === 'Advanced') {
                progressWidth = 'w-[94%] bg-cyan-600';
              } else if (skill.level === 'Intermediate') {
                progressWidth = 'w-[78%] bg-indigo-600';
              }

              if (skill.category === 'creative-visual') {
                badgeBg = 'bg-purple-50 text-purple-800 border-purple-300';
                iconBox = 'bg-purple-50 text-purple-700 border-purple-200';
                progressWidth = 'w-[95%] bg-purple-600';
              } else if (skill.category === 'marketing-branding') {
                badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-300';
                iconBox = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                progressWidth = 'w-[88%] bg-emerald-600';
              }

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  key={skill.id}
                  id={`skill-card-${skill.id}`}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={6}
                    scaleHover={1.02}
                    className="bg-white/90 rounded-2xl p-6 border border-slate-300 shadow-md hover:border-slate-400 hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Icon + Level Badge */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBox} border shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          {skill.isLearning && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                              Learning
                            </span>
                          )}
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${badgeBg}`}>
                            {skill.level}
                          </span>
                        </div>
                      </div>

                      {/* Skill Title */}
                      <h3 className="text-lg font-bold font-display text-slate-950 mb-2 group-hover:text-cyan-700 transition-colors">
                        {skill.name}
                      </h3>

                      {/* Skill Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {skill.description}
                      </p>

                      {/* Proficiency Indicator Bar */}
                      <div className="mb-4 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>Proficiency Index</span>
                          <span className="font-bold text-slate-900">{skill.level}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: skill.level === 'Master' || skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '90%' : '80%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${progressWidth}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tags bottom list */}
                    <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
                      {skill.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if search yields zero */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white/90 rounded-2xl border border-slate-300 shadow-sm"
          >
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-800 text-sm font-semibold">No skills found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-3 px-4 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-900 border border-slate-300 hover:bg-slate-100 cursor-pointer"
            >
              Reset Search Filter
            </button>
          </motion.div>
        )}

      </motion.div>
    </section>
  );
};
