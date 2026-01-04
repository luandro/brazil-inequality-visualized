/**
 * Custom easing functions for hand-drawn animation feel
 * All values are [number, number, number, number] (cubic-bezier)
 */

export const HAND_DRAWN_EASING = {
  /**
   * Bouncy, playful pop-in
   * Use: Elements appearing with energy
   * Duration: 0.4-0.6s
   */
  popIn: [0.34, 1.56, 0.64, 1] as const,

  /**
   * Smooth, natural drawing motion
   * Use: Lines being drawn, paths revealing
   * Duration: 1.0-2.0s
   */
  smoothDraw: [0.25, 0.46, 0.45, 0.94] as const,

  /**
   * Gentle settling animation
   * Use: Elements finding their final position
   * Duration: 0.5-0.8s
   */
  settle: [0.4, 0.0, 0.2, 1] as const,

  /**
   * Elastic snap-back effect
   * Use: Objects with bounce/spring physics
   * Duration: 0.6-0.8s
   */
  elastic: [0.68, -0.6, 0.32, 1.6] as const,

  /**
   * Subtle wobble for hand-drawn feel
   * Use: Adding personality to static elements
   * Duration: 0.3-0.5s
   */
  wobble: [0.36, 0.07, 0.19, 0.97] as const,

  /**
   * Classic ease-in-out
   * Use: General purpose smooth transitions
   * Duration: Variable
   */
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
};

/**
 * Get duration based on animation type
 */
export const getDuration = (
  type: 'fast' | 'medium' | 'slow',
  shouldReduceMotion: boolean
): number => {
  if (shouldReduceMotion) return 0;

  const durations = {
    fast: 0.3,    // Quick pops, fades
    medium: 0.6,  // Standard animations
    slow: 1.5,    // Drawing long paths
  };

  return durations[type];
};

/**
 * Calculate staggered delay for multiple elements
 */
export const getStaggerDelay = (
  index: number,
  baseDelay: number = 0,
  staggerAmount: number = 0.1
): number => {
  return baseDelay + (index * staggerAmount);
};
