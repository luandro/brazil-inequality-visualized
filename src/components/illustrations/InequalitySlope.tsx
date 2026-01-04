import { motion } from 'framer-motion';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function InequalitySlope() {
  const { getDelay, shouldReduceMotion: reduceMotion, easing } = useHandDrawnAnimation({
    baseDelay: 0.3,
    staggerAmount: 0.06,
  });

  // Population distribution along inequality slope
  const people = [
    // Bottom tier - poverty
    { cx: 20, cy: 100, size: 3.5, color: 'destructive' },
    { cx: 32, cy: 98, size: 3.5, color: 'destructive' },
    { cx: 44, cy: 95, size: 3.5, color: 'destructive' },
    { cx: 26, cy: 93, size: 3, color: 'destructive' },
    { cx: 38, cy: 91, size: 3, color: 'destructive' },
    // Middle tier - working class
    { cx: 56, cy: 88, size: 3.5, color: 'secondary' },
    { cx: 68, cy: 82, size: 3.5, color: 'secondary' },
    { cx: 80, cy: 75, size: 3, color: 'secondary' },
    { cx: 92, cy: 68, size: 3, color: 'secondary' },
    { cx: 104, cy: 60, size: 3, color: 'secondary' },
    // Upper tier - affluent
    { cx: 116, cy: 50, size: 3, color: 'primary' },
    { cx: 128, cy: 42, size: 2.5, color: 'primary' },
    { cx: 140, cy: 35, size: 2.5, color: 'primary' },
    { cx: 152, cy: 28, size: 2, color: 'primary' },
    // Top tier - wealthy
    { cx: 164, cy: 22, size: 2, color: 'accent' },
    { cx: 176, cy: 16, size: 1.5, color: 'accent' }
  ];

  const getColorClass = (color: string) => {
    if (color === 'destructive') return 'fill-destructive';
    if (color === 'secondary') return 'fill-secondary';
    if (color === 'accent') return 'fill-accent';
    return 'fill-primary';
  };

  const getStrokeClass = (color: string) => {
    if (color === 'destructive') return 'stroke-destructive';
    if (color === 'secondary') return 'stroke-secondary';
    if (color === 'accent') return 'stroke-accent';
    return 'stroke-primary';
  };

  const commonSlopeProps = {
    d: "M 10 105 Q 50 92, 90 70 Q 130 48, 170 18 Q 180 13, 190 10",
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Inequality visualization - population distribution across income levels"
      >
        {/* Background gradient showing inequality zones */}
        <defs>
          <linearGradient id="inequality-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.05" />
            <stop offset="40%" stopColor="hsl(var(--secondary))" stopOpacity="0.05" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 0 110 Q 60 90, 100 60 T 200 10 L 200 120 L 0 120 Z"
          fill="url(#inequality-gradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: getDelay(0),
          }}
        />

        {/* ENHANCED: Main slope line with double-stroke sketchy effect */}
        <g>
          {/* Primary stroke */}
          <motion.path
            {...commonSlopeProps}
            strokeWidth="3"
            className="text-foreground/20"
            transition={{
              duration: reduceMotion ? 0 : 2,
              delay: getDelay(1),
              ease: easing.smoothDraw,
            }}
          />
          {/* Ghost stroke for sketchy effect */}
          <motion.path
            {...commonSlopeProps}
            strokeWidth="3.5"
            className="text-foreground/10"
            transform="translate(0.5, -0.3)"
            transition={{
              duration: reduceMotion ? 0 : 2,
              delay: getDelay(1),
              ease: easing.smoothDraw,
            }}
          />
        </g>

        {/* ENHANCED: Accent line with draw animation */}
        <motion.path
          {...commonSlopeProps}
          strokeWidth="2.5"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0, strokeDasharray: "0 100" }}
          whileInView={{
            pathLength: 1,
            opacity: 0.6,
            strokeDasharray: "6 6"
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 2.5,
            delay: getDelay(2),
            ease: easing.smoothDraw,
          }}
        />

        {/* ENHANCED: People dots with pop-in and stagger */}
        {people.map((person, i) => {
          const isAccent = person.color === 'accent';
          const floatDuration = 3 + (i % 4) * 0.25;
          const floatDelay = i * 0.12;

          return (
            <g key={`person-${person.cx}-${person.cy}`}>
              {/* Pop-in animation for glow (accent only) */}
              {isAccent && !reduceMotion && (
                <motion.circle
                  cx={person.cx}
                  cy={person.cy}
                  r={person.size + 2}
                  className="fill-accent/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.5,
                    delay: getDelay(3 + i),
                    ease: easing.popIn,
                  }}
                />
              )}

              {/* Main person dot with pop-in */}
              <motion.circle
                cx={person.cx}
                cy={person.cy}
                r={person.size}
                className={getColorClass(person.color)}
                initial={{ scale: 0, opacity: 0, cy: person.cy }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  ...(reduceMotion || isAccent
                    ? { cy: person.cy }
                    : { cy: [person.cy, person.cy - 2, person.cy] }),
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: getDelay(3 + i),
                  ease: easing.popIn,
                  ...(reduceMotion || isAccent
                    ? {}
                    : {
                        cy: {
                          duration: floatDuration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: floatDelay,
                        },
                      }),
                }}
              />

              {/* Ring for emphasis on larger dots */}
              {person.size > 3 && (
                <motion.circle
                  cx={person.cx}
                  cy={person.cy}
                  r={person.size + 1.5}
                className={`fill-none ${getStrokeClass(person.color)}`}
                strokeWidth="0.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: getDelay(3 + i) + 0.1,
                    ease: easing.popIn,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* ENHANCED: Baseline with scale draw animation */}
        <motion.line
          x1="0"
          y1="115"
          x2="200"
          y2="115"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="text-muted-foreground/50"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ transformOrigin: '0px 115px' }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: getDelay(20),
            ease: easing.smoothDraw,
          }}
        />

        {/* ENHANCED: Tick marks with stagger */}
        {[0, 50, 100, 150, 200].map((x, i) => (
          <motion.line
            key={`tick-${x}`}
            x1={x}
            y1="115"
            x2={x}
            y2="118"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="text-muted-foreground/40"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transformOrigin: `${x}px 115px` }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: getDelay(21 + i),
              ease: easing.smoothDraw,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
