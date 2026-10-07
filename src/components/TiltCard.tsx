import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number;
  scaleHover?: number;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  id,
  maxTilt = 8,
  scaleHover = 1.015,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 300, damping: 25 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      id={id}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: scaleHover }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {/* Interactive Glare Sheen Overlay */}
      {isHovered && (
        <motion.div
          style={{
            left: glareX,
            top: glareY,
            transform: 'translate(-50%, -50%)',
          }}
          className="pointer-events-none absolute w-96 h-96 rounded-full bg-radial from-white/20 via-white/5 to-transparent blur-2xl z-30 opacity-70 transition-opacity duration-300"
        />
      )}
    </motion.div>
  );
};
