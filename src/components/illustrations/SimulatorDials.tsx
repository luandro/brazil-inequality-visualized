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
        ].map((dial) => {
          // Calculate arc path for the colored portion
          const startAngle = -90; // Start from top
          const endAngle = dial.angle; // End at target angle
          const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

          const startX = dial.cx + 25 * Math.cos((startAngle * Math.PI) / 180);
          const startY = dial.cy + 25 * Math.sin((startAngle * Math.PI) / 180);
          const endX = dial.cx + 25 * Math.cos((endAngle * Math.PI) / 180);
          const endY = dial.cy + 25 * Math.sin((endAngle * Math.PI) / 180);

          const sweepFlag = endAngle > startAngle ? 1 : 0;
          const arcPath = `M ${startX} ${startY} A 25 25 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;

          return (
            <g key={`dial-${dial.cx}`}>
              {/* Dial background circle */}
              <motion.circle
                cx={dial.cx}
                cy={dial.cy}
                r="25"
                className="fill-none stroke-muted-foreground/20"
                strokeWidth="2.5"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : dial.delay,
                  ease: "easeOut"
                }}
              />

              {/* Dial arc (active/colored portion) */}
              <motion.path
                d={arcPath}
                className="fill-none stroke-secondary"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : dial.delay + 0.2,
                  ease: "easeOut"
                }}
              />

              {/* Dial pointer - animate rotation from starting position */}
              <motion.g
                initial={{ rotate: shouldReduceMotion ? dial.angle : -90 }}
                whileInView={{ rotate: dial.angle }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ transformOrigin: `${dial.cx}px ${dial.cy}px` }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : dial.delay + 0.3,
                  ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
                }}
              >
                <line
                  x1={dial.cx}
                  y1={dial.cy}
                  x2={dial.cx}
                  y2={dial.cy - 18}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-accent"
                  strokeLinecap="round"
                />
              </motion.g>

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
                  delay: shouldReduceMotion ? 0 : dial.delay + 0.6,
                  ease: "backOut"
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
                    key={`tick-${dial.cx}-${tickAngle}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted-foreground/40"
                    strokeLinecap="round"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ transformOrigin: `${(x1 + x2) / 2}px ${(y1 + y2) / 2}px` }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                      delay: shouldReduceMotion ? 0 : dial.delay + 0.1 + tickIdx * 0.05
                    }}
                  />
                );
              })}
            </g>
          );
        })}

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
            delay: shouldReduceMotion ? 0 : 0.8
          }}
        />
      </svg>
    </div>
  );
}
