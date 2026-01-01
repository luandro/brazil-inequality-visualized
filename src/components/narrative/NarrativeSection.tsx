import { forwardRef, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface NarrativeSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const NarrativeSection = forwardRef<HTMLElement, NarrativeSectionProps>(
  ({ id, children, className = '', ariaLabel }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <section
        ref={ref}
        id={id}
        aria-label={ariaLabel || id}
        className={`scroll-mt-20 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </section>
    );
  }
);

NarrativeSection.displayName = 'NarrativeSection';
