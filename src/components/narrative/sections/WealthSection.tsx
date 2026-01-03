import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { Info, TrendingUp, Coins } from 'lucide-react';
import { NarrativeSection } from '../NarrativeSection';
import { WealthStack } from '@/components/illustrations';

export function WealthSection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (!data) return null;

  const { wealth } = data;

  return (
    <NarrativeSection id="wealth" ariaLabel="Wealth Concentration" className="py-16 md:py-24 bg-gradient-to-b from-yellow-50/30 to-transparent dark:from-yellow-950/10">
      <div className="container-wide">
        <WealthStack />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <h2 className="text-display mb-4">{t('wealth.title')}</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mb-8">
            {t('wealth.description')}
          </p>
        </motion.div>

        {/* Measurement Notes */}
        <motion.div 
          className="glass-card p-6 border-l-4 border-accent mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('wealth.measurementNotes')}</h3>
              <p className="text-muted-foreground">{t('wealth.measurementNotesText')}</p>
            </div>
          </div>
        </motion.div>

        {/* Wealth Gini */}
        <motion.div
          className="glass-card p-8 max-w-md mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-6xl font-bold text-destructive">{wealth.wealth_gini_coefficient.toFixed(2)}</p>
              <SourceDrawer
                sourceIds={wealth.millionaire_population.source_ids}
                title={t('wealth.wealthInequality.wealthGini')}
                definition={t('wealth.wealthInequality.wealthGiniDefinition')}
                showLabel={false}
              />
            </div>
            <p className="text-lg font-medium mb-4">{t('wealth.wealthInequality.wealthGini')}</p>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary via-accent to-destructive"
                style={{ width: `${wealth.wealth_gini_coefficient * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{t('wealth.wealthInequality.equal')}</span>
              <span>{t('wealth.wealthInequality.unequal')}</span>
            </div>
          </div>
        </motion.div>

        {/* Millionaires & Billionaires */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            value={wealth.millionaire_population.count_individuals / 1000}
            label={t('wealth.millionairePopulation.totalMillionaires')}
            suffix="K"
            decimals={0}
            sourceIds={wealth.millionaire_population.source_ids}
            variant="neutral"
          />
          <KPICard
            value={wealth.millionaire_population.percentage_of_population}
            label={t('wealth.millionairePopulation.shareOfPopulation')}
            suffix="%"
            decimals={1}
            sourceIds={wealth.millionaire_population.source_ids}
            variant="neutral"
          />
          <KPICard
            value={wealth.millionaire_population.estimated_wealth_share_percentage}
            label={t('wealth.millionairePopulation.wealthShare')}
            suffix="%"
            decimals={1}
            sourceIds={wealth.millionaire_population.source_ids}
            variant="deficit"
          />
          <div className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-medium">{t('wealth.millionairePopulation.concentrationRatio')}</h4>
              <SourceDrawer sourceIds={wealth.millionaire_population.source_ids} title={t('wealth.millionairePopulation.title')} />
            </div>
            <p className="text-3xl font-bold text-destructive">
              {(wealth.millionaire_population.estimated_wealth_share_percentage / wealth.millionaire_population.percentage_of_population).toFixed(0)}x
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('wealth.millionairePopulation.populationHolds', {
                percent: wealth.millionaire_population.percentage_of_population,
                wealth: wealth.millionaire_population.estimated_wealth_share_percentage
              })}
            </p>
          </div>
        </div>

        {/* Billionaires */}
        <motion.div 
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <div className="flex items-start justify-between mb-6">
            <h3 className="font-semibold text-lg">{t('wealth.billionairePopulation.title')}</h3>
            <SourceDrawer sourceIds={wealth.billionaire_population.source_ids} title={t('wealth.billionairePopulation.dataTitle')} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                <Coins className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{wealth.billionaire_population.count_2024}</p>
              <p className="text-muted-foreground text-sm">2024</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-3">
                <Coins className="w-7 h-7 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent">{wealth.billionaire_population.count_2025}</p>
              <p className="text-muted-foreground text-sm">2025</p>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <div className="p-4 bg-secondary/10 rounded-lg flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span>
                  {t('wealth.billionairePopulation.yearOverYear', {
                    percent: ((wealth.billionaire_population.count_2025 - wealth.billionaire_population.count_2024) / wealth.billionaire_population.count_2024 * 100).toFixed(1)
                  })}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </NarrativeSection>
  );
}
