import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, Film, Cpu, Award, Zap, Code2 } from 'lucide-react';
import { fadeInUpVariants } from '../utils/animations';

export const MarqueeTicker: React.FC = () => {
  const tickerItems = [
    { text: 'AI AGENTS & WORKFLOWS', icon: Bot },
    { text: 'KINETIC SPEED RAMPS', icon: Film },
    { text: 'ICA NJIO SILVER MEDALIST', icon: Award },
    { text: 'FULLSTACK VIBE CODING', icon: Code2 },
    { text: '4K CINEMATOGRAPHY', icon: Sparkles },
    { text: 'AUTONOMOUS LLM APPS', icon: Cpu },
    { text: 'HIGH-RETENTION UGC', icon: Zap },
  ];

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="w-full bg-[#121214] text-white py-3.5 border-y border-slate-800 overflow-hidden relative select-none"
    >
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#121214] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#121214] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8">
        {/* Render 2 sets for seamless loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <Icon className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs tracking-widest font-bold uppercase text-slate-200 hover:text-cyan-300 transition-colors">
                {item.text}
              </span>
              <span className="text-slate-600 font-mono text-xs ml-4">•</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
