import { motion, useReducedMotion } from 'framer-motion';

export function WorkforceGears() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Labor market visualization - gears"
      >
        {/* Large gear (left) */}
        <motion.g
          initial={{ rotate: 0 }}
          whileInView={{ rotate: shouldReduceMotion ? 0 : 360 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 4,
            ease: "linear",
            repeat: shouldReduceMotion ? 0 : Infinity
          }}
          style={{ transformOrigin: '60px 60px' }}
        >
          <circle
            cx="60"
            cy="60"
            r="30"
            className="fill-none stroke-primary"
            strokeWidth="2"
          />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 60 + 35 * Math.cos(rad);
            const y = 60 + 35 * Math.sin(rad);
            return (
              <rect
                key={`large-tooth-${angle}`}
                x={x - 3}
                y={y - 6}
                width="6"
                height="12"
                rx="1"
                className="fill-primary"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: `${x}px ${y}px`
                }}
              />
            );
          })}
          <circle
            cx="60"
            cy="60"
            r="10"
            className="fill-background stroke-primary"
            strokeWidth="2"
          />
        </motion.g>

        {/* Medium gear (right) */}
        <motion.g
          initial={{ rotate: 0 }}
          whileInView={{ rotate: shouldReduceMotion ? 0 : -360 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 3,
            ease: "linear",
            repeat: shouldReduceMotion ? 0 : Infinity
          }}
          style={{ transformOrigin: '140px 60px' }}
        >
          <circle
            cx="140"
            cy="60"
            r="22"
            className="fill-none stroke-secondary"
            strokeWidth="2"
          />
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 140 + 26 * Math.cos(rad);
            const y = 60 + 26 * Math.sin(rad);
            return (
              <rect
                key={`medium-tooth-${angle}`}
                x={x - 2.5}
                y={y - 5}
                width="5"
                height="10"
                rx="1"
                className="fill-secondary"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: `${x}px ${y}px`
                }}
              />
            );
          })}
          <circle
            cx="140"
            cy="60"
            r="8"
            className="fill-background stroke-secondary"
            strokeWidth="2"
          />
        </motion.g>

        {/* Small gear (top) */}
        <motion.g
          initial={{ rotate: 0 }}
          whileInView={{ rotate: shouldReduceMotion ? 0 : 360 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 2.5,
            ease: "linear",
            repeat: shouldReduceMotion ? 0 : Infinity
          }}
          style={{ transformOrigin: '100px 25px' }}
        >
          <circle
            cx="100"
            cy="25"
            r="15"
            className="fill-none stroke-accent"
            strokeWidth="1.5"
          />
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + 18 * Math.cos(rad);
            const y = 25 + 18 * Math.sin(rad);
            return (
              <rect
                key={`small-tooth-${angle}`}
                x={x - 2}
                y={y - 4}
                width="4"
                height="8"
                rx="1"
                className="fill-accent"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: `${x}px ${y}px`
                }}
              />
            );
          })}
          <circle
            cx="100"
            cy="25"
            r="6"
            className="fill-background stroke-accent"
            strokeWidth="1.5"
          />
        </motion.g>

        {/* Connection lines */}
        <motion.line
          x1="88"
          y1="50"
          x2="112"
          y2="70"
          stroke="currentColor"
          strokeWidth="1"
          className="text-muted-foreground/20"
          strokeDasharray="2,2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        />
      </svg>
    </div>
  );
}
