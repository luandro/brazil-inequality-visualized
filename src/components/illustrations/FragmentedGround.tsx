import { motion, useReducedMotion } from 'framer-motion';

export function FragmentedGround() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Regional distribution visualization - fragmented ground"
      >
        {/* Ground fragments at different heights representing regions */}
        {[
          { x: 10, y: 50, width: 35, height: 70, delay: 0 },
          { x: 50, y: 65, width: 30, height: 55, delay: 0.1 },
          { x: 85, y: 40, width: 32, height: 80, delay: 0.2 },
          { x: 122, y: 70, width: 28, height: 50, delay: 0.3 },
          { x: 155, y: 55, width: 35, height: 65, delay: 0.4 }
        ].map((fragment, i) => (
          <motion.rect
            key={i}
            x={fragment.x}
            y={fragment.y}
            width={fragment.width}
            height={fragment.height}
            rx="2"
            className="fill-primary/20 stroke-primary/60"
            strokeWidth="2"
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: fragment.y, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : fragment.delay,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Cracks between fragments */}
        {[
          { x1: 45, y1: 50, x2: 50, y2: 120 },
          { x1: 80, y1: 40, x2: 85, y2: 120 },
          { x1: 117, y1: 55, x2: 122, y2: 120 },
          { x1: 150, y1: 50, x2: 155, y2: 120 }
        ].map((crack, i) => (
          <motion.line
            key={i}
            x1={crack.x1}
            y1={crack.y1}
            x2={crack.x2}
            y2={crack.y2}
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground/30"
            strokeDasharray="4,4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.6 + i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Base line */}
        <motion.line
          x1="0"
          y1="120"
          x2="200"
          y2="120"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 1
          }}
        />
      </svg>
    </div>
  );
}
