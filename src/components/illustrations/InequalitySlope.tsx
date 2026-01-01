import { motion, useReducedMotion } from 'framer-motion';

export function InequalitySlope() {
  const shouldReduceMotion = useReducedMotion();

  // Population distribution along inequality slope
  const people = [
    // Bottom tier - poverty
    { cx: 20, cy: 100, size: 3.5, color: 'destructive', delay: 0.3 },
    { cx: 32, cy: 98, size: 3.5, color: 'destructive', delay: 0.35 },
    { cx: 44, cy: 95, size: 3.5, color: 'destructive', delay: 0.4 },
    { cx: 26, cy: 93, size: 3, color: 'destructive', delay: 0.45 },
    { cx: 38, cy: 91, size: 3, color: 'destructive', delay: 0.5 },
    // Middle tier - working class
    { cx: 56, cy: 88, size: 3.5, color: 'secondary', delay: 0.6 },
    { cx: 68, cy: 82, size: 3.5, color: 'secondary', delay: 0.65 },
    { cx: 80, cy: 75, size: 3, color: 'secondary', delay: 0.7 },
    { cx: 92, cy: 68, size: 3, color: 'secondary', delay: 0.75 },
    { cx: 104, cy: 60, size: 3, color: 'secondary', delay: 0.8 },
    // Upper tier - affluent
    { cx: 116, cy: 50, size: 3, color: 'primary', delay: 0.9 },
    { cx: 128, cy: 42, size: 2.5, color: 'primary', delay: 0.95 },
    { cx: 140, cy: 35, size: 2.5, color: 'primary', delay: 1.0 },
    { cx: 152, cy: 28, size: 2, color: 'primary', delay: 1.05 },
    // Top tier - wealthy
    { cx: 164, cy: 22, size: 2, color: 'accent', delay: 1.1 },
    { cx: 176, cy: 16, size: 1.5, color: 'accent', delay: 1.15 }
  ];

  const getColorClass = (color: string) => {
    if (color === 'destructive') return 'fill-destructive';
    if (color === 'secondary') return 'fill-secondary';
    if (color === 'accent') return 'fill-accent';
    return 'fill-primary';
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
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
          viewport={{ margin: "-100px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
        />

        {/* Main slope line - steeper for dramatic effect */}
        <motion.path
          d="M 10 105 Q 50 92, 90 70 Q 130 48, 170 18 Q 180 13, 190 10"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-foreground/20"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 2,
            ease: "easeInOut"
          }}
        />

        {/* Accent line showing inequality curve */}
        <motion.path
          d="M 10 105 Q 50 92, 90 70 Q 130 48, 170 18 Q 180 13, 190 10"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          className="text-primary"
          strokeLinecap="round"
          strokeDasharray="0 100"
          initial={{ pathLength: 0, opacity: 0, strokeDasharray: "0 100" }}
          whileInView={{ pathLength: 1, opacity: 0.6, strokeDasharray: "6 6" }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 2.5,
            delay: shouldReduceMotion ? 0 : 0.3,
            ease: "easeInOut"
          }}
        />

        {/* People dots - sized by wealth */}
        {people.map((person, i) => (
          <g key={`person-${person.cx}-${person.cy}`}>
            {/* Glow effect for top tier */}
            {person.color === 'accent' && (
              <motion.circle
                cx={person.cx}
                cy={person.cy}
                r={person.size + 2}
                className="fill-accent/20"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.5 }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : person.delay
                }}
              />
            )}
            {/* Person dot */}
            <motion.circle
              cx={person.cx}
              cy={person.cy}
              r={person.size}
              className={getColorClass(person.color)}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : person.delay,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            />
            {/* Ring for emphasis on larger dots */}
            {person.size > 3 && (
              <motion.circle
                cx={person.cx}
                cy={person.cy}
                r={person.size + 1.5}
                className={`fill-none ${
                  person.color === 'destructive' ? 'stroke-destructive' :
                  person.color === 'secondary' ? 'stroke-secondary' : 'stroke-accent'
                }`}
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.4 }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : person.delay + 0.1
                }}
              />
            )}
          </g>
        ))}

        {/* Baseline with markers */}
        <motion.line
          x1="0"
          y1="115"
          x2="200"
          y2="115"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground/50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          style={{ transformOrigin: '100px 115px' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            delay: shouldReduceMotion ? 0 : 0.5
          }}
        />

        {/* Tick marks showing scale */}
        {[0, 50, 100, 150, 200].map((x, i) => (
          <motion.line
            key={`tick-${x}`}
            x1={x}
            y1="115"
            x2={x}
            y2="118"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              delay: shouldReduceMotion ? 0 : 0.6 + i * 0.05
            }}
          />
        ))}
      </svg>
    </div>
  );
}
