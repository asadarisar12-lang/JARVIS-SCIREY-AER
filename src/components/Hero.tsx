import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Bot, Film, Code2, CheckCircle2, Sparkles, Zap, Shield, Play } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard } from './TiltCard';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { data } = usePortfolio();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll animations & parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textXLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[105vh] bg-[#EDEDEB] text-[#121214] flex flex-col justify-between overflow-hidden pt-28 pb-10 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* Concentric Geometric Orbit Lines in Background with Scroll-linked Rotation & Subtle Glow */}
      <motion.div
        style={{ rotate: orbitRotate, opacity: opacityFade }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[350px] h-[350px] sm:w-[560px] sm:h-[560px] lg:w-[760px] lg:h-[760px] rounded-full border border-slate-400/60 border-dashed" />
        <div className="absolute w-[520px] h-[520px] sm:w-[820px] sm:h-[820px] lg:w-[1100px] lg:h-[1100px] rounded-full border border-slate-400/40" />
        <div className="absolute w-[700px] h-[700px] sm:w-[1050px] sm:h-[1050px] lg:w-[1450px] lg:h-[1450px] rounded-full border border-slate-300/50" />
      </motion.div>

      {/* Top Meta Header info with subtle floating entrance */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2"
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-300/90 shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-900 uppercase">
            AI Creator • Systems Architect
          </span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -1 }}
          className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-300/90 shadow-sm backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-800 uppercase">
            Filmmaker • Silver Medalist
          </span>
        </motion.div>
      </motion.div>

      {/* Main Center Stage: Massive Editorial Typography + Layered Cutout Portrait */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-7xl mx-auto pt-6 pb-4">
        
        {/* MASSIVE Giant Background Typography Behind Portrait with Parallax Scroll Shift */}
        <div className="w-full text-center relative overflow-visible pointer-events-none">
          <motion.div
            style={{ x: textXLeft }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              id="hero-giant-name"
              className="font-anton uppercase text-[24vw] sm:text-[22vw] lg:text-[20vw] leading-[0.78] tracking-tighter text-[#121214] font-black w-full select-none drop-shadow-sm"
            >
              {data.personalInfo.name}
            </h1>
          </motion.div>
        </div>

        {/* Floating Centered Cutout Portrait with 3D Tilt Card Physics & Orbiting Micro Badges */}
        <motion.div
          style={{ y: portraitY, scale: portraitScale }}
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mt-[17vw] sm:-mt-[15vw] lg:-mt-[13vw] z-20 flex flex-col items-center"
        >
          {/* Floating Orbiting Feature Pill Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -left-4 sm:-left-12 lg:-left-20 top-12 z-30 hidden sm:block animate-float-slow"
          >
            <div className="px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-300 shadow-xl shadow-black/10 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-cyan-500/15 text-cyan-700 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-mono font-bold text-slate-900 leading-tight">AI Agent Pipelines</div>
                <div className="text-[9px] font-mono text-cyan-700">Autonomous LLMs</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Orbiting Feature Pill Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -right-4 sm:-right-12 lg:-right-20 top-36 z-30 hidden sm:block animate-float-reverse"
          >
            <div className="px-3.5 py-2 rounded-2xl bg-[#121214] backdrop-blur-xl border border-slate-700 shadow-xl shadow-black/20 flex items-center gap-2.5 text-white">
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Film className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-mono font-bold text-white leading-tight">4K Speed Ramping</div>
                <div className="text-[9px] font-mono text-purple-300">Viral Hooks & UGC</div>
              </div>
            </div>
          </motion.div>

          {/* Circular Arch Boundary Portrait matching Reference Image */}
          <div className="relative flex flex-col items-center">
            <TiltCard
              maxTilt={5}
              scaleHover={1.02}
              className="relative w-72 sm:w-88 md:w-[380px] lg:w-[420px] aspect-[4/5] flex flex-col items-center justify-end group cursor-pointer"
            >
              {/* Circular Arch Masked Portrait Container */}
              <div className="relative w-full h-full rounded-t-[160px] sm:rounded-t-[200px] rounded-b-[140px] sm:rounded-b-[180px] overflow-hidden border-[3px] border-slate-900/10 shadow-2xl shadow-black/15 bg-[#E6E6E4]">
                <img
                  id="hero-portrait-image"
                  src={data.photos.heroPortrait || data.personalInfo.portraitUrl}
                  alt="Asad Ali - AI Creator & Developer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle soft boundary edge shading */}
                <div className="absolute inset-0 rounded-t-[160px] sm:rounded-t-[200px] rounded-b-[140px] sm:rounded-b-[180px] ring-1 ring-inset ring-black/10 pointer-events-none" />
              </div>
            </TiltCard>
          </div>

          {/* Floating Pill Navigation Tags Around with Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-2.5 mt-5 max-w-2xl px-2"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('projects')}
              className="shimmer-trigger px-4 py-2 rounded-full bg-white/95 border border-slate-300 text-slate-900 text-xs font-mono font-bold shadow-sm hover:bg-slate-950 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-600" />
              <span>AI Agents & Chatbots</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('skills')}
              className="shimmer-trigger px-4 py-2 rounded-full bg-white/95 border border-slate-300 text-slate-900 text-xs font-mono font-bold shadow-sm hover:bg-slate-950 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Fullstack & Vibe Coding</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('projects')}
              className="shimmer-trigger px-4 py-2 rounded-full bg-white/95 border border-slate-300 text-slate-900 text-xs font-mono font-bold shadow-sm hover:bg-slate-950 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-purple-600" />
              <span>Cinematography & Speed Ramps</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Footer Row: Status & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-end justify-between pt-4 pb-2"
      >
        {/* Left Side: Availability */}
        <div className="hidden sm:flex flex-col text-left">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Open for collaborations & AI initiatives</span>
          </div>
          <span className="text-[11px] text-slate-600 font-mono">
            {data.personalInfo.email}
          </span>
        </div>

        {/* Right Side: Scroll Down Indicator */}
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          id="hero-scroll-down-btn"
          onClick={() => onNavigate('about')}
          className="shimmer-trigger group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-slate-300 hover:border-slate-900 shadow-sm backdrop-blur-md transition-all ml-auto cursor-pointer"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
            Scroll down
          </span>
          <ArrowDown className="w-4 h-4 text-slate-900 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};
