import React from 'react';
import { motion } from 'motion/react';
import { Medal, Award, Star, CheckCircle2, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard } from './TiltCard';
import {
  sectionStaggerContainer,
  editorialHeadingVariants,
  editorialItemVariants,
  gridStaggerContainer,
} from '../utils/animations';

export const AchievementsSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="achievements" className="py-24 bg-[#EDEDEB] text-[#121214] relative overflow-hidden border-t border-slate-300/80">
      
      {/* Background Orbit Ring Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-300/40 pointer-events-none -ml-40 animate-pulse-glow" />

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
              <h2 id="achievements-giant-heading" className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#121214] uppercase select-none">
                AWARDS
              </h2>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-900 bg-white/90 shadow-sm backdrop-blur-md cursor-pointer"
              >
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              </motion.div>
            </div>

            <p className="max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              National competitive distinctions recognizing <strong className="text-slate-950 font-semibold">computational reasoning, algorithmic problem solving, and technical excellence</strong>.
            </p>
          </div>
        </motion.div>

        {/* Dynamic Achievements List with Cascading Staggered Entrance */}
        <motion.div
          variants={gridStaggerContainer}
          className="space-y-8"
        >
          {data.achievements.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              variants={editorialItemVariants}
              className="bg-white/90 rounded-3xl p-6 sm:p-10 border border-slate-300 shadow-xl shadow-black/5 relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Medal Graphic & Distinction with 3D TiltCard */}
                <div className="lg:col-span-4">
                  <TiltCard
                    maxTilt={9}
                    scaleHover={1.03}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#121214] border border-slate-700 text-center shadow-2xl relative group overflow-hidden"
                  >
                    {/* Shimmer Light Accent */}
                    <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-400 p-[3px] shadow-2xl mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                      <div className="w-full h-full bg-[#18181B] rounded-[22px] flex items-center justify-center">
                        <Medal className="w-12 h-12 text-slate-100 animate-pulse" />
                      </div>
                      <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-spin" />
                    </div>

                    <div className="text-2xl font-black font-display text-white tracking-wide uppercase">
                      {item.award}
                    </div>
                    <div className="text-xs font-mono text-cyan-400 mt-1 font-bold">
                      {item.event}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-slate-300">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{item.organization}</span>
                    </div>
                  </TiltCard>
                </div>

                {/* Right: Detailed Context & Certificate Info */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-mono text-slate-600 uppercase tracking-wider font-bold">Official Competition Record</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-950 mt-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Sub cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <TiltCard
                      maxTilt={6}
                      className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center text-slate-900">
                          <Medal className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-950">{item.award} Honors</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Earned through high-score algorithmic testing and competitive programming assessments across nationwide candidates.
                      </p>
                    </TiltCard>

                    <TiltCard
                      maxTilt={6}
                      className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-800">
                          <Award className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-950">Certificate of Participation</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Formal certification acknowledging participation and distinguished standing in advanced computer informatics.
                      </p>
                    </TiltCard>
                  </div>

                  {/* Key Traits Verified */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-slate-800">
                    {['Algorithmic Thinking', 'Computational Logic', 'Problem Solving', 'Competitive Performance'].map((trait, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 flex items-center gap-1.5 font-medium hover:border-slate-400 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{trait}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
};
