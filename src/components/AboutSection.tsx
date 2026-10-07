import React from 'react';
import { motion } from 'motion/react';
import { Bot, Cpu, Film, Sparkles, TrendingUp, ArrowUpRight, Terminal, Award, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard } from './TiltCard';
import {
  sectionStaggerContainer,
  editorialHeadingVariants,
  editorialItemVariants,
  gridStaggerContainer,
  cardItemVariants,
} from '../utils/animations';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();

  const pillars = [
    {
      icon: Bot,
      title: 'AI & Autonomous Systems',
      desc: 'Architecting intelligent autonomous agents, multimodal LLM pipelines, prompt engineering, and conversational assistants.',
      color: 'text-cyan-600 border-cyan-300 bg-cyan-50/80',
      badge: 'Autonomous Agents',
    },
    {
      icon: Film,
      title: 'Cinematography & Speed Ramps',
      desc: 'Crafting high-retention vertical video reels, velocity curves, 4K color-graded footage, and generative AI video motion.',
      color: 'text-purple-600 border-purple-300 bg-purple-50/80',
      badge: 'Visual Precision',
    },
    {
      icon: Cpu,
      title: 'Fullstack & Vibe Coding',
      desc: 'Developing lightning-fast web applications, reactive interfaces, and scalable prototypes using modern developer toolkits.',
      color: 'text-blue-600 border-blue-300 bg-blue-50/80',
      badge: 'Rapid Engineering',
    },
    {
      icon: TrendingUp,
      title: 'UGC & Digital Growth',
      desc: 'Designing high-conversion direct-response UGC ad creatives, viral audience hooks, and memorable brand identity systems.',
      color: 'text-emerald-600 border-emerald-300 bg-emerald-50/80',
      badge: 'Conversion & Reach',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#EDEDEB] text-[#121214] relative overflow-hidden border-t border-slate-300/80">
      
      {/* Background Orbit Ring Accent with slow float animation */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-300/50 pointer-events-none -mr-40 animate-pulse-glow" />

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
              <h2 id="about-giant-heading" className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#121214] uppercase select-none">
                ABOUT
              </h2>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-900 bg-white/90 shadow-sm backdrop-blur-md cursor-pointer"
              >
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              </motion.div>
            </div>

            <p className="max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              {data.personalInfo.name} is a forward-thinking <strong className="text-slate-950 font-semibold">{data.personalInfo.role}</strong> merging artificial intelligence with high-end cinematography, software engineering, and digital growth strategy.
            </p>
          </div>
        </motion.div>

        {/* Narrative Bento Showcase with 3D Tilt Card feel */}
        <motion.div
          variants={editorialItemVariants}
          className="rounded-3xl p-6 sm:p-10 bg-white/90 border border-slate-300 shadow-xl shadow-black/5 mb-10 relative overflow-hidden group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>Philosophy & Technical Vision</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-slate-950 tracking-tight">
                Engineering intelligent systems & directing cinematic visual stories.
              </h3>
              
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {data.personalInfo.about}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-xs font-mono text-slate-800 flex items-center gap-1.5 font-medium hover:border-slate-400 transition-colors">
                  <Terminal className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Prompt Engineer & Agent Architect</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-xs font-mono text-slate-800 flex items-center gap-1.5 font-medium hover:border-slate-400 transition-colors">
                  <Film className="w-3.5 h-3.5 text-purple-600" />
                  <span>Speed Ramping & Reel Specialist</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-xs font-mono text-slate-800 flex items-center gap-1.5 font-medium hover:border-slate-400 transition-colors">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>ICA NJIO Silver Medalist</span>
                </span>
              </div>
            </div>

            {/* Quick Stats Bento with 3D Tilt */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3.5">
              <TiltCard
                maxTilt={10}
                className="bg-[#121214] text-white p-5 rounded-2xl border border-slate-800 text-center space-y-1 shadow-md group hover:border-cyan-500/50 transition-colors"
              >
                <div className="font-anton text-4xl sm:text-5xl text-cyan-400 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">AI & Tech</div>
              </TiltCard>

              <TiltCard
                maxTilt={10}
                className="bg-[#121214] text-white p-5 rounded-2xl border border-slate-800 text-center space-y-1 shadow-md group hover:border-indigo-500/50 transition-colors"
              >
                <div className="font-anton text-4xl sm:text-5xl text-indigo-300 group-hover:scale-110 transition-transform">4K+</div>
                <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Cinema Standard</div>
              </TiltCard>

              <TiltCard
                maxTilt={10}
                className="bg-[#121214] text-white p-5 rounded-2xl border border-slate-800 text-center space-y-1 shadow-md group hover:border-purple-500/50 transition-colors"
              >
                <div className="font-anton text-4xl sm:text-5xl text-purple-400 group-hover:scale-110 transition-transform">AGENTS</div>
                <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Autonomous AI</div>
              </TiltCard>

              <TiltCard
                maxTilt={10}
                className="bg-[#121214] text-white p-5 rounded-2xl border border-slate-800 text-center space-y-1 shadow-md group hover:border-emerald-500/50 transition-colors"
              >
                <div className="font-anton text-4xl sm:text-5xl text-emerald-400 group-hover:scale-110 transition-transform">UGC</div>
                <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">High Retention</div>
              </TiltCard>
            </div>
          </div>
        </motion.div>

        {/* 4 Pillars Grid with Staggered Cascading Animation and 3D Tilt */}
        <motion.div
          variants={gridStaggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={cardItemVariants}
                className="h-full"
              >
                <TiltCard
                  maxTilt={8}
                  scaleHover={1.02}
                  className="bg-white/90 rounded-2xl p-6 border border-slate-300 shadow-md hover:border-slate-400 transition-all duration-300 group h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.color} border shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                        {pillar.badge}
                      </span>
                    </div>
                    
                    <h4 className="text-base font-bold font-display text-slate-950 mb-2 group-hover:text-cyan-700 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium group-hover:text-slate-900 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Verified Production Skill</span>
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
