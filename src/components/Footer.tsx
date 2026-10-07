import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Mail, Shield, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fadeInUpVariants } from '../utils/animations';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { data, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="py-14 relative border-t border-slate-300 bg-[#EDEDEB] text-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-300">
          
          {/* Brand & Identity */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 flex items-center justify-center font-display font-black text-white text-sm shadow-md">
              AA
            </div>
            <div>
              <div className="text-base font-bold text-slate-950 font-display uppercase tracking-tight">{data.personalInfo.name}</div>
              <div className="text-[11px] text-slate-500 font-mono">{data.personalInfo.role}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono font-bold tracking-wider">
            {[
              { id: 'hero', label: 'HOME' },
              { id: 'about', label: 'ABOUT' },
              { id: 'skills', label: 'SKILLS' },
              { id: 'projects', label: 'WORKS' },
              { id: 'smarter-ai', label: 'SMARTER AI' },
              { id: 'achievements', label: 'AWARDS' },
              { id: 'future-goals', label: 'TRAJECTORY' },
              { id: 'contact', label: 'CONTACT' },
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Back to top & Email & Admin */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                isAdmin
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
              }`}
              title={isAdmin ? 'Admin Management Portal' : 'Login Portal'}
            >
              {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Shield className="w-3.5 h-3.5 text-slate-600" />}
              <span>{isAdmin ? 'Admin Mode' : 'Login'}</span>
            </button>

            <a
              href={`mailto:${data.personalInfo.email}`}
              className="text-xs font-mono text-slate-900 hover:underline flex items-center gap-1.5 font-bold"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-700" />
              <span className="hidden sm:inline">{data.personalInfo.email}</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              title="Back to top"
              className="p-2.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>

        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Asad Ali. All rights reserved.</span>
          <span>Admin Portal Enabled • Authorized: {data.personalInfo.email}</span>
        </div>
      </div>
    </motion.footer>
  );
};
