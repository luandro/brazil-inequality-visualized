import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { NarrativeSection } from '../NarrativeSection';
import { PovertyWaterline } from '@/components/illustrations';

export function PovertyLinesSection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (!data) return null;

  const { poverty } = data;

  return (
    <NarrativeSection id="poverty-lines" ariaLabel="Poverty Lines" className="py-16 md:py-24 bg-gradient-to-b from-cyan-50/30 to-transparent dark:from-cyan-950/10">
      <div className="container-wide">
        <PovertyWaterline />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
          className="mb-8"
        >
          <h2 className="section-header">{t('poverty.povertyLines.title')}</h2>
          <p className="text-muted-foreground max-w-2xl">
            {t('poverty.povertyLines.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ }}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg text-destructive mb-4">{t('poverty.povertyLines.extremePoverty')}</h3>
              <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title={t('poverty.povertyLines.title')} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-destructive/5 rounded-lg">
                <span className="text-muted-foreground">{t('poverty.povertyLines.dailyUSD')}</span>
                <span className="text-xl font-bold text-destructive">
                  ${poverty.poverty_lines.extreme_poverty_daily_usd_ppp.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-destructive/5 rounded-lg">
                <span className="text-muted-foreground">{t('poverty.povertyLines.monthlyBRL')}</span>
                <span className="text-xl font-bold text-destructive">
                  R${poverty.poverty_lines.extreme_poverty_monthly_brl}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ }}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg text-accent mb-4">{t('poverty.povertyLines.poverty')}</h3>
              <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title={t('poverty.povertyLines.title')} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-accent/5 rounded-lg">
                <span className="text-muted-foreground">{t('poverty.povertyLines.dailyUSD')}</span>
                <span className="text-xl font-bold text-accent">
                  ${poverty.poverty_lines.poverty_daily_usd_ppp.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/5 rounded-lg">
                <span className="text-muted-foreground">{t('poverty.povertyLines.monthlyBRL')}</span>
                <span className="text-xl font-bold text-accent">
                  R${poverty.poverty_lines.poverty_monthly_brl}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </NarrativeSection>
  );
}
