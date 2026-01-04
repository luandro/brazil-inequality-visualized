import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function PovertyWaterline() {
  const { getDelay, shouldReduceMotion: reduceMotion, easing } = useHandDrawnAnimation({
    baseDelay: 0.2,
    staggerAmount: 0.1,
  });

  const { t } = useTranslation();

  // People struggling at different poverty levels
  const strugglingPeople = [
    // Below extreme poverty line
    { cx: 35, cy: 85, size: 3, sink: 8 },
    { cx: 65, cy: 90, size: 2.5, sink: 6 },
    { cx: 95, cy: 82, size: 3.5, sink: 10 },
    { cx: 125, cy: 88, size: 3, sink: 7 },
    { cx: 155, cy: 84, size: 2.8, sink: 9 },
    // Between lines
    { cx: 50, cy: 55, size: 2.5, sink: 0 },
    { cx: 110, cy: 52, size: 3, sink: 0 },
    { cx: 170, cy: 58, size: 2.5, sink: 0 }
  ];

  // Rising bubbles for water effect
  const bubbles = [
    { cx: 40, cy: 100, size: 2 },
    { cx: 85, cy: 105, size: 1.5 },
    { cx: 130, cy: 98, size: 2.5 },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
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

        {/* ENHANCED: Water layers - fade in with delay */}
        <motion.path
          d="M 0 70 Q 25 65, 50 70 T 100 70 T 150 70 T 200 70 L 200 130 L 0 130 Z"
          fill="url(#water-gradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: getDelay(0),
          }}
        />

        {/* ENHANCED: Deeper water ripples with draw animation */}
        {[80, 95, 110].map((y, i) => (
          <motion.path
            key={`ripple-${y}`}
            d={`M 0 ${y} Q 30 ${y - 1}, 60 ${y} T 120 ${y} T 200 ${y}`}
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-destructive/15"
            strokeDasharray="4,4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: getDelay(1 + i),
              ease: easing.smoothDraw,
            }}
          />
        ))}

        {/* ENHANCED: Poverty line (standard) with double-stroke sketchy effect */}
        <g>
          {/* Primary stroke */}
          <motion.path
            d="M 0 40 Q 25 36, 50 40 T 100 40 T 150 40 T 200 40"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-secondary"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 1.5,
              delay: getDelay(4),
              ease: easing.smoothDraw,
            }}
          />
          {/* Ghost stroke for sketchy effect */}
          <motion.path
            d="M 0 40 Q 25 36, 50 40 T 100 40 T 150 40 T 200 40"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="none"
            className="text-secondary/40"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            transform="translate(0.5, -0.3)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 1.5,
              delay: getDelay(4),
              ease: easing.smoothDraw,
            }}
          />
        </g>

        {/* ENHANCED: Extreme poverty line (danger) with double-stroke */}
        <g>
          {/* Primary stroke */}
          <motion.path
            d="M 0 70 Q 25 66, 50 70 T 100 70 T 150 70 T 200 70"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-destructive"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 1.5,
              delay: getDelay(5),
              ease: easing.smoothDraw,
            }}
          />
          {/* Ghost stroke for sketchy effect */}
          <motion.path
            d="M 0 70 Q 25 66, 50 70 T 100 70 T 150 70 T 200 70"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="none"
            className="text-destructive/40"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            transform="translate(0.5, -0.3)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 1.5,
              delay: getDelay(5),
              ease: easing.smoothDraw,
            }}
          />
        </g>

        {/* ENHANCED: People falling with motion trails and struggle ripples */}
        {strugglingPeople.map((person, i) => {
          const personDelay = getDelay(6 + i);
          const isStruggling = person.sink > 0;

          return (
            <g key={`person-${person.cx}-${person.cy}`}>
              {/* Motion trail for falling people */}
              {isStruggling && (
                <motion.path
                  d={`M ${person.cx} ${person.cy - 15} L ${person.cx} ${person.cy + person.sink}`}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent/20"
                  strokeDasharray="2,3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    delay: personDelay,
                    ease: easing.smoothDraw,
                  }}
                />
              )}

              {/* Falling/sinking person with pop-in and fall */}
              <motion.circle
                cx={person.cx}
                cy={person.cy}
                r={person.size}
                className={person.cy > 75 ? 'fill-destructive' : 'fill-secondary/70'}
                initial={{ cy: person.cy - 15, scale: 0, opacity: 0 }}
                whileInView={{
                  cy: person.cy + person.sink,
                  scale: 1,
                  opacity: 0.9,
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 1.5,
                  delay: personDelay,
                  ease: easing.smoothDraw,
                }}
              />

              {/* Struggle ripple - repeating for those sinking */}
              {isStruggling && !reduceMotion && (
                <motion.circle
                  cx={person.cx}
                  cy={person.cy + person.sink}
                  r={person.size}
                  className="fill-none stroke-destructive/40"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ scale: 1, opacity: 0 }}
                  whileInView={{
                    scale: [1, 2],
                    opacity: [0, 0.5, 0],
                  }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{
                    duration: 1.2,
                    delay: personDelay + 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeOut",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* ENHANCED: Rising bubbles for water effect */}
        {!reduceMotion && bubbles.map((bubble, i) => (
          <motion.circle
            key={`bubble-${i}`}
            cx={bubble.cx}
            cy={bubble.cy}
            r={bubble.size}
            className="fill-primary/30"
            initial={{ cy: 130, opacity: 0 }}
            whileInView={{
              cy: bubble.cy - 20,
              opacity: [0, 0.6, 0],
            }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{
              duration: 3,
              delay: getDelay(14) + (i * 0.2),
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeOut",
            }}
          />
        ))}

        {/* ENHANCED: Label tags with slide-in animation */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: getDelay(15),
            ease: easing.settle,
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: getDelay(16),
            ease: easing.settle,
          }}
        >
          <rect x="5" y="58" width="95" height="14" rx="2" className="fill-destructive/20" />
          <text x="10" y="68" className="text-[9px] fill-destructive font-semibold">
            {t('poverty.povertyLines.extremePoverty')}
          </text>
        </motion.g>

        {/* ENHANCED: Depth indicators with draw animation */}
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
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transformOrigin: `188px ${y}px` }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: getDelay(17 + i),
              ease: easing.smoothDraw,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
