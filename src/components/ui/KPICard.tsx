import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SourceDrawer } from './SourceDrawer';

interface KPICardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  sourceIds: string[];
  definition?: string;
  variant?: 'default' | 'insight' | 'deficit' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  formatCompact?: boolean;
}

export function KPICard({
  value,
  label,
  suffix = '',
  prefix = '',
  decimals = 1,
  sourceIds,
  definition,
  variant = 'default',
  size = 'md',
  formatCompact = false,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1000;
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(stepValue * currentStep);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isInView, value, prefersReducedMotion]);

  const variantStyles = {
    default: 'text-foreground',
    insight: 'text-secondary',
    deficit: 'text-destructive',
    neutral: 'text-accent',
  };

  const sizeStyles = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
  };

  const formatNumber = (num: number): string => {
    if (!formatCompact) return num.toFixed(decimals);

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toFixed(decimals);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="kpi-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className={`font-bold tabular-nums ${sizeStyles[size]} ${variantStyles[variant]}`}>
            {prefix}
            {formatNumber(displayValue)}
            {suffix}
          </div>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">{label}</p>
        </div>
        <SourceDrawer sourceIds={sourceIds} title={label} definition={definition} showLabel={false} />
      </div>
    </motion.div>
  );
}
