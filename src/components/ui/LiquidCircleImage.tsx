import { useId, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

interface LiquidCircleImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function LiquidCircleImage({
  src,
  alt,
  size = 100,
  className = ''
}: LiquidCircleImageProps) {
  const uniqueId = useId();
  const prefersReducedMotion = useReducedMotion();

  // Memoize IDs to prevent unnecessary re-renders
  const filterId = useMemo(() => `liquid-${uniqueId.replace(/:/g, '-')}`, [uniqueId]);
  const clipId = useMemo(() => `circle-${uniqueId.replace(/:/g, '-')}`, [uniqueId]);

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        role="img"
        aria-label={alt}
        style={{ isolation: 'isolate' }}
      >
        <defs>
          {/* Liquid morphing filter */}
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="linearRGB"
          >
            {/* Create organic noise pattern */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="2"
              result="turbulence"
              seed="2"
            >
              {/* Animate turbulence for liquid movement - disabled if user prefers reduced motion */}
              {!prefersReducedMotion && (
                <animate
                  attributeName="baseFrequency"
                  values="0.01 0.01;0.012 0.012;0.01 0.01"
                  dur="8s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>

            {/* Morph the edges with displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Circular clip path with padding */}
          <clipPath id={clipId}>
            <circle cx={size / 2} cy={size / 2} r={(size / 2) - 8} />
          </clipPath>
        </defs>

        {/* Light background circle for dark images - more distinct from page background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          className="fill-muted/70"
        />

        {/* Image with liquid filter effect */}
        <image
          href={src}
          x="6"
          y="6"
          width={size - 12}
          height={size - 12}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          filter={prefersReducedMotion ? undefined : `url(#${filterId})`}
          style={{ imageRendering: 'auto' }}
        />
      </svg>
    </div>
  );
}
