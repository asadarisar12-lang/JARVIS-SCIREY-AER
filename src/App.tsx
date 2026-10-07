import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Shield, ShieldCheck } from 'lucide-react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { FutureGoalsSection } from './components/FutureGoalsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AmbientBackground } from './components/AmbientBackground';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const { isAdmin } = usePortfolio();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'skills',
      'projects',
      'achievements',
      'future-goals',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#EDEDEB] text-[#121214] flex flex-col selection:bg-slate-900 selection:text-white antialiased relative">
      {/* Dynamic Cursor Spotlight & Ambient Floating Lights */}
      <AmbientBackground />

      {/* Top Global Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-slate-950 origin-left z-[60] pointer-events-none"
      />

      {/* Subtle global background grid */}
      <div className="fixed inset-0 bg-editorial-grid pointer-events-none opacity-60 -z-10" />

      {/* Top Floating Liquid Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main className="flex-grow">
        <Hero onNavigate={scrollToSection} />
        <MarqueeTicker />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onNavigate={scrollToSection} />
        <AchievementsSection />
        <FutureGoalsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
      />

      {/* Floating Login / Admin Trigger Button (Bottom-Left) */}
      <motion.button
        id="floating-admin-trigger-btn"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAdminPanelOpen(true)}
        className={`fixed bottom-6 left-6 z-40 px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 font-mono text-xs font-bold transition-all cursor-pointer backdrop-blur-md border ${
          isAdmin
            ? 'bg-slate-950 text-emerald-300 border-emerald-500/60 shadow-emerald-950/20'
            : 'bg-white/95 text-slate-800 border-slate-300 shadow-black/10 hover:bg-slate-950 hover:text-white'
        }`}
        title={isAdmin ? 'Admin Active Portal' : 'Login Portal'}
      >
        {isAdmin ? (
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        ) : (
          <Shield className="w-4 h-4 text-indigo-600" />
        )}
        <span className="hidden sm:inline">{isAdmin ? 'ADMIN ACTIVE' : 'LOGIN'}</span>
      </motion.button>

      {/* Admin Panel Modal / Drawer */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
