/**
 * Reusable Framer Motion variants for hand-drawn animations
 */

import { Variants } from 'framer-motion';
import { HAND_DRAWN_EASING } from './easing-functions';

/**
 * Path drawing animation - like sketching with a pen
 * @param duration - Animation duration in seconds
 * @param delay - Delay before starting
 */
export const drawInVariants = (
  duration: number = 1.5,
  delay: number = 0
): Variants => ({
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: HAND_DRAWN_EASING.smoothDraw,
    },
  },
});

/**
 * Pop-in animation with bounce
 * @param duration - Animation duration in seconds
 * @param delay - Delay before starting
 */
export const popInVariants = (
  duration: number = 0.5,
  delay: number = 0
): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: HAND_DRAWN_EASING.popIn,
    },
  },
});

/**
 * Slide-up with fade
 * @param duration - Animation duration in seconds
 * @param delay - Delay before starting
 * @param distance - Distance to slide (default: 30px)
 */
export const slideUpVariants = (
  duration: number = 0.6,
  delay: number = 0,
  distance: number = 30
): Variants => ({
  hidden: {
    y: distance,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: HAND_DRAWN_EASING.settle,
    },
  },
});

/**
 * Wobble/rotate for hand-drawn personality
 * @param duration - Animation duration in seconds
 * @param delay - Delay before starting
 */
export const wobbleVariants = (
  duration: number = 0.4,
  delay: number = 0
): Variants => ({
  hidden: {
    rotate: -2,
    scale: 0.95,
  },
  visible: {
    rotate: [0, -1, 1, -0.5, 0],
    scale: 1,
    transition: {
      duration,
      delay,
      ease: HAND_DRAWN_EASING.wobble,
    },
  },
});

/**
 * Scale Y animation (for growing upward)
 * @param duration - Animation duration in seconds
 * @param delay - Delay before starting
 */
export const scaleUpVariants = (
  duration: number = 0.6,
  delay: number = 0
): Variants => ({
  hidden: {
    scaleY: 0,
    opacity: 0,
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: HAND_DRAWN_EASING.popIn,
    },
  },
});

/**
 * Fade-in only (subtle)
 * @param duration - Animation duration in seconds
 * @param delay - Delay before starting
 */
export const fadeInVariants = (
  duration: number = 0.5,
  delay: number = 0
): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: HAND_DRAWN_EASING.easeInOut,
    },
  },
});
