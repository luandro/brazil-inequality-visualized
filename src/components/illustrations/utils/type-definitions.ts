/**
 * TypeScript types for hand-drawn illustration components
 */

import { MotionProps } from 'framer-motion';

/**
 * Common props for illustration components
 */
export interface IllustrationProps {
  className?: string;
  ariaLabel?: string;
  role?: string;
}

/**
 * Props for sketchy path animation
 */
export interface SketchyPathProps extends Omit<MotionProps, 'variants'> {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  filter?: string;
}

/**
 * Props for sketchy shape (group of elements)
 */
export interface SketchyShapeProps extends Omit<MotionProps, 'variants'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  variant?: 'popIn' | 'slideUp' | 'wobble' | 'fadeIn';
}

/**
 * Props for animated circle
 */
export interface AnimatedCircleProps {
  cx: number;
  cy: number;
  r: number;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Props for animated rectangle
 */
export interface AnimatedRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  duration?: number;
  rx?: number;
  className?: string;
}

/**
 * Region data for geographic illustrations
 */
export interface RegionData {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: number;
  color: string;
}

/**
 * Person/circle data for population illustrations
 */
export interface PersonData {
  cx: number;
  cy: number;
  size: number;
  color: string;
  delay: number;
}
