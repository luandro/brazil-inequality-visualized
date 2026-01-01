import { motion, useReducedMotion } from 'framer-motion';

export function SafetyNet() {
  const shouldReduceMotion = useReducedMotion();

  // Net attachment points (top)
  const attachments = [20, 50, 80, 110, 140, 170, 180];

  // Woven net pattern - more intricate
  const horizontalLines = [25, 38, 51, 64, 77, 90];
  const verticalCurves = [30, 55, 80, 105, 130, 155, 175];

  // People falling into the safety net
  const fallingPeople = [
    { cx: 45, startY: 5, targetY: 42, size: 3.5, delay: 1.2, catchDelay: 0 },
    { cx: 75, startY: 8, targetY: 55, size: 3, delay: 1.35, catchDelay: 0.1 },
    { cx: 105, startY: 3, targetY: 48, size: 3.5, delay: 1.5, catchDelay: 0.2 },
    { cx: 135, startY: 6, targetY: 52, size: 3, delay: 1.65, catchDelay: 0.3 },
    { cx: 160, startY: 10, targetY: 60, size: 2.5, delay: 1.8, catchDelay: 0.4 }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Social safety net visualization - catching those who fall"
      >
        {/* Support structure at top */}
        <motion.line
          x1="10"
          y1="18"
          x2="190"
          y2="18"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary/40"
          strokeLinecap="round"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          style={{ transformOrigin: '100px 18px' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: "easeOut"
          }}
        />

        {/* Attachment points */}
        {attachments.map((x, i) => (
          <motion.g key={`attach-${x}`}>
            <motion.circle
              cx={x}
              cy={18}
              r="2.5"
              className="fill-primary"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                delay: shouldReduceMotion ? 0 : 0.1 + i * 0.05,
                ease: "backOut"
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
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : 0.15 + i * 0.05
              }}
            />
          </motion.g>
        ))}

        {/* Woven net - horizontal strands with natural sag */}
        {horizontalLines.map((y, i) => {
          const sag = 3 + i * 0.5; // Increasing sag for lower lines
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
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.9,
                delay: shouldReduceMotion ? 0 : 0.3 + i * 0.08,
                ease: "easeOut"
              }}
            />
          );
        })}

        {/* Woven net - vertical strands with curve */}
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
            viewport={{ margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.6 + i * 0.06,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Net intersection knots for woven texture */}
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
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.2,
                  delay: shouldReduceMotion ? 0 : 0.8 + (yi + xi) * 0.02
                }}
              />
            );
          })
        )}

        {/* Falling people with trails */}
        {fallingPeople.map((person, i) => (
          <g key={`person-${person.cx}`}>
            {/* Motion trail */}
            <motion.line
              x1={person.cx}
              y1={person.startY}
              x2={person.cx}
              y2={person.targetY}
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent/20"
              strokeDasharray="2,3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                delay: shouldReduceMotion ? 0 : person.delay
              }}
            />
            {/* Person */}
            <motion.circle
              cx={person.cx}
              cy={person.startY}
              r={person.size}
              className="fill-accent"
              initial={{ cy: person.startY, opacity: 0 }}
              whileInView={{ cy: person.targetY, opacity: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.2,
                delay: shouldReduceMotion ? 0 : person.delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
            {/* Catch effect - ripple */}
            <motion.circle
              cx={person.cx}
              cy={person.targetY}
              r={person.size}
              className="fill-none stroke-accent"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0 }}
              whileInView={{ scale: 2.5, opacity: [0, 0.6, 0] }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : person.delay + 1.2 + person.catchDelay,
                ease: "easeOut"
              }}
            />
          </g>
        ))}

        {/* Bottom support */}
        <motion.line
          x1="10"
          y1="100"
          x2="190"
          y2="100"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground/30"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 1
          }}
        />
      </svg>
    </div>
  );
}
