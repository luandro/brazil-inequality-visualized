import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function PovertyWaterline() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  // People struggling at different poverty levels
  const strugglingPeople = [
    // Below extreme poverty line
    { cx: 35, cy: 85, size: 3, delay: 1.8, sink: 8 },
    { cx: 65, cy: 90, size: 2.5, delay: 1.9, sink: 6 },
    { cx: 95, cy: 82, size: 3.5, delay: 2, sink: 10 },
    { cx: 125, cy: 88, size: 3, delay: 2.1, sink: 7 },
    { cx: 155, cy: 84, size: 2.8, delay: 2.2, sink: 9 },
    // Between lines
    { cx: 50, cy: 55, size: 2.5, delay: 1.5, sink: 0 },
    { cx: 110, cy: 52, size: 3, delay: 1.6, sink: 0 },
    { cx: 170, cy: 58, size: 2.5, delay: 1.7, sink: 0 }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={t('poverty.povertyLines.title')}
      >
        {/* Above water - prosperity zone */}
        <defs>
          <linearGradient id="water-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
            <stop offset="30%" stopColor="hsl(var(--secondary))" stopOpacity="0.08" />
            <stop offset="70%" stopColor="hsl(var(--destructive))" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Water layers - deeper = worse */}
        <motion.path
          d="M 0 70 Q 25 65, 50 70 T 100 70 T 150 70 T 200 70 L 200 130 L 0 130 Z"
          fill="url(#water-gradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.4
          }}
        />

        {/* Deeper water ripples */}
        {[80, 95, 110].map((y, i) => (
          <motion.path
            key={`ripple-${y}`}
            d={`M 0 ${y} Q 30 ${y - 1}, 60 ${y} T 120 ${y} T 200 ${y}`}
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-destructive/15"
            strokeDasharray="4,4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 1 + i * 0.1
            }}
          />
        ))}

        {/* Wavy poverty line (standard) - above water */}
        <motion.path
          d="M 0 40 Q 25 36, 50 40 T 100 40 T 150 40 T 200 40"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-secondary"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            delay: shouldReduceMotion ? 0 : 0.2,
            ease: "easeInOut"
          }}
        />

        {/* Secondary wave pattern */}
        <motion.path
          d="M 0 40 Q 25 36, 50 40 T 100 40 T 150 40 T 200 40"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-secondary/40"
          strokeLinecap="round"
          strokeDasharray="8,4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.8,
            delay: shouldReduceMotion ? 0 : 0.5,
            ease: "easeInOut"
          }}
        />

        {/* Wavy poverty line (extreme) - danger zone */}
        <motion.path
          d="M 0 70 Q 25 66, 50 70 T 100 70 T 150 70 T 200 70"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-destructive"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            ease: "easeInOut"
          }}
        />

        {/* Danger wave pattern */}
        <motion.path
          d="M 0 70 Q 25 66, 50 70 T 100 70 T 150 70 T 200 70"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-destructive/40"
          strokeLinecap="round"
          strokeDasharray="8,4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.8,
            delay: shouldReduceMotion ? 0 : 0.3,
            ease: "easeInOut"
          }}
        />

        {/* People struggling */}
        {strugglingPeople.map((person, i) => (
          <g key={`person-${person.cx}-${person.cy}`}>
            {/* Person */}
            <motion.circle
              cx={person.cx}
              cy={person.cy}
              r={person.size}
              className={person.cy > 75 ? 'fill-destructive' : 'fill-secondary/70'}
              initial={{ cy: person.cy - 10, opacity: 0 }}
              whileInView={{ cy: person.cy + person.sink, opacity: 0.9 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.5,
                delay: shouldReduceMotion ? 0 : person.delay,
                ease: "easeOut"
              }}
            />
            {/* Struggle ripple */}
            {person.sink > 0 && (
              <motion.circle
                cx={person.cx}
                cy={person.cy + person.sink}
                r={person.size}
                className="fill-none stroke-destructive/40"
                strokeWidth="0.5"
                initial={{ scale: 1, opacity: 0 }}
                whileInView={{ scale: 2, opacity: [0, 0.5, 0] }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.2,
                  delay: shouldReduceMotion ? 0 : person.delay + 1.5,
                  ease: "easeOut",
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  repeatDelay: 2
                }}
              />
            )}
          </g>
        ))}

        {/* Label tags with backgrounds */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 1.2
          }}
        >
          <rect x="5" y="28" width="72" height="14" rx="2" className="fill-secondary/20" />
          <text x="10" y="38" className="text-[9px] fill-secondary font-semibold">
            {t('poverty.povertyLines.poverty')}
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 1.4
          }}
        >
          <rect x="5" y="58" width="95" height="14" rx="2" className="fill-destructive/20" />
          <text x="10" y="68" className="text-[9px] fill-destructive font-semibold">
            {t('poverty.povertyLines.extremePoverty')}
          </text>
        </motion.g>

        {/* Depth indicators */}
        {[40, 70].map((y, i) => (
          <motion.line
            key={`depth-${y}`}
            x1="188"
            y1={y}
            x2="195"
            y2={y}
            stroke="currentColor"
            strokeWidth="2"
            className={i === 0 ? 'text-secondary' : 'text-destructive'}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              delay: shouldReduceMotion ? 0 : 1.5 + i * 0.1
            }}
          />
        ))}
      </svg>
    </div>
  );
}
