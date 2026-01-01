import { motion, useReducedMotion } from 'framer-motion';

export function SafetyNet() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Social safety net visualization"
      >
        {/* Net grid - horizontal lines */}
        {[30, 45, 60, 75, 90].map((y, i) => (
          <motion.path
            key={`h-${i}`}
            d={`M 20 ${y} Q 60 ${y - 2}, 100 ${y} T 180 ${y}`}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-secondary/60"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Net grid - vertical lines */}
        {[40, 70, 100, 130, 160].map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="30"
            x2={x}
            y2="90"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-secondary/60"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.5 + i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Falling dots (people being caught) */}
        {[
          { cx: 55, cy: 20, targetY: 45 },
          { cx: 85, cy: 15, targetY: 60 },
          { cx: 115, cy: 18, targetY: 52 },
          { cx: 145, cy: 22, targetY: 48 }
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r="3"
            className="fill-accent"
            initial={{ cy: dot.cy, opacity: 0 }}
            whileInView={{ cy: dot.targetY, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1,
              delay: shouldReduceMotion ? 0 : 1 + i * 0.15,
              ease: "easeIn"
            }}
          />
        ))}
      </svg>
    </div>
  );
}
