import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useId } from 'react';

export function WealthStack() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const arrowheadId = useId();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={t('wealth.title')}
      >
        {/* Stacks of coins of different heights */}
        {[
          { x: 30, coins: 2, delay: 0 },
          { x: 60, coins: 3, delay: 0.1 },
          { x: 90, coins: 5, delay: 0.2 },
          { x: 120, coins: 7, delay: 0.3 },
          { x: 150, coins: 9, delay: 0.4 }
        ].map((stack) => (
          <g key={`stack-${stack.x}`}>
            {Array.from({ length: stack.coins }).map((_, coinIdx) => {
              const y = 110 - coinIdx * 10;
              return (
                <motion.g key={`coin-${stack.x}-${coinIdx}`}>
                  {/* Coin ellipse */}
                  <motion.ellipse
                    cx={stack.x}
                    cy={y}
                    rx="12"
                    ry="5"
                    className="fill-accent/80 stroke-accent"
                    strokeWidth="1.5"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-100px" }}
                    style={{ transformOrigin: `${stack.x}px ${y}px` }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.4,
                      delay: shouldReduceMotion ? 0 : stack.delay + coinIdx * 0.1,
                      ease: "easeOut"
                    }}
                  />
                  {/* Currency symbol */}
                  <motion.text
                    x={stack.x}
                    y={y + 2}
                    textAnchor="middle"
                    className="text-[8px] fill-accent-foreground font-bold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-100px" }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                      delay: shouldReduceMotion ? 0 : stack.delay + coinIdx * 0.1 + 0.2
                    }}
                  >
                    R$
                  </motion.text>
                </motion.g>
              );
            })}
          </g>
        ))}

        {/* Arrow marker definition - must be before use */}
        <defs>
          <marker
            id={arrowheadId}
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            className="fill-primary/60"
          >
            <polygon points="0 0, 10 3, 0 6" />
          </marker>
        </defs>

        {/* Arrow showing concentration */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            delay: shouldReduceMotion ? 0 : 1
          }}
        >
          <path
            d="M 20 20 L 160 20"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary/60"
            markerEnd={`url(#${arrowheadId})`}
          />
          <text
            x="90"
            y="15"
            textAnchor="middle"
            className="text-[8px] fill-primary/80 font-medium"
          >
            {t('wealth.millionairePopulation.concentrationRatio')} →
          </text>
        </motion.g>

        {/* Base line */}
        <motion.line
          x1="10"
          y1="115"
          x2="190"
          y2="115"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.8
          }}
        />
      </svg>
    </div>
  );
}
