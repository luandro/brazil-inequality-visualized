import { motion, useReducedMotion } from 'framer-motion';

export function SimulatorDials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Policy simulator visualization - control dials"
      >
        {/* Three dial circles */}
        {[
          { cx: 50, cy: 60, delay: 0, angle: -45 },
          { cx: 100, cy: 60, delay: 0.2, angle: 0 },
          { cx: 150, cy: 60, delay: 0.4, angle: 45 }
        ].map((dial, i) => (
          <g key={i}>
            {/* Dial background circle */}
            <motion.circle
              cx={dial.cx}
              cy={dial.cy}
              r="25"
              className="fill-none stroke-primary/30"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : dial.delay,
                ease: "easeOut"
              }}
            />

            {/* Dial arc (active portion) */}
            <motion.path
              d={`M ${dial.cx} ${dial.cy - 25} A 25 25 0 0 1 ${dial.cx + 25 * Math.sin((dial.angle * Math.PI) / 180)} ${dial.cy - 25 * Math.cos((dial.angle * Math.PI) / 180)}`}
              className="fill-none stroke-secondary"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : dial.delay + 0.2,
                ease: "easeOut"
              }}
            />

            {/* Dial pointer */}
            <motion.line
              x1={dial.cx}
              y1={dial.cy}
              x2={dial.cx + 20 * Math.sin((dial.angle * Math.PI) / 180)}
              y2={dial.cy - 20 * Math.cos((dial.angle * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-accent"
              strokeLinecap="round"
              initial={{ rotate: -90, opacity: 0 }}
              whileInView={{ rotate: dial.angle, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformOrigin: `${dial.cx}px ${dial.cy}px` }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : dial.delay + 0.3,
                ease: "easeOut"
              }}
            />

            {/* Center dot */}
            <motion.circle
              cx={dial.cx}
              cy={dial.cy}
              r="4"
              className="fill-accent"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                delay: shouldReduceMotion ? 0 : dial.delay + 0.5
              }}
            />

            {/* Tick marks */}
            {[-60, -30, 0, 30, 60].map((tickAngle, tickIdx) => {
              const rad = (tickAngle * Math.PI) / 180;
              const x1 = dial.cx + 22 * Math.sin(rad);
              const y1 = dial.cy - 22 * Math.cos(rad);
              const x2 = dial.cx + 25 * Math.sin(rad);
              const y2 = dial.cy - 25 * Math.cos(rad);
              return (
                <motion.line
                  key={tickIdx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-muted-foreground/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    delay: shouldReduceMotion ? 0 : dial.delay + 0.1 + tickIdx * 0.05
                  }}
                />
              );
            })}
          </g>
        ))}

        {/* Base platform */}
        <motion.rect
          x="20"
          y="95"
          width="160"
          height="8"
          rx="2"
          className="fill-muted/50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ transformOrigin: '100px 99px' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.6
          }}
        />
      </svg>
    </div>
  );
}
