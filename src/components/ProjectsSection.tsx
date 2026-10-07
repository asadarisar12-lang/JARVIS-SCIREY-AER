import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Code2,
  Terminal,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  X,
  FolderGit2,
  Film,
  TrendingUp,
  Globe,
  Cpu,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard } from './TiltCard';
import {
  sectionStaggerContainer,
  editorialHeadingVariants,
  editorialItemVariants,
  gridStaggerContainer,
  cardItemVariants,
} from '../utils/animations';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Filter out any leftover assistant or chatbot items if any were saved in local storage
  const displayProjects = data.projects.filter(
    (p) =>
      !p.title.toLowerCase().includes('asad ai') &&
      !p.title.toLowerCase().includes('chatbot') &&
      !p.title.toLowerCase().includes('smarter ai')
  );

  return (
    <section id="projects" className="py-24 bg-[#EDEDEB] text-[#121214] relative overflow-hidden border-t border-slate-300/80">
      
      {/* Background Orbit Ring Accent */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-300/40 pointer-events-none -mr-48 animate-pulse-glow" />

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
          className="border-b border-slate-300 pb-10 mb-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <h2 id="projects-giant-heading" className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#121214] uppercase select-none">
                WORKS
              </h2>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-900 bg-white/90 shadow-sm backdrop-blur-md cursor-pointer"
              >
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              </motion.div>
            </div>

            <p className="max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Flagship engineering & creative feats: <strong className="text-slate-950 font-semibold">Cinematic Reel Suites, High-Converting UGC Campaigns, and Scalable Web Platforms</strong>.
            </p>
          </div>
        </motion.div>

        {/* Dynamic Project Showcase Grid with 3D TiltCards */}
        <motion.div
          variants={gridStaggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {displayProjects.map((project, idx) => {
            let IconComponent = FolderGit2;
            if (project.category.toLowerCase().includes('film') || project.category.toLowerCase().includes('vfx')) {
              IconComponent = Film;
            } else if (project.category.toLowerCase().includes('marketing') || project.category.toLowerCase().includes('ads')) {
              IconComponent = TrendingUp;
            } else if (project.category.toLowerCase().includes('web')) {
              IconComponent = Globe;
            }

            return (
              <motion.div
                key={project.id || idx}
                id={`portfolio-work-card-${idx}`}
                variants={cardItemVariants}
                className="h-full"
              >
                <TiltCard
                  maxTilt={6}
                  scaleHover={1.02}
                  className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-xl shadow-black/5 hover:border-slate-900 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden"
                >
                  <div>
                    {/* Header Bar */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-cyan-700 font-bold uppercase tracking-wider block">
                            {project.category || 'Initiative'}
                          </span>
                          <span className="text-xs font-mono text-slate-400">Project #{idx + 1}</span>
                        </div>
                      </div>

                      {project.badge && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Image / Banner (if present) */}
                    {project.imageUrl && (
                      <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-slate-200 relative group/img">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                        {project.subtitle && (
                          <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono line-clamp-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                            {project.subtitle}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Title & Description */}
                    <h3 className="text-2xl font-black font-display text-slate-950 mb-3 group-hover:text-cyan-700 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Feature Bullets */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-800 font-mono font-medium hover:border-slate-400 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer group/btn"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate('contact')}
                      className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold font-mono transition-colors cursor-pointer"
                      title="Inquire about this project"
                    >
                      Inquire
                    </motion.button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-300 shadow-2xl relative text-slate-950 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-700 font-bold uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h4 className="text-2xl font-black font-display text-slate-950">{selectedProject.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedProject.imageUrl && (
                <div className="w-full h-56 rounded-2xl overflow-hidden mb-6 border border-slate-200">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Full Features Breakdown */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="mb-6 space-y-3">
                  <h5 className="text-xs font-mono text-slate-900 uppercase font-bold tracking-wider">
                    Core Specifications & Engineering Highlights
                  </h5>
                  <div className="space-y-2">
                    {selectedProject.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                <div className="mb-6 space-y-2">
                  <h5 className="text-xs font-mono text-slate-900 uppercase font-bold tracking-wider">
                    Technology & Software Stack
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono text-slate-900 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProject(null);
                    onNavigate('contact');
                  }}
                  className="flex-1 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  Collaborate on Similar Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-300 text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
