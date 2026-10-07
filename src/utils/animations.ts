import { Variants } from 'motion/react';

/**
 * Editorial Spring Easing Curve:
 * Fast acceleration with smooth, elegant deceleration for a luxury editorial feel.
 */
export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Standard Fade-In-Up Entrance Animation Variant
 * Moves element upward from y: 45 to y: 0 while fading in from opacity: 0 to 1.
 */
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EDITORIAL_EASE,
    },
  },
};

/**
 * Primary container variant that triggers staggered entrance
 * for all child elements when a section scrolls into view.
 */
export const sectionStaggerContainer: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EDITORIAL_EASE,
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

/**
 * Sub-container for grids or lists of cards to create
 * a cascading staggered appearance.
 */
export const gridStaggerContainer: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EDITORIAL_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/**
 * Editorial giant header entrance variant
 */
export const editorialHeadingVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EDITORIAL_EASE,
    },
  },
};

/**
 * Editorial section block / bento card entrance variant
 */
export const editorialItemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EDITORIAL_EASE,
    },
  },
};

/**
 * Individual card item variant for staggered grids
 */
export const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: EDITORIAL_EASE,
    },
  },
};

/**
 * Subtle scale-in variant for badges or interactive callouts
 */
export const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EDITORIAL_EASE,
    },
  },
};
