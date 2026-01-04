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
