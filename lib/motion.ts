import type { Variants, Transition } from "framer-motion";

// Spring physics presets - the soul of premium motion
export const spring = {
  // Gentle: for large elements, page transitions
  gentle: { type: "spring", stiffness: 120, damping: 14 } as const,
  // Snappy: for buttons, cards, most interactions
  snappy: { type: "spring", stiffness: 300, damping: 24 } as const,
  // Bouncy: for celebrations, badges, emphasis
  bouncy: { type: "spring", stiffness: 400, damping: 10 } as const,
};

// Duration-based transitions (for non-spring cases)
export const duration = {
  fast: { duration: 0.15 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
} as const;

// ============================================
// VARIANTS - Reusable animation states
// ============================================

// Fade up - most common entrance
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

// Fade in place
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Scale in - for modals, badges, emphasis
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// Scale up from zero - for checkmarks, success states
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

// Slide from right - for page transitions
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

// Slide from left
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
};

// ============================================
// STAGGER - Container variants for lists
// ============================================

export const staggerContainer = (staggerDelay = 0.05): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

// ============================================
// INTERACTION PROPS - Spread onto motion elements
// ============================================

// Standard button/card press feedback
export const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: spring.snappy,
};

// Card with lift effect
export const liftable = {
  whileHover: { y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.10)" },
  whileTap: { scale: 0.98 },
  transition: spring.snappy,
};

// Subtle press only (no hover)
export const tappable = {
  whileTap: { scale: 0.97 },
  transition: spring.snappy,
};

// ============================================
// HELPER - Reduced motion support
// ============================================

export const reduceMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.01 },
};
