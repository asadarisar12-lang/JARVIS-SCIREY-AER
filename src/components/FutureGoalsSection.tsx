import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Bot, Code2, ArrowUpRight, CheckCircle2, Sparkles, Compass } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard } from './TiltCard';
import {
  sectionStaggerContainer,
  editorialHeadingVariants,
  editorialItemVariants,
  gridStaggerContainer,
  cardItemVariants,
} from '../utils/animations';

export const FutureGoalsSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="future-goals" className="py-24 bg-[#EDEDEB] text-[#121214] relative overflow-hidden border-t border-slate-300/80">
      
      {/* Background Orbit Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-slate-300/40 pointer-events-none -mr-40 animate-pulse-glow" />

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
              <h2 id="future-goals-giant-heading" className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#121214] uppercase select-none">
                TRAJECTORY
              </h2>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-900 bg-white/90 shadow-sm backdrop-blur-md cursor-pointer"
              >
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              </motion.div>
            </div>

            <p className="max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Active technical pursuits across <strong className="text-slate-950 font-semibold">offensive cybersecurity, autonomous AI agent pipelines, and high-performance system architecture</strong>.
            </p>
          </div>
        </motion.div>

        {/* Goals Grid with Cascading Staggered Entrance & 3D TiltCards */}
        <motion.div
          variants={gridStaggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {data.futureGoals.map((goal, idx) => {
            let icon = ShieldAlert;
            let iconBg = 'bg-amber-100 text-amber-800 border-amber-300';
            let badgeStyle = 'bg-amber-100 text-amber-900 border-amber-300';
            let progressWidth = 'w-[65%] bg-amber-500';

            if (idx % 3 === 1) {
              icon = Bot;
              iconBg = 'bg-cyan-100 text-cyan-800 border-cyan-300';
              badgeStyle = 'bg-cyan-100 text-cyan-900 border-cyan-300';
              progressWidth = 'w-[85%] bg-cyan-500';
            } else if (idx % 3 === 2) {
              icon = Code2;
              iconBg = 'bg-indigo-100 text-indigo-800 border-indigo-300';
              badgeStyle = 'bg-indigo-100 text-indigo-900 border-indigo-300';
              progressWidth = 'w-[90%] bg-indigo-500';
            }

            const IconComponent = icon;

            return (
              <motion.div
                key={goal.id || idx}
                id={`future-goal-card-${idx}`}
                variants={cardItemVariants}
                className="h-full"
              >
                <TiltCard
                  maxTilt={8}
                  scaleHover={1.02}
                  className="bg-white/90 rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-xl shadow-black/5 hover:border-slate-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${badgeStyle}`}>
                        {goal.progress}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1 font-bold">
                      {goal.area}
                    </span>
                    
                    <h3 className="text-xl font-bold font-display text-slate-950 mb-3 group-hover:text-cyan-700 transition-colors">
                      {goal.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                      {goal.description}
                    </p>

                    {/* Animated Progress Bar */}
                    <div className="mb-5 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>Milestone Progress</span>
                        <span className="font-bold text-slate-900">{goal.progress}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: idx % 3 === 0 ? '68%' : idx % 3 === 1 ? '85%' : '92%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                          className={`h-full rounded-full ${progressWidth}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Core Focus Areas</div>
                    <div className="flex flex-wrap gap-1.5">
                      {goal.tags?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-800 font-mono font-medium hover:border-slate-400 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
};
