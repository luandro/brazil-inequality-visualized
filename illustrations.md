# 🎨 Hand-Drawn SVG Animation Style - Implementation Guide

**Comprehensive guide for implementing beautiful hand-drawn animations across all Brazil Inequality Visualized illustrations**

---

## 📑 Table of Contents

1. [Overview](#overview)
2. [Quick Start (TL;DR)](#quick-start-tldr)
3. [Design Philosophy](#design-philosophy)
4. [Hand-Drawn Toolkit](#hand-drawn-toolkit)
5. [Research-Backed Notes (SVG + Motion Docs)](#research-backed-notes-svg--motion-docs)
6. [Technical Foundation](#technical-foundation)
7. [Setup & Installation](#setup--installation)
8. [Animation Patterns](#animation-patterns)
9. [Step-by-Step Implementation](#step-by-step-implementation)
10. [Testing & Validation](#testing--validation)
11. [Troubleshooting](#troubleshooting)
12. [Best Practices](#best-practices)

---

## 🎯 Overview

### **Goal**
Transform all 8 SVG illustrations from static graphics to **beautiful, hand-drawn style animations** that feel organic, playful, and emotionally engaging while maintaining data accuracy.

### **What You'll Achieve**
- ✨ Sketchy, hand-drawn aesthetic across all illustrations
- 🎬 Smooth, natural-feeling animations (60fps)
- 🎯 Consistent animation language throughout the app
- ♿ Accessible (respects motion preferences)
- 📱 Performance-optimized (GPU-accelerated)
- 🧪 Easy to test and maintain

### **Illustrations to Enhance**
1. ✅ **FragmentedGround** - Already updated with accurate data
2. **InequalitySlope** - People on inequality curve
3. **PovertyWaterline** - Water/submersion metaphor
4. **WealthStack** - Stacked coins showing wealth concentration
5. **UnevenDoors** - Doors of different heights
6. **SafetyNet** - Social safety net catching falling people
7. **WorkforceGears** - Labor market gears
8. **SimulatorDials** - Interactive simulator controls

---

## ⚡ Quick Start (TL;DR)

Use this if you just want to upgrade an illustration fast:

1. **Stroke baseline**: `strokeWidth=2-3`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `vectorEffect="non-scaling-stroke"`.
2. **Draw first, fill second**: outlines reveal with `pathLength: 0 -> 1`, fills fade/pop in after.
3. **Sketch feel**: duplicate a key path with lower opacity and tiny offset or use a light `SketchyFilter` on a group.
4. **Use shared variants**: `drawInVariants`, `popInVariants`, `slideUpVariants`, `wobbleVariants`.
5. **Stagger intentionally**: `getDelay(index)` with `staggerAmount = 0.06-0.12`.
6. **Respect reduced motion**: zero duration + disable filters when `useReducedMotion()` is true.

---

## 🎭 Design Philosophy

### **What Makes It "Hand-Drawn"?**

**Visual Characteristics:**
```
✅ Organic Imperfections    - Slight irregularities, not perfectly straight
✅ Variable Stroke Width    - Thicker/thinner lines like real drawing
✅ Flowing Motion          - Natural ease, not robotic
✅ Playful Personality     - Bouncy, energetic, alive
✅ Sketchy Lines           - Multiple strokes, layered
✅ Human Touch             - Not cold, mechanical vectors
```

**Animation Principles:**
```
1. Progressive Reveal     - Draw elements in sequence
2. Bouncy Easing          - Elastic, overshooting motion
3. Staggered Timing       - Elements don't all move at once
4. Natural Delays         - Timing feels intentional, not random
5. Secondary Motion       - Subtle movement after primary animation
```

### **Our Animation Language**

```typescript
// The "Hand-Drawn Feel" comes from these key elements:

1. DRAWING MOTION
   - pathLength: 0 → 1 (lines draw themselves)
   - Like someone sketching with a pen

2. POPPING IN
   - scale: 0 → 1 with bounce
   - Like stamping a sticker

3. SLIDING UP
   - y: 30 → 0 with easing
   - Like placing elements on a table

4. WOBBLE/SETTLE
   - rotate: -2 → 0 with slight vibration
   - Like objects finding their balance
```

---

## 🧰 Hand-Drawn Toolkit

### **1) Stroke Styling (Non-Negotiables)**
- `strokeLinecap="round"` and `strokeLinejoin="round"` on every visible line.
- Keep **2-3 stroke widths** max per illustration (e.g., 1.5, 2.5, 3.5).
- Add `vectorEffect="non-scaling-stroke"` so strokes don't thicken when SVG scales.
- Prefer slightly transparent fills (`/70`) so strokes remain dominant.
- Optional: subtle dash (`strokeDasharray="1.5 2.5"`) for pencil texture.

```tsx
<motion.path
  d="M 10 80 Q 60 40, 110 80"
  stroke="currentColor"
  strokeWidth="2.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  vectorEffect="non-scaling-stroke"
  fill="none"
/>
```

### **2) Layered Strokes (Sketch Look)**
Draw the same path twice for a pen-stroke + ghost-stroke effect.

```tsx
<motion.path {...common} className="text-primary" strokeWidth="2.5" />
<motion.path
  {...common}
  className="text-primary/40"
  strokeWidth="3"
  transform="translate(0.6, -0.4)"
/>
```

### **3) Texture + Imperfections (Use Lightly)**
- Apply `SketchyFilter` to **groups**, not every path.
- Keep displacement `scale` low (`1-2`) and turbulence `baseFrequency` low (`0.008-0.02`).
- Disable heavy filters when `useReducedMotion()` is true or on low-end devices.

### **4) Reveals That Feel Drawn**
- **Outline first** (`pathLength` draw).
- **Fill later** (fade/pop with small delay).
- For large fills: reveal via **mask/clipPath** instead of scaling.

### **5) Transform Origins for SVG**
SVG transforms default to the canvas; always set these for scale/rotate animations:

```tsx
<motion.g
  transformBox="fill-box"
  transformOrigin="center"
  initial={{ scale: 0.8 }}
  whileInView={{ scale: 1 }}
/>
```

### **6) Micro-Motion**
Keep subtle "alive" motion within **1-3px** and **2-4s** duration.

---

## 📚 Research-Backed Notes (SVG + Motion Docs)

These are the most reliable, spec-backed techniques for "hand-drawn" SVGs:

### **Line Drawing (Normalize + Animate)**
- SVG `pathLength` normalizes distance calculations and affects dash math, so you can treat a path as `0 -> 1`.
- Motion supports `pathLength`, `pathSpacing`, and `pathOffset` as 0-1 progress values for line drawing.

```tsx
<motion.path
  d={d}
  pathLength={1}
  strokeDasharray="1"
  strokeDashoffset="1"
  initial={{ pathLength: 0, pathOffset: 1 }}
  whileInView={{ pathLength: 1, pathOffset: 0 }}
/>
```

### **Dash Patterns (Pencil Texture + Motion)**
- `stroke-dasharray` defines dash and gap patterns.
- `stroke-dashoffset` shifts the dash pattern along the path and is animatable.

### **Keep Strokes Consistent**
- `vector-effect="non-scaling-stroke"` keeps stroke width stable under transforms and zoom.

### **Sketch Filters (Noise + Displacement)**
- `feTurbulence` generates noise textures (use for pencil grain).
- `feDisplacementMap` displaces pixels using a noise input (use for line wobble).
- More `numOctaves` makes noise more detailed but costs more computation, so keep it low.

### **Reduced Motion**
- `prefers-reduced-motion` is the standard way to detect user preference for less motion.
- Motion provides `useReducedMotion` and `MotionConfig reducedMotion="user"` to follow that preference.

### **SVG Transform Origins (Motion)**
- Motion makes SVG transforms behave like CSS transforms and lets you override with `transformBox`.

---

## 🔧 Technical Foundation

### **Technology Stack**

```typescript
// Core Libraries (Already Installed)
├── framer-motion        // Animation engine
├── react               // UI framework
└── @/components/       // Existing components

// File Structure
src/components/illustrations/
├── utils/                          // NEW: Shared utilities
│   ├── animation-variants.ts       // Reusable animation patterns
│   ├── easing-functions.ts         // Custom easing curves
│   ├── hand-drawn-filters.tsx      // SVG effects
│   └── type-definitions.ts         // TypeScript types
├── hooks/                          // NEW: Custom hooks
│   └── use-hand-drawn-animation.ts // Animation helper
├── InequalitySlope.tsx
├── PovertyWaterline.tsx
├── WealthStack.tsx
├── UnevenDoors.tsx
├── SafetyNet.tsx
├── WorkforceGears.tsx
├── SimulatorDials.tsx
└── FragmentedGround.tsx            // ✅ Already updated
```

### **SVG Authoring Hygiene**

- Keep `viewBox` stable and **avoid scaling strokes** by using `vectorEffect="non-scaling-stroke"`.
- Remove unused `<defs>` and `<style>` blocks from exported SVGs.
- Prefer **groups** for related elements so filters/animations apply once.
- Minimize path points (simplify in editor) to keep motion smooth.
- Keep ids stable (`id="waterline"`) so animations are easy to target.

---

## 🚀 Setup & Installation

### **Step 1: Create Utility Files**

#### **1.1 Create Directory Structure**
```bash
# From project root
cd src/components/illustrations

# Create utils directory
mkdir -p utils
mkdir -p hooks
```

#### **1.2 Create Easing Functions**

Create file: `src/components/illustrations/utils/easing-functions.ts`

```typescript
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
```

#### **1.3 Create Animation Variants**

Create file: `src/components/illustrations/utils/animation-variants.ts`

```typescript
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
```

#### **1.4 Create SVG Filters**

Create file: `src/components/illustrations/utils/hand-drawn-filters.tsx`

```typescript
/**
 * SVG filters for hand-drawn, sketchy effects
 * Use these to add texture and imperfections to illustrations
 */

import { ReactNode } from 'react';

/**
 * Wobbly line effect - makes straight lines look hand-drawn
 */
export const SketchyFilter = (): ReactNode => (
  <filter id="sketchy-filter" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.01"
      numOctaves="3"
      result="noise"
      seed={1}
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="2"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
);

/**
 * Pencil texture effect - adds grainy texture
 */
export const PencilFilter = (): ReactNode => (
  <filter id="pencil-filter" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence
      type="turbulence"
      baseFrequency="0.05"
      numOctaves="2"
      result="noise"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="1"
    />
  </filter>
);

/**
 * Ink bleed effect - subtle spreading like ink on paper
 */
export const InkBleedFilter = (): ReactNode => (
  <filter id="ink-bleed-filter" x="-20%" y="-20%" width="140%" height="140%">
    <feMorphology
      operator="dilate"
      radius="0.5"
      in="SourceAlpha"
      result="thicken"
    />
    <feGaussianBlur
      in="thicken"
      stdDeviation="1"
      result="blurred"
    />
    <feFlood
      floodColor="currentColor"
      floodOpacity="0.3"
    />
    <feComposite
      in2="blurred"
      operator="in"
    />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

/**
 * Rough paper texture background
 */
export const PaperTextureFilter = (): ReactNode => (
  <filter id="paper-texture-filter">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.04"
      numOctaves="5"
      result="noise"
    />
    <feDiffuseLighting
      in="noise"
      lightingColor="#fff"
      surfaceScale="2"
      result="light"
    >
      <feDistantLight azimuth="45" elevation="60" />
    </feDiffuseLighting>
    <feComposite
      in="SourceGraphic"
      in2="light"
      operator="arithmetic"
      k1="1"
      k2="0"
      k3="0"
      k4="0"
    />
  </filter>
);

/**
 * Collection of all filters to include in SVG defs
 */
export const HandDrawnFilters = (): ReactNode => (
  <defs>
    <SketchyFilter />
    <PencilFilter />
    <InkBleedFilter />
    <PaperTextureFilter />
  </defs>
);
```

**Filter Usage Tips:**
- Apply to **groups**, not every path.
- Keep `feTurbulence` low and avoid stacking multiple filters on the same element.
- Disable or simplify filters when `useReducedMotion()` is true.

#### **1.5 Create Custom Hook**

Create file: `src/components/illustrations/hooks/use-hand-drawn-animation.ts`

```typescript
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
```

#### **1.6 Create Type Definitions**

Create file: `src/components/illustrations/utils/type-definitions.ts`

```typescript
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
```

---

## 🎨 Animation Patterns

### **Pattern 0: Double Stroke (Sketchy Line)**

**When to Use:** Primary outlines that need a hand-drawn feel

```typescript
import { motion } from 'framer-motion';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function ExampleDoubleStroke() {
  const { getDelay, shouldReduceMotion } = useHandDrawnAnimation();

  const common = {
    d: "M 12 90 Q 60 40, 120 90",
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    vectorEffect: "non-scaling-stroke" as const,
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: shouldReduceMotion ? 0 : 1.4,
      delay: getDelay(0),
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  };

  return (
    <g>
      <motion.path {...common} strokeWidth="2.5" />
      <motion.path {...common} strokeWidth="3" opacity={0.35} transform="translate(0.6, -0.4)" />
    </g>
  );
}
```

**Key Parameters:**
- Two strokes with small offset
- Second stroke is lighter and slightly thicker

---

### **Pattern 1: Drawing Paths (Sketch Effect)**

**When to Use:** Lines, curves, outlines, borders

```typescript
import { motion } from 'framer-motion';
import { drawInVariants } from './utils/animation-variants';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function ExamplePath() {
  const { getDelay, shouldReduceMotion } = useHandDrawnAnimation();

  return (
    <motion.path
      d="M 10 100 Q 50 80, 90 60 T 170 20"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 1.5,
        delay: getDelay(0),
        ease: [0.25, 0.46, 0.45, 0.94], // smoothDraw
      }}
    />
  );
}
```

**Key Parameters:**
- `pathLength: 0 → 1` - Drawing progress
- `duration: 1.5-2.0s` - Slower for longer paths
- `ease: [0.25, 0.46, 0.45, 0.94]` - Natural drawing motion

---

### **Pattern 2: Pop-In (Stamp Effect)**

**When to Use:** Circles, dots, icons, small shapes

```typescript
import { motion } from 'framer-motion';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function ExamplePopIn() {
  const { getDelay, shouldReduceMotion } = useHandDrawnAnimation();

  return (
    <motion.circle
      cx={100}
      cy={50}
      r={10}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: getDelay(0),
        ease: [0.34, 1.56, 0.64, 1], // popIn (bouncy)
      }}
    />
  );
}
```

**Key Parameters:**
- `scale: 0 → 1` - Grow from nothing
- `duration: 0.4-0.6s` - Quick pop
- `ease: [0.34, 1.56, 0.64, 1]` - Bouncy overshoot

---

### **Pattern 3: Slide Up (Placement Effect)**

**When to Use:** Columns, bars, stacked elements

```typescript
import { motion } from 'framer-motion';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function ExampleSlideUp() {
  const { getDelay, shouldReduceMotion } = useHandDrawnAnimation();

  return (
    <motion.rect
      x={80}
      y={50}
      width={40}
      height={60}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 50, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: getDelay(0),
        ease: [0.4, 0.0, 0.2, 1], // settle
      }}
    />
  );
}
```

**Key Parameters:**
- `y: 30 → 50` - Slide upward 30px
- `duration: 0.5-0.8s` - Moderate speed
- `ease: [0.4, 0.0, 0.2, 1]` - Gentle deceleration

---

### **Pattern 4: Staggered Reveal (Sequential)**

**When to Use:** Multiple similar elements, arrays

```typescript
import { motion } from 'framer-motion';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function ExampleStaggered() {
  const { getDelay, shouldReduceMotion } = useHandDrawnAnimation();

  const items = [
    { x: 20, color: 'red' },
    { x: 60, color: 'blue' },
    { x: 100, color: 'green' },
  ];

  return (
    <>
      {items.map((item, index) => (
        <motion.circle
          key={index}
          cx={item.x}
          cy={50}
          r={8}
          fill={item.color}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: getDelay(index), // 0, 0.1, 0.2
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      ))}
    </>
  );
}
```

**Key Parameters:**
- `delay: getDelay(index)` - 0, 0.1, 0.2, 0.3...
- `staggerAmount: 0.1` - 100ms between each
- Sequential reveal creates storytelling

---

### **Pattern 5: Scale Y (Growing Up)**

**When to Use:** Bars, columns, vertical growth

```typescript
import { motion } from 'framer-motion';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function ExampleScaleY() {
  const { getDelay, shouldReduceMotion } = useHandDrawnAnimation();

  return (
    <motion.rect
      x={80}
      y={30}
      width={40}
      height={70}
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transformBox="fill-box"
      transformOrigin="bottom"
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: getDelay(0),
        ease: [0.34, 1.56, 0.64, 1],
      }}
    />
  );
}
```

**Key Parameters:**
- `scaleY: 0 → 1` - Grow from bottom
- `transformOrigin: "bottom"` - Keeps growth anchored
- `duration: 0.6s` - Moderate growth

---

### **Pattern 6: Continuous Motion (Alive)**

**When to Use:** Floating, breathing, ambient movement

```typescript
import { motion } from 'framer-motion';

export function ExampleContinuous() {
  return (
    <motion.circle
      cx={100}
      cy={50}
      r={10}
      animate={{
        y: [50, 48, 50], // Subtle float
        scale: [1, 1.02, 1], // Gentle pulse
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
```

**Key Parameters:**
- `animate` - Continuous animation loop
- `repeat: Infinity` - Never stops
- `duration: 3-5s` - Slow, subtle movement

---

### **Pattern 7: Mask/Clip Reveal (Large Fills)**

**When to Use:** Large filled shapes that shouldn't scale

```typescript
export function ExampleMaskReveal() {
  return (
    <svg viewBox="0 0 200 120">
      <defs>
        <clipPath id="reveal">
          <motion.rect
            x="0"
            y="0"
            width="200"
            height="120"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transformOrigin="bottom"
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          />
        </clipPath>
      </defs>
      <g clipPath="url(#reveal)">
        <path d="M 0 80 L 200 80 L 200 120 L 0 120 Z" fill="currentColor" />
      </g>
    </svg>
  );
}
```

**Key Parameters:**
- Reveal with `clipPath` for clean edges
- Avoid scaling the actual filled shape

---

## 📐 Step-by-Step Implementation

### **Phase 1: Foundation (Day 1)**

#### **Step 1.1: Create All Utility Files**

```bash
# Navigate to illustrations directory
cd src/components/illustrations

# Create directories
mkdir -p utils hooks

# Create files
touch utils/easing-functions.ts
touch utils/animation-variants.ts
touch utils/hand-drawn-filters.tsx
touch hooks/use-hand-drawn-animation.ts
touch utils/type-definitions.ts
```

#### **Step 1.2: Copy Code Into Files**

Copy the code from sections above into the corresponding files:
1. `easing-functions.ts` - Copy from [Section: Easing Functions](#13-create-easing-functions)
2. `animation-variants.ts` - Copy from [Section: Animation Variants](#13-create-animation-variants)
3. `hand-drawn-filters.tsx` - Copy from [Section: SVG Filters](#14-create-svg-filters)
4. `use-hand-drawn-animation.ts` - Copy from [Section: Custom Hook](#15-create-custom-hook)
5. `type-definitions.ts` - Copy from [Section: Type Definitions](#16-create-type-definitions)

#### **Step 1.3: Verify Setup**

```bash
# From project root
npm run build

# Should succeed with no errors
# If there are TypeScript errors, check imports
```

---

### **Phase 2: Enhance Illustrations (Days 2-4)**

### **Illustration 1: InequalitySlope**

**Current State Analysis:**
- ✅ Has animated paths (slope lines)
- ✅ Has animated people dots
- ⚠️ Needs: Draw-in animation for slope
- ⚠️ Needs: Pop-in for dots
- ⚠️ Needs: Floating motion for dots

**Enhancement Steps:**

#### **Step 2.1: Open File**
```bash
# Open in your editor
src/components/illustrations/InequalitySlope.tsx
```

#### **Step 2.2: Add Imports**
```typescript
// Add to top of file
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';
import { drawInVariants, popInVariants } from './utils/animation-variants';
```

#### **Step 2.3: Update Component**
```typescript
export function InequalitySlope() {
  const shouldReduceMotion = useReducedMotion();
  const { getDelay, shouldReduceMotion: reduceMotion } = useHandDrawnAnimation({
    baseDelay: 0.3,
    staggerAmount: 0.15,
  });

  // ... existing people array ...

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Inequality visualization - population distribution across income levels"
      >
        {/* ... existing defs ... */}

        {/* ENHANCED: Main slope line - draw animation */}
        <motion.path
          d="M 10 105 Q 50 92, 90 70 Q 130 48, 170 18 Q 180 13, 190 10"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-foreground/20"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 2,
            delay: getDelay(0),
            ease: [0.25, 0.46, 0.45, 0.94], // smoothDraw
          }}
        />

        {/* ENHANCED: Accent line - draw with delay */}
        <motion.path
          d="M 10 105 Q 50 92, 90 70 Q 130 48, 170 18 Q 180 13, 190 10"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          className="text-primary"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, strokeDasharray: "0 100" }}
          whileInView={{
            pathLength: 1,
            opacity: 0.6,
            strokeDasharray: "6 6"
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 2.5,
            delay: getDelay(1),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />

        {/* ENHANCED: People dots - pop in with stagger */}
        {people.map((person, i) => (
          <g key={`person-${person.cx}-${person.cy}`}>
            {/* Pop-in animation */}
            <motion.circle
              cx={person.cx}
              cy={person.cy}
              r={person.size}
              className={getColorClass(person.color)}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: getDelay(i + 2), // Start after slope
                ease: [0.34, 1.56, 0.64, 1], // popIn
              }}
            />

            {/* NEW: Subtle floating motion */}
            {!reduceMotion && person.color !== 'accent' && (
              <motion.circle
                cx={person.cx}
                cy={person.cy}
                r={person.size}
                className={getColorClass(person.color)}
                animate={{
                  cy: [person.cy, person.cy - 2, person.cy],
                }}
                transition={{
                  duration: 4 + Math.random() * 2, // Randomize
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            )}
          </g>
        ))}

        {/* ... rest of SVG unchanged ... */}
      </svg>
    </div>
  );
}
```

#### **Step 2.4: Test**
```bash
npm run dev
# Navigate to Inequality section
# Verify animations play smoothly
```

---

### **Illustration 2: PovertyWaterline**

**Enhancement Plan:**
- ✅ Waves draw in
- ✅ Water ripples expand
- ✅ People fall with acceleration
- ✅ Bubbles rise up

**Implementation:**

```typescript
export function PovertyWaterline() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const { getDelay, shouldReduceMotion: reduceMotion } = useHandDrawnAnimation({
    baseDelay: 0.2,
    staggerAmount: 0.1,
  });

  // ... existing strugglingPeople array ...

  // NEW: Bubbles rising
  const bubbles = [
    { cx: 40, cy: 100, size: 2, delay: 2.5 },
    { cx: 85, cy: 105, size: 1.5, delay: 2.7 },
    { cx: 130, cy: 98, size: 2.5, delay: 2.9 },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={t('poverty.povertyLines.title')}
      >
        {/* ... existing defs ... */}

        {/* ENHANCED: Water layers - draw in */}
        <motion.path
          d="M 0 70 Q 25 65, 50 70 T 100 70 T 150 70 T 200 70 L 200 130 L 0 130 Z"
          fill="url(#water-gradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: getDelay(0),
          }}
        />

        {/* ENHANCED: Ripples - expanding circles */}
        {[80, 95, 110].map((y, i) => (
          <motion.path
            key={`ripple-${y}`}
            d={`M 0 ${y} Q 30 ${y - 1}, 60 ${y} T 120 ${y} T 200 ${y}`}
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-destructive/15"
            strokeDasharray="4,4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: getDelay(i + 1),
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}

        {/* ENHANCED: Poverty line - draw animation */}
        <motion.path
          d="M 0 40 Q 25 36, 50 40 T 100 40 T 150 40 T 200 40"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-secondary"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 1.5,
            delay: getDelay(4),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />

        {/* ENHANCED: People falling - with acceleration */}
        {strugglingPeople.map((person, i) => (
          <g key={`person-${person.cx}-${person.cy}`}>
            {/* Motion trail */}
            <motion.path
              d={`M ${person.cx} ${person.cy - 15} L ${person.cx} ${person.cy + person.sink}`}
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent/20"
              strokeDasharray="2,3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: getDelay(5 + i),
              }}
            />

            {/* Falling person */}
            <motion.circle
              cx={person.cx}
              cy={person.cy}
              r={person.size}
              className={person.cy > 75 ? 'fill-destructive' : 'fill-secondary/70'}
              initial={{ cy: person.cy - 15, opacity: 0 }}
              whileInView={{ cy: person.cy + person.sink, opacity: 0.9 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: reduceMotion ? 0 : 1.5,
                delay: getDelay(5 + i),
                ease: [0.25, 0.46, 0.45, 0.94], // Accelerate
              }}
            />

            {/* Struggle ripple - repeating */}
            {person.sink > 0 && !reduceMotion && (
              <motion.circle
                cx={person.cx}
                cy={person.cy + person.sink}
                r={person.size}
                className="fill-none stroke-destructive/40"
                strokeWidth="0.5"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 2], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 1.2,
                  delay: getDelay(6 + i) + 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeOut",
                }}
              />
            )}
          </g>
        ))}

        {/* NEW: Rising bubbles */}
        {!reduceMotion && bubbles.map((bubble, i) => (
          <motion.circle
            key={`bubble-${i}`}
            cx={bubble.cx}
            cy={bubble.cy}
            r={bubble.size}
            className="fill-primary/30"
            initial={{ cy: 130, opacity: 0 }}
            animate={{ cy: bubble.cy - 20, opacity: [0, 0.6, 0] }}
            transition={{
              duration: 3,
              delay: getDelay(12) + bubble.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeOut",
            }}
          />
        ))}

        {/* ... rest unchanged ... */}
      </svg>
    </div>
  );
}
```

---

### **Illustration 3: WealthStack**

**Enhancement Plan:**
- ✅ Coins drop with bounce
- ✅ Slight rotation on drop
- ✅ Wobble after landing
- ✅ Glow effect on top coins

**Implementation:**

```typescript
export function WealthStack() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const { getDelay, shouldReduceMotion: reduceMotion } = useHandDrawnAnimation({
    baseDelay: 0,
    staggerAmount: 0.05,
  });

  // ... existing stacks array ...

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={t('wealth.title')}
      >
        {/* ... existing defs ... */}

        {/* ENHANCED: Coin stacks - drop with bounce */}
        {stacks.map((stack, stackIdx) => (
          <g key={`stack-${stack.x}`}>
            {Array.from({ length: stack.coins }).map((_, coinIdx) => {
              const y = 115 - coinIdx * 6.5;
              const coinClass = getCoinClass(stack.color, coinIdx, stack.coins);
              const dropDelay = getDelay(stackIdx * 2 + coinIdx);

              return (
                <motion.g key={`coin-${stack.x}-${coinIdx}`}>
                  {/* Coin shadow */}
                  <motion.ellipse
                    cx={stack.x + 1}
                    cy={y + 1}
                    rx="11"
                    ry="4"
                    className="fill-foreground/10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.3, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ transformOrigin: `${stack.x}px ${y}px` }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      delay: dropDelay,
                      ease: "easeOut",
                    }}
                  />

                  {/* Main coin - drop animation */}
                  <motion.g
                    initial={{
                      y: y - 50 - (coinIdx * 10),
                      rotate: Math.random() * 20 - 10, // Random rotation
                      opacity: 0
                    }}
                    whileInView={{
                      y: y,
                      rotate: 0,
                      opacity: 1
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ transformOrigin: `${stack.x}px ${y}px` }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.6,
                      delay: dropDelay,
                      ease: [0.34, 1.56, 0.64, 1], // Bounce
                    }}
                  >
                    <ellipse
                      cx={stack.x}
                      cy={y}
                      rx="11"
                      ry="4"
                      className={coinClass}
                      strokeWidth="1.5"
                    />

                    {/* Coin edge highlight */}
                    <ellipse
                      cx={stack.x}
                      cy={y}
                      rx="9"
                      ry="3"
                      className="fill-none stroke-background/20"
                      strokeWidth="0.5"
                    />

                    {/* Currency symbol on top coins */}
                    {coinIdx >= stack.coins - 1 && (
                      <motion.text
                        x={stack.x}
                        y={y + 1.5}
                        textAnchor="middle"
                        className="text-[7px] fill-background/80 font-bold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.2,
                          delay: dropDelay + 0.3,
                        }}
                      >
                        R$
                      </motion.text>
                    )}
                  </motion.g>

                  {/* Wobble after landing */}
                  {!reduceMotion && coinIdx === stack.coins - 1 && (
                    <motion.g
                      animate={{ rotate: [0, -1, 1, -0.5, 0] }}
                      transition={{
                        duration: 0.4,
                        delay: dropDelay + 0.6,
                        ease: [0.36, 0.07, 0.19, 0.97],
                      }}
                      style={{ transformOrigin: `${stack.x}px ${y}px` }}
                    >
                      {/* Glow effect for top coins */}
                      {(stack.color === 'accent' || stack.color === 'primary') && (
                        <motion.ellipse
                          cx={stack.x}
                          cy={y}
                          rx="13"
                          ry="5"
                          className={stack.color === 'accent' ? 'fill-accent/20' : 'fill-primary/20'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.4, 0.2] }}
                          transition={{
                            duration: 2,
                            delay: dropDelay + 0.8,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      )}
                    </motion.g>
                  )}
                </motion.g>
              );
            })}

            {/* Stack label */}
            {stack.label && (
              <motion.text
                x={stack.x}
                y={110 - stack.coins * 6.5 - 8}
                textAnchor="middle"
                className="text-[8px] fill-foreground/60 font-semibold"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: getDelay(stackIdx * 2 + stack.coins * 0.05 + 0.5),
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {stack.label}
              </motion.text>
            )}
          </g>
        ))}

        {/* ... rest unchanged ... */}
      </svg>
    </div>
  );
}
```

---

### **Illustration 4: UnevenDoors**

**Enhancement Plan:**
- ✅ Door frames draw in
- ✅ Doors swing open
- ✅ Light beams expand
- ✅ Handles pop in

**Implementation:**

```typescript
export function UnevenDoors() {
  const shouldReduceMotion = useReducedMotion();
  const { getDelay, shouldReduceMotion: reduceMotion } = useHandDrawnAnimation({
    baseDelay: 0,
    staggerAmount: 0.2,
  });

  // ... existing doors array ...

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Racial inequality visualization - uneven doors of opportunity"
      >
        {doors.map((door, doorIdx) => {
          const colors = getColorClass(door.color);
          const delay = getDelay(doorIdx);

          return (
            <g key={`door-${door.x}`}>
              {/* ENHANCED: Door frame - draw animation */}
              <motion.path
                d={`M ${door.x} ${door.topY}
                    L ${door.x} ${door.topY + door.height}
                    L ${door.x + door.width} ${door.topY + door.height}
                    L ${door.x + door.width} ${door.topY} Z`}
                className={colors.stroke}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 1,
                  delay: delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              {/* ENHANCED: Door fill - fade in */}
              <motion.rect
                x={door.x + 2.5}
                y={door.topY + 2.5}
                width={door.width - 5}
                height={door.height - 5}
                rx="3"
                className={`${colors.fill}/10`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: delay + 0.3,
                }}
              />

              {/* ENHANCED: Door panels - draw in */}
              {[0.25, 0.65].map((ratio, panelIdx) => (
                <motion.rect
                  key={`panel-${door.x}-${panelIdx}`}
                  x={door.x + 6}
                  y={door.topY + door.height * (ratio - 0.08)}
                  width={door.width - 12}
                  height={door.height * 0.15}
                  rx="2"
                  className={`fill-none ${colors.stroke}/40`}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: delay + 0.5 + panelIdx * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              ))}

              {/* ENHANCED: Door handle - pop in */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: delay + 0.7,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <ellipse
                  cx={door.x + door.width * 0.78}
                  cy={door.topY + door.height * 0.52}
                  rx="2.5"
                  ry="1.5"
                  className={colors.fill}
                />
                <circle
                  cx={door.x + door.width * 0.78}
                  cy={door.topY + door.height * 0.58}
                  r="1"
                  className={`${colors.fill}/60`}
                />
              </motion.g>

              {/* ENHANCED: Doorway light - expand */}
              <motion.path
                d={`M ${door.x + 3} ${door.topY + 5}
                    L ${door.x + 3} ${door.topY + door.height - 5}
                    Q ${door.x + door.width * 0.3} ${door.topY + door.height / 2},
                      ${door.x + 3} ${door.topY + 5}`}
                className={`${colors.fill}/20`}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: door.open / 100, pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  delay: delay + 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              {/* ENHANCED: Opportunity beam - grow outward */}
              <motion.line
                x1={door.x + door.width / 2}
                y1={door.topY - 5}
                x2={door.x + door.width / 2}
                y2={door.topY - 12}
                stroke="currentColor"
                strokeWidth="2"
                className={colors.stroke}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: door.open / 100 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: delay + 1.1,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            </g>
          );
        })}

        {/* ... rest unchanged ... */}
      </svg>
    </div>
  );
}
```

---

### **Illustration 5: SafetyNet**

**Enhancement Plan:**
- ✅ Net strands weave in
- ✅ People fall with acceleration
- ✅ Net bounces on catch
- ✅ Ripple effects spread

**Implementation:**

```typescript
export function SafetyNet() {
  const shouldReduceMotion = useReducedMotion();
  const { getDelay, shouldReduceMotion: reduceMotion } = useHandDrawnAnimation({
    baseDelay: 0,
    staggerAmount: 0.05,
  });

  // ... existing arrays ...

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Social safety net visualization - catching those who fall"
      >
        {/* ENHANCED: Support structure - draw in */}
        <motion.line
          x1="10"
          y1="18"
          x2="190"
          y2="18"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary/40"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: getDelay(0),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />

        {/* ENHANCED: Attachment points - pop in */}
        {attachments.map((x, i) => (
          <motion.g key={`attach-${x}`}>
            <motion.circle
              cx={x}
              cy={18}
              r="2.5"
              className="fill-primary"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                delay: getDelay(i + 1),
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
            <motion.line
              x1={x}
              y1={20.5}
              x2={x}
              y2={25}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary/60"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: getDelay(i + 1),
              }}
            />
          </motion.g>
        ))}

        {/* ENHANCED: Woven net - horizontal strands */}
        {horizontalLines.map((y, i) => {
          const sag = 3 + i * 0.5;
          return (
            <motion.path
              key={`h-${i}`}
              d={`M 15 ${y} Q 60 ${y + sag}, 100 ${y} Q 140 ${y + sag}, 185 ${y}`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-secondary"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                delay: getDelay(8 + i),
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          );
        })}

        {/* ENHANCED: Woven net - vertical strands */}
        {verticalCurves.map((x, i) => (
          <motion.path
            key={`v-${i}`}
            d={`M ${x} 25 Q ${x + (i % 2 === 0 ? 2 : -2)} 50, ${x} 90`}
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
            className="text-secondary/70"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: getDelay(14 + i),
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}

        {/* ENHANCED: Net knots - pop in */}
        {horizontalLines.flatMap((y, yi) =>
          verticalCurves.slice(0, -1).map((x, xi) => {
            const offsetY = yi * 0.5 + 3;
            return (
              <motion.circle
                key={`knot-${x}-${y}`}
                cx={x}
                cy={y + (xi % 2 === 0 ? offsetY : offsetY - 1)}
                r="1"
                className="fill-secondary"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                  delay: getDelay(20 + yi + xi),
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            );
          })
        )}

        {/* ENHANCED: Falling people - with bounce on catch */}
        {fallingPeople.map((person, i) => {
          const delay = getDelay(25 + i);

          return (
            <g key={`person-${person.cx}`}>
              {/* Motion trail */}
              <motion.path
                d={`M ${person.cx} ${person.startY} L ${person.cx} ${person.targetY}`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-accent/20"
                strokeDasharray="2,3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  delay: delay,
                }}
              />

              {/* Person falling */}
              <motion.circle
                cx={person.cx}
                cy={person.startY}
                r={person.size}
                className="fill-accent"
                initial={{ cy: person.startY, opacity: 0 }}
                whileInView={{ cy: person.targetY, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 1.2,
                  delay: delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              {/* Catch effect - expanding ripple */}
              {!reduceMotion && (
                <motion.circle
                  cx={person.cx}
                  cy={person.targetY}
                  r={person.size}
                  className="fill-none stroke-accent"
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 0 }}
                  whileInView={{
                    scale: [1, 2.5, 1],
                    opacity: [0, 0.6, 0]
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: delay + 1.2 + person.catchDelay,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* Net bounce effect */}
              {!reduceMotion && i === 0 && (
                <motion.g
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 0.4,
                    delay: delay + 1.2,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {/* Trigger bounce on net elements */}
                </motion.g>
              )}
            </g>
          );
        })}

        {/* ... rest unchanged ... */}
      </svg>
    </div>
  );
}
```

---

## ✅ Testing & Validation

### **Step 1: Visual Testing**

**Create Test Checklist:**

```markdown
## Animation Testing Checklist

### InequalitySlope
- [ ] Slope line draws smoothly from left to right
- [ ] Accent line follows with dashed pattern
- [ ] People dots pop in sequentially
- [ ] Floating motion is subtle (2px movement)
- [ ] All animations respect reduced motion preference

### PovertyWaterline
- [ ] Water layers fade in progressively
- [ ] Ripples expand with correct timing
- [ ] People fall with acceleration
- [ ] Struggle ripples repeat smoothly
- [ ] Bubbles rise and fade naturally

### WealthStack
- [ ] Coins drop from above with bounce
- [ ] Rotation on drop looks natural
- [ ] Wobble effect is subtle
- [ ] Glow pulses gently on top coins
- [ ] Stack labels appear after coins

### UnevenDoors
- [ ] Door frames draw in completely
- [ ] Door fills fade in smoothly
- [ ] Handles pop in with bounce
- [ ] Light beams expand outward
- [ ] Opportunity indicators scale up

### SafetyNet
- [ ] Support structure draws first
- [ ] Attachment points pop in
- [ ] Net strands weave in (cross-hatch pattern)
- [ ] People fall and get caught
- [ ] Net bounces on first catch
- [ ] Ripples spread from catch point
```

### **Step 2: Performance Testing**

```bash
# Run dev server with performance monitoring
npm run dev

# Open Chrome DevTools
# 1. Go to Performance tab
# 2. Start recording
# 3. Scroll through illustrations
# 4. Stop recording
# 5. Check:
#    - FPS should be 60
#    - No long tasks (>50ms)
#    - GPU acceleration active
```

**Performance Targets:**
```javascript
// Acceptable performance metrics:
{
  fps: 60,                    // Frames per second
  longTasks: 0,               // No tasks > 50ms
  renderTime: "< 16ms",       // Per frame
  animationDuration: "< 3s",  // Total per illustration
  memoryUsage: "< 50MB"       // Additional memory
}
```

### **Step 3: Accessibility Testing**

```bash
# Test with reduced motion
# 1. Open browser settings
# 2. Enable "Reduce motion" preference
# 3. Refresh page
# 4. Verify all animations are disabled or simplified

# Test with screen reader
# 1. Enable VoiceOver/NVDA
# 2. Navigate through illustrations
# 3. Verify aria-labels are read correctly
# 4. Check that animations don't interfere with reading
```

**Accessibility Checklist:**
```markdown
- [ ] All SVGs have aria-label
- [ ] role="img" on all SVGs
- [ ] Reduced motion respected (useReducedMotion hook)
- [ ] No flashing/strobing effects
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works (if interactive)
- [ ] Screen reader announces content correctly
```

### **Step 4: Cross-Browser Testing**

```bash
# Test in multiple browsers
- Chrome/Edge (Chromium)
- Firefox (Gecko)
- Safari (WebKit)

# Check for:
- SVG filter support
- CSS transform support
- Framer Motion compatibility
- Performance differences
```

---

## 🐛 Troubleshooting

### **Problem 1: Animations Not Playing**

**Symptoms:**
- SVG elements appear static
- No movement on scroll

**Solutions:**
```typescript
// 1. Check viewport settings
viewport={{ once: true, margin: "-100px" }}  // Should trigger before visible

// 2. Verify whileInView is set
whileInView={{ opacity: 1 }}  // Should have whileInView, not animate

// 3. Check for CSS conflicts
// Ensure no CSS is overriding transform/opacity
.svg-element {
  /* Remove: */
  /* transition: none !important; */
  /* transform: none !important; */
}
```

### **Problem 2: Jerky Animations**

**Symptoms:**
- Animations stutter
- Not smooth 60fps

**Solutions:**
```typescript
// 1. Prefer transform/opacity (cheaper) over layout attributes
// Avoid animating x/y/width/height on many elements at once

// 2. Avoid layout thrashing
// Don't animate: width, height, top, left
// Instead animate: transform, opacity

// 3. Reduce concurrent animations
const maxConcurrent = 5;  // Limit simultaneous animations
```

### **Problem 3: Reduced Motion Not Working**

**Symptoms:**
- Animations still play with reduced motion enabled

**Solutions:**
```typescript
// 1. Check hook usage
const shouldReduceMotion = useReducedMotion();

// 2. Apply to all animations
transition={{
  duration: shouldReduceMotion ? 0 : 1.5,
}}

// 3. Test with browser preference
// Chrome: Settings > Accessibility > Reduce motion
// Firefox: about:config > layout.css.prefers-reduced-motion
```

### **Problem 4: TypeScript Errors**

**Symptoms:**
- Type errors in utility files
- Missing imports

**Solutions:**
```typescript
// 1. Check Framer Motion imports
import { motion, useReducedMotion } from 'framer-motion';

// 2. Verify React types
import { ReactNode } from 'react';

// 3. Check export syntax
export const HAND_DRAWN_EASING = {  // Use const, not function
  popIn: [0.34, 1.56, 0.64, 1] as const,
};

// 4. Ensure framer-motion is installed (types ship with the package)
npm install framer-motion
```

### **Problem 5: Performance Issues**

**Symptoms:**
- Page slow to load
- High memory usage

**Solutions:**
```typescript
// 1. Lazy load illustrations
const InequalitySlope = lazy(() => import('./InequalitySlope'));

// 2. Use viewport triggering
viewport={{ once: true }}  // Only animate once

// 3. Reduce animation complexity
// Fewer elements, simpler paths

// 4. Use CSS animations for simple effects
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

// 5. Minimize heavy SVG filters
// Apply feTurbulence/feDisplacementMap sparingly
```

---

## 📚 Best Practices

### **1. Animation Timing**

```typescript
// DO: Use consistent timing scales
const TIMING = {
  instant: 0,
  fast: 0.3,
  medium: 0.6,
  slow: 1.5,
  verySlow: 2.5,
};

// DON'T: Use random durations
duration: Math.random() * 2  // ❌ Unpredictable
```

### **2. Easing Functions**

```typescript
// DO: Match easing to animation type
Drawing paths:   [0.25, 0.46, 0.45, 0.94]  // smoothDraw
Popping in:      [0.34, 1.56, 0.64, 1]     // popIn
Sliding:         [0.4, 0.0, 0.2, 1]        // settle

// DON'T: Use wrong easing for context
<circle animate={{ scale: 1 }} transition={{ ease: "linear" }} />  // ❌ Robotic
```

### **3. Stagger Delays**

```typescript
// DO: Calculate delays systematically
delay: baseDelay + (index * staggerAmount)

// DON'T: Hardcode each delay
delay: index === 0 ? 0 : index === 1 ? 0.1 : 0.2  // ❌ Brittle
```

### **4. Accessibility**

```typescript
// DO: Always respect motion preferences
const duration = shouldReduceMotion ? 0 : 1.5;

// DON'T: Ignore reduced motion
duration: 1.5  // ❌ Will make users dizzy
```

### **5. Performance**

```typescript
// DO: Animate transform/opacity
<motion.div animate={{ x: 100, opacity: 1 }} />

// DON'T: Animate layout properties
<motion.div animate={{ left: 100, width: 50 }} />  // ❌ Triggers reflow
```

### **6. SVG Specifics**

```typescript
// DO: Keep stroke widths stable across responsive sizing
<path vectorEffect="non-scaling-stroke" strokeWidth="2.5" />

// DO: Set transform origins on SVG elements
<g transformBox="fill-box" transformOrigin="center" />
```

### **7. Code Organization**

```typescript
// DO: Keep animation config together
const animationConfig = {
  initial: { scale: 0 },
  whileInView: { scale: 1 },
  transition: { duration: 0.5 },
};

// DON'T: Scatter animation logic
initial={{ scale: 0 }}
// ... 100 lines of JSX ...
whileInView={{ scale: 1 }}
transition={{ duration: 0.5 }}
```

---

## 🎯 Final Checklist

### **Before Committing**

```markdown
## Pre-Commit Checklist

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All imports correct
- [ ] No console errors

### Functionality
- [ ] All animations play smoothly
- [ ] Reduced motion works
- [ ] Cross-browser compatible
- [ ] Mobile responsive

### Performance
- [ ] 60fps animations
- [ ] No memory leaks
- [ ] Reasonable bundle size
- [ ] Lazy loading implemented

### Accessibility
- [ ] aria-labels present
- [ ] Screen reader tested
- [ ] Keyboard navigable
- [ ] Color contrast OK

### Documentation
- [ ] Code commented
- [ ] Props documented
- [ ] Usage examples provided
- [ ] Testing notes added
```

---

## 🚀 Next Steps

### **Immediate Actions (This Week)**
1. ✅ Create all utility files
2. ✅ Implement InequalitySlope
3. ✅ Implement PovertyWaterline
4. ✅ Test in development

### **Short Term (Next 2 Weeks)**
1. Enhance remaining 3 illustrations
2. Add interactive hover effects
3. Optimize performance
4. Write unit tests

### **Long Term (Next Month)**
1. Create reusable illustration components
2. Build illustration gallery/showcase
3. Document for team
4. Present improvements

---

## 📞 Support & Resources

**Primary References (SVG + Motion):**
- [Motion: SVG Animation (pathLength, pathOffset, pathSpacing)](https://motion.dev/docs/react-svg-animation)
- [Motion: SVG (transformBox, SVG attribute animation)](https://motion.dev/docs/react-svg)
- [Motion: Accessibility (reduced motion)](https://motion.dev/docs/react-accessibility)
- [MDN: pathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pathLength)
- [MDN: stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
- [MDN: stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset)
- [MDN: vector-effect](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect)
- [MDN: feTurbulence](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence)
- [MDN: feDisplacementMap](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap)
- [MDN: baseFrequency](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/baseFrequency)
- [MDN: numOctaves](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/numOctaves)
- [SVG Animation Guide](https://svgwg.org/specs/animations/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

**Questions?**
- Check troubleshooting section
- Review code examples
- Test with provided checklist

---

**Happy Animating! 🎨✨**
