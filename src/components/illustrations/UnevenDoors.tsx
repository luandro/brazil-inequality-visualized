import { motion, useReducedMotion } from 'framer-motion';

export function UnevenDoors() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Racial inequality visualization - uneven doors"
      >
        {/* Three doors of different sizes representing inequality */}
        {[
          { x: 20, y: 70, width: 30, height: 50, delay: 0 },
          { x: 65, y: 55, width: 30, height: 65, delay: 0.2 },
          { x: 110, y: 80, width: 30, height: 40, delay: 0.4 },
          { x: 155, y: 60, width: 30, height: 60, delay: 0.6 }
        ].map((door, i) => (
          <g key={i}>
            {/* Door frame */}
            <motion.rect
              x={door.x}
              y={door.y}
              width={door.width}
              height={door.height}
              rx="3"
              className="fill-none stroke-primary"
              strokeWidth="2.5"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformOrigin: `${door.x + door.width / 2}px ${door.y + door.height}px` }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : door.delay,
                ease: "easeOut"
              }}
            />

            {/* Door knob */}
            <motion.circle
              cx={door.x + door.width * 0.75}
              cy={door.y + door.height * 0.55}
              r="2"
              className="fill-accent"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                delay: shouldReduceMotion ? 0 : door.delay + 0.3,
                ease: "easeOut"
              }}
            />

            {/* Door panel lines */}
            <motion.line
              x1={door.x + 5}
              y1={door.y + door.height * 0.33}
              x2={door.x + door.width - 5}
              y2={door.y + door.height * 0.33}
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/40"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : door.delay + 0.4,
                ease: "easeOut"
              }}
            />
          </g>
        ))}

        {/* Ground line */}
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
            delay: shouldReduceMotion ? 0 : 0.8
          }}
        />
      </svg>
    </div>
  );
}
