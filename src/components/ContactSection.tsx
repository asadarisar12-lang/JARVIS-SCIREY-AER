import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Copy, ArrowUpRight, ExternalLink, Sparkles, MessageSquare, Check } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard } from './TiltCard';
import {
  sectionStaggerContainer,
  editorialHeadingVariants,
  editorialItemVariants,
} from '../utils/animations';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectGmail = () => {
    const subject = encodeURIComponent(`Project Collaboration with ${data.personalInfo.name}`);
    const body = encodeURIComponent(
      `Hi ${data.personalInfo.name},\n\nI would like to get in touch regarding a project collaboration or inquiry.`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${data.personalInfo.email}&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  const handleMailto = () => {
    const subject = encodeURIComponent(`Project Collaboration with ${data.personalInfo.name}`);
    window.location.href = `mailto:${data.personalInfo.email}?subject=${subject}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#EDEDEB] text-[#121214] relative overflow-hidden border-t border-slate-300/80">
      {/* Background Orbit Accent */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-300/30 pointer-events-none animate-pulse-glow" />

      {/* Main Container with Staggered Fade-In-Up Entrance Animation */}
      <motion.div
        variants={sectionStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Giant Editorial Title Section */}
        <motion.div
          variants={editorialHeadingVariants}
          className="border-b border-slate-300 pb-10 mb-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <h2 id="contact-giant-heading" className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#121214] uppercase select-none">
                CONTACT
              </h2>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-900 bg-white/90 shadow-sm backdrop-blur-md cursor-pointer"
              >
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
              </motion.div>
            </div>

            <p className="max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Direct communication for <strong className="text-slate-950 font-semibold">AI systems development, cinematic reel editing, full-stack prototyping, and creative collaborations</strong>.
            </p>
          </div>
        </motion.div>

        {/* Streamlined Direct Contact Showcase with 3D TiltCard */}
        <motion.div
          variants={editorialItemVariants}
          className="bg-white/90 rounded-3xl p-8 sm:p-12 border border-slate-300 shadow-xl shadow-black/5 relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-cyan-50 text-cyan-900 border border-cyan-300 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>Let's Create Something Extraordinary</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight">
                Get in Touch Directly
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Feel free to reach out directly to {data.personalInfo.name} for technical inquiries, collaborative initiatives, or project commissions.
              </p>
            </div>

            {/* Email Highlight Card with 3D Tilt */}
            <TiltCard
              maxTilt={5}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-300/80 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 uppercase font-bold tracking-wider">
                  Official Email Address
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Direct Inquiries Open
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-base sm:text-lg font-mono font-bold text-slate-950 truncate">
                    {data.personalInfo.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <motion.button
                    id="contact-copy-email-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCopyEmail}
                    className="shimmer-trigger px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-mono font-bold text-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 animate-bounce" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-600" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </TiltCard>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TiltCard
                maxTilt={6}
                scaleHover={1.02}
                onClick={handleDirectGmail}
                className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-between transition-all shadow-md cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-slate-700 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold font-display">Open in Gmail</div>
                    <div className="text-[11px] font-mono text-slate-400">Compose message directly</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors mr-2" />
              </TiltCard>

              <TiltCard
                maxTilt={6}
                scaleHover={1.02}
                onClick={handleMailto}
                className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 flex items-center justify-between transition-all shadow-sm cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-indigo-600 group-hover:bg-slate-200 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold font-display">Default Email App</div>
                    <div className="text-[11px] font-mono text-slate-500">Launch mail client</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors mr-2" />
              </TiltCard>
            </div>

            {/* SLA Note */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Typical response time: within 24 hours</span>
              </div>
              <div className="text-slate-500">
                Location: Pakistan • Available Globally
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
