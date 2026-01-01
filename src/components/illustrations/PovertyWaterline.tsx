import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function PovertyWaterline() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={t('poverty.povertyLines.title')}
      >
        {/* Wavy poverty line (extreme) */}
        <motion.path
          d="M 0 70 Q 25 65, 50 70 T 100 70 T 150 70 T 200 70"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          className="text-destructive"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.2,
            ease: "easeInOut"
          }}
        />

        {/* Wavy poverty line (standard) */}
        <motion.path
          d="M 0 40 Q 25 35, 50 40 T 100 40 T 150 40 T 200 40"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          className="text-secondary"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.2,
            delay: shouldReduceMotion ? 0 : 0.3,
            ease: "easeInOut"
          }}
        />

        {/* Water surface texture below extreme line */}
        <motion.path
          d="M 0 70 Q 25 65, 50 70 T 100 70 T 150 70 T 200 70 L 200 120 L 0 120 Z"
          fill="currentColor"
          className="text-destructive/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.6
          }}
        />

        {/* Labels */}
        <motion.text
          x="10"
          y="35"
          className="text-[8px] fill-secondary font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.8
          }}
        >
          {t('poverty.povertyLines.poverty')}
        </motion.text>

        <motion.text
          x="10"
          y="65"
          className="text-[8px] fill-destructive font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 1.0
          }}
        >
          {t('poverty.povertyLines.extremePoverty')}
        </motion.text>
      </svg>
    </div>
  );
}
