import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useId } from 'react';

export function WealthStack() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const arrowheadId = useId();
  const glowId = useId();

  // Wealth stacks - exponentially growing
  const stacks = [
    { x: 22, coins: 2, delay: 0, color: 'secondary', label: '99%' },
    { x: 52, coins: 3, delay: 0.1, color: 'secondary', label: '' },
    { x: 82, coins: 5, delay: 0.2, color: 'primary', label: '0.8%' },
    { x: 112, coins: 8, delay: 0.3, color: 'primary', label: '' },
    { x: 142, coins: 12, delay: 0.4, color: 'accent', label: '0.2%' },
    { x: 172, coins: 16, delay: 0.5, color: 'accent', label: '' }
  ];

  const getCoinClass = (color: string, idx: number, total: number) => {
    const isTop = idx >= total - 2;
    if (color === 'accent' && isTop) return 'fill-accent stroke-accent';
    if (color === 'accent') return 'fill-accent/60 stroke-accent';
    if (color === 'primary' && isTop) return 'fill-primary/90 stroke-primary';
    if (color === 'primary') return 'fill-primary/50 stroke-primary/70';
    return 'fill-secondary/70 stroke-secondary/80';
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={t('wealth.title')}
      >
        <defs>
          {/* Radial gradient for coin shine */}
          <radialGradient id={glowId} cx="30%" cy="30%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </radialGradient>
          {/* Arrow marker */}
          <marker
            id={arrowheadId}
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            className="fill-primary"
          >
            <polygon points="0 0, 10 3, 0 6" />
          </marker>
        </defs>

        {/* Background glow for tallest stacks */}
        {stacks.slice(-2).map((stack, i) => (
          <motion.ellipse
            key={`glow-${stack.x}`}
            cx={stack.x}
            cy={110 - stack.coins * 6.5}
            rx="18"
            ry={stack.coins * 4}
            fill={`url(#${glowId})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : stack.delay + 0.5
            }}
          />
        ))}

        {/* Coin stacks */}
        {stacks.map((stack, stackIdx) => (
          <g key={`stack-${stack.x}`}>
            {Array.from({ length: stack.coins }).map((_, coinIdx) => {
              const y = 115 - coinIdx * 6.5;
              const coinClass = getCoinClass(stack.color, coinIdx, stack.coins);
              return (
                <motion.g key={`coin-${stack.x}-${coinIdx}`}>
                  {/* Coin shadow */}
                  <motion.ellipse
                    cx={stack.x + 1}
                    cy={y + 1}
                    rx="11"
                    ry="4"
                    className="fill-foreground/10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.3, scale: 1 }}
                    viewport={{ margin: "-100px" }}
                    style={{ transformOrigin: `${stack.x}px ${y}px` }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      delay: shouldReduceMotion ? 0 : stack.delay + coinIdx * 0.06,
                      ease: "easeOut"
                    }}
                  />
                  {/* Main coin */}
                  <motion.ellipse
                    cx={stack.x}
                    cy={y}
                    rx="11"
                    ry="4"
                    className={coinClass}
                    strokeWidth="1.5"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-100px" }}
                    style={{ transformOrigin: `${stack.x}px ${y}px` }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      delay: shouldReduceMotion ? 0 : stack.delay + coinIdx * 0.06,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  />
                  {/* Coin edge highlight */}
                  <motion.ellipse
                    cx={stack.x}
                    cy={y}
                    rx="9"
                    ry="3"
                    className="fill-none stroke-background/20"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-100px" }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                      delay: shouldReduceMotion ? 0 : stack.delay + coinIdx * 0.06 + 0.1
                    }}
                  />
                  {/* Currency symbol on top coins */}
                  {coinIdx >= stack.coins - 1 && (
                    <motion.text
                      x={stack.x}
                      y={y + 1.5}
                      textAnchor="middle"
                      className="text-[7px] fill-background/80 font-bold"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-100px" }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.2,
                        delay: shouldReduceMotion ? 0 : stack.delay + coinIdx * 0.06 + 0.2
                      }}
                    >
                      R$
                    </motion.text>
                  )}
                </motion.g>
              );
            })}

            {/* Stack label */}
            {stack.label && (
              <motion.text
                x={stack.x}
                y={110 - stack.coins * 6.5 - 8}
                textAnchor="middle"
                className="text-[8px] fill-foreground/60 font-semibold"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : stack.delay + stack.coins * 0.06 + 0.2
                }}
              >
                {stack.label}
              </motion.text>
            )}
          </g>
        ))}

        {/* Concentration arrow and label */}
        <motion.g
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            delay: shouldReduceMotion ? 0 : 1.5
          }}
        >
          <path
            d="M 15 15 L 185 15"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            strokeDasharray="4,2"
            markerEnd={`url(#${arrowheadId})`}
          />
          <rect x="70" y="4" width="60" height="12" rx="2" className="fill-background/90" />
          <text
            x="100"
            y="13"
            textAnchor="middle"
            className="text-[8px] fill-primary font-semibold"
          >
            {t('wealth.millionairePopulation.concentrationRatio')}
          </text>
        </motion.g>

        {/* Base platform with perspective */}
        <motion.path
          d="M 5 118 Q 100 120, 195 118 L 195 123 Q 100 125, 5 123 Z"
          className="fill-muted/30 stroke-muted-foreground/20"
          strokeWidth="1"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ margin: "-100px" }}
          style={{ transformOrigin: '100px 120px' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            delay: shouldReduceMotion ? 0 : 1
          }}
        />
      </svg>
    </div>
  );
}
