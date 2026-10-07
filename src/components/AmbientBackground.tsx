import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const AmbientBackground: React.FC = () => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Interactive Cursor Spotlight Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-radial from-cyan-500/8 via-indigo-500/4 to-transparent blur-3xl opacity-80"
      />

      {/* Floating Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-cyan-400/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] rounded-full bg-purple-500/5 blur-[120px] animate-float-reverse" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-emerald-400/4 blur-[90px] animate-pulse-glow" />
    </div>
  );
};
