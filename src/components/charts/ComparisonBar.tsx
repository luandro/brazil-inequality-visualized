import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { useTranslation } from 'react-i18next';

interface ComparisonBarProps {
  beforeLabel: string;
  beforeValue: number;
  afterLabel: string;
  afterValue: number;
  unit?: string;
  sourceIds: string[];
  title: string;
}

export function ComparisonBar({
  beforeLabel,
  beforeValue,
  afterLabel,
  afterValue,
  unit = '%',
  sourceIds,
  title,
}: ComparisonBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  
  const maxValue = Math.max(beforeValue, afterValue);
  const reduction = beforeValue - afterValue;
  const reductionPercent = ((reduction / beforeValue) * 100).toFixed(0);

  return (
    <div ref={ref} className="glass-card p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <SourceDrawer sourceIds={sourceIds} title={title} />
      </div>

      <div className="space-y-4">
        {/* Before bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{beforeLabel}</span>
            <span className="font-medium text-destructive">{beforeValue.toFixed(1)}{unit}</span>
          </div>
          <div className="h-8 bg-muted rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(beforeValue / maxValue) * 100}%` } : { width: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-destructive/70 to-destructive rounded-lg"
            />
          </div>
        </div>

        {/* After bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{afterLabel}</span>
            <span className="font-medium text-secondary">{afterValue.toFixed(1)}{unit}</span>
          </div>
          <div className="h-8 bg-muted rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(afterValue / maxValue) * 100}%` } : { width: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-secondary/70 to-secondary rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-sm">
          <span className="text-muted-foreground">{t('common.reduction', { value: reduction.toFixed(1) })} </span>
          <span className="font-semibold text-secondary">{t('common.percentagePoints')}</span>
          <span className="text-muted-foreground"> ({t('common.decrease', { percent: reductionPercent })})</span>
        </p>
      </div>
    </div>
  );
}
