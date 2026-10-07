import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ShieldCheck, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, isAdmin } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items without "SMARTER AI"
  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'WORKS' },
    { id: 'achievements', label: 'AWARDS' },
    { id: 'future-goals', label: 'TRAJECTORY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-300/80 shadow-md shadow-slate-900/5'
          : 'bg-[#EDEDEB]/90 backdrop-blur-md border-b border-slate-300/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Brand Signature & Active Status Beacon */}
        <button
          id="nav-brand-logo-btn"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-950 uppercase group-hover:text-cyan-700 transition-colors">
              {data.personalInfo.name}
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline-block">
              AI & Digital Creator
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Bar with Smooth Active Indicators */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-white/70 border border-slate-300/80 shadow-sm backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-slate-950 rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Admin / Login & Hire Me CTA) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Admin / Login Portal Button */}
          <button
            id="nav-admin-portal-btn"
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer border ${
              isAdmin
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-sm hover:bg-emerald-900'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
            }`}
            title={isAdmin ? 'Admin Dashboard Active' : 'Admin Login'}
          >
            {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Shield className="w-3.5 h-3.5 text-slate-600" />}
            <span>{isAdmin ? 'ADMIN' : 'LOGIN'}</span>
          </button>

          {/* Hire Me CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            id="nav-quick-contact-btn"
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold font-mono uppercase bg-slate-950 hover:bg-slate-800 text-white shadow-md transition-all duration-200 border border-slate-950 cursor-pointer"
          >
            <span>HIRE ME</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Mobile Actions: Admin Quick Icon & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isAdmin
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                : 'bg-white text-slate-800 border-slate-300'
            }`}
            title="Admin Login"
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <Shield className="w-4 h-4 text-slate-700" />}
          </button>
          
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-slate-300 text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Dropdown Drawer directly below top navigation bar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-slate-300/80 bg-white/98 backdrop-blur-2xl shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-2.5 rounded-xl bg-slate-950 text-white text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>HIRE ME • DIRECT INQUIRY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
