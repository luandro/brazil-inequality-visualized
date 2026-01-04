import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useId, useMemo } from 'react';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';

export function WealthStack() {
  const { getDelay, shouldReduceMotion: reduceMotion, easing } = useHandDrawnAnimation({
    baseDelay: 0,
    staggerAmount: 0.05,
  });

  const { t } = useTranslation();
  const arrowheadId = useId();
  const glowId = useId();

  // Wealth stacks - exponentially growing with pre-computed random rotations
  const stacks = useMemo(() => [
    { x: 22, coins: 2, color: 'secondary', label: '99%', rotation: -8 },
    { x: 52, coins: 3, color: 'secondary', label: '', rotation: 5 },
    { x: 82, coins: 5, color: 'primary', label: '0.8%', rotation: -3 },
    { x: 112, coins: 8, color: 'primary', label: '', rotation: 7 },
    { x: 142, coins: 12, color: 'accent', label: '0.2%', rotation: -10 },
    { x: 172, coins: 16, color: 'accent', label: '', rotation: 4 }
  ], []);

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
        role="img"
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

        {/* ENHANCED: Background glow for tallest stacks with fade-in */}
        {stacks.slice(-2).map((stack, i) => (
          <motion.ellipse
            key={`glow-${stack.x}`}
            cx={stack.x}
            cy={110 - stack.coins * 6.5}
            rx="18"
            ry={stack.coins * 4}
            fill={`url(#${glowId})`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.6, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: getDelay(i),
              ease: easing.settle,
            }}
          />
        ))}

        {/* ENHANCED: Coin stacks with drop animation and double-stroke */}
        {stacks.map((stack, stackIdx) => {
          const stackDelay = getDelay(stackIdx * 3);

          return (
            <g key={`stack-${stack.x}`}>
              {Array.from({ length: stack.coins }).map((_, coinIdx) => {
                const y = 115 - coinIdx * 6.5;
                const coinClass = getCoinClass(stack.color, coinIdx, stack.coins);
                const coinDelay = stackDelay + (coinIdx * 0.05);
                const isTopCoin = coinIdx === stack.coins - 1;

                return (
                  <g key={`coin-${stack.x}-${coinIdx}`}>
                    {/* Coin shadow with pop-in */}
                    <motion.ellipse
                      cx={stack.x + 1}
                      cy={y + 1}
                      rx="11"
                      ry="4"
                      className="fill-foreground/10"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0.3, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      style={{ transformOrigin: `${stack.x + 1}px ${y + 1}px`, transformBox: 'fill-box' }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        delay: coinDelay,
                        ease: easing.popIn,
                      }}
                    />

                    {/* Main coin with drop animation */}
                    <motion.g
                      initial={{
                        y: y - 30 - (coinIdx * 5),
                        rotate: stack.rotation,
                        opacity: 0,
                        scale: 0,
                      }}
                      whileInView={{
                        y: y,
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      style={{ transformOrigin: `${stack.x}px ${y}px`, transformBox: 'fill-box' }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.5,
                        delay: coinDelay,
                        ease: easing.popIn,
                      }}
                    >
                      {/* ENHANCED: Double-stroke effect for top coins */}
                      {isTopCoin && (
                        <>
                          {/* Ghost stroke for sketchy effect */}
                          <ellipse
                            cx={stack.x}
                            cy={y}
                            rx="11"
                            ry="4"
                            className={coinClass
                              .replace(/fill-\w+\/?\d*/g, (match) => match.replace(/\/\d+$/, '') + '/30')
                              .replace(/stroke-\w+\/?\d*/g, (match) => match.replace(/\/\d+$/, '') + '/30')
                            }
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            transform="translate(0.3, -0.2)"
                          />
                        </>
                      )}

                      {/* Primary coin stroke */}
                      <ellipse
                        cx={stack.x}
                        cy={y}
                        rx="11"
                        ry="4"
                        className={coinClass}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />

                      {/* Coin edge highlight */}
                      <motion.ellipse
                        cx={stack.x}
                        cy={y}
                        rx="9"
                        ry="3"
                        className="fill-none stroke-background/20"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.2,
                          delay: coinDelay + 0.1,
                        }}
                      />

                      {/* Currency symbol on top coins */}
                      {isTopCoin && (
                        <motion.text
                          x={stack.x}
                          y={y + 1.5}
                          textAnchor="middle"
                          className="text-[7px] fill-background/80 font-bold"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.2,
                            delay: coinDelay + 0.2,
                          }}
                        >
                          R$
                        </motion.text>
                      )}
                    </motion.g>

                    {/* ENHANCED: Subtle wobble after landing for top coins */}
                    {!reduceMotion && isTopCoin && (stack.color === 'accent' || stack.color === 'primary') && (
                      <motion.g
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: [0, -1, 1, -0.5, 0] }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.4,
                          delay: coinDelay + 0.6,
                          ease: easing.wobble,
                        }}
                        style={{ transformOrigin: `${stack.x}px ${y}px`, transformBox: 'fill-box' }}
                      >
                        {/* Glow effect for top accent/primary coins */}
                        <motion.ellipse
                          cx={stack.x}
                          cy={y}
                          rx="13"
                          ry="5"
                          className={stack.color === 'accent' ? 'fill-accent/20' : 'fill-primary/20'}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: [0, 0.4, 0.2] }}
                          viewport={{ once: false, margin: "-100px" }}
                          transition={{
                            duration: 2,
                            delay: coinDelay + 0.8,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      </motion.g>
                    )}
                  </g>
                );
              })}

              {/* Stack label with slide-in */}
              {stack.label && (
                <motion.text
                  x={stack.x}
                  y={110 - stack.coins * 6.5 - 8}
                  textAnchor="middle"
                  className="text-[8px] fill-foreground/60 font-semibold"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: stackDelay + stack.coins * 0.05 + 0.3,
                    ease: easing.settle,
                  }}
                >
                  {stack.label}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* ENHANCED: Concentration arrow with draw animation */}
        <motion.g
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: getDelay(20),
            ease: easing.settle,
          }}
        >
          <motion.path
            d="M 15 15 L 185 15"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            strokeDasharray="4,2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            markerEnd={`url(#${arrowheadId})`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: getDelay(20) + 0.2,
              ease: easing.smoothDraw,
            }}
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

        {/* ENHANCED: Base platform with scale-up animation */}
        <motion.path
          d="M 5 118 Q 100 120, 195 118 L 195 123 Q 100 125, 5 123 Z"
          className="fill-muted/30 stroke-muted-foreground/20"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ transformOrigin: '100px 120px', transformBox: 'fill-box' }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: getDelay(19),
            ease: easing.popIn,
          }}
        />
      </svg>
    </div>
  );
}
