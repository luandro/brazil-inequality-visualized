/**
 * Custom hook for hand-drawn animation configuration
 * Handles reduced motion preferences and provides utilities
 */

import { useReducedMotion } from 'framer-motion';
import { HAND_DRAWN_EASING, getDuration, getStaggerDelay } from '../utils/easing-functions';

export interface UseHandDrawnAnimationOptions {
  baseDelay?: number;
  staggerAmount?: number;
  respectReducedMotion?: boolean;
}

export function useHandDrawnAnimation(options: UseHandDrawnAnimationOptions = {}) {
  const {
    baseDelay = 0,
    staggerAmount = 0.1,
    respectReducedMotion = true,
  } = options;

  const shouldReduceMotion = useReducedMotion() && respectReducedMotion;

  /**
   * Get animation delay with reduced motion check
   */
  const getDelay = (index: number = 0): number => {
    if (shouldReduceMotion) return 0;
    return getStaggerDelay(index, baseDelay, staggerAmount);
  };

  /**
   * Get animation duration with reduced motion check
   */
  const getAnimationDuration = (type: 'fast' | 'medium' | 'slow' = 'medium'): number => {
    return getDuration(type, shouldReduceMotion);
  };

  /**
   * Common animation configuration object
   */
  const animateConfig = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: getAnimationDuration('medium'),
      ease: HAND_DRAWN_EASING.popIn,
    },
  };

  return {
    shouldReduceMotion,
    getDelay,
    getAnimationDuration,
    animateConfig,
    easing: HAND_DRAWN_EASING,
  };
}
