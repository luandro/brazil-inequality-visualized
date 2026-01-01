import { motion, useReducedMotion } from 'framer-motion';

export function InequalitySlope() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Inequality visualization - slope with dots"
      >
        {/* Hand-drawn style slope line */}
        <motion.path
          d="M 20 100 Q 60 85, 100 60 T 180 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-primary/60"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            ease: "easeInOut"
          }}
        />

        {/* Dots representing population along the slope */}
        {[
          { cx: 30, cy: 95, delay: 0.3 },
          { cx: 40, cy: 92, delay: 0.4 },
          { cx: 50, cy: 88, delay: 0.5 },
          { cx: 70, cy: 78, delay: 0.6 },
          { cx: 90, cy: 68, delay: 0.7 },
          { cx: 110, cy: 52, delay: 0.8 },
          { cx: 130, cy: 40, delay: 0.9 },
          { cx: 150, cy: 32, delay: 1.0 },
          { cx: 170, cy: 24, delay: 1.1 }
        ].map((dot) => (
          <motion.circle
            key={`dot-${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r="3"
            className="fill-accent"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              delay: shouldReduceMotion ? 0 : dot.delay
            }}
          />
        ))}

        {/* Base line */}
        <motion.line
          x1="10"
          y1="110"
          x2="190"
          y2="110"
          stroke="currentColor"
          strokeWidth="1"
          className="text-muted-foreground/40"
          strokeDasharray="3,3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        />
      </svg>
    </div>
  );
}
